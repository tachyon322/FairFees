"use client";

import { Clock } from "loading-dev";
import { TextMorph } from "torph/react";
import { Receipt } from "./receipt";
import { CYCLE, clock, sampleVolume, useCycle } from "./use-cycle";
import { site } from "@/lib/site";

const SHARE = 0.01;

export function Machine() {
  const { left, cycle } = useCycle();
  const elapsed = CYCLE - left;

  const volume = sampleVolume(cycle);
  const tax = volume * (site.tax / 100);
  const cut = tax * SHARE;

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-ink-2 p-6 sm:p-8">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_30%,#000,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[120%] -translate-x-1/2 rounded-full bg-lime/[0.12] blur-3xl"
        />
        {/* Drop flash: replays every time the cycle wraps. */}
        <div
          key={cycle}
          aria-hidden
          className="animate-flash pointer-events-none absolute inset-0 bg-lime/15"
        />

        <div className="relative flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          <span className="flex items-center gap-2.5 text-lime">
            <Clock size={20} duration={2400} />
            The minute
          </span>
          <span>Every {site.cadence}s</span>
        </div>

        <div
          role="timer"
          aria-label={`Split cycle, ${site.cadence} seconds`}
          className="relative mt-6"
        >
          <div className="display text-[clamp(5rem,19vw,11.5rem)] text-lime tabular-nums [text-shadow:0_0_60px_rgb(200_255_46/0.35)]">
            <TextMorph as="span" duration={450}>
              {clock(left)}
            </TextMorph>
          </div>
        </div>

        {/* 60 ticks, one per second. */}
        <div aria-hidden className="relative mt-6 flex h-6 items-end justify-between gap-px">
          {Array.from({ length: CYCLE }, (_, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full transition-colors duration-300 ${
                i % 5 === 0 ? "h-6" : "h-3.5"
              } ${i < elapsed ? "bg-lime" : "bg-white/15"}`}
            />
          ))}
        </div>

        <p className="relative mt-5 font-mono text-[12px] tracking-[0.08em] text-muted">
          Sixty seconds. Then it drops again.
        </p>
      </div>

      <Receipt
        className="relative z-10 mx-auto -mt-4 w-[92%] rotate-[-1.4deg]"
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
