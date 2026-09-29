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
    <section id="rules" className="relative py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          eyebrow="04 / The rules"
          title="Six rules. They are the product."
          lede="These aren’t flavor. Every one of them exists so the answer to “where does the 3% go?” stays the same."
        />

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <div
              key={r.label}
              className="reveal group flex flex-col bg-ink p-7 transition-colors hover:bg-ink-2 sm:p-9"
            >
              <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                {r.label}
              </dt>
              <dd className="pt-12">
                <p className="display text-[clamp(3rem,5.4vw,4.5rem)] text-lime">
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
