import type { ReactNode } from "react";

type SectionHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
};

/** Mono index on the left, headline on the right. One grid, every section. */
export function SectionHead({ index, label, title, lede }: SectionHeadProps) {
  return (
    <div className="reveal grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        <span className="text-foreground">{index}</span>
        <span className="mx-2 text-line-strong">/</span>
        {label}
      </p>
      <div>
        <h2 className="display max-w-3xl text-[clamp(2.1rem,4.6vw,3.75rem)] text-balance">
          {title}
        </h2>
        {lede ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}
