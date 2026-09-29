import { buyHref, site } from "@/lib/site";
import { NavClock } from "./nav-clock";

const links = [
  { href: "#loop", label: "The loop" },
  { href: "#calculator", label: "Your cut" },
  { href: "#rules", label: "Rules" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label={`${site.name} home`}
      className={`flex items-center gap-2.5 ${className}`}
    >
      <span className="display grid size-8 place-items-center rounded-[10px] bg-lime pb-0.5 text-[22px] text-ink [font-stretch:100%]">
        %
      </span>
      <span className="display text-[22px] uppercase [font-stretch:85%]">
        Fair Fees
      </span>
    </a>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavClock />
          <a
            href={buyHref}
            className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.04] active:scale-95"
          >
            Buy {site.ticker}
          </a>
        </div>
      </div>
    </header>
  );
}
