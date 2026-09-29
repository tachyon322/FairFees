type SiteConfig = {
  name: string;
  ticker: string;
  chain: string;
  launchpad: string;
  /** Creator tax, in percent. Fixed at creation. */
  tax: number;
  /** Seconds between splits. */
  cadence: number;
  /** Splitter contract address. Fill in at launch. */
  contract: string | null;
  /** Fill these in at launch. Buttons fall back to #launch while a link is null. */
  links: {
    buy: string | null;
    x: string | null;
    chart: string | null;
  };
};

export const site: SiteConfig = {
  name: "Fair Fees",
  ticker: "$FEES",
  chain: "Robinhood Chain",
  launchpad: "pons v2",
  tax: 3,
  cadence: 60,
  contract: null,
  links: {
    buy: null,
    x: null,
    chart: null,
  },
};

export const buyHref = site.links.buy ?? "#launch";
export const bio = "3% creator tax → holders. every 60s. $FEES";
export const pinned =
  "The tax is the product. Hold $FEES, take your cut of every trade.";
