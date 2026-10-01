import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "@/components/Logo";
import { PrintButton, Toc, type TocItem } from "@/components/whitepaper/Toc";
import { LINKS, TOKEN } from "@/lib/content";

export const metadata: Metadata = {
  title: "Whitepaper · Fair Fees",
  description: "Fair Fees ($FEES): a pons v2 creator tax, rerouted to holders every 60 seconds.",
};

const VERSION = "v0.1 · Draft · Pre-launch";
const DATE = "September 2026";

const TOC: TocItem[] = [
  { id: "abstract", n: "00", label: "Abstract" },
  { id: "motivation", n: "01", label: "Where does the 3% go?" },
  { id: "background", n: "02", label: "Fees on pons v2" },
  { id: "design", n: "03", label: "Design" },
  { id: "math", n: "04", label: "Distribution math" },
  { id: "cadence", n: "05", label: "The minute" },
  { id: "invariants", n: "06", label: "Invariants" },
  { id: "choices", n: "07", label: "Design choices" },
  { id: "limits", n: "08", label: "What it is not" },
  { id: "verify", n: "09", label: "Verification" },
  { id: "glossary", n: "10", label: "Glossary" },
];

// ---------- primitives ----------

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="wp-section scroll-mt-32 border-t border-line pt-14 pb-4 first:border-t-0 first:pt-0">
      <div className="mb-3 font-mono text-xs text-acc">{n}</div>
      <h2 className="mb-7 text-[clamp(28px,4vw,42px)] leading-[1.05] font-semibold tracking-[-0.04em]">{title}</h2>
      <div className="wp-prose space-y-5">{children}</div>
    </section>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="!mt-10 text-xl font-medium tracking-tight text-fg">{children}</h3>;
}

