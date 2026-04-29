#!/usr/bin/env node
/**
 * fetch-grader-report.js
 * Scrapes grader.owner.com for a given website URL and saves structured JSON.
 *
 * Usage:
 *   node scripts/fetch-grader-report.js <website-url> <output-json-path>
 *
 * Example:
 *   node scripts/fetch-grader-report.js grumpys-burgers.com .grader-cache/grumpys-burgers.json
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

async function run() {
  console.log(`\n📊 Fetching grader report for: ${normalizedUrl}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://grader.owner.com/", { waitUntil: "networkidle", timeout: 30000 });

    // Fill the URL input — try common selectors
    const inputSelectors = [
      'input[type="text"]',
      'input[type="url"]',
      'input[name="url"]',
      'input[placeholder*="website"]',
      'input[placeholder*="URL"]',
      'input[placeholder*="url"]',
      'input[placeholder*="Enter"]',
    ];

    let inputFilled = false;
    for (const sel of inputSelectors) {
      try {
        await page.waitForSelector(sel, { timeout: 3000 });
        await page.fill(sel, normalizedUrl);
        inputFilled = true;
        console.log(`  ✓ Filled input with selector: ${sel}`);
        break;
      } catch {
        // try next selector
      }
    }

    if (!inputFilled) {
      // Fallback: type into the first visible input
      await page.locator("input").first().fill(normalizedUrl);
      console.log("  ✓ Filled first input (fallback)");
    }

    // Submit — try button click first, then Enter key
    const submitSelectors = [
      'button[type="submit"]',
      'button:has-text("Grade")',
      'button:has-text("grade")',
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
        console.log(`  ✓ Clicked submit: ${sel}`);
        break;
      } catch {
        // try next
      }
    }

    if (!submitted) {
      await page.keyboard.press("Enter");
      console.log("  ✓ Submitted via Enter key");
    }

    // Wait for results to load — look for score elements
    console.log("  ⏳ Waiting for report to load...");
    await page.waitForFunction(
      () => {
        const text = document.body.innerText;
        return (
          text.includes("Overall") ||
          text.includes("Score") ||
          text.includes("score") ||
          document.querySelector('[class*="score"]') ||
          document.querySelector('[class*="grade"]') ||
          document.querySelector('[class*="result"]')
        );
      },
      { timeout: 60000, polling: 1000 }
    );

    // Extra wait for all scores to render
    await page.waitForTimeout(3000);

    console.log("  ✓ Report loaded — extracting data...");

    // Extract all data from the page
    const graderData = await page.evaluate((url) => {
      const getText = (el) => (el ? el.innerText.trim() : null);
      const getNum = (str) => {
        if (!str) return null;
        const match = str.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : null;
      };

      // Try to find overall score
      const scoreSelectors = [
        '[class*="overall"] [class*="score"]',
        '[class*="overall-score"]',
        '[class*="total-score"]',
        '[class*="grade-score"]',
        'h1 [class*="score"]',
        ".score-value",
        ".overall-score",
      ];

      let overallScore = null;
      for (const sel of scoreSelectors) {
        const el = document.querySelector(sel);
        if (el) {
          overallScore = getNum(getText(el));
          if (overallScore !== null) break;
        }
      }

      // Fallback: find the largest number on the page that looks like a score
      if (overallScore === null) {
        const allText = document.body.innerText;
        const scoreMatches = allText.match(/(\d{1,3})\s*\/\s*100/g) || [];
        if (scoreMatches.length) {
          overallScore = getNum(scoreMatches[0]);
        }
      }

      // Extract category scores — look for common patterns
      const categories = {};
      const categoryNames = ["seo", "mobile", "social", "local", "reviews", "performance", "content"];

      // Method 1: Look for elements with category names in class or text
      const allElements = Array.from(document.querySelectorAll("*"));
      for (const cat of categoryNames) {
        const catElements = allElements.filter(
          (el) =>
            el.children.length === 0 &&
            (el.className?.toLowerCase?.().includes(cat) ||
              el.getAttribute?.("data-category")?.toLowerCase() === cat)
        );
        for (const el of catElements) {
          const score = getNum(getText(el));
          if (score !== null && score >= 0 && score <= 100) {
            categories[cat] = categories[cat] || { score, issues: [] };
            break;
          }
        }
      }

      // Method 2: Parse structured sections
      const sections = document.querySelectorAll(
        '[class*="category"], [class*="section"], [class*="factor"], [class*="metric"]'
      );
      for (const section of sections) {
        const text = getText(section).toLowerCase();
        for (const cat of categoryNames) {
          if (text.includes(cat) && !categories[cat]) {
            const scoreEl =
              section.querySelector('[class*="score"]') ||
              section.querySelector('[class*="value"]') ||
              section.querySelector("strong") ||
              section.querySelector("b");
            const score = getNum(getText(scoreEl));
            if (score !== null && score >= 0 && score <= 100) {
              // Extract issues/recommendations from the section
              const listItems = Array.from(
                section.querySelectorAll("li, [class*='issue'], [class*='recommend'], [class*='tip']")
              ).map((li) => getText(li)).filter(Boolean).slice(0, 5);
              categories[cat] = { score, issues: listItems };
            }
          }
        }
      }

      // Extract top recommendations
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
        if (items.length) {
          topRecommendations = items;
          break;
        }
      }

      // Extract page title / report heading
      const heading =
        getText(document.querySelector("h1")) ||
        getText(document.querySelector("h2")) ||
        `Website Grade Report for ${url}`;

      // Capture full page text for Claude to analyze if structured extraction is sparse
      const fullText = document.body.innerText.slice(0, 8000);

      return {
        url,
        gradedAt: new Date().toISOString(),
        heading,
        overallScore,
        categories,
        topRecommendations,
        fullPageText: fullText,
      };
    }, normalizedUrl);

    // Ensure output directory exists
    const dir = path.dirname(outputPath);
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(graderData, null, 2), "utf-8");

    console.log(`\n✅ Grader report saved to: ${outputPath}`);
    console.log(`   Overall score: ${graderData.overallScore ?? "not extracted (check fullPageText)"}`);
    console.log(`   Categories found: ${Object.keys(graderData.categories).join(", ") || "none (check fullPageText)"}`);
    console.log(`   Recommendations: ${graderData.topRecommendations.length}`);

  } catch (err) {
    console.error("\n❌ Failed to fetch grader report:", err.message);
    // Save error state so Claude knows what happened
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
