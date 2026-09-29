import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

export const CYCLE = site.cadence;

/**
 * One shared wall-clock cycle: every widget on the page reads the same second,
 * so the nav pill, the hero timer and the sample receipt always agree.
 *
 * It is a visual clock, not a feed from the splitter contract.
 */
const UNSYNCED = -1;

let snapshot = UNSYNCED;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function tick() {
  const next = Math.floor(Date.now() / 1000);
  if (next !== snapshot) {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }
  timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 4);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) tick();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => UNSYNCED;

export function useCycle() {
  const seconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  if (seconds === UNSYNCED) return { left: CYCLE, cycle: 0 };
  return { left: CYCLE - (seconds % CYCLE), cycle: Math.floor(seconds / CYCLE) };
}

export const clock = (left: number) => `00:${String(left).padStart(2, "0")}`;

/** Deterministic pseudo-volume per cycle, so server and client agree. Illustrative only. */
export function sampleVolume(cycle: number) {
  const h = Math.imul(cycle ^ 0x9e3779b9, 2654435761) >>> 0;
  return 4 + (h % 2600) / 100;
}
