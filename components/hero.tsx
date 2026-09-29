import { buyHref, site } from "@/lib/site";
import { Machine } from "./machine";
import { RotatingLine } from "./rotating-line";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="wrap grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28">
        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            <span className="text-lime">{site.ticker}</span>
            <span aria-hidden className="text-line-strong">/</span>
            {site.launchpad}
            <span aria-hidden className="text-line-strong">/</span>
            {site.chain}
          </p>

          <h1 className="display mt-8 text-[clamp(3.4rem,8.8vw,7.6rem)]">
            The <span className="text-lime">{site.tax}%</span>
            <br />
            is yours.
          </h1>

          <div className="mt-8 h-14 max-w-[32rem] sm:h-8">
            <RotatingLine className="text-lg text-muted sm:text-xl" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={buyHref}
              className="rounded-md bg-lime px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-foreground"
            >
              Buy {site.ticker}
            </a>
            <a
              href="#loop"
              className="rounded-md border border-line-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.05]"
            >
              See the split
            </a>
          </div>

          <p className="mt-10 max-w-md border-t border-line pt-6 font-mono text-[12.5px] leading-relaxed text-muted">
            Hold 1% of supply, take 1% of the fees. Paid in ETH, from a
            contract, every {site.cadence} seconds.
          </p>
        </div>

        <Machine />
      </div>
    </section>
  );
}
