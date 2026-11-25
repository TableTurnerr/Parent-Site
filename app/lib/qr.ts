// Small QR code encoder (byte mode, error correction M, versions 1 to 10, so up to 213 bytes: plenty for a link).
// Written here instead of adding a package; follows ISO/IEC 18004. Returns a square grid, true = dark.

// Error correction level M, per version: [EC codewords per block, number of blocks]
const ECC_M: [number, number][] = [[0, 0], [10, 1], [16, 1], [26, 1], [18, 2], [24, 2], [16, 4], [18, 4], [22, 4], [22, 5], [26, 5]];
const MAX_VERSION = 10;

const gfMul = (x: number, y: number) => {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z;
};

function rsDivisor(degree: number) {
  const out = new Array<number>(degree).fill(0);
  out[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      out[j] = gfMul(out[j], root);
      if (j + 1 < degree) out[j] ^= out[j + 1];
    }
    root = gfMul(root, 2);
  }
  return out;
}

function rsRemainder(data: number[], divisor: number[]) {
  const out = divisor.map(() => 0);
  for (const b of data) {
    const factor = b ^ out.shift()!;
    out.push(0);
    divisor.forEach((d, i) => { out[i] ^= gfMul(d, factor); });
  }
  return out;
}

function rawModules(v: number) {
  let n = (16 * v + 128) * v + 64;
  if (v >= 2) {
    const a = Math.floor(v / 7) + 2;
    n -= (25 * a - 10) * a - 55;
    if (v >= 7) n -= 36;
  }
  return n;
}

const dataCodewords = (v: number) => Math.floor(rawModules(v) / 8) - ECC_M[v][0] * ECC_M[v][1];

function alignmentPositions(v: number) {
  if (v === 1) return [];
  const n = Math.floor(v / 7) + 2;
  const step = Math.floor((v * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
  const out = [6];
  for (let pos = v * 4 + 10; out.length < n; pos -= step) out.splice(1, 0, pos);
  return out;
}

const MASKS: ((x: number, y: number) => boolean)[] = [
  (x, y) => (x + y) % 2 === 0,
  (_x, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
];

/** Null when the text is too long for a small code. */
export function qrMatrix(text: string): boolean[][] | null {
  const bytes = [...new TextEncoder().encode(text)];
  let v = 1;
  const lenBits = () => (v < 10 ? 8 : 16);
  while (v <= MAX_VERSION && 4 + lenBits() + bytes.length * 8 > dataCodewords(v) * 8) v++;
  if (v > MAX_VERSION) return null;

  // Data bits, then padding.
  const bits: number[] = [];
  const push = (val: number, n: number) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
  push(4, 4);
  push(bytes.length, lenBits());
  bytes.forEach((b) => push(b, 8));
  const cap = dataCodewords(v) * 8;
  push(0, Math.min(4, cap - bits.length));
  push(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < cap; pad ^= 0xec ^ 0x11) push(pad, 8);
  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(""), 2));

  // Error correction, then interleave the blocks.
  const [ecLen, numBlocks] = ECC_M[v];
  const total = Math.floor(rawModules(v) / 8);
  const shortBlocks = numBlocks - (total % numBlocks);
  const shortLen = Math.floor(total / numBlocks);
  const divisor = rsDivisor(ecLen);
  const blocks: number[][] = [];
  for (let i = 0, k = 0; i < numBlocks; i++) {
    const dat = data.slice(k, k + shortLen - ecLen + (i < shortBlocks ? 0 : 1));
    k += dat.length;
    const ecc = rsRemainder(dat, divisor);
    if (i < shortBlocks) dat.push(0);
    blocks.push([...dat, ...ecc]);
  }
  const words: number[] = [];
  for (let i = 0; i < blocks[0].length; i++) {
    blocks.forEach((b, j) => { if (i !== shortLen - ecLen || j >= shortBlocks) words.push(b[i]); });
  }

  // Fixed patterns.
  const size = v * 4 + 17;
  const m = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const fixed = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const set = (x: number, y: number, dark: boolean) => { m[y][x] = dark; fixed[y][x] = true; };
  for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const d = Math.max(Math.abs(dx), Math.abs(dy));
      const x = cx + dx, y = cy + dy;
      if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
    }
  }
  const al = alignmentPositions(v);
  al.forEach((ax, i) => al.forEach((ay, j) => {
    if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) return;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  const format = (mask: number) => {
    const d = mask; // level M is 00
    let rem = d;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const f = ((d << 10) | rem) ^ 0x5412;
    const bit = (i: number) => ((f >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) set(8, i, bit(i));
    set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
    set(8, size - 8, true);
  };
  format(0);
  if (v >= 7) {
    let rem = v;
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    const ver = (v << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const dark = ((ver >>> i) & 1) === 1;
      const a = size - 11 + (i % 3), b = Math.floor(i / 3);
      set(a, b, dark); set(b, a, dark);
    }
  }

  // Data, zigzagging up and down in column pairs.
  let i = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
      const x = right - j;
      const y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
      if (!fixed[y][x] && i < words.length * 8) { m[y][x] = ((words[i >>> 3] >>> (7 - (i & 7))) & 1) === 1; i++; }
    }
  }

  // Try all masks and keep the one that is easiest to scan.
  const applyMask = (mask: number) => {
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fixed[y][x] && MASKS[mask](x, y)) m[y][x] = !m[y][x];
  };
  let best = 0, bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    applyMask(mask); format(mask);
    const s = penalty(m);
    if (s < bestScore) { best = mask; bestScore = s; }
    applyMask(mask);
  }
  applyMask(best); format(best);
  return m;
}

function penalty(m: boolean[][]) {
  const n = m.length;
  let score = 0, dark = 0;
  const line = (get: (i: number) => boolean) => {
    let run = 1, s = "";
    for (let i = 0; i < n; i++) {
      s += get(i) ? "1" : "0";
      if (i > 0 && get(i) === get(i - 1)) { run++; if (run === 5) score += 3; else if (run > 5) score++; } else run = 1;
    }
    for (let i = 0; i + 11 <= n; i++) { const w = s.slice(i, i + 11); if (w === "10111010000" || w === "00001011101") score += 40; }
  };
  for (let k = 0; k < n; k++) { line((i) => m[k][i]); line((i) => m[i][k]); }
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (m[y][x]) dark++;
    if (x + 1 < n && y + 1 < n && m[y][x] === m[y][x + 1] && m[y][x] === m[y + 1][x] && m[y][x] === m[y + 1][x + 1]) score += 3;
  }
  return score + Math.floor(Math.abs((dark * 20) / (n * n) - 10)) * 10;
}
