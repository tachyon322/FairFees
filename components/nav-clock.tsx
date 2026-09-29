"use client";

import { Ripple } from "loading-dev";
import { TextMorph } from "torph/react";
import { clock, useCycle } from "./use-cycle";

/** The persistent timer. People should check the timer, not the founder chat. */
export function NavClock() {
  const { left } = useCycle();
  return (
    <a
      href="#top"
      aria-label="Split cycle"
      className="hidden items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3 pl-2 font-mono text-xs text-lime sm:flex"
    >
      <Ripple size={16} />
      <span className="tabular-nums">
        <TextMorph as="span" duration={350}>
          {clock(left)}
        </TextMorph>
      </span>
    </a>
  );
}
