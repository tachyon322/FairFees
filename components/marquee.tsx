import { bio } from "@/lib/site";

export function Marquee() {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-line bg-lime py-3.5 text-ink"
    >
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((i) => (
              <span
                key={i}
                className="flex items-center font-mono text-sm font-semibold tracking-[0.12em] uppercase"
              >
                {bio}
                <span className="mx-8 opacity-40">✱</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
