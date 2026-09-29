import { buyHref, site } from "@/lib/site";
import { Machine } from "./machine";
import { RotatingLine } from "./rotating-line";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 -z-10 size-[560px] rounded-full bg-lime/10 blur-[120px]"
      />

      <div className="wrap grid items-center gap-14 pt-14 pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-24 lg:pb-32">
        <div>
          <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <span className="text-lime">{site.ticker}</span>
            <span aria-hidden className="text-white/20">/</span>
            {site.launchpad}
            <span aria-hidden className="text-white/20">/</span>
            {site.chain}
          </p>

          <h1 className="display mt-7 text-[clamp(4.25rem,12.5vw,10.5rem)]">
            The <span className="text-lime">{site.tax}%</span>
            <br />
            is yours.
          </h1>

          <div className="mt-8 h-16 max-w-[34rem] sm:h-9">
            <RotatingLine className="text-xl text-foreground/90 sm:text-2xl" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={buyHref}
              className="rounded-full bg-lime px-7 py-3.5 text-base font-semibold text-ink shadow-[0_0_0_0_rgb(200_255_46/0.5)] transition-[transform,box-shadow] hover:scale-[1.03] hover:shadow-[0_0_0_8px_rgb(200_255_46/0.18)] active:scale-95"
            >
              Buy {site.ticker}
            </a>
            <a
              href="#loop"
              className="rounded-full border border-line px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-white/[0.06]"
            >
              See the split
            </a>
          </div>

          <p className="mt-8 max-w-md font-mono text-[13px] leading-relaxed text-muted">
            Hold 1% of supply, take 1% of the fees. Paid in ETH, from a contract,
            every {site.cadence} seconds.
          </p>
        </div>

        <Machine />
      </div>
    </section>
  );
}
