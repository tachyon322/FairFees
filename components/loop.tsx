import { Cascade, Orbit, Wave } from "loading-dev";
import type { ReactNode } from "react";
import { SectionHead } from "./section-head";

const steps: { n: string; node: ReactNode; title: string; body: string }[] = [
  {
    n: "01",
    node: <Wave size={30} />,
    title: "pons pays the creator.",
    body: "Every trade on pons v2 can carry a creator tax. Ours is 3%, set at launch, capped by the protocol, fixed forever.",
  },
  {
    n: "02",
    node: <Orbit size={34} />,
    title: "the creator is a contract.",
    body: "The creator fee recipient is a splitter contract from block 0. Not a person. Not a wallet you can be nice to.",
  },
  {
    n: "03",
    node: <Cascade size={34} />,
    title: "the contract pays holders. every 60 seconds.",
    body: "Pro rata, in ETH. Your share of supply is your share of the fees. Sixty seconds. Then it drops again.",
  },
];

export function Loop() {
  return (
    <section id="loop" className="relative py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          eyebrow="01 / The loop"
          title="Creator tax, minus the creator."
          lede="Most tokens use the creator tax as a founder salary. Fair Fees uses it as a holder split. Same charge. Different pocket."
        />

        <ol className="mt-16 grid gap-0 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {steps.map((s, i) => (
            <li key={s.n} className="contents">
              <div className="reveal relative flex flex-col rounded-[28px] border border-line bg-ink-2 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-16 place-items-center rounded-2xl border border-line bg-ink-3 text-lime">
                    {s.node}
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-muted">
                    {s.n}
                  </span>
                </div>
                <h3 className="display mt-10 text-[clamp(1.9rem,3.2vw,2.6rem)] [font-stretch:88%] [letter-spacing:-0.02em] [line-height:0.95]">
                  {s.title}
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>

              {i < steps.length - 1 ? (
                <div
                  aria-hidden
                  className="flex items-center justify-center py-1 md:px-1 md:py-0"
                >
                  <div className="stream-v h-10 md:hidden" />
                  <div className="stream-h hidden w-12 md:block" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="reveal mt-10 font-mono text-sm tracking-[0.14em] text-muted uppercase">
          Volume in. <span className="text-lime">Split out.</span> Every 60
          seconds.
        </p>
      </div>
    </section>
  );
}
