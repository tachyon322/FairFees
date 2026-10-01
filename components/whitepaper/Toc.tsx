"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { SliceButton } from "../SliceButton";

export type TocItem = { id: string; n: string; label: string };

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const current = items.find((i) => i.id === active) ?? items[0];

  return (
    <>
      {/* reading progress */}
      <div className="no-print fixed inset-x-0 top-0 z-[55] h-[2px] bg-transparent">
        <div className="h-full origin-left bg-acc" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* mobile: current section pill */}
      <div className="no-print sticky top-[76px] z-40 -mx-4 mb-8 px-4 lg:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-line-2 bg-bg/80 px-4 py-2.5 font-mono text-xs backdrop-blur-xl">
          <span className="text-acc">{current.n}</span>
          <TextMorph className="text-muted">{current.label}</TextMorph>
          <span className="ml-auto text-dim tabular-nums">{Math.round(progress * 100)}%</span>
        </div>
      </div>

      {/* desktop: sticky list */}
      <nav aria-label="Contents" className="no-print sticky top-28 hidden self-start lg:block">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Contents</div>
        <ol className="space-y-0.5 border-l border-line">
          {items.map((i) => {
            const on = i.id === active;
            return (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-[13px] transition-colors ${
                    on ? "border-acc text-fg" : "border-transparent text-muted hover:text-fg"
                  }`}
                >
                  <span className={`font-mono text-[11px] ${on ? "text-acc" : "text-dim"}`}>{i.n}</span>
                  {i.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export function PrintButton() {
  return (
    <SliceButton onClick={() => window.print()} className="no-print">
      Save as PDF ↓
    </SliceButton>
  );
}
