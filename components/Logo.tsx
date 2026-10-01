// The mark: a coin/clock face with one slice pulled out — the 3%, rerouted.
// The slice sits at 12 o'clock, where the minute starts.

type Pt = [number, number];

function polar(cx: number, cy: number, r: number, deg: number): Pt {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
}

function f(p: Pt) {
  return `${p[0].toFixed(3)} ${p[1].toFixed(3)}`;
}

const C = 16;
const R = 12.5;
const HALF = 24; // half the slice angle, exaggerated so it reads at 16px

const body = (() => {
  const a = polar(C, C, R, HALF);
  const b = polar(C, C, R, 360 - HALF);
  return `M ${C} ${C} L ${f(a)} A ${R} ${R} 0 1 1 ${f(b)} Z`;
})();

const slice = (() => {
  const a = polar(C, C, R, -HALF);
  const b = polar(C, C, R, HALF);
  return `M ${C} ${C} L ${f(a)} A ${R} ${R} 0 0 1 ${f(b)} Z`;
})();

export function Mark({
  size = 28,
  animated = false,
  className = "",
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d={body} fill="var(--fg)" />
      <circle cx={C} cy={C} r={1.7} fill="var(--bg)" />
      <g className={animated ? "logo-slice" : undefined} style={{ transform: "translateY(-3.2px)" }}>
        <path d={slice} fill="var(--acc)" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={26} animated />
      <span className="text-[17px] font-semibold tracking-[-0.03em]">
        fair<span className="text-muted">fees</span>
      </span>
    </span>
  );
}
