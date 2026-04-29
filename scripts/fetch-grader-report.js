#!/usr/bin/env node
/**
 * fetch-grader-report.js
 * Scrapes grader.owner.com and saves structured JSON.
 * Runs with a VISIBLE browser — if a CAPTCHA appears, solve it in the window and the script continues automatically.
 *
 * Usage:
 *   node scripts/fetch-grader-report.js <website-url> <output-json-path>
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const [, , websiteUrl, outputPath] = process.argv;

if (!websiteUrl || !outputPath) {
  console.error("Usage: node scripts/fetch-grader-report.js <website-url> <output-json-path>");
  process.exit(1);
}

const normalizedUrl = websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

async function hasCaptcha(page) {
  return page.evaluate(() => {
    const text = document.body.innerText.toLowerCase();
    return (
      text.includes("i'm not a robot") ||
      text.includes("i am not a robot") ||
      text.includes("captcha") ||
      text.includes("verify you're human") ||
      text.includes("verify you are human") ||
      text.includes("human verification") ||
      !!document.querySelector('iframe[src*="recaptcha"]') ||
      !!document.querySelector('iframe[src*="hcaptcha"]') ||
      !!document.querySelector('iframe[src*="captcha"]') ||
      !!document.querySelector(".g-recaptcha") ||
      !!document.querySelector(".h-captcha") ||
      !!document.querySelector('[class*="captcha"]') ||
      !!document.querySelector('[id*="captcha"]')
    );
  });
}

async function waitForCaptcha(page) {
  console.log("\n🔒 CAPTCHA DETECTED");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("   Solve the CAPTCHA in the browser window.");
  console.log("   This script will continue automatically once it's done.");
  console.log("   (Timeout: 3 minutes)");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  await page.waitForFunction(
    () => {
      const text = document.body.innerText.toLowerCase();
      return (
        !text.includes("i'm not a robot") &&
        !text.includes("captcha") &&
        !text.includes("verify you're human") &&
        !document.querySelector('iframe[src*="recaptcha"]') &&
        !document.querySelector('iframe[src*="hcaptcha"]') &&
        !document.querySelector(".g-recaptcha") &&
        !document.querySelector('[class*="captcha"]')
      );
    },
    { timeout: 180000, polling: 2000 }
  );

  console.log("  ✓ CAPTCHA resolved — continuing...\n");
}

async function run() {
  console.log(`\n📊 Fetching grader report for: ${normalizedUrl}`);
  console.log("   (A browser window will open — do not close it)\n");

  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  try {
    await page.goto("https://grader.owner.com/", { waitUntil: "networkidle", timeout: 30000 });

    if (await hasCaptcha(page)) await waitForCaptcha(page);

    // Fill URL input
    const inputSelectors = [
      'input[type="text"]',
      'input[type="url"]',
      'input[name="url"]',
      'input[placeholder*="website" i]',
      'input[placeholder*="url" i]',
      'input[placeholder*="enter" i]',
    ];

    let filled = false;
    for (const sel of inputSelectors) {
      try {
        await page.waitForSelector(sel, { timeout: 3000 });
        await page.fill(sel, normalizedUrl);
        filled = true;
        console.log(`  ✓ Filled input (${sel})`);
        break;
      } catch { /* try next */ }
    }

    if (!filled) {
      await page.locator("input").first().fill(normalizedUrl);
      console.log("  ✓ Filled input (fallback: first input)");
    }

    // Submit
    const submitSelectors = [
      'button[type="submit"]',
      'button:has-text("Grade")',
      'button:has-text("Check")',
      'button:has-text("Analyze")',
      'button:has-text("Get")',
      '[data-testid="submit"]',
    ];

    let submitted = false;
    for (const sel of submitSelectors) {
      try {
        await page.click(sel, { timeout: 2000 });
        submitted = true;
        console.log(`  ✓ Clicked submit (${sel})`);
        break;
      } catch { /* try next */ }
    }

    if (!submitted) {
      await page.keyboard.press("Enter");
      console.log("  ✓ Submitted via Enter");
    }

    // Check CAPTCHA after submission
    await page.waitForTimeout(2000);
    if (await hasCaptcha(page)) await waitForCaptcha(page);

    // Wait for results
    console.log("  ⏳ Waiting for report to load...");
    await page.waitForFunction(
      () => {
        const text = document.body.innerText;
        return (
          text.includes("Overall") ||
          text.includes("Score") ||
          text.includes("score") ||
          !!document.querySelector('[class*="score"]') ||
          !!document.querySelector('[class*="grade"]') ||
          !!document.querySelector('[class*="result"]')
        );
      },
      { timeout: 60000, polling: 1000 }
    );

    // Extra settle time + final CAPTCHA check (some sites inject it after results load)
    await page.waitForTimeout(3000);
    if (await hasCaptcha(page)) {
      await waitForCaptcha(page);
      await page.waitForTimeout(3000);
    }

    console.log("  ✓ Report loaded — extracting data...");

    const graderData = await page.evaluate((url) => {
      const getText = (el) => (el ? el.innerText.trim() : null);
      const getNum = (str) => {
        if (!str) return null;
        const m = str.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : null;
      };

      // Overall score
      const scoreSelectors = [
        '[class*="overall"] [class*="score"]',
        '[class*="overall-score"]',
        '[class*="total-score"]',
        '[class*="grade-score"]',
        ".score-value",
        ".overall-score",
      ];
      let overallScore = null;
      for (const sel of scoreSelectors) {
        const el = document.querySelector(sel);
        if (el) { overallScore = getNum(getText(el)); if (overallScore !== null) break; }
      }
      if (overallScore === null) {
        const matches = document.body.innerText.match(/(\d{1,3})\s*\/\s*100/g) || [];
        if (matches.length) overallScore = getNum(matches[0]);
      }

      // Categories
      const categories = {};
      const categoryNames = ["seo", "mobile", "social", "local", "reviews", "performance", "content"];

      // Method 1: class/attribute matching
      const allEls = Array.from(document.querySelectorAll("*"));
      for (const cat of categoryNames) {
        const matches = allEls.filter(
          (el) =>
            el.children.length === 0 &&
            (el.className?.toLowerCase?.().includes(cat) ||
              el.getAttribute?.("data-category")?.toLowerCase() === cat)
        );
        for (const el of matches) {
          const score = getNum(getText(el));
          if (score !== null && score >= 0 && score <= 100) {
            categories[cat] = { score, issues: [] };
            break;
          }
        }
      }

      // Method 2: sections parsing
      const sections = document.querySelectorAll(
        '[class*="category"], [class*="section"], [class*="factor"], [class*="metric"]'
      );
      for (const section of sections) {
        const text = getText(section)?.toLowerCase() ?? "";
        for (const cat of categoryNames) {
          if (text.includes(cat) && !categories[cat]) {
            const scoreEl =
              section.querySelector('[class*="score"]') ||
              section.querySelector('[class*="value"]') ||
              section.querySelector("strong") ||
              section.querySelector("b");
            const score = getNum(getText(scoreEl));
            if (score !== null && score >= 0 && score <= 100) {
              const issues = Array.from(
                section.querySelectorAll("li, [class*='issue'], [class*='recommend'], [class*='tip']")
              ).map((li) => getText(li)).filter(Boolean).slice(0, 5);
              categories[cat] = { score, issues };
            }
          }
        }
      }

      // Recommendations
      const recSelectors = [
        '[class*="recommendation"] li',
        '[class*="suggest"] li',
        '[class*="improve"] li',
        '[class*="action"] li',
        '[class*="tip"] li',
        "li[class*='recommend']",
      ];
      let topRecommendations = [];
      for (const sel of recSelectors) {
        const items = Array.from(document.querySelectorAll(sel))
          .map((el) => getText(el))
          .filter((t) => t && t.length > 10)
          .slice(0, 8);
        if (items.length) { topRecommendations = items; break; }
      }

      return {
        url,
        gradedAt: new Date().toISOString(),
        overallScore,
        categories,
        topRecommendations,
        fullPageText: document.body.innerText.slice(0, 8000),
      };
    }, normalizedUrl);

    const dir = path.dirname(outputPath);
    if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(graderData, null, 2), "utf-8");

    console.log(`\n✅ Grader report saved → ${outputPath}`);
    console.log(`   Overall score : ${graderData.overallScore ?? "not extracted (read fullPageText)"}`);
    console.log(`   Categories    : ${Object.keys(graderData.categories).join(", ") || "none (read fullPageText)"}`);
    console.log(`   Recommendations: ${graderData.topRecommendations.length}`);

  } catch (err) {
    console.error("\n❌ Failed:", err.message);
    const dir = path.dirname(outputPath);
    if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify({
      url: normalizedUrl,
      gradedAt: new Date().toISOString(),
      error: err.message,
      overallScore: null,
      categories: {},
      topRecommendations: [],
      fullPageText: "",
    }, null, 2), "utf-8");
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  process.exit(0);
}

run();
