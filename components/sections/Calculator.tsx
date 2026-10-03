"use client";

import { useState } from "react";
import { TextMorph } from "torph/react";
import { Reveal, SectionLabel } from "../Reveal";

// log-scale sliders: position 0..1000 ↔ value
const SHARE = { min: 0.01, max: 5 };
const VOL = { min: 10, max: 5000 };
const toVal = (p: number, r: { min: number; max: number }) => r.min * Math.pow(r.max / r.min, p / 1000);
const toPos = (v: number, r: { min: number; max: number }) => (1000 * Math.log(v / r.min)) / Math.log(r.max / r.min);

const PRESETS = [
  { l: "quiet day", v: 50 },
  { l: "busy", v: 400 },
  { l: "it's printing", v: 2500 },
];

function nice(n: number) {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(2);
}

function eth(n: number) {
  if (n >= 1) return n.toFixed(3);
  if (n >= 0.01) return n.toFixed(4);
  return n.toFixed(6);
}

export function Calculator() {
  const [shareP, setShareP] = useState(toPos(1, SHARE));
  const [volP, setVolP] = useState(toPos(400, VOL));

  const share = Number(nice(toVal(shareP, SHARE)));
  const vol = Math.round(toVal(volP, VOL));
  const poolDay = vol * 0.03;
  const perDay = poolDay * (share / 100);
  const perSplit = perDay / 1440;
  const perWeek = perDay * 7;

  return (
    <section id="cut" className="relative mx-auto max-w-6xl border-t border-line px-4 py-28 sm:px-6 sm:py-36">
      <Reveal>
        <SectionLabel n="02">Your cut</SectionLabel>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal delay={80}>
            <h2 className="text-[clamp(40px,6.5vw,88px)] leading-[0.9] font-semibold tracking-[-0.05em]">
              Your share of supply is{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">your share of the tax.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-muted">
              The math is one line. Drag it. If volume prints, holders get paid. If it doesn&apos;t, there&apos;s
              nothing to split.
            </p>
          </Reveal>

          <Reveal delay={220} className="mt-10 space-y-9">
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <label htmlFor="share" className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  You hold
                </label>
                <span className="font-mono text-2xl tabular-nums">
                  <TextMorph as="span" duration={300}>{`${share}%`}</TextMorph>
                  <span className="ml-2 text-sm text-dim">of supply</span>
                </span>
              </div>
              <input
                id="share"
                type="range"
                min={0}
                max={1000}
                value={shareP}
                onChange={(e) => setShareP(+e.target.value)}
                className="range"
                style={{ "--p": `${shareP / 10}%` } as React.CSSProperties}
              />
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <label htmlFor="vol" className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  24h volume
                </label>
                <span className="font-mono text-2xl tabular-nums">
                  <TextMorph as="span" duration={300}>{vol.toLocaleString("en")}</TextMorph>
                  <span className="ml-2 text-sm text-dim">ETH</span>
                </span>
              </div>
              <input
                id="vol"
                type="range"
                min={0}
                max={1000}
                value={volP}
                onChange={(e) => setVolP(+e.target.value)}
                className="range"
                style={{ "--p": `${volP / 10}%` } as React.CSSProperties}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.l}
                    onClick={() => setVolP(toPos(p.v, VOL))}
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                      vol === p.v ? "border-acc/50 bg-acc/10 text-acc" : "border-line-2 text-muted hover:text-fg"
                    }`}
                  >
                    {p.l} · {p.v}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* receipt */}
        <Reveal delay={200} className="flex items-start justify-center lg:justify-end">
          <div className="w-full max-w-[420px] -rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="receipt px-7 pt-7 pb-10 text-[13px] shadow-2xl">
              <div className="text-center">
                <div className="text-base font-bold tracking-[0.2em]">FAIR FEES</div>
                <div className="mt-1 text-[11px] text-ink-muted">your cut · illustrative math</div>
              </div>
              <div className="dotted my-4" />
              <Line k="24h volume" v={`${vol.toLocaleString("en")} ETH`} />
              <Line k="× creator tax" v="3%" />
              <Line k="= holders pool / day" v={`${eth(poolDay)} ETH`} />
              <Line k="× your share" v={`${share}%`} />
              <Line k="to founder" v="0 ETH" />
              <div className="dotted my-4" />
              <div className="flex items-baseline justify-between">
                <span className="text-ink-muted">per split (60s)</span>
                <TextMorph className="font-semibold tabular-nums">{`${eth(perSplit)} ETH`}</TextMorph>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-ink-muted">per week</span>
                <TextMorph className="font-semibold tabular-nums">{`${eth(perWeek)} ETH`}</TextMorph>
              </div>
              <div className="mt-5 rounded-md bg-ink px-4 py-4 text-paper">
                <div className="text-[10px] tracking-[0.2em] text-paper/60">PER DAY</div>
                <div className="mt-1 flex items-baseline gap-2 text-4xl font-semibold tracking-tight">
                  <TextMorph className="tabular-nums">{eth(perDay)}</TextMorph>
                  <span className="text-base text-paper/60">ETH</span>
                </div>
              </div>
              <div className="dotted my-4" />
              <p className="text-center text-[10px] leading-relaxed text-ink-muted">
                volume × 3% × share. not a forecast, not a promise.
                <br />
                if volume prints, holders get paid.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between py-0.5">
      <span className="text-ink-muted">{k}</span>
      <span className="tabular-nums">{v}</span>
    </div>
  );
}
