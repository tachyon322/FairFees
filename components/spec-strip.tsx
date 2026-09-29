import { site } from "@/lib/site";

const specs = [
  { value: `${site.tax}%`, label: "Creator tax" },
  { value: `${site.cadence}s`, label: "Split cadence" },
  { value: "ETH", label: "Payout asset" },
  { value: "Pro rata", label: "Allocation" },
];

export function SpecStrip() {
  return (
    <div className="border-y border-line">
      <dl className="wrap grid grid-cols-2 md:grid-cols-4">
        {specs.map((s, i) => (
          <div
            key={s.label}
            className={`px-0 py-7 sm:py-9 md:px-8 md:first:pl-0 ${
              i > 0 ? "md:border-l md:border-line" : ""
            } ${i % 2 === 1 ? "pl-6 max-md:border-l max-md:border-line" : ""} ${
              i > 1 ? "max-md:border-t max-md:border-line" : ""
            }`}
          >
            <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              {s.label}
            </dt>
            <dd className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
