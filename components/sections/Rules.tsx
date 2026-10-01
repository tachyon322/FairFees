"use client";

import { Clock } from "loading-dev";
import { TextMorph } from "torph/react";
import Link from "next/link";
import { LINKS, RULES } from "@/lib/content";
import { useSim } from "@/lib/sim";
import { Reveal, SectionLabel } from "../Reveal";

const BAGS = [
  { w: 34, l: "whale" },
  { w: 22, l: "you" },
  { w: 18, l: "anon" },
  { w: 14, l: "anon" },
  { w: 12, l: "…" },
];

function Visual({ id }: { id: string }) {
  const sim = useSim();

  switch (id) {
    case "rate":
      return (
        <div className="flex items-end gap-3">
          <span className="font-mono text-7xl leading-none font-medium tracking-[-0.06em] text-acc">3%</span>
          <span className="mb-1.5 rounded-md border border-line-2 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            fixed · can’t go up
          </span>
        </div>
      );
    case "recipient":
      return (
        <div className="font-mono text-[12px] leading-6">
          <div className="text-dim">
            block <span className="text-acc">0</span>
          </div>
          <div>
            <span className="text-muted">recipient</span> <span className="text-dim">=</span>{" "}
            <span className="text-fg">Splitter</span>
          </div>
          <div className="text-dim line-through">recipient = 0xdev…</div>
        </div>
      );
    case "buyback":
      return (
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-7 w-12 items-center rounded-full border border-line-2 bg-bg">
            <span className="absolute left-1 h-5 w-5 rounded-full bg-dim" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">buyback · off</span>
        </div>
      );
    case "eth":
      return (
        <div className="flex items-center gap-4">
          <svg width="40" height="64" viewBox="0 0 256 417" className="spin-y">
            <path fill="var(--acc)" d="M127.9 0 125 9.5v275.7l2.9 2.9 127.9-75.6z" opacity=".9" />
            <path fill="var(--acc)" d="M127.9 0 0 212.5l127.9 75.6V154.2z" opacity=".55" />
            <path fill="var(--acc)" d="m127.9 312.2-1.6 2V412l1.6 4.7L256 236.6z" opacity=".9" />
            <path fill="var(--acc)" d="M127.9 416.7v-104.5L0 236.6z" opacity=".55" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            $FEES / ETH
            <br />
            <span className="text-fg">paid in ETH</span>
          </span>
        </div>
      );
    case "prorata":
      return (
        <div className="w-full">
          <div className="flex h-8 w-full overflow-hidden rounded-md">
            {BAGS.map((b, i) => (
              <div
                key={i}
                className={`group flex items-center justify-center border-r border-bg font-mono text-[10px] last:border-r-0 ${
                  b.l === "you" ? "bg-acc text-ink" : "bg-white/10 text-muted"
                }`}
                style={{ width: `${b.w}%` }}
              >
                {b.w}%
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
            <span>supply</span>
            <span>= fees</span>
          </div>
        </div>
      );
    case "cadence":
      return (
        <div className="flex items-center gap-4">
          <Clock size={44} color="var(--acc)" duration={1200} />
          <span className="font-mono text-4xl font-medium tracking-tight tabular-nums">
            <span className="text-dim">00:</span>
            <TextMorph as="span">{sim.phase === "claiming" ? "00" : String(sim.secondsLeft).padStart(2, "0")}</TextMorph>
          </span>
        </div>
      );
    default:
      return null;
  }
}

export function Rules() {
  return (
    <section id="rules" className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[700px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel n="$FEES">Product rules</SectionLabel>
        </Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal delay={80}>
            <h1 className="text-[clamp(52px,9vw,120px)] leading-[0.88] font-semibold tracking-[-0.055em]">
              Six rules.
              <br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">No flavor.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-sm text-muted">
              These are constraints, not vibes. Every one of them exists so that the fee doesn&apos;t sit — it pays.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((r, i) => (
            <Reveal key={r.id} delay={i * 70} className="h-full">
              <article className="group relative flex h-full min-h-[280px] flex-col justify-between bg-panel p-7 transition-colors hover:bg-[#171a12]">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-dim">0{i + 1}</span>
                </div>
                <div className="my-8 flex min-h-[72px] items-center">
                  <Visual id={r.id} />
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col gap-4 rounded-2xl border border-line-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">
            The full spec — invariants, distribution math, how to verify on-chain — is in the whitepaper.
          </p>
          <Link
            href={LINKS.whitepaper}
            className="shrink-0 rounded-xl border border-line-2 px-5 py-3 text-sm transition-colors hover:bg-white/5"
          >
            Read the whitepaper →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
