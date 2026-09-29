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
      <span className="grid size-6 place-items-center rounded-[5px] bg-lime pb-px font-mono text-[13px] leading-none font-bold text-ink">
        %
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">
        {site.name}
      </span>
    </a>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <NavClock />
          <a
            href={buyHref}
            className="rounded-md bg-lime px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-foreground"
          >
            Buy {site.ticker}
          </a>
        </div>
      </div>
    </header>
  );
}
