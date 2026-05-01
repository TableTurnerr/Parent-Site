import React from "react";

// Renders the small markdown subset used throughout client reports:
// **bold**, *italic*, [text](url), `code`. Plain text otherwise.
// Kept tiny + dependency-free so server components can use it directly.

type Token =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "italic"; value: string }
  | { kind: "code"; value: string }
  | { kind: "link"; value: string; href: string };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = input.length;
  let buf = "";

  const flush = () => {
    if (buf) {
      tokens.push({ kind: "text", value: buf });
      buf = "";
    }
  };

  while (i < n) {
    const ch = input[i];

    // **bold**
    if (ch === "*" && input[i + 1] === "*") {
      const close = input.indexOf("**", i + 2);
      if (close !== -1) {
        flush();
        tokens.push({ kind: "bold", value: input.slice(i + 2, close) });
        i = close + 2;
        continue;
      }
    }

    // *italic* (single, not part of **)
    if (
      ch === "*" &&
      input[i + 1] !== "*" &&
      input[i - 1] !== "*"
    ) {
      const close = input.indexOf("*", i + 1);
      if (close !== -1 && input[close + 1] !== "*") {
        flush();
        tokens.push({ kind: "italic", value: input.slice(i + 1, close) });
        i = close + 1;
        continue;
      }
    }

    // `code`
    if (ch === "`") {
      const close = input.indexOf("`", i + 1);
      if (close !== -1) {
        flush();
        tokens.push({ kind: "code", value: input.slice(i + 1, close) });
        i = close + 1;
        continue;
      }
    }

    // [label](url)
    if (ch === "[") {
      const labelEnd = input.indexOf("]", i + 1);
      if (labelEnd !== -1 && input[labelEnd + 1] === "(") {
        const urlEnd = input.indexOf(")", labelEnd + 2);
        if (urlEnd !== -1) {
          flush();
          tokens.push({
            kind: "link",
            value: input.slice(i + 1, labelEnd),
            href: input.slice(labelEnd + 2, urlEnd),
          });
          i = urlEnd + 1;
          continue;
        }
      }
    }

    buf += ch;
    i++;
  }

  flush();
  return tokens;
}

export function InlineMarkdown({ text }: { text: string }) {
  const tokens = tokenize(text);
  return (
    <>
      {tokens.map((t, i) => {
        switch (t.kind) {
          case "bold":
            return (
              <strong key={i} className="font-semibold">
                {t.value}
              </strong>
            );
          case "italic":
            return <em key={i}>{t.value}</em>;
          case "code":
            return (
              <code
                key={i}
                className="rounded bg-cream-dark px-1.5 py-0.5 text-[0.85em] text-charcoal"
              >
                {t.value}
              </code>
            );
          case "link":
            return (
              <a
                key={i}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal underline decoration-warm-gray-light underline-offset-2 hover:decoration-charcoal"
              >
                {t.value}
              </a>
            );
          default:
            return <React.Fragment key={i}>{t.value}</React.Fragment>;
        }
      })}
    </>
  );
}

export function Paragraphs({
  paragraphs,
  className = "",
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={`text-[15px] leading-[1.7] text-charcoal-light ${className}`}
        >
          <InlineMarkdown text={p} />
        </p>
      ))}
    </>
  );
}
