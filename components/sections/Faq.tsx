"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ, LINKS } from "@/lib/content";
import { Reveal, SectionLabel } from "../Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[700px]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionLabel n="$FEES">FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-[clamp(52px,7vw,96px)] leading-[0.9] font-semibold tracking-[-0.055em]">
              One question
              <br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">that matters.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-sm text-muted">
              A contract that pays holders doesn&apos;t make a token safe. It answers where the 3% goes. The rest
              is on you.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href={LINKS.whitepaper}
              className="mt-8 inline-flex rounded-xl border border-line-2 px-5 py-3 text-sm transition-colors hover:bg-white/5"
            >
              Still unsure? Read the whitepaper →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ul className="border-t border-line-2">
            {FAQ.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="border-b border-line-2">
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`text-lg tracking-tight transition-colors sm:text-xl ${on ? "text-fg" : "text-muted"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        on ? "rotate-45 border-acc bg-acc text-ink" : "border-line-2 text-muted"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
