"use client";

import { TextMorph } from "torph/react";
import { Pulse } from "loading-dev";
import { fmtEth, useSim } from "@/lib/sim";
import { Reveal, SectionLabel } from "../Reveal";

export function Receipts() {
  const sim = useSim();
  const claiming = sim.phase === "claiming";

  return (
    <section id="payday" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel n="04">Payday</SectionLabel>
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={80}>
            <h2 className="text-[clamp(40px,6.5vw,88px)] leading-[0.9] font-semibold tracking-[-0.05em]">
              Check the timer,
              <br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">not the founder chat.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <dl className="grid grid-cols-2 gap-8 font-mono">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-dim">paid to holders</dt>
                <dd className="mt-2 flex items-baseline gap-1.5 text-3xl tracking-tight tabular-nums">
                  <TextMorph>{sim.totalPaid.toFixed(4)}</TextMorph>
                  <span className="text-sm text-muted">ETH</span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-dim">splits run</dt>
                <dd className="mt-2 text-3xl tracking-tight tabular-nums">
                  <TextMorph>{sim.splits[0].id.toLocaleString("en")}</TextMorph>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      {/* receipt rail */}
      <div className="relative mt-16">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:px-6">
          {claiming ? <Pulse size={14} color="var(--acc)" /> : <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-acc" />}
          <span>{claiming ? "printing…" : `next receipt in 00:${String(sim.secondsLeft).padStart(2, "0")}`}</span>
          <span className="ml-auto text-dim normal-case tracking-normal">simulated until launch</span>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:px-[max(24px,calc((100vw-72rem)/2+24px))]">
          {sim.splits.map((s, i) => (
            <div
              key={s.id}
              className={`${i === 0 ? "print-in" : ""} w-[240px] shrink-0 transition-opacity`}
              style={{ opacity: 1 - i * 0.07 }}
            >
              <div className="receipt px-5 pt-5 pb-8 text-[11px] leading-relaxed">
                <div className="flex justify-between font-bold">
                  <span>SPLIT #{s.id}</span>
                  <span>{s.time === "—" ? "✓" : s.time}</span>
                </div>
                <div className="dotted my-2" />
                <div className="flex justify-between">
                  <span className="text-ink-muted">claimed</span>
                  <span>{fmtEth(s.pot)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">holders</span>
                  <span>{s.holders.toLocaleString("en")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">founder</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">tx</span>
                  <span>{s.hash}</span>
                </div>
                <div className="dotted my-2" />
                <div className="text-center text-[10px] tracking-[0.2em] text-ink-muted">SIXTY SECONDS. AGAIN.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
