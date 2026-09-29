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

const closers = [
  "Same 3% tax. Different pocket.",
  "Dev wallet has no pocket.",
  "We didn’t remove the tax. We rerouted it.",
];

export function Versus() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="wrap">
        <SectionHead
          eyebrow="03 / Versus everyone else"
          title={
            <>
              Most tokens bill you.
              <br />
              This one pays you.
            </>
          }
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="reveal rounded-[28px] border border-line bg-ink-2 p-7 sm:p-9">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              Ordinary pons launch
            </p>
            <ul className="mt-7 divide-y divide-line">
              {rows.map(([ordinary]) => (
                <li
                  key={ordinary}
                  className="flex items-start gap-4 py-5 text-lg text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-line text-[11px] leading-none"
                  >
                    ✕
                  </span>
                  {ordinary}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal relative rounded-[28px] border border-lime/40 bg-lime/[0.04] p-7 shadow-[0_0_80px_-30px_rgb(200_255_46/0.5)] sm:p-9">
            <p className="font-mono text-[11px] tracking-[0.2em] text-lime uppercase">
              Fair Fees
            </p>
            <ul className="mt-7 divide-y divide-lime/15">
              {rows.map(([, fair]) => (
                <li
                  key={fair}
                  className="flex items-start gap-4 py-5 text-lg font-medium"
                >
                  <span
                    aria-hidden
                    className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-[11px] leading-none font-bold text-ink"
                  >
                    ✓
                  </span>
                  {fair}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 space-y-2 sm:mt-28">
          {closers.map((line, i) => (
            <p
              key={line}
              className={`reveal display text-[clamp(2rem,6.4vw,5.25rem)] text-balance ${
                i === 0 ? "text-foreground" : i === 1 ? "text-foreground/55" : "text-lime"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
