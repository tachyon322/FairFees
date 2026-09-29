# Fair Fees — `$FEES`

Landing page for Fair Fees: a pons v2 token on Robinhood Chain whose 3% creator tax hits a splitter contract, not a founder. The contract pays holders every 60 seconds, pro rata.

Positioning, voice and the copy bank live in `POSITIONING.md` (source of truth for every line on the site).

## Stack

- Next.js 16 (App Router) · React 19 · Tailwind CSS 4
- [`torph`](https://torph.lochie.me) — text morphing (timer digits, receipt values, the rotating headline line)
- [`loading-dev`](https://loading.dev) — indicators (`Clock`, `Ripple`, `Wave`, `Orbit`, `Cascade`)

## Develop

```bash
bun install
bun dev
bun run build
```

## Before launch

Everything launch-specific is in `lib/site.ts`. While a value is `null` the site says "Announced at launch" and the Buy buttons scroll to the launch block.

- `contract` — splitter contract address
- `links.buy` — pons v2 trade link
- `links.x`, `links.chart` — shown in the CTA block and footer once set

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.xyz`) so Open Graph / Twitter images resolve to the real domain.

## Notes

- The 60-second timer and the receipts in the hero are a **visual clock and sample numbers**, labelled as such on the page. They are not read from the contract. Wire them to on-chain data before presenting them as live.
- The calculator is illustrative math (`share × 3% × volume`), with a disclaimer on the page.
- `components/rotating-line.tsx` only uses lines from the copy bank.
