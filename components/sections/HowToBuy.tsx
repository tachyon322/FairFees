"use client";

import { useState } from "react";
import { TextMorph } from "torph/react";
import { Snake } from "loading-dev";
import { BUY_STEPS, LINKS, TOKEN } from "@/lib/content";
import { Reveal, SectionLabel } from "../Reveal";

function ContractBox() {
  const [copied, setCopied] = useState(false);
  const ca = TOKEN.contractAddress;

  const copy = async () => {
    if (!ca) return;
    await navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line-2 bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Contract address</div>
        <div className="mt-2 flex items-center gap-3 font-mono text-sm sm:text-base">
          {ca ? (
            <span className="truncate">{ca}</span>
          ) : (
            <>
              <Snake size={16} color="var(--acc)" />
              <span className="text-muted">Drops at launch. Only from our pinned posts.</span>
            </>
          )}
        </div>
      </div>
      {ca ? (
        <button
          onClick={copy}
          className="shrink-0 rounded-lg bg-fg px-4 py-2 font-mono text-xs text-ink transition-transform active:scale-95"
        >
          <TextMorph duration={300}>{copied ? "Copied ✓" : "Copy CA"}</TextMorph>
        </button>
      ) : (
        <a
          href={LINKS.x}
          className="shrink-0 rounded-lg border border-line-2 px-4 py-2 text-center font-mono text-xs text-fg transition-colors hover:bg-white/5"
        >
          Watch X for the CA →
        </a>
      )}
    </div>
  );
}

export function HowToBuy() {
  return (
    <section id="buy" className="relative border-t border-line bg-bg-2 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel n="05">How to take your cut</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-[clamp(40px,6.5vw,88px)] leading-[0.9] font-semibold tracking-[-0.05em]">
            Three steps.
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">Then the clock does the rest.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {BUY_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line-2 bg-panel p-7">
                <span className="pointer-events-none absolute -top-6 -right-2 font-mono text-[120px] leading-none font-semibold text-white/[0.03] transition-colors group-hover:text-acc/[0.08]">
                  {s.n}
                </span>
                <span className="font-mono text-xs text-acc">{s.n}</span>
                <h3 className="mt-10 text-xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-4">
          <ContractBox />
        </Reveal>
      </div>
    </section>
  );
}
