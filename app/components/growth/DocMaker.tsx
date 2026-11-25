"use client";
// Free estimate and invoice maker (/tools/estimate-template, /tools/invoice-template). Fill it in, print or save as
// PDF. Nothing leaves the browser: the sheet is printed from a hidden frame.
import { useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";

type Kind = "estimate" | "invoice";
interface Line { id: number; desc: string; qty: number; price: number }

const money = (n: number) => (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { style: "currency", currency: "USD" });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const field = "mt-1.5 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary";

const DEFAULT_NOTES: Record<Kind, string> = {
  estimate: "Price is good for 30 days. Work not listed here is extra and needs your OK first. Reply or sign below to approve.",
  invoice: "Thank you for your business. Questions about this invoice? Reply or call the number above.",
};

export default function DocMaker({ kind }: { kind: Kind }) {
  const isInvoice = kind === "invoice";
  const label = isInvoice ? "Invoice" : "Estimate";
  const [from, setFrom] = useState({ name: "", phone: "", license: "" });
  const [to, setTo] = useState({ name: "", address: "" });
  const [meta, setMeta] = useState({ number: "", date: "", due: "", job: "" });
  const [lines, setLines] = useState<Line[]>([{ id: 1, desc: "Labor", qty: 4, price: 95 }, { id: 2, desc: "Materials", qty: 1, price: 180 }]);
  const [tax, setTax] = useState(0);
  const [paid, setPaid] = useState(0);
  const [notes, setNotes] = useState(DEFAULT_NOTES[kind]);

  const subtotal = lines.reduce((s, l) => s + (l.qty || 0) * (l.price || 0), 0);
  const taxAmt = subtotal * (Math.max(0, tax || 0) / 100);
  const total = subtotal + taxAmt;
  const balance = total - (paid || 0);
  const setLine = (id: number, patch: Partial<Line>) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  function print() {
    const row = (a: string, b: string, strong = false) => `<tr${strong ? ' class="t"' : ""}><td>${a}</td><td>${b}</td></tr>`;
    const html = `<!doctype html><meta charset="utf-8"><title>${label} ${esc(meta.number)}</title><style>
      body{font:14px/1.5 system-ui,sans-serif;color:#161a33;margin:32px}h1{font-size:30px;margin:0}.top{display:flex;justify-content:space-between;gap:24px}
      .muted{color:#5c637d}table{width:100%;border-collapse:collapse;margin-top:24px}th{text-align:left;border-bottom:2px solid #161a33;padding:8px 6px}
      td{border-bottom:1px solid #d9dded;padding:8px 6px;vertical-align:top}.n{text-align:right;white-space:nowrap}.sum{width:280px;margin-left:auto}.sum td:last-child{text-align:right}
      .sum .t td{font-weight:700;font-size:17px;border-bottom:0}.box{white-space:pre-line}.sign{margin-top:56px;display:flex;gap:32px}.sign div{flex:1;border-top:1px solid #161a33;padding-top:6px}
      </style><div class="top"><div><strong style="font-size:18px">${esc(from.name)}</strong><div class="muted">${esc(from.phone)}</div><div class="muted">${from.license ? `License ${esc(from.license)}` : ""}</div></div>
      <div style="text-align:right"><h1>${label}</h1><div>${meta.number ? `No. ${esc(meta.number)}` : ""}</div><div>${esc(meta.date)}</div><div>${meta.due ? `${isInvoice ? "Due" : "Valid until"} ${esc(meta.due)}` : ""}</div></div></div>
      <p style="margin-top:24px"><span class="muted">For</span><br><strong>${esc(to.name)}</strong><br><span class="box">${esc(to.address)}</span></p>${meta.job ? `<p><span class="muted">Job</span><br>${esc(meta.job)}</p>` : ""}
      <table><thead><tr><th>Description</th><th class="n">Qty</th><th class="n">Price</th><th class="n">Amount</th></tr></thead><tbody>${lines.map((l) => `<tr><td>${esc(l.desc)}</td><td class="n">${l.qty || 0}</td><td class="n">${money(l.price)}</td><td class="n">${money((l.qty || 0) * (l.price || 0))}</td></tr>`).join("")}</tbody></table>
      <table class="sum"><tbody>${row("Subtotal", money(subtotal))}${tax ? row(`Tax (${tax}%)`, money(taxAmt)) : ""}${isInvoice && paid ? row("Paid", `-${money(paid)}`) : ""}${!isInvoice && paid ? row("Deposit to start", money(paid)) : ""}${row(isInvoice ? "Balance due" : "Total", money(isInvoice ? balance : total), true)}</tbody></table>
      <p class="box" style="margin-top:28px">${esc(notes)}</p>${isInvoice ? "" : '<div class="sign"><div>Customer signature</div><div>Date</div></div>'}`;
    const f = document.createElement("iframe");
    f.title = `${label} to print`;
    f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    f.srcdoc = html;
    f.onload = () => {
      f.contentWindow?.addEventListener("afterprint", () => window.setTimeout(() => f.remove(), 500));
      f.contentWindow?.print();
    };
    document.body.append(f);
  }

  return (
    <div className="card p-5 md:p-8" data-analytics-section="free_tool">
      <div className="grid gap-6 md:grid-cols-2">
        <fieldset className="grid content-start gap-4">
          <legend className="mb-4 font-bold text-ink">Your business</legend>
          <label className="text-sm font-medium text-ink">Business name<input className={field} value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} autoComplete="organization" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">Phone or email<input className={field} value={from.phone} onChange={(e) => setFrom({ ...from, phone: e.target.value })} /></label>
            <label className="text-sm font-medium text-ink">License number<input className={field} value={from.license} onChange={(e) => setFrom({ ...from, license: e.target.value })} /></label>
          </div>
        </fieldset>
        <fieldset className="grid content-start gap-4">
          <legend className="mb-4 font-bold text-ink">Customer</legend>
          <label className="text-sm font-medium text-ink">Name<input className={field} value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} autoComplete="off" /></label>
          <label className="text-sm font-medium text-ink">Address<input className={field} value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} autoComplete="off" /></label>
        </fieldset>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium text-ink">{label} number<input className={field} value={meta.number} onChange={(e) => setMeta({ ...meta, number: e.target.value })} /></label>
        <label className="text-sm font-medium text-ink">Date<input type="date" className={field} value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} /></label>
        <label className="text-sm font-medium text-ink">{isInvoice ? "Due date" : "Valid until"}<input type="date" className={field} value={meta.due} onChange={(e) => setMeta({ ...meta, due: e.target.value })} /></label>
        <label className="text-sm font-medium text-ink">Job<input className={field} value={meta.job} onChange={(e) => setMeta({ ...meta, job: e.target.value })} placeholder="Water heater swap" /></label>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-4 font-bold text-ink">Line items</legend>
        <div className="mt-3 space-y-3">
          {lines.map((l, i) => (
            <div key={l.id} className="grid grid-cols-12 items-center gap-2 rounded-xl border border-line p-3">
              <input aria-label={`Item ${i + 1} description`} className={`${field} mt-0 col-span-12 sm:col-span-6`} value={l.desc} onChange={(e) => setLine(l.id, { desc: e.target.value })} />
              <input aria-label={`Item ${i + 1} quantity`} type="number" inputMode="decimal" min={0} step="any" className={`${field} mt-0 col-span-3 sm:col-span-1 px-2`} value={Number.isFinite(l.qty) ? l.qty : ""} onChange={(e) => setLine(l.id, { qty: e.target.valueAsNumber })} />
              <input aria-label={`Item ${i + 1} price`} type="number" inputMode="decimal" min={0} step="any" className={`${field} mt-0 col-span-4 sm:col-span-2`} value={Number.isFinite(l.price) ? l.price : ""} onChange={(e) => setLine(l.id, { price: e.target.valueAsNumber })} />
              <span className="col-span-4 text-right text-sm font-semibold text-ink sm:col-span-2">{money((l.qty || 0) * (l.price || 0))}</span>
              <button type="button" aria-label={`Remove item ${i + 1}`} className="col-span-1 grid h-9 place-items-center rounded-lg text-muted hover:text-ink" onClick={() => setLines((ls) => ls.filter((x) => x.id !== l.id))}><Trash2 className="h-4 w-4" aria-hidden /></button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-sm" onClick={() => setLines((ls) => [...ls, { id: Math.max(0, ...ls.map((x) => x.id)) + 1, desc: "", qty: 1, price: 0 }])}><Plus className="h-4 w-4" aria-hidden /> Add a line</button>
      </fieldset>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="text-sm font-medium text-ink">Notes and terms<textarea rows={5} className={field} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
        <div className="rounded-[1.5rem] bg-night p-6 text-white">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-white/80">Sales tax %<input type="number" inputMode="decimal" min={0} step="any" className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:border-white/60" value={Number.isFinite(tax) ? tax : ""} onChange={(e) => setTax(e.target.valueAsNumber)} /></label>
            <label className="text-sm text-white/80">{isInvoice ? "Already paid $" : "Deposit to start $"}<input type="number" inputMode="decimal" min={0} step="any" className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:border-white/60" value={Number.isFinite(paid) ? paid : ""} onChange={(e) => setPaid(e.target.valueAsNumber)} /></label>
          </div>
          <p className="mt-5 flex justify-between text-sm text-white/75"><span>Subtotal</span><span>{money(subtotal)}</span></p>
          {taxAmt > 0 && <p className="mt-1.5 flex justify-between text-sm text-white/75"><span>Tax</span><span>{money(taxAmt)}</span></p>}
          <p className="mt-3 flex items-baseline justify-between border-t border-white/15 pt-3" aria-live="polite"><span className="font-bold">{isInvoice ? "Balance due" : "Total"}</span><span className="font-display text-3xl font-bold">{money(isInvoice ? balance : total)}</span></p>
          <button type="button" className="btn btn-light mt-5 w-full" onClick={print}><Printer className="h-4 w-4" aria-hidden /> Print or save as PDF</button>
          <p className="mt-3 text-xs text-white/55">Stays in your browser. We don&apos;t see or store what you type.</p>
        </div>
      </div>
    </div>
  );
}
