"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { Radar } from "loading-dev";
import { Mark } from "./Logo";
import { boot } from "@/lib/boot";

const STEPS = ["60", "47", "31", "12", "00"];
const LABELS = ["accruing", "accruing", "accruing", "claiming", "paid."];

// Plays only when the site is opened on "/" — never on client-side navigation back to it.
let played = false;

export function Preloader() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(() => played || boot.mounted);

  useEffect(() => {
    if (gone) return;
    document.documentElement.style.overflow = "hidden";
    const timers: number[] = [];
    STEPS.forEach((_, k) => {
      if (k > 0) timers.push(window.setTimeout(() => setI(k), 180 + k * 300));
    });
    timers.push(
      window.setTimeout(() => {
        setDone(true);
        document.documentElement.style.overflow = "";
      }, 180 + STEPS.length * 300 + 250),
    );
    timers.push(
      window.setTimeout(() => {
        played = true;
        setGone(true);
      }, 180 + STEPS.length * 300 + 1300),
    );
    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-[clip-path] duration-1000 ease-[cubic-bezier(0.77,0,0.18,1)]"
      style={{ clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <Mark size={44} />
        <div className="flex items-baseline font-mono text-[88px] leading-none font-medium tracking-[-0.04em] tabular-nums sm:text-[120px]">
          <span className="text-dim">00:</span>
          <TextMorph duration={260} className={i === STEPS.length - 1 ? "text-acc" : ""}>
            {STEPS[i]}
          </TextMorph>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <Radar size={16} color="var(--acc)" />
          <TextMorph duration={300}>{LABELS[i]}</TextMorph>
        </div>
      </div>
      <div className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
        3% creator tax → holders · every 60s
      </div>
    </div>
  );
}
