"use client";

import { useState } from "react";
import { Receipt } from "./receipt";
import { SectionHead } from "./section-head";
import { site } from "@/lib/site";

const SHARES = [0.1, 0.5, 1, 2, 5];

// Volume runs on a log scale: 0.1 ETH a minute up to 100.
const VOL_MIN = -1;
const VOL_MAX = 2;

const pct = (v: number, min: number, max: number) =>
  `${((v - min) / (max - min)) * 100}%`;

const fmtEth = (v: number) => (v >= 10 ? v.toFixed(0) : v.toFixed(v >= 1 ? 1 : 2));

export function Calculator() {
  const [share, setShare] = useState(1);
  const [vol, setVol] = useState(1);

  const volume = Number((10 ** vol).toPrecision(2));
  const pool = volume * (site.tax / 100);
  const cut = pool * (share / 100);

  return (
    <section id="calculator" className="border-b border-line py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Your cut"
          title="Your share of supply is your share of the tax."
          lede="1% of supply, 1% of the fees. No tiers, no boosts, no loyal-holder multipliers. The math is share × 3% × volume. Move the sliders."
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div className="reveal rounded-[10px] border border-line-strong bg-ink-2 p-6 sm:p-8">
            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="share"
                  className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
                >
                  Share of supply
                </label>
                <output
                  htmlFor="share"
                  className="text-4xl font-light tracking-[-0.045em] text-lime tabular-nums"
                >
                  {share.toFixed(1)}%
                </output>
              </div>
              <input
                id="share"
                type="range"
                className="slider mt-4"
                min={0.1}
                max={10}
                step={0.1}
                value={share}
                style={{ "--p": pct(share, 0.1, 10) } as React.CSSProperties}
                onChange={(e) => setShare(Number(e.target.value))}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {SHARES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShare(s)}
                    aria-pressed={share === s}
                    className="rounded-[5px] border border-line-strong px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-ink"
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-9 border-t border-line pt-8">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="volume"
                  className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
                >
                  Volume per minute
                </label>
                <output
                  htmlFor="volume"
                  className="text-4xl font-light tracking-[-0.045em] tabular-nums"
                >
                  {fmtEth(volume)} ETH
                </output>
              </div>
              <input
                id="volume"
                type="range"
                className="slider mt-4"
                min={VOL_MIN}
                max={VOL_MAX}
                step={0.01}
                value={vol}
                style={{ "--p": pct(vol, VOL_MIN, VOL_MAX) } as React.CSSProperties}
                onChange={(e) => setVol(Number(e.target.value))}
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
                <span>0.1</span>
                <span>1</span>
                <span>10</span>
                <span>100</span>
              </div>
            </div>

            <p className="mt-8 text-[13px] leading-relaxed text-muted">
              Illustrative math, not a forecast. Volume isn’t guaranteed, some
              minutes will be small, and this isn’t yield.
            </p>
          </div>

          <div className="reveal overflow-hidden rounded-[10px] border border-line-strong">
            <Receipt
              className=""
              title="Your receipt"
              subtitle="Illustrative · per 60s drop"
              tag="Estimate"
              rows={[
                { label: "Volume / minute", value: `${fmtEth(volume)} ETH` },
                { label: `Creator tax ${site.tax}%`, value: `${pool.toFixed(4)} ETH` },
                { label: "Your supply", value: `${share.toFixed(1)}%` },
                {
                  label: "Per hour, if it holds",
                  value: `${(cut * 60).toFixed(5)} ETH`,
                },
              ]}
              total={{ label: "Your cut", value: `+${cut.toFixed(6)} ETH` }}
              footer="Share of supply = share of the tax."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
