"use client";

import { TextMorph } from "torph/react";

export type ReceiptRow = { label: string; value: string; strong?: boolean };

type ReceiptProps = {
  title: string;
  /** Changing this replays the print-out animation. */
  printKey?: string | number;
  rows: ReceiptRow[];
  total: { label: string; value: string };
  footer: string;
  subtitle?: string;
  stamp?: string;
  className?: string;
};

export function Receipt({
  title,
  printKey,
  rows,
  total,
  footer,
  subtitle = "Sample receipt · illustrative",
  stamp = "Sample",
  className = "",
}: ReceiptProps) {
  return (
    <div className={`receipt shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ${className}`}>
      <div key={printKey} className="animate-print px-6 pt-6 pb-7 text-[13px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">
              {title}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.14em] text-black/50 uppercase">
              {subtitle}
            </p>
          </div>
          <span
            aria-hidden
            className="-rotate-6 rounded-sm border-2 border-black/70 px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] text-black/70 uppercase"
          >
            {stamp}
          </span>
        </div>

        <dl className="mt-5 space-y-2.5 border-t border-dashed border-black/30 pt-4">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="tracking-[0.04em] text-black/60 uppercase">
                {row.label}
              </dt>
              <dd className="tabular-nums font-semibold">
                <TextMorph as="span" duration={500}>
                  {row.value}
                </TextMorph>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-md bg-ink px-4 py-3.5 text-lime">
          <span className="text-[12px] font-bold tracking-[0.16em] uppercase">
            {total.label}
          </span>
          <span className="text-[17px] font-bold tabular-nums">
            <TextMorph as="span" duration={500}>
              {total.value}
            </TextMorph>
          </span>
        </div>

        <p className="mt-5 border-t border-dashed border-black/30 pt-4 text-center text-[11px] tracking-[0.16em] text-black/55 uppercase">
          {footer}
        </p>
      </div>
    </div>
  );
}
