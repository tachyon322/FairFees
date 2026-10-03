"use client";

// Client-side simulation of the fee machine. Used while the token isn't deployed;
// swap for on-chain reads (splitter events) once TOKEN.splitterAddress is set.

import { useSyncExternalStore } from "react";

export type Trade = { id: number; side: "buy" | "sell"; eth: number; tax: number };
// hash: full 0x-prefixed tx hash (66 chars). simulated: fake receipt (hash won't resolve on the explorer).
export type Split = { id: number; time: string; pot: number; holders: number; hash: string; simulated: boolean };
export type Phase = "accruing" | "claiming";

export type SimState = {
  secondsLeft: number;
  phase: Phase;
  pot: number;
  trades: Trade[];
  splits: Split[];
  holders: number;
  totalPaid: number;
};

const TAX = 0.03;

function hex(n: number) {
  let s = "";
  for (let i = 0; i < n; i++) s += "0123456789abcdef"[Math.floor(Math.random() * 16)];
  return s;
}

function fakeHash() {
  return `0x${hex(64)}`;
}

const SEED_SPLITS: Split[] = [
  { id: 4817, time: "—", pot: 0.1842, holders: 1284, hash: "0x9f3a1112c695b7e5eab323c59750744ad57ac78c2d64718251f710e5a3a8c21e", simulated: true },
  { id: 4816, time: "—", pot: 0.2217, holders: 1281, hash: "0x41be21445af8f7acc5de30b16b435e488cca8c824c41c178fa56d4bc6fec07d9", simulated: true },
  { id: 4815, time: "—", pot: 0.1379, holders: 1281, hash: "0xd0c479c794728c6beb64c19efcc1f58332810a90370b0e7fde23a922d7539a6f", simulated: true },
  { id: 4814, time: "—", pot: 0.2951, holders: 1277, hash: "0x6a1251d4f462cbd884ce286a643d345126db1c24ffe88a50b71ab93c1f29e38b", simulated: true },
];

const initial: SimState = {
  secondsLeft: 60,
  phase: "accruing",
  pot: 0,
  trades: [],
  splits: SEED_SPLITS,
  holders: 1284,
  totalPaid: 812.4417,
};

let state = initial;
const listeners = new Set<() => void>();
let running = false;
let tradeId = 0;

function emit(next: Partial<SimState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}


function clockSecondsLeft() {
  const s = new Date().getSeconds();
  return s === 0 ? 60 : 60 - s;
}

function scheduleTrade() {
  const delay = 700 + Math.random() * 1900;
  setTimeout(() => {
    if (state.phase === "accruing") {
      // log-normal-ish trade sizes, mostly small with the occasional whale
      const eth = Math.min(4, Math.exp(Math.random() * 3.2 - 3.2) * (Math.random() < 0.08 ? 6 : 1));
      const trade: Trade = {
        id: ++tradeId,
        side: Math.random() < 0.58 ? "buy" : "sell",
        eth,
        tax: eth * TAX,
      };
      emit({
        pot: state.pot + trade.tax,
        trades: [trade, ...state.trades].slice(0, 6),
        holders: state.holders + (trade.side === "buy" && Math.random() < 0.25 ? 1 : 0),
      });
    }
    scheduleTrade();
  }, delay);
}

function split() {
  const now = new Date();
  const time = now.toTimeString().slice(0, 8);
  const s: Split = {
    id: state.splits[0].id + 1,
    time,
    pot: state.pot,
    holders: state.holders,
    hash: fakeHash(),
    simulated: true,
  };
  emit({
    phase: "accruing",
    secondsLeft: clockSecondsLeft(),
    pot: 0,
    trades: [],
    splits: [s, ...state.splits].slice(0, 12),
    totalPaid: state.totalPaid + s.pot,
  });
}

function start() {
  if (running) return;
  running = true;
  emit({ secondsLeft: clockSecondsLeft(), pot: 0.012 + Math.random() * 0.03 });
  scheduleTrade();
  let last = clockSecondsLeft();
  setInterval(() => {
    const left = clockSecondsLeft();
    if (left === last) return;
    // wrapped past :00 → the minute ticked over, claim & split
    if (left > last && state.phase === "accruing") {
      emit({ phase: "claiming", secondsLeft: 0 });
      setTimeout(split, 1600);
    } else if (state.phase === "accruing") {
      emit({ secondsLeft: left });
    }
    last = left;
  }, 200);
}

// Entry point for real splitter receipts (e.g. from a Split event watcher / API poll).
// Pass simulated: false and the full tx hash; the receipt links to it on the explorer.
export function pushSplit(s: Split) {
  if (state.splits.some((x) => x.hash === s.hash)) return;
  emit({
    splits: [s, ...state.splits].slice(0, 12),
    totalPaid: state.totalPaid + s.pot,
    holders: s.holders,
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  start();
  return () => listeners.delete(cb);
}

export function useSim() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
}

export function fmtEth(n: number, d = 4) {
  return n.toFixed(d);
}
