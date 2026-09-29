export function FinePrint() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="wrap">
        <div className="reveal rounded-[28px] border border-dashed border-white/20 p-7 sm:p-12">
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            Fine print
          </p>
          <p className="display mt-6 max-w-4xl text-[clamp(1.9rem,4.4vw,3.6rem)] [font-stretch:90%] [letter-spacing:-0.018em] [line-height:1] text-balance">
            A contract that pays holders does not stop anyone from selling. It
            does not make the token safe. It only answers one question:{" "}
            <span className="text-lime">where does the 3% go?</span>
          </p>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            Not financial advice. Tokens are volatile and you can lose
            everything you put in. Payouts depend entirely on trading volume:
            some minutes will be small, and some will be zero.
          </p>
        </div>
      </div>
    </section>
  );
}
