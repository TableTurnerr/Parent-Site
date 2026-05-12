import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const KEY_PREFIX = "ttk_";
const KEY_BYTES = 32;

export function generateApiKey(): { plaintext: string; hash: string; prefix: string } {
  const raw = randomBytes(KEY_BYTES).toString("base64url");
  const plaintext = `${KEY_PREFIX}${raw}`;
  const hash = hashApiKey(plaintext);
  const prefix = plaintext.slice(0, 12);
  return { plaintext, hash, prefix };
}

export function hashApiKey(plaintext: string): string {
  return createHash("sha256").update(plaintext).digest("hex");
}

export function constantTimeEquals(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}
