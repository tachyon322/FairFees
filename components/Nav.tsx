"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { Logo } from "./Logo";
import { NavTabs, useActiveNav } from "./NavTabs";
import { LINKS, NAV, TOKEN, explorerAddress, shortHash } from "@/lib/content";
import { useSim, type SimState } from "@/lib/sim";
import { boot } from "@/lib/boot";
import { SliceButton } from "./SliceButton";

function splitLabel(sim: SimState) {
  return sim.phase === "claiming" ? "splitting" : `00:${String(sim.secondsLeft).padStart(2, "0")}`;
}

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`relative grid h-14 w-full max-w-6xl grid-cols-[1fr_auto] items-center rounded-2xl bg-bg-2 pr-2 pl-4 transition-shadow duration-500 lg:grid-cols-[1fr_auto_1fr] ${
          solid ? "shadow-[0_16px_48px_-16px_rgba(0,0,0,0.9)]" : ""
        }`}
      >
        <Link href="/" aria-label="Fair Fees home" className="flex items-center justify-self-start">
          <Logo />
        </Link>

        <NavTabs />

        <div className="flex items-center justify-self-end">
          <div className="mr-3 hidden items-center gap-2 font-mono text-[11px] text-dim sm:flex" aria-live="off">
            {sim.phase !== "claiming" && <span className="uppercase tracking-[0.12em]">split in</span>}
            <TextMorph className="min-w-[5ch] text-[12px] text-fg tabular-nums" duration={350}>
              {splitLabel(sim)}
            </TextMorph>
          </div>
          {TOKEN.contractAddress ? (
            <SliceButton href={explorerAddress(TOKEN.contractAddress)} size="sm">
              <span className="font-mono text-[12.5px]">
                <span className="opacity-60">CA</span> {shortHash(TOKEN.contractAddress)}
              </span>
              <span className="hidden sm:inline">↗</span>
            </SliceButton>
          ) : (
            <SliceButton href={LINKS.buy} size="sm">
              Buy $FEES<span className="hidden sm:inline">→</span>
            </SliceButton>
          )}
          <button
            className="ml-1.5 grid h-9 w-9 place-items-center rounded-lg text-fg transition-colors hover:bg-white/[0.06] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile-menu"
          >
            <span className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="nav-mobile-menu"
          className="slide-in absolute inset-x-3 top-[76px] max-h-[calc(100dvh-92px)] overflow-y-auto rounded-2xl border border-line-2 bg-bg-2 p-2 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9)] sm:inset-x-4 sm:top-[80px] lg:hidden"
        >
          {NAV.map((n) => (
            <div key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={n.href === tab ? "page" : undefined}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-[15px] transition-colors hover:bg-white/[0.04] hover:text-fg ${
                  n.href === tab ? "text-fg" : "text-muted"
                }`}
              >
                {n.label}
                {n.href === tab && <span className="h-1.5 w-1.5 rounded-full bg-acc" />}
              </Link>
              {n.sections && (
                <div className="mx-1 mb-2 grid grid-cols-2 gap-1">
                  {n.sections.map((s) => {
                    const on = s.href === section;
                    return (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[13px] transition-colors ${
                          on ? "border-line-2 bg-white/[0.05] text-fg" : "border-line text-muted hover:text-fg"
                        }`}
                      >
                        <span className={`font-mono text-[10px] ${on ? "text-acc" : "text-dim"}`}>{s.n}</span>
                        {s.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <div className="mt-1 flex items-center justify-between border-t border-line px-3 pt-3 pb-1.5 font-mono text-[11px] text-dim">
            <span className="flex items-center gap-2 uppercase tracking-[0.12em]">
              next split
            </span>
            <span className="text-[12px] text-fg tabular-nums">{splitLabel(sim)}</span>
          </div>
        </div>
      )}
    </header>
  );
}
