import { buyHref, site } from "@/lib/site";

const facts: [string, string][] = [
  ["Ticker", site.ticker],
  ["Chain", site.chain],
  ["Launch", site.launchpad],
  ["Creator tax", `${site.tax}% → holders`],
  ["Split", `Every ${site.cadence}s, pro rata`],
  ["Contract", site.contract ?? "Announced at launch"],
];

export function Cta() {
  return (
    <section id="launch" className="py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:gap-16">
        <h2 className="reveal display text-[clamp(2.6rem,5.2vw,4.6rem)]">
          Hold <span className="text-lime">{site.ticker}</span>.
          <br />
          Take the tax.
          <br />
          <span className="text-muted">Every {site.cadence} seconds.</span>
        </h2>

        <div className="reveal">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 py-3.5 text-sm"
              >
                <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  {k}
                </dt>
                <dd className="text-right font-medium break-all">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buyHref}
              className="rounded-md bg-lime px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-foreground"
            >
              Buy {site.ticker}
            </a>
            {site.links.x ? (
              <a
                href={site.links.x}
                rel="noreferrer"
                className="rounded-md border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:bg-white/[0.05]"
              >
                Follow on X
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
