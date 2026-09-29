"use client";

import { TextMorph } from "torph/react";

export type ReceiptRow = { label: string; value: string };

type ReceiptProps = {
  title: string;
  /** Changing this replays the print-out animation. */
  printKey?: string | number;
  rows: ReceiptRow[];
  total: { label: string; value: string };
  footer: string;
  subtitle?: string;
  tag?: string;
  className?: string;
};

export function Receipt({
  title,
  printKey,
  rows,
  total,
  footer,
  subtitle = "Sample · illustrative",
  tag = "Sample",
  className = "",
}: ReceiptProps) {
  return (
    <div className={`receipt ${className}`}>
      <div key={printKey} className="animate-print p-6 text-[12.5px] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase">
              {title}
            </p>
            <p className="mt-1.5 text-[11px] tracking-[0.1em] text-black/50 uppercase">
              {subtitle}
            </p>
          </div>
          <span className="rounded-[3px] border border-black/25 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-black/60 uppercase">
            {tag}
          </span>
        </div>

        <dl className="mt-5 divide-y divide-dashed divide-black/20 border-y border-dashed border-black/20">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-2.5"
            >
              <dt className="tracking-[0.04em] text-black/55 uppercase">
                {row.label}
              </dt>
              <dd className="font-medium tabular-nums">
                <TextMorph as="span" duration={500}>
                  {row.value}
                </TextMorph>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-[4px] bg-ink px-4 py-3.5 text-lime">
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">
            {total.label}
          </span>
          <span className="text-base font-semibold tabular-nums">
            <TextMorph as="span" duration={500}>
              {total.value}
            </TextMorph>
          </span>
        </div>

        <p className="mt-5 text-center text-[10.5px] tracking-[0.14em] text-black/45 uppercase">
          {footer}
        </p>
      </div>
    </div>
  );
}
