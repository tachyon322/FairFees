// All site copy and links live here. Voice rules: see POSITIONING.md.
// Never add: passive income, guaranteed yield, can't rug, team-as-hero.

export const TOKEN = {
  name: "Fair Fees",
  ticker: "$FEES",
  chain: "Robinhood Chain",
  launchpad: "pons v2",
  tax: 3,
  cadence: 60,
  quote: "ETH",
  // Set once deployed. While null the site shows "pending" states and a simulation badge.
  // TODO: placeholder CA = PONS (a live token, so the trade feed has data). Replace with $FEES at launch.
  contractAddress: "0x39dBED3a2bd333467115dE45665cC57F813C4571" as string | null,
  splitterAddress: null as string | null,
};

// Robinhood Chain (Arbitrum Orbit L2, ETH gas). Explorer is Blockscout.
export const CHAIN = {
  name: "Robinhood Chain",
  id: 4663,
  explorer: "https://robinhoodchain.blockscout.com",
  rpc: "https://rpc.mainnet.chain.robinhood.com", // public, rate limited; override with RPC_URL
  // Where swaps settle. Token out of a pool = buy, token into a pool = sell.
  // Uniswap V4 PoolManager (singleton). Add the pons bonding curve here if it holds tokens itself.
  pools: ["0x8366a39cc670b4001a1121b8f6a443a643e40951"],
};

export const explorerTx = (hash: string) => `${CHAIN.explorer}/tx/${hash}`;
export const explorerAddress = (addr: string) => `${CHAIN.explorer}/address/${addr}`;

// 0x9f3a…c21e
export const shortHash = (hash: string) => (hash.length > 14 ? `${hash.slice(0, 6)}…${hash.slice(-4)}` : hash);

export const LINKS = {
  buy: "/#buy", // → pons token page at launch
  whitepaper: "/whitepaper",
  x: "#", // → https://x.com/…
  telegram: "#", // → https://t.me/…
  docs: "#", // → docs / GitHub of splitter contract
  explorer: TOKEN.splitterAddress ? explorerAddress(TOKEN.splitterAddress) : CHAIN.explorer,
};

// Top-level tabs. "sections" are anchors on that same page, shown in the tab's dropdown.
export type NavSection = { n: string; label: string; hint: string; href: string };
export type NavItem = { label: string; href: string; sections?: NavSection[] };

export const NAV: NavItem[] = [
  {
    label: "Home",
    href: "/",
    sections: [
      { n: "01", label: "Payday", hint: "Receipts, every 60 seconds", href: "/#payday" },
      { n: "02", label: "Your cut", hint: "Share × volume calculator", href: "/#cut" },
      { n: "03", label: "Versus", hint: "Same 3%. Different pocket.", href: "/#versus" },
      { n: "04", label: "How to buy", hint: "Three steps and the CA", href: "/#buy" },
    ],
  },
  { label: "Rules", href: "/rules" },
  { label: "FAQ", href: "/faq" },
  { label: "Whitepaper", href: "/whitepaper" },
];

export const HERO_LINES = [
  "Creator tax, minus the creator.",
  "Hold the bag. Take the tax.",
  "1% of supply. 1% of the fees. Every minute.",
  "The fee doesn't sit. It pays.",
  "Sixty seconds. Then it drops again.",
];

export const VERSUS = [
  { k: "Where the 3% goes", them: "a founder wallet", us: "a contract" },
  { k: "Claim button", them: "the founder has one", us: "no one has one. just a split." },
  { k: "Volume pays", them: "the creator", us: "holders" },
  { k: "Payout", them: "whenever the team claims", us: "every 60 seconds" },
  { k: "The tax is", them: "extraction", us: "the product" },
];

export const RULES = [
  {
    id: "rate",
    title: "3% creator tax.",
    body: "Fixed at creation. Cannot be raised later.",
  },
  {
    id: "recipient",
    title: "Recipient is the splitter. From block 0.",
    body: "No founder pocket. No later redirect to an EOA.",
  },
  {
    id: "buyback",
    title: "Buyback off.",
    body: "A pons buyback cuts the creator share and vests tokens for five years. That breaks “fees hit holders every minute.”",
  },
  {
    id: "eth",
    title: "Pair is ETH.",
    body: "Holders receive ETH. Not a paper drip of the token itself.",
  },
  {
    id: "prorata",
    title: "Split is pro rata.",
    body: "Share of supply = share of the tax. No tiers, no boosts, no loyalty multipliers.",
  },
  {
    id: "cadence",
    title: "Cadence is 60 seconds.",
    body: "The minute is the ritual. Not “when the team claims.”",
  },
];

export const BUY_STEPS = [
  {
    n: "01",
    title: "Get on Robinhood Chain.",
    body: "Any EVM wallet. Add the network, bridge some ETH.",
  },
  {
    n: "02",
    title: "Open $FEES on pons.",
    body: "Launched on pons v2. Use the official link only. We'll pin it everywhere.",
  },
  {
    n: "03",
    title: "Swap ETH → $FEES. Hold.",
    body: "That's it. Your share of supply is your share of the tax. Next split in under a minute.",
  },
];

export const FAQ = [
  {
    q: "Where does the 3% go?",
    a: "To a splitter contract set as the creatorFeeRecipient from block 0. It claims the accrued fees and distributes them to holders every 60 seconds, pro rata to each wallet's share of supply.",
  },
  {
    q: "What do I get paid in?",
    a: "ETH, the quote asset of the pair. Not the token itself.",
  },
  {
    q: "How much do I get?",
    a: "Your share of supply is your share of the tax. Hold 1% of supply, receive 1% of the fees. The total depends entirely on volume. If volume prints, holders get paid. If it doesn't, there's nothing to split.",
  },
  {
    q: "Is this a custom transfer tax?",
    a: "No. It's the native pons v2 creator tax — capped by the protocol, fixed at launch — rerouted to holders instead of a founder.",
  },
  {
    q: "Why is buyback off?",
    a: "A pons buyback cuts into the creator share and vests tokens for five years. That breaks the one promise of the mechanism: fees hit holders every minute.",
  },
  {
    q: "Does this make the token safe?",
    a: "No. A contract that pays holders doesn't stop anyone from selling and doesn't make the price go anywhere. It only answers one question: where does the 3% go?",
  },
  {
    q: "Can the team change the rate or the recipient?",
    a: "The creator tax is fixed at creation and cannot be raised. The recipient is the splitter contract from block 0. Contract source and addresses will be published here at launch — verify, don't trust.",
  },
];
