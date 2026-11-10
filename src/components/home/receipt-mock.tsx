import { FileDown } from "lucide-react";
import { pdfStrings } from "@/lib/pdf/strings";
import { formatDocumentDate } from "@/lib/receipt";
import { site } from "@/lib/site";
import { formatEuro } from "@/lib/tax/money";
import { cn } from "@/lib/utils";

const it = pdfStrings.it;
const euro = (cents: number) => formatEuro(cents, it.intl);

/** Decorative preview of a real Italian receipt: €1,000 gross, 20% withholding, €800 net. */
export function ReceiptMock({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto w-full max-w-[23rem] select-none", className)}>
      <div className="absolute -inset-8 rounded-[3rem] bg-linear-to-br from-primary/25 via-sky-200/30 to-transparent blur-3xl" />
      <div className="relative rotate-[2.5deg] rounded-2xl bg-white p-6 text-slate-900 shadow-2xl ring-1 shadow-slate-900/15 ring-slate-900/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-wider text-primary uppercase">
              {it.number} 1/2026 · {formatDocumentDate(site.rulesReviewed)}
            </p>
            <p className="mt-1.5 text-[0.95rem] leading-snug font-bold">{it.title}</p>
          </div>
          <div className="flex size-14 shrink-0 rotate-6 flex-col items-center justify-center rounded-md border-2 border-dashed border-rose-300 bg-rose-50 text-rose-600">
            <span className="text-[0.55rem] font-semibold tracking-wide uppercase">Bollo</span>
            <span className="text-base leading-none font-extrabold">€ 2</span>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-slate-500">{it.provider}</dt>
            <dd className="mt-0.5 font-semibold">Giulia Rossi</dd>
          </div>
          <div>
            <dt className="text-slate-500">{it.client}</dt>
            <dd className="mt-0.5 font-semibold">Studio Bianchi S.r.l.</dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-xs">
          <span>Progetto grafico — brochure</span>
          <span className="font-medium tabular">{euro(100_000)}</span>
        </div>

        <dl className="mt-4 grid gap-2 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-600">{it.gross}</dt>
            <dd className="font-medium tabular">{euro(100_000)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-600">Ritenuta d&apos;acconto 20%</dt>
            <dd className="font-medium text-rose-600 tabular">− {euro(20_000)}</dd>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4 border-t border-dashed border-slate-200 pt-3">
            <dt className="text-sm font-bold">{it.net}</dt>
            <dd className="text-lg font-extrabold text-primary tabular">{euro(80_000)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between gap-6">
          <p className="max-w-[11rem] text-[0.6rem] leading-relaxed text-slate-400">{it.stampPaid}</p>
          <div className="w-28 text-center">
            <svg viewBox="0 0 120 36" className="h-8 w-full text-slate-700" fill="none">
              <path
                d="M4 26c8-14 14-20 18-14s-6 16 2 14 10-18 16-12-2 14 6 12 8-12 14-10 4 10 10 8 10-8 16-8 10 4 18 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="border-t border-slate-300 pt-1 text-[0.6rem] text-slate-500">{it.signature}</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-6 flex -rotate-3 items-center gap-2.5 rounded-xl bg-slate-900 py-2.5 pr-4 pl-3 text-white shadow-xl">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <FileDown className="size-4" />
        </span>
        <span className="text-xs leading-tight">
          <span className="block font-semibold">ricevuta-1-2026-giulia-rossi.pdf</span>
          <span className="text-slate-400">PDF · A4</span>
        </span>
      </div>
    </div>
  );
}
