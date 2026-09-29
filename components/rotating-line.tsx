"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";

/** Lines straight from the copy bank. Don't soften them. */
const LINES = [
  "Creator tax, minus the creator.",
  "Hold the bag. Take the tax.",
  "1% of supply. 1% of the fees. Every minute.",
  "Most tokens bill you. This one pays you.",
  "Same 3% tax. Different pocket.",
  "Dev wallet has no pocket.",
  "We didn’t remove the tax. We rerouted it.",
];

export function RotatingLine({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % LINES.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={className} aria-label="Fair Fees, in one line at a time">
      <TextMorph as="span" duration={650} ease={{ stiffness: 170, damping: 22 }}>
        {LINES[i]}
      </TextMorph>
    </p>
  );
}
