import { bio, pinned, site } from "@/lib/site";
import { Logo } from "./nav";

export function Footer() {
  const links = [
    { href: "#loop", label: "The loop" },
    { href: "#calculator", label: "Your cut" },
    { href: "#rules", label: "Rules" },
    ...(site.links.chart ? [{ href: site.links.chart, label: "Chart" }] : []),
    ...(site.links.x ? [{ href: site.links.x, label: "X" }] : []),
  ];

  return (
    <footer className="border-t border-line py-14">
      <div className="wrap grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-md text-base text-foreground/90">{pinned}</p>
          <p className="mt-4 font-mono text-[12px] text-muted">{bio}</p>
        </div>

        <div className="md:justify-self-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="mt-8 max-w-sm text-xs leading-relaxed text-muted">
            {site.ticker} is a token on {site.chain}, launched on{" "}
            {site.launchpad}. Not financial advice. Not affiliated with
            Robinhood or pons. Trade at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
