"use client";

import { TextMorph } from "torph/react";
import { Orbit } from "loading-dev";
import { fmtEth, useSim } from "@/lib/sim";

const r3 = (n: number) => Math.round(n * 1000) / 1000;
const TICKS = Array.from({ length: 60 }, (_, i) => i);
const SIZE = 300;
const C = SIZE / 2;

export function FeeMachine() {
  const sim = useSim();
  const elapsed = sim.phase === "claiming" ? 60 : 60 - sim.secondsLeft;
  const last = sim.splits[0];
  const claiming = sim.phase === "claiming";

  return (
    <div className="relative w-full max-w-[520px]">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(200,255,77,0.12),transparent)] blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-line-2 bg-panel/80 backdrop-blur-md">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em]">
          <span className="flex items-center gap-2 text-fg">
            Fee machine
          </span>
          <span className="rounded-md border border-line-2 px-2 py-0.5 text-[10px] text-muted" title="Token not deployed yet. Numbers are simulated.">
            Simulation · pre-launch
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_190px]">
          {/* dial */}
          <div className="relative flex items-center justify-center p-6">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[300px]">
              <circle cx={C} cy={C} r={C - 34} fill="none" stroke="var(--line)" />
              {TICKS.map((i) => {
                const a = (i / 60) * Math.PI * 2;
                const long = i % 5 === 0;
                const r1 = C - 8;
                const r2 = C - (long ? 24 : 18);
                const lit = i < elapsed;
                const head = i === elapsed - 1 && !claiming;
                return (
                  <line
                    key={i}
                    x1={r3(C + r1 * Math.sin(a))}
                    y1={r3(C - r1 * Math.cos(a))}
                    x2={r3(C + r2 * Math.sin(a))}
                    y2={r3(C - r2 * Math.cos(a))}
                    stroke={lit ? "var(--acc)" : "var(--line-2)"}
                    strokeWidth={long ? 2.4 : 1.6}
                    strokeLinecap="round"
                    style={{
                      transition: "stroke 0.4s",
                      filter: head || claiming ? "drop-shadow(0 0 6px var(--acc))" : undefined,
                    }}
                  />
                );
              })}
              {/* sweeping hand */}
              <g
                style={{
                  transform: `rotate(${(elapsed / 60) * 360}deg)`,
                  transformOrigin: `${C}px ${C}px`,
                  transition: elapsed === 0 ? "none" : "transform 0.6s cubic-bezier(0.19,1,0.22,1)",
                }}
              >
                <line x1={C} y1={C - (C - 34)} x2={C} y2={C - (C - 50)} stroke="var(--acc)" strokeWidth={2} strokeLinecap="round" />
              </g>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {claiming ? "claiming → splitting" : "next split in"}
              </div>
              <div className="flex h-[56px] items-center font-mono text-[52px] leading-none font-medium tracking-[-0.04em] tabular-nums">
                {claiming ? (
                  <Orbit size={36} color="var(--acc)" />
                ) : (
                  <>
                    <span className="text-dim">00:</span>
                    <TextMorph duration={450}>{String(sim.secondsLeft).padStart(2, "0")}</TextMorph>
                  </>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5 font-mono text-sm">
                <span className="text-muted">pot</span>
                <TextMorph className="text-acc tabular-nums" duration={500}>
                  {fmtEth(sim.pot)}
                </TextMorph>
                <span className="text-muted">ETH</span>
              </div>
            </div>
          </div>

          {/* trade feed */}
          <div className="border-t border-line p-4 sm:border-t-0 sm:border-l">
            <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              <span>trades</span>
              <span>3% tax</span>
            </div>
            <ul className="flex h-[180px] flex-col gap-1.5 overflow-hidden sm:h-[236px]">
              {sim.trades.length === 0 && (
                <li className="font-mono text-xs text-dim">{claiming ? "pot → splitter" : "waiting for volume…"}</li>
              )}
              {sim.trades.map((t) => (
                <li
                  key={t.id}
                  className="slide-in flex items-center justify-between rounded-md bg-white/[0.03] px-2 py-1.5 font-mono text-[11px]"
                >
                  <span className={t.side === "buy" ? "text-acc" : "text-red"}>{t.side}</span>
                  <span className="text-muted">{t.eth.toFixed(3)}</span>
                  <span className="text-fg">+{t.tax.toFixed(4)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* last receipt */}
        <div className="border-t border-line bg-bg-2/60 p-4">
          <div key={last.id} className="print-in receipt px-4 pt-3 pb-5 text-[11px] leading-relaxed">
            <div className="flex justify-between font-semibold">
              <span>SPLIT #{last.id}</span>
              <span>{last.time === "—" ? "PAID" : last.time}</span>
            </div>
            <div className="dotted my-1.5" />
            <div className="flex justify-between">
              <span>claimed from pons</span>
              <span>{fmtEth(last.pot)} ETH</span>
            </div>
            <div className="flex justify-between">
              <span>holders paid</span>
              <span>{last.holders.toLocaleString("en")}</span>
            </div>
            <div className="flex justify-between">
              <span>to founder</span>
              <span>0.0000 ETH</span>
            </div>
            <div className="dotted my-1.5" />
            <div className="flex justify-between font-semibold">
              <span>hold 1% → you get</span>
              <span>{fmtEth(last.pot * 0.01, 5)} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
