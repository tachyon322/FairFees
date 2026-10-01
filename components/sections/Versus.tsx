"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { VERSUS } from "@/lib/content";
import { Reveal, SectionLabel } from "../Reveal";

export function Versus() {
  const [us, setUs] = useState(true);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setUs((v) => !v), 3800);
    return () => clearInterval(id);
  }, [auto]);

  const set = (v: boolean) => {
    setAuto(false);
    setUs(v);
  };

  return (
    <section id="versus" className="relative border-t border-line bg-bg-2 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel n="02">Versus everyone else</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-[clamp(40px,7vw,96px)] leading-[0.9] font-semibold tracking-[-0.05em]">
            Same 3% tax.
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">Different pocket.</span>
          </h2>
        </Reveal>

        <Reveal delay={160} className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-line-2 bg-panel">
            {/* switch */}
            <div className="flex flex-col gap-5 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div
                role="tablist"
                className="relative grid w-full grid-cols-2 rounded-xl border border-line-2 bg-bg p-1 font-mono text-xs uppercase tracking-[0.12em] sm:w-[420px]"
              >
                <span
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    left: us ? "calc(50%)" : "4px",
                    background: us ? "var(--acc)" : "rgba(255,107,74,0.16)",
                  }}
                />
                <button
                  role="tab"
                  aria-selected={!us}
                  onClick={() => set(false)}
                  className={`relative z-10 rounded-lg px-3 py-2.5 transition-colors ${!us ? "text-red" : "text-muted"}`}
                >
                  Ordinary<span className="hidden sm:inline"> launch</span>
                </button>
                <button
                  role="tab"
                  aria-selected={us}
                  onClick={() => set(true)}
                  className={`relative z-10 rounded-lg px-3 py-2.5 transition-colors ${us ? "text-ink" : "text-muted"}`}
                >
                  Fair Fees
                </button>
              </div>
              <div className={`text-2xl font-medium tracking-tight sm:text-3xl ${us ? "text-acc" : "text-red"}`}>
                <TextMorph duration={500}>{us ? "This one pays you." : "Most tokens bill you."}</TextMorph>
              </div>
            </div>

            {/* flow */}
            <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-6 font-mono text-sm sm:px-7">
              <span className="rounded-lg border border-line-2 px-3 py-1.5">every trade</span>
              <span className="text-dim">→</span>
              <span className="rounded-lg border border-line-2 px-3 py-1.5">3% creator tax</span>
              <span className="text-dim">→</span>
              <span
                className={`rounded-lg border px-3 py-1.5 transition-colors duration-500 ${
                  us ? "border-acc/40 bg-acc/10 text-acc" : "border-red/40 bg-red/10 text-red"
                }`}
              >
                <TextMorph duration={500}>{us ? "splitter → every holder" : "0x7a…dev wallet"}</TextMorph>
              </span>
            </div>

            {/* table */}
            <dl>
              {VERSUS.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-1 gap-1 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[240px_1fr] sm:items-center sm:px-7"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">{r.k}</dt>
                  <dd className={`text-xl tracking-tight sm:text-2xl ${us ? "text-fg" : "text-muted"}`}>
                    <TextMorph duration={550}>{us ? r.us : r.them}</TextMorph>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10 grid gap-3 sm:grid-cols-2">
          <p className="text-2xl font-medium tracking-tight">Dev wallet has no pocket.</p>
          <p className="text-2xl font-medium tracking-tight text-muted sm:text-right">
            We didn&apos;t remove the tax. <span className="text-fg">We rerouted it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
