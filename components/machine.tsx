"use client";

import { Clock } from "loading-dev";
import { TextMorph } from "torph/react";
import { Receipt } from "./receipt";
import { CYCLE, clock, sampleVolume, useCycle } from "./use-cycle";
import { site } from "@/lib/site";

const SHARE = 0.01;

/** One instrument: the clock on top, the receipt it prints below. */
export function Machine() {
  const { left, cycle } = useCycle();
  const elapsed = CYCLE - left;

  const volume = sampleVolume(cycle);
  const tax = volume * (site.tax / 100);
  const cut = tax * SHARE;

  return (
    <div className="overflow-hidden rounded-[10px] border border-line-strong bg-ink-2">
      <div className="flex items-center justify-between border-b border-line px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] text-muted uppercase sm:px-7">
        <span className="flex items-center gap-2.5">
          <Clock size={14} duration={2400} color="var(--lime)" />
          The minute
        </span>
        <span>Every {site.cadence}s</span>
      </div>

      <div className="px-6 pt-8 pb-7 sm:px-7">
        <div
          role="timer"
          aria-label={`Split cycle, ${site.cadence} seconds`}
          className="text-[clamp(4rem,9vw,7.25rem)] leading-none font-light tracking-[-0.055em] tabular-nums"
        >
          <TextMorph as="span" duration={450}>
            {clock(left)}
          </TextMorph>
        </div>

        {/* 60 ticks, one per second. */}
        <div
          aria-hidden
          className="mt-7 flex h-4 items-end justify-between"
        >
          {Array.from({ length: CYCLE }, (_, i) => (
            <span
              key={i}
              className={`w-px transition-colors duration-300 ${
                i % 5 === 0 ? "h-4" : "h-2"
              } ${i < elapsed ? "bg-lime" : "bg-white/20"}`}
            />
          ))}
        </div>

        <p className="mt-5 font-mono text-[12px] text-muted">
          Sixty seconds. Then it drops again.
        </p>
      </div>

      <Receipt
        className="border-t border-line-strong"
        title={`${site.name} · Splitter`}
        printKey={cycle}
        rows={[
          { label: "Volume, last 60s", value: `${volume.toFixed(2)} ETH` },
          { label: `Creator tax ${site.tax}%`, value: `${tax.toFixed(4)} ETH` },
          { label: "Your supply", value: "1.00%" },
        ]}
        total={{ label: "Your cut", value: `+${cut.toFixed(5)} ETH` }}
        footer="No claim button. Just a split."
      />
    </div>
  );
}
