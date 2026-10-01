"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { FeeMachine } from "../FeeMachine";
import { HERO_LINES, LINKS } from "@/lib/content";
import { SliceButton } from "../SliceButton";

const STATS = [
  { v: "3%", l: "creator tax" },
  { v: "60s", l: "split cadence" },
  { v: "ETH", l: "paid out in" },
  { v: "0", l: "founder wallets" },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % HERO_LINES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-48 lg:pt-56 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,255,77,0.08),transparent)]" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-[clamp(64px,11vw,148px)] leading-[0.86] font-semibold tracking-[-0.055em]">
            <span className="block">The 3%</span>
            <span className="block">
              is{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">yours.</span>
            </span>
          </h1>

          <div className="mt-8 h-[1.6em] text-lg text-muted sm:text-xl">
            <TextMorph duration={550}>{HERO_LINES[i]}</TextMorph>
          </div>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-dim">
            A pons v2 token with a 3% creator tax. The creator is a contract. It pays holders in ETH,
            pro rata, every 60 seconds. That&apos;s the whole project.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <SliceButton crack href={LINKS.buy}>Take your cut →</SliceButton>
            <a
              href="/whitepaper#design"
              className="inline-flex items-center gap-2 rounded-xl border border-line-2 px-6 py-3.5 text-[15px] text-fg transition-colors hover:bg-white/5"
            >
              How the split works
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-4 gap-4 border-t border-line pt-6">
            {STATS.map((s) => (
              <div key={s.l}>
                <dt className="font-mono text-2xl font-medium tracking-tight">{s.v}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-center lg:justify-end">
          <FeeMachine />
        </div>
      </div>
    </section>
  );
}
