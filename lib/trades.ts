"use client";

// Live trade feed: token Transfer events in/out of the DEX pools (see app/api/trades).
// Only amounts in tokens — no ETH value, no tax. Polls while the tab is visible.

import { useEffect, useState } from "react";
import { TOKEN } from "./content";

export type LiveTrade = { id: string; side: "buy" | "sell"; amount: number; hash: string };

const POLL_MS = 5000;

// null → no CA or the API is unreachable; callers fall back to the simulation.
export function useLiveTrades() {
  const [trades, setTrades] = useState<LiveTrade[] | null>(null);

  useEffect(() => {
    if (!TOKEN.contractAddress) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = async () => {
      if (!document.hidden) {
        try {
          const res = await fetch("/api/trades");
          if (res.ok) {
            const body: { trades: LiveTrade[] } = await res.json();
            if (!stopped) setTrades(body.trades);
          }
        } catch {
          // keep the last good list
        }
      }
      if (!stopped) timer = setTimeout(tick, POLL_MS);
    };

    tick();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  return trades;
}

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

export function fmtAmount(n: number) {
  return n < 1 ? n.toPrecision(2) : compact.format(n);
}
