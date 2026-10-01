"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { Logo } from "./Logo";
import { NavTabs, useActiveNav } from "./NavTabs";
import { LINKS, NAV } from "@/lib/content";
import { useSim } from "@/lib/sim";
import { boot } from "@/lib/boot";
import { SliceButton } from "./SliceButton";

export function Nav() {
  const sim = useSim();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { tab, section } = useActiveNav();

  useEffect(() => {
    boot.mounted = true;
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const t = sim.phase === "claiming" ? "splitting" : `00:${String(sim.secondsLeft).padStart(2, "0")}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 ${
          scrolled
            ? "border-line-2 bg-bg/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" aria-label="Fair Fees home">
          <Logo />
        </Link>

        <NavTabs />

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-muted sm:flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-acc" />
            <span>next split</span>
            <TextMorph className="min-w-[4.5ch] text-fg tabular-nums" duration={350}>
              {t}
            </TextMorph>
          </div>
          <SliceButton href={LINKS.buy} size="sm">
            Buy $FEES →
          </SliceButton>
          <button
            className="ml-1 grid h-8 w-8 place-items-center rounded-lg border border-line lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative block h-2.5 w-3.5">
              <span className={`absolute left-0 h-px w-full bg-fg transition-all ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-fg transition-all ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="slide-in absolute inset-x-4 top-[72px] max-h-[calc(100dvh-90px)] overflow-y-auto rounded-2xl border border-line-2 bg-bg/95 p-2 backdrop-blur-xl lg:hidden">
          {NAV.map((n) => (
            <div key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-base hover:bg-white/5 hover:text-fg ${
                  n.href === tab ? "bg-white/[0.04] text-fg" : "text-muted"
                }`}
              >
                {n.label}
                {n.href === tab && <span className="h-1.5 w-1.5 rounded-full bg-acc" />}
              </Link>
              {n.sections && (
                <div className="mb-1 ml-4 border-l border-line pl-2">
                  {n.sections.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:text-fg ${
                        s.href === section ? "text-fg" : "text-muted"
                      }`}
                    >
                      <span className={`font-mono text-[10px] ${s.href === section ? "text-acc" : "text-dim"}`}>{s.n}</span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
