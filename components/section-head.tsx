import type { ReactNode } from "react";

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lede,
  className = "",
}: SectionHeadProps) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <p className="font-mono text-[11px] tracking-[0.22em] text-lime uppercase">
        {eyebrow}
      </p>
      <h2 className="display mt-5 text-[clamp(2.75rem,7.2vw,5.75rem)] text-balance">
        {title}
      </h2>
      {lede ? (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
