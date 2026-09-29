import { buyHref, site } from "@/lib/site";

const facts: [string, string][] = [
  ["Ticker", site.ticker],
  ["Chain", site.chain],
  ["Launch", site.launchpad],
  ["Creator tax", `${site.tax}% → holders`],
  ["Split", `every ${site.cadence}s, pro rata`],
  ["Contract", site.contract ?? "Announced at launch"],
];

export function Cta() {
  return (
    <section id="launch" className="relative py-12 sm:py-20">
      <div className="wrap">
        <div className="reveal relative overflow-hidden rounded-[36px] bg-lime p-7 text-ink sm:rounded-[48px] sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/3 -right-1/4 size-[520px] rounded-full bg-white/30 blur-[90px]"
          />

          <h2 className="display relative text-[clamp(3.4rem,10.5vw,9rem)]">
            Hold {site.ticker}.
            <br />
            Take the tax.
            <br />
            Every {site.cadence} seconds.
          </h2>

          <div className="relative mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-ink/70 uppercase">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-lg font-semibold break-all">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              <a
                href={buyHref}
                className="rounded-full bg-ink px-8 py-4 text-base font-semibold text-lime transition-transform hover:scale-[1.04] active:scale-95"
              >
                Buy {site.ticker}
              </a>
              {site.links.x ? (
                <a
                  href={site.links.x}
                  rel="noreferrer"
                  className="rounded-full border-2 border-ink px-8 py-[14px] text-base font-semibold transition-colors hover:bg-ink hover:text-lime"
                >
                  Follow on X
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
