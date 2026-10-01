"use client";

import Link from "next/link";
import { TextMorph } from "torph/react";
import { LINKS, NAV } from "@/lib/content";
import { useSim } from "@/lib/sim";
import { Logo, Mark } from "../Logo";
import { Reveal } from "../Reveal";
import { SliceButton } from "../SliceButton";

export function Outro() {
  const sim = useSim();
  const secs = sim.phase === "claiming" ? "00" : String(sim.secondsLeft).padStart(2, "0");

  return (
    <>
      <section className="relative overflow-hidden border-t border-line py-32 sm:py-44">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        {/* giant ticking backdrop */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[42vw] leading-none font-semibold tracking-[-0.08em] text-white/[0.025] select-none">
          <TextMorph as="span" duration={600}>{secs}</TextMorph>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Reveal>
            <Mark size={56} animated className="mx-auto mb-10" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mx-auto max-w-5xl text-[clamp(44px,8vw,120px)] leading-[0.88] font-semibold tracking-[-0.055em]">
              Hold $FEES.
              <br />
              Take the tax.
              <br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">Every 60 seconds.</span>
            </h2>
          </Reveal>
          <Reveal delay={160} className="mt-12 flex flex-wrap justify-center gap-3">
            <SliceButton crack href={LINKS.buy} size="lg">
              Take your cut →
            </SliceButton>
            <a
              href={LINKS.x}
              className="inline-flex items-center gap-2 rounded-xl border border-line-2 px-7 py-4 text-base transition-colors hover:bg-white/5"
            >
              Follow on X
            </a>
            <Link
              href={LINKS.whitepaper}
              className="inline-flex items-center gap-2 rounded-xl border border-line-2 px-7 py-4 text-base transition-colors hover:bg-white/5"
            >
              Read the whitepaper
            </Link>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 font-mono text-xs text-muted">3% creator tax → holders. every 60s. $FEES</p>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Site</div>
            <ul className="space-y-2 text-sm text-muted">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Elsewhere</div>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href={LINKS.x} className="hover:text-fg">X / Twitter</a></li>
              <li><a href={LINKS.telegram} className="hover:text-fg">Telegram</a></li>
              <li><a href={LINKS.docs} className="hover:text-fg">Contract source</a></li>
              <li><a href={LINKS.explorer} className="hover:text-fg">Explorer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line">
          <p className="mx-auto max-w-6xl px-4 py-6 font-mono text-[10px] leading-relaxed text-dim sm:px-6">
            $FEES is a token on pons v2, Robinhood Chain. Not financial advice. Nothing here is a promise of value,
            return or yield. Payouts depend entirely on trading volume — no volume, nothing to split. Figures shown
            before launch are simulated.
          </p>
        </div>
      </footer>
    </>
  );
}
