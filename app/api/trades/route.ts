import { CHAIN, TOKEN } from "@/lib/content";
import type { LiveTrade } from "@/lib/trades";

// Latest buys/sells of TOKEN.contractAddress, read straight from the chain:
// ERC-20 Transfer logs where one side is a pool in CHAIN.pools.
// Cached in memory for a few seconds so visitors don't each hit the RPC.

const RPC = process.env.RPC_URL || CHAIN.rpc;
const TRANSFER = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const WINDOW = 50_000; // blocks (~1.5h at ~10 blocks/s)
const LIMIT = 8;
const TTL_MS = 4000;

type Log = { transactionHash: string; logIndex: string; blockNumber: string; data: string; topics: string[] };

let cache: { at: number; trades: Promise<LiveTrade[]> } | null = null;
let decimals: Promise<number> | null = null;

async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.error) throw new Error(`${method}: ${json.error.message}`);
  return json.result as T;
}

const topic = (addr: string) => `0x${addr.toLowerCase().slice(2).padStart(64, "0")}`;

async function load(ca: string): Promise<LiveTrade[]> {
  decimals ??= rpc<string>("eth_call", [{ to: ca, data: "0x313ce567" }, "latest"]).then((h) => parseInt(h, 16));
  const pools = CHAIN.pools.map(topic);
  const latest = parseInt(await rpc<string>("eth_blockNumber", []), 16);
  const range = { address: ca, fromBlock: `0x${Math.max(0, latest - WINDOW).toString(16)}`, toBlock: "latest" };

  const [out, into, dec] = await Promise.all([
    rpc<Log[]>("eth_getLogs", [{ ...range, topics: [TRANSFER, pools] }]),
    rpc<Log[]>("eth_getLogs", [{ ...range, topics: [TRANSFER, null, pools] }]),
    decimals,
  ]);

  const pos = (l: Log) => parseInt(l.blockNumber, 16) * 1e5 + parseInt(l.logIndex, 16);
  return [...out.map((l) => ({ l, side: "buy" as const })), ...into.map((l) => ({ l, side: "sell" as const }))]
    .sort((a, b) => pos(b.l) - pos(a.l))
    .slice(0, LIMIT)
    .map(({ l, side }) => ({
      id: `${l.transactionHash}:${parseInt(l.logIndex, 16)}`,
      side,
      amount: Number(BigInt(l.data)) / 10 ** dec,
      hash: l.transactionHash,
    }));
}

export async function GET() {
  const ca = TOKEN.contractAddress;
  if (!ca) return Response.json({ trades: [] });

  if (!cache || Date.now() - cache.at > TTL_MS) {
    const entry = { at: Date.now(), trades: load(ca) };
    cache = entry;
    entry.trades.catch(() => {
      if (cache === entry) cache = null;
      decimals = null;
    });
  }
  const { trades } = cache;

  try {
    return Response.json({ trades: await trades });
  } catch (e) {
    return Response.json({ trades: [], error: String(e) }, { status: 502 });
  }
}
