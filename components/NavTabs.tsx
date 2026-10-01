"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, type NavItem } from "@/lib/content";

const EASE = "cubic-bezier(.19,1,.22,1)";

// Current tab (by route) and, on a page with sections, the section in view.
export function useActiveNav() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);
  const tab = NAV.find((n) => n.href === pathname) ?? null;

  useEffect(() => {
    const ids = tab?.sections?.map((s) => s.href.split("#")[1]) ?? [];
    if (!ids.length) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting) setSection(id);
          else setSection((s) => (s === id ? null : s));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tab]);

  const sectionHref = tab?.sections && section ? `${tab.href}#${section}` : null;
  return { tab: tab?.href ?? null, section: sectionHref };
}

// A highlight that glides to whichever element is targeted instead of blinking.
function useGlide<T extends HTMLElement>(target: number | null, axis: "x" | "y") {
  const refs = useRef<(T | null)[]>([]);
  const [rect, setRect] = useState<{ pos: number; size: number } | null>(null);
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(() => {
    if (target === null) return;
    // measured against the positioned container, so wrappers in between must stay unpositioned
    const el = refs.current[target];
    if (el) setRect(axis === "x" ? { pos: el.offsetLeft, size: el.offsetWidth } : { pos: el.offsetTop, size: el.offsetHeight });
  }, [target, axis]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // First placement snaps into position; every move after that glides.
  useEffect(() => {
    if (rect && !animate) {
      const id = window.setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(id);
    }
  }, [rect, animate]);

  const style: React.CSSProperties = {
    [axis === "x" ? "width" : "height"]: rect?.size ?? 0,
    transform: axis === "x" ? `translateX(${rect?.pos ?? 0}px)` : `translateY(${rect?.pos ?? 0}px)`,
    opacity: target !== null && rect ? 1 : 0,
    transition: animate
      ? `transform .5s ${EASE}, width .5s ${EASE}, height .5s ${EASE}, opacity .25s`
      : "opacity .25s",
  };

  return { refs, style };
}

function Dropdown({
  item,
  open,
  activeSection,
  onPick,
  onKeyDown,
}: {
  item: NavItem;
  open: boolean;
  activeSection: string | null;
  onPick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const sections = item.sections ?? [];
  const [hover, setHover] = useState<number | null>(null);
  const activeIdx = sections.findIndex((s) => s.href === activeSection);
  const target = hover ?? (activeIdx >= 0 ? activeIdx : null);
  const { refs, style } = useGlide<HTMLAnchorElement>(open ? target : null, "y");

  return (
    <div
      className="absolute top-full left-0 pt-3"
      style={{
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 1 : 0,
        transform: open ? "none" : "translateY(-6px) scale(0.98)",
        transformOrigin: "top left",
        transition: `opacity .25s, transform .4s ${EASE}`,
      }}
      onKeyDown={onKeyDown}
    >
      <div
        id="nav-home-menu"
        role="menu"
        className="relative w-[300px] rounded-2xl border border-line-2 bg-[#0d0e0b] p-1.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        onMouseLeave={() => setHover(null)}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 right-1.5 left-1.5 rounded-xl bg-white/[0.06]"
          style={style}
        />
        {sections.map((s, i) => {
          const on = i === activeIdx;
          return (
            <Link
              key={s.href}
              ref={(el) => {
                refs.current[i] = el;
              }}
              href={s.href}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              onClick={onPick}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none"
            >
              <span className={`font-mono text-[11px] ${on ? "text-acc" : "text-dim"}`}>{s.n}</span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm transition-colors ${on || hover === i ? "text-fg" : "text-muted"}`}>
                  {s.label}
                </span>
                <span className="block truncate font-mono text-[10px] text-dim">{s.hint}</span>
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-acc transition-opacity duration-300"
                style={{ opacity: on ? 1 : 0 }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Desktop tabs. Tabs with same-page sections open a dropdown instead of listing them inline.
export function NavTabs() {
  const { tab, section } = useActiveNav();
  const [hover, setHover] = useState<number | null>(null);
  const [menu, setMenu] = useState<number | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrap = useRef<HTMLUListElement>(null);

  const activeIdx = NAV.findIndex((n) => n.href === tab);
  const target = menu ?? hover ?? (activeIdx >= 0 ? activeIdx : null);
  const { refs, style } = useGlide<HTMLElement>(target, "x");

  const openMenu = (i: number) => {
    clearTimeout(closeTimer.current);
    setMenu(i);
  };
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  };

  // close on outside click / Escape
  useEffect(() => {
    if (menu === null) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        refs.current[menu]?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu, refs]);

  const onMenuKeys = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = [...(wrap.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  const tabClass = (i: number) =>
    `relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors duration-300 outline-none ${
      i === target || i === activeIdx ? "text-fg" : "text-muted"
    }`;

  return (
    <ul ref={wrap} className="relative hidden items-center gap-1 lg:flex" onMouseLeave={() => setHover(null)}>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-full rounded-lg border border-line-2 bg-white/[0.06]"
        style={style}
      >
        <span
          className="absolute -bottom-px left-1/2 h-px w-4 -translate-x-1/2 bg-acc transition-opacity duration-300"
          style={{ opacity: target !== null && target === activeIdx ? 1 : 0 }}
        />
      </span>

      {NAV.map((n, i) =>
        n.sections ? (
          <li key={n.href} onMouseEnter={() => openMenu(i)} onMouseLeave={closeMenuSoon}>
            <button
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              aria-haspopup="menu"
              aria-expanded={menu === i}
              aria-controls="nav-home-menu"
              aria-current={i === activeIdx ? "page" : undefined}
              onClick={() => (menu === i ? setMenu(null) : openMenu(i))}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  openMenu(i);
                  setTimeout(() => wrap.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus(), 30);
                }
              }}
              className={tabClass(i)}
            >
              {n.label}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden
                className="transition-transform duration-300"
                style={{ transform: menu === i ? "rotate(180deg)" : "none" }}
              >
                <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <Dropdown
              item={n}
              open={menu === i}
              activeSection={section}
              onPick={() => setMenu(null)}
              onKeyDown={onMenuKeys}
            />
          </li>
        ) : (
          <li key={n.href}>
            <Link
              ref={(el) => {
                refs.current[i] = el;
              }}
              href={n.href}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-current={i === activeIdx ? "page" : undefined}
              className={tabClass(i)}
            >
              {n.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