function Callout({ children, tone = "acc" }: { children: ReactNode; tone?: "acc" | "muted" }) {
  return (
    <div
      className={`rounded-2xl border px-6 py-5 text-[17px] leading-relaxed ${
        tone === "acc" ? "border-acc/30 bg-acc/[0.06] text-fg" : "border-line-2 bg-white/[0.02] text-muted"
      }`}
    >
      {children}
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded-md border border-line-2 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.85em] text-fg">{children}</code>;
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line-2">
      <table className="w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-line-2 bg-white/[0.02]">
            {head.map((h) => (
              <th key={h} className="px-5 py-3 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-dim">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-b-0">
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-3.5 align-top ${j === 0 ? "text-muted" : "text-fg"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Flow() {
  const node = "rounded-xl border border-line-2 bg-panel px-4 py-3 text-center";
  const label = "font-mono text-[10px] uppercase tracking-[0.16em] text-dim";
  return (
    <figure className="!my-9">
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className={node}>
          <div className={label}>trade on pons</div>
          <div className="mt-1 font-medium">3% creator tax</div>
        </div>
        <div className="text-center font-mono text-acc">→</div>
        <div className={`${node} border-acc/40 bg-acc/[0.06]`}>
          <div className={label}>creatorFeeRecipient</div>
          <div className="mt-1 font-medium">Splitter contract</div>
        </div>
        <div className="text-center font-mono text-acc">→</div>
        <div className={node}>
          <div className={label}>every 60s · pro rata</div>
          <div className="mt-1 font-medium">Holders, in ETH</div>
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-dim">
        Fig. 1 — The loop. There is no branch to a founder wallet.
      </figcaption>
    </figure>
  );
}

function Formula() {
  return (
    <figure className="!my-9 rounded-2xl border border-line-2 bg-panel px-6 py-8 text-center">
      <div className="font-serif text-[clamp(28px,4.5vw,44px)] italic">
        payout<sub className="text-[0.5em]">i</sub> = F × b<sub className="text-[0.5em]">i</sub> / S
      </div>
      <figcaption className="mx-auto mt-6 grid max-w-md gap-1.5 text-left font-mono text-xs text-muted">
        <div><span className="text-acc">F</span> — ETH claimed by the splitter for this window</div>
        <div><span className="text-acc">b<sub>i</sub></span> — $FEES balance of wallet i at the split</div>
        <div><span className="text-acc">S</span> — $FEES supply counted for the split</div>
      </figcaption>
    </figure>
  );
}

function ExampleReceipt() {
  const rows: [string, string][] = [
    ["24h volume", "400 ETH"],
    ["× creator tax", "3%"],
    ["= fees / day", "12 ETH"],
    ["÷ 1,440 minutes", "≈ 0.00833 ETH / split"],
    ["wallet share", "1% of supply"],
    ["to founder", "0 ETH"],
  ];
  return (
    <figure className="!my-9 flex justify-center">
      <div className="w-full max-w-[380px]">
        <div className="receipt px-6 pt-6 pb-9 text-[12.5px]">
          <div className="text-center font-bold tracking-[0.2em]">WORKED EXAMPLE</div>
          <div className="mt-1 text-center text-[10px] text-ink-muted">illustrative · not a forecast</div>
          <div className="dotted my-4" />
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-0.5">
              <span className="text-ink-muted">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="dotted my-4" />
          <div className="flex justify-between font-semibold">
            <span>per split</span>
            <span>≈ 0.0000833 ETH</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>per day</span>
            <span>0.12 ETH</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

// ---------- page ----------

export default function Whitepaper() {
  return (
    <>
      <main className="relative">
        {/* header */}
        <header className="relative overflow-hidden border-b border-line pt-36 pb-16 sm:pt-44">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-80" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <Mark size={20} />
              <span>Whitepaper</span>
              <span className="text-dim">·</span>
              <span className="text-dim">{VERSION}</span>
            </div>
            <h1 className="mt-8 max-w-4xl text-[clamp(52px,9vw,120px)] leading-[0.88] font-semibold tracking-[-0.055em]">
              Creator tax,
              <br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-acc">minus the creator.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Fair Fees ({TOKEN.ticker}) is a {TOKEN.launchpad} token on {TOKEN.chain} whose 3% creator tax is paid to a
              splitter contract that distributes it to holders, in ETH, every 60 seconds.
            </p>

            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-6 font-mono sm:grid-cols-4">
              {[
                ["Ticker", TOKEN.ticker],
                ["Chain", TOKEN.chain],
                ["Launch", TOKEN.launchpad],
                ["Published", DATE],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-dim">{k}</dt>
                  <dd className="mt-1.5 text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <PrintButton />
              <Link
                href="/"
                className="no-print inline-flex items-center gap-2 rounded-xl border border-line-2 px-5 py-3 text-sm transition-colors hover:bg-white/5"
              >
                ← Back to site
              </Link>
            </div>
          </div>
        </header>

        {/* body */}
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[220px_1fr] lg:gap-20">
          <Toc items={TOC} />

          <article className="min-w-0 max-w-[720px] text-[17px] leading-[1.75] text-muted">
            <Section id="abstract" n="00" title="Abstract">
              <p>
                On pons v2, a token can carry an optional creator tax: a fixed percentage of every trade, paid to a
                single address called the creator fee recipient. In most launches that address belongs to a founder,
                and the tax is a salary.
              </p>
              <p>
                Fair Fees launches with a <strong className="text-fg">3% creator tax</strong> and sets the creator fee
                recipient to a <strong className="text-fg">splitter contract</strong> from block 0. The splitter claims
                the accrued fees and distributes them to {TOKEN.ticker} holders{" "}
                <strong className="text-fg">every 60 seconds</strong>, pro rata to each wallet&apos;s share of supply,
                paid in <strong className="text-fg">ETH</strong>.
              </p>
              <Callout>Hold 1% of supply, take 1% of the fees. That&apos;s the whole project.</Callout>
            </Section>

            <Section id="motivation" n="01" title="Where does the 3% go?">
              <p>
                Every token with a tax answers this question, usually quietly. The rate is public — anyone on pons can
                see it. The destination is the part that matters, and it is almost always a wallet with a claim
                button.
              </p>
              <p>
                Fair Fees doesn&apos;t remove the tax. It reroutes it. Same 3%, different pocket. The rate stays
                visible; the only thing this project adds is a public, verifiable answer to where it goes.
              </p>
              <Table
                head={["", "Ordinary pons launch", "Fair Fees"]}
                rows={[
                  ["3% creator tax hits", "a founder wallet", "a contract"],
                  ["Claim button", "the founder has one", "no one has one — just a split"],
                  ["Volume pays", "the creator", "holders"],
                  ["The tax is", "extraction", "the product"],
                ]}
              />
            </Section>

            <Section id="background" n="02" title="Fees on pons v2">
              <p>On pons v2, every trade can carry two charges:</p>
              <ol className="list-none space-y-4 pl-0">
                <li className="flex gap-4">
                  <span className="font-mono text-sm text-acc">1.</span>
                  <span>
                    <strong className="text-fg">The standard trading fee</strong> — split between pons, the creator,
                    and an optional buyback.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-sm text-acc">2.</span>
                  <span>
                    <strong className="text-fg">An optional creator tax</strong> — set at launch, capped by the
                    protocol, fixed forever, and paid entirely to the creator fee recipient.
                  </span>
                </li>
              </ol>
              <p>
                The creator tax is a native protocol feature, not a custom transfer tax bolted onto the token
                contract. Fair Fees uses it exactly as pons designed it. The only unusual decision is who the
                recipient is.
              </p>
            </Section>

            <Section id="design" n="03" title="Design">
              <p>Fair Fees is defined by six parameters. They are product constraints, not optional flavor.</p>
              <Table
                head={["Parameter", "Value", "Why"]}
                rows={[
                  ["Creator tax", <Code key="t">3%</Code>, "Fixed at creation. Cannot be raised later."],
                  ["creatorFeeRecipient", <Code key="r">Splitter</Code>, "Set from block 0. No founder pocket, no later redirect to an EOA."],
                  ["Buyback", <Code key="b">off</Code>, "A buyback would cut the creator share. See §07."],
                  ["Quote asset", <Code key="q">ETH</Code>, "Holders are paid in ETH, not in the token itself."],
                  ["Split", <Code key="s">pro rata</Code>, "Share of supply = share of the tax. No tiers or multipliers."],
                  ["Cadence", <Code key="c">60 s</Code>, "The minute is the ritual. See §05."],
                ]}
              />
              <H3>The splitter</H3>
              <p>
                The splitter is the creator fee recipient. Everything pons pays to that address lands in the
                splitter. The splitter does one job on a loop: claim what has accrued, split it across holders, wait
                for the next minute.
              </p>
              <Flow />
              <p>
                There is no function that sends the balance to a team address, and no admin path that changes where
                the fees go. The founder doesn&apos;t have a claim button. There is just a split.
              </p>
            </Section>

            <Section id="math" n="04" title="Distribution math">
              <p>
                For each window, the splitter claims the fees <Code>F</Code> that accrued since the previous split.
                Wallet <Code>i</Code> receives a share of <Code>F</Code> equal to its share of supply:
              </p>
              <Formula />
              <p>
                There are no tiers, boosts, lockups or loyalty multipliers. A wallet that holds twice as much gets
                twice as much. A wallet that sells stops receiving from the next split.
              </p>
              <p>
                Which balances count toward <Code>S</Code> — for example, tokens held by the pons pool or by the
                splitter itself — is defined in the contract and will be documented in §09 alongside the verified
                source at launch.
              </p>
              <H3>Worked example</H3>
              <p>
                Fees are a direct function of volume. At 400 ETH of daily volume, 3% is 12 ETH per day, or roughly
                0.00833 ETH per minute. A wallet holding 1% of supply receives 1% of that.
              </p>
              <ExampleReceipt />
              <Callout tone="muted">
                These numbers illustrate the formula, not an expectation. If volume prints, holders get paid. If it
                doesn&apos;t, there is nothing to split.
              </Callout>
            </Section>

            <Section id="cadence" n="05" title="The minute">
              <p>
                The splitter runs every 60 seconds. Not &ldquo;weekly&rdquo;, not &ldquo;when the team claims&rdquo;.
                The fee doesn&apos;t sit — it pays.
              </p>
              <p>
                A fixed, short cadence does two things. It keeps the pot small, so there is never a large balance
                waiting on someone&apos;s decision. And it makes the mechanism observable: anyone can watch a timer
                count down and see ETH leave the contract when it hits zero.
              </p>
              <Callout>Sixty seconds. Then it drops again.</Callout>
            </Section>

            <Section id="invariants" n="06" title="Invariants">
              <p>The following hold from the first block and are meant to be checkable on-chain:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  "The creator tax is 3% and cannot be raised.",
                  "The creator fee recipient is the splitter contract from block 0.",
                  "The splitter has no path to send fees to a team or founder address.",
                  "Fees are distributed pro rata to supply, with no discretionary allocation.",
                  "Payouts are in ETH, the quote asset of the pair.",
                  "Buyback is disabled.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-acc" />
                    <span className="text-fg">{t}</span>
                  </li>
                ))}
              </ul>
              <p>If any of these is not true on-chain, Fair Fees is not what it says it is. Verify, don&apos;t trust.</p>
            </Section>

            <Section id="choices" n="07" title="Design choices">
              <H3>Why buyback is off</H3>
              <p>
                A pons buyback cuts into the creator share and vests the bought tokens for five years. That would
                divert part of every fee away from holders and into a multi-year vesting schedule. It breaks the one
                promise of the mechanism: fees hit holders every minute.
              </p>
              <H3>Why ETH</H3>
              <p>
                Holders receive the quote asset of the pair — ETH — not a drip of {TOKEN.ticker}. A payout in ETH is
                something people can feel. Not a paper drip of the token itself. Volume prints, holders get paid.
              </p>
              <H3>Why pro rata</H3>
              <p>
                Any rule other than share-of-supply requires someone to decide who deserves more. Pro rata needs no
                decisions, no snapshots of loyalty, and no one to trust. It is the only split that doesn&apos;t make
                the team the arbiter.
              </p>
              <H3>Why no mascot</H3>
              <p>
                The brand is a fee machine with a clock. The hero is the mechanism: volume in, split out, every 60
                seconds. Nobody on the team is the story.
              </p>
            </Section>

            <Section id="limits" n="08" title="What Fair Fees is not">
              <p>
                A contract that pays holders answers one question — where does the 3% go. It doesn&apos;t answer any
                other question, and it would be dishonest to imply it does.
              </p>
              <ul className="list-none space-y-4 pl-0">
                {[
                  ["Not income.", "Payouts depend entirely on trading volume. No volume, nothing to split. There is no fixed or expected amount."],
                  ["Not price support.", "The mechanism doesn't stop anyone from selling and doesn't make the price go anywhere."],
                  ["Not a safety guarantee.", "Paying holders doesn't make a token safe. Smart contracts can contain bugs; markets can go to zero."],
                  ["Not free.", "Buyers and sellers pay the 3% tax on every trade. That is where the payouts come from."],
                ].map(([k, v]) => (
                  <li key={k} className="rounded-xl border border-line-2 px-5 py-4">
                    <div className="font-medium text-fg">{k}</div>
                    <div className="mt-1 text-[15px]">{v}</div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="verify" n="09" title="Verification">
              <p>
                Everything above should be checkable without trusting this document. At launch, this section will list
                the addresses and verified source code.
              </p>
              <Table
                head={["Item", "Status"]}
                rows={[
                  [`${TOKEN.ticker} token`, TOKEN.contractAddress ? <Code key="ca">{TOKEN.contractAddress}</Code> : "Published at launch"],
                  ["Splitter contract", TOKEN.splitterAddress ? <Code key="sp">{TOKEN.splitterAddress}</Code> : "Published at launch"],
                  ["Splitter source", <a key="src" href={LINKS.docs} className="text-acc underline-offset-4 hover:underline">Published at launch</a>],
                ]}
              />
              <H3>How to check it yourself</H3>
              <ol className="list-none space-y-3 pl-0">
                {[
                  "Open the token on pons and confirm the creator tax reads 3% and buyback is off.",
                  "Confirm the creator fee recipient equals the splitter address above.",
                  "Open the splitter on the Robinhood Chain explorer and read the verified source.",
                  "Watch a minute go by. ETH should leave the splitter to holders when the timer hits zero.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-mono text-sm text-acc">{i + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <Callout tone="muted">
                Only trust addresses published here and in our pinned posts. Anyone can deploy a token called
                &ldquo;Fair Fees&rdquo;.
              </Callout>
            </Section>

            <Section id="glossary" n="10" title="Glossary">
              <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[180px_1fr]">
                {[
                  ["pons v2", "The launchpad on Robinhood Chain that $FEES launches on. Provides the standard trading fee and the optional creator tax."],
                  ["Creator tax", "An optional per-trade charge set at launch, capped by the protocol, fixed forever, paid entirely to the creator fee recipient."],
                  ["creatorFeeRecipient", "The address pons pays creator fees to. For Fair Fees: the splitter contract."],
                  ["Splitter", "The contract that claims accrued fees and distributes them to holders pro rata every 60 seconds."],
                  ["Split", "One distribution round. One per minute."],
                  ["Quote asset", "The asset the token is paired against. For $FEES: ETH."],
                  ["EOA", "Externally owned account — a regular wallet controlled by a private key."],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-mono text-sm text-fg">{k}</dt>
                    <dd className="text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <footer className="mt-16 border-t border-line pt-8 font-mono text-[11px] leading-relaxed text-dim">
              <p>
                This document describes the intended design of Fair Fees ({VERSION}). It is not an offer, a
                solicitation, or financial advice. Nothing here is a promise of value, return or yield. Figures are
                illustrative. The on-chain contracts, once published, are the source of truth.
              </p>
              <p className="mt-4 text-muted">Hold {TOKEN.ticker}. Take the tax. Every 60 seconds.</p>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
