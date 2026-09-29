import { SectionHead } from "./section-head";

const rules = [
  {
    value: "3%",
    label: "Creator tax",
    body: "Fixed at creation. Cannot be raised later.",
  },
  {
    value: "Block 0",
    label: "The recipient",
    body: "The splitter contract is the creator recipient from block 0. No founder pocket. No later redirect to a wallet.",
  },
  {
    value: "Off",
    label: "Buyback",
    body: "A pons buyback cuts the creator share and vests tokens for five years. That breaks “fees hit holders every minute.”",
  },
  {
    value: "ETH",
    label: "The pair",
    body: "Holders are paid in the quote asset. ETH, not a paper drip of the token itself.",
  },
  {
    value: "Pro rata",
    label: "The split",
    body: "Your share of supply is your share of the tax. No tiers, no boosts, no loyal-holder multipliers.",
  },
  {
    value: "60s",
    label: "The cadence",
    body: "The minute is the ritual. Not “when the team claims.”",
  },
];

export function Rules() {
  return (
    <section id="rules" className="border-b border-line py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          index="04"
          label="The rules"
          title="Six rules. They are the product."
          lede="These aren’t flavor. Every one of them exists so the answer to “where does the 3% go?” stays the same."
        />

        <dl className="mt-16 grid border-t border-l border-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((r, i) => (
            <div
              key={r.label}
              className="reveal border-r border-b border-line p-7 sm:p-8"
            >
              <dt className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                {r.label}
                <span className="text-line-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </dt>
              <dd className="pt-10">
                <p className="display text-[clamp(2rem,3.2vw,2.75rem)]">
                  {r.value}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {r.body}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
