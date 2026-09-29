import { Cascade, Orbit, Wave } from "loading-dev";
import type { ReactNode } from "react";
import { SectionHead } from "./section-head";

const steps: { n: string; node: ReactNode; title: string; body: string }[] = [
  {
    n: "01",
    node: <Wave size={20} color="var(--lime)" />,
    title: "pons pays the creator.",
    body: "Every trade on pons v2 can carry a creator tax. Ours is 3%, set at launch, capped by the protocol, fixed forever.",
  },
  {
    n: "02",
    node: <Orbit size={20} color="var(--lime)" />,
    title: "the creator is a contract.",
    body: "The creator fee recipient is a splitter contract from block 0. Not a person. Not a wallet you can be nice to.",
  },
  {
    n: "03",
    node: <Cascade size={20} color="var(--lime)" />,
    title: "the contract pays holders. every 60 seconds.",
    body: "Pro rata, in ETH. Your share of supply is your share of the fees. Sixty seconds. Then it drops again.",
  },
];

export function Loop() {
  return (
    <section id="loop" className="border-b border-line py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          index="01"
          label="The loop"
          title="Creator tax, minus the creator."
          lede="Most tokens use the creator tax as a founder salary. Fair Fees uses it as a holder split. Same charge. Different pocket."
        />

        <div className="relative mt-16 overflow-hidden border-t border-line-strong">
          <div aria-hidden className="pulse-line" />
          <ol className="grid max-md:divide-y divide-line md:grid-cols-3 md:divide-x">
            {steps.map((s) => (
              <li
                key={s.n}
                className="reveal py-9 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.18em] text-muted">
                    {s.n}
                  </span>
                  {s.node}
                </div>
                <h3 className="display mt-14 text-[clamp(1.6rem,2.5vw,2.1rem)] text-balance">
                  {s.title}
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
          Volume in. <span className="text-foreground">Split out.</span> Every 60
          seconds.
        </p>
      </div>
    </section>
  );
}
