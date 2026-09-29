export function FinePrint() {
  return (
    <section className="border-b border-line py-20 sm:py-24">
      <div className="wrap reveal grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Fine print
        </p>
        <div>
          <p className="display max-w-3xl text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.15] text-balance text-foreground/70">
            A contract that pays holders does not stop anyone from selling. It
            does not make the token safe. It only answers one question:{" "}
            <span className="text-foreground">where does the 3% go?</span>
          </p>
          <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-muted">
            Not financial advice. Tokens are volatile and you can lose
            everything you put in. Payouts depend entirely on trading volume:
            some minutes will be small, and some will be zero.
          </p>
        </div>
      </div>
    </section>
  );
}
