import Link from "next/link";
import type { ReactNode } from "react";

// The crack: [x offset from center in px, y in %], top to bottom. Irregular on purpose.
const CRACK: [number, number][] = [
  [3, 0],
  [-3, 18],
  [2, 36],
  [-3, 53],
  [3, 70],
  [-2, 86],
  [2, 100],
];

const edge = (dx = 0) => CRACK.map(([x, y]) => `calc(50% + ${x + dx}px) ${y}%`);
// the right half overlaps the left by half a pixel so there's no seam at rest
const CLIP_LEFT = `polygon(0 0, ${edge().join(", ")}, 0 100%)`;
const CLIP_RIGHT = `polygon(100% 0, 100% 100%, ${edge(-0.5).reverse().join(", ")})`;
const BLADE = CRACK.map(([x, y]) => `${x},${y}`).join(" ");

// Primary (green) button. With `crack`, hovering sends a blade down the middle along a
// zigzag and the two halves tilt away from each other — the same "slice" as the logo.
// The cracked face is rendered twice, each copy clipped to one side; the second is aria-hidden.
export function SliceButton({
  href,
  onClick,
  children,
  size = "md",
  crack = false,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  crack?: boolean;
  className?: string;
}) {
  const face = {
    sm: "h-9 gap-1.5 rounded-lg px-4 text-[13.5px]",
    md: "gap-2 rounded-xl px-6 py-3.5 text-[15px]",
    lg: "gap-2 rounded-xl px-7 py-4 text-base",
  }[size];

  const inner = !crack ? (
    <span className={`slice-half ${face}`}>{children}</span>
  ) : (
    <>
      <span className={`slice-half slice-left ${face}`} style={{ clipPath: CLIP_LEFT }}>
        {children}
      </span>
      <span className={`slice-half slice-right ${face}`} style={{ clipPath: CLIP_RIGHT }} aria-hidden>
        {children}
      </span>
      <svg className="slice-blade" viewBox="-6 0 12 100" preserveAspectRatio="none" aria-hidden>
        <polyline points={BLADE} pathLength={100} />
      </svg>
    </>
  );

  const cls = `slice ${size === "sm" ? "rounded-lg" : "rounded-xl slice-glow"} ${className}`;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
