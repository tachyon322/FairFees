import { SectionHead } from "./section-head";

const rows: [ordinary: string, fair: string][] = [
  ["3% creator tax hits a founder wallet", "3% creator tax hits a contract"],
  [
    "Founder has a claim button",
    "No claim button for a founder. Just a split.",
  ],
  ["Volume pays the creator", "If volume prints, holders get paid"],
  ["Tax is extraction", "Tax is the product"],
];

export function Versus() {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Versus"
          title={
            <>
              Most tokens bill you.
              <br />
              This one pays you.
            </>
          }
        />

        <div className="mt-16 border-t border-line-strong">
          <div
            aria-hidden
            className="hidden grid-cols-2 border-b border-line font-mono text-[11px] tracking-[0.18em] uppercase md:grid"
          >
            <p className="py-4 text-muted">Ordinary pons launch</p>
            <p className="flex items-center gap-2.5 border-l border-line py-4 pl-8">
              <span className="size-1.5 rounded-full bg-lime" />
              Fair Fees
            </p>
          </div>

          <ul>
            {rows.map(([ordinary, fair]) => (
              <li
                key={fair}
                className="reveal grid border-b border-line md:grid-cols-2"
              >
                <p className="pt-6 text-lg text-muted md:py-6">
                  <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] uppercase md:hidden">
                    Ordinary pons launch
                  </span>
                  {ordinary}
                </p>
                <p className="pt-4 pb-6 text-lg md:border-l md:border-line md:py-6 md:pl-8">
                  <span className="mb-1.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-lime uppercase md:hidden">
                    <span className="size-1.5 rounded-full bg-lime" />
                    Fair Fees
                  </span>
                  {fair}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 divide-y divide-line border-y border-line sm:mt-28">
          <p className="reveal display py-6 text-[clamp(1.6rem,3.6vw,3rem)] text-balance">
            Same 3% tax. Different pocket.
          </p>
          <p className="reveal display py-6 text-[clamp(1.6rem,3.6vw,3rem)] text-balance">
            Dev wallet has no pocket.
          </p>
          <p className="reveal display py-6 text-[clamp(1.6rem,3.6vw,3rem)] text-balance">
            We didn’t remove the tax.{" "}
            <span className="text-lime">We rerouted it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
