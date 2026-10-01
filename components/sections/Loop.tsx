"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "torph/react";
import { LOOP } from "@/lib/content";
import { useSim } from "@/lib/sim";
import { Reveal, SectionLabel } from "../Reveal";

// Pro-rata dots: bigger bag, bigger dot, bigger slice.
const HOLDERS = [9, 4, 7, 3, 5, 2, 8, 3, 4, 6, 2, 3, 5, 7, 2, 4, 3, 6, 2, 5, 4, 3, 8, 2];

function Connector({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center md:h-auto md:w-full md:flex-1">
      {/* horizontal (md+) */}
      <div className="relative hidden h-10 w-full md:block">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--line-2)" strokeWidth="1" />
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="var(--acc)"
            strokeWidth="2"
            className="flow-dash"
            style={{ opacity: active ? 1 : 0.25, transition: "opacity .5s" }}
          />
        </svg>
        <span className="particle-x absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-acc shadow-[0_0_12px_var(--acc)]" />
      </div>
      {/* vertical (mobile) */}
      <div className="relative h-14 w-10 md:hidden">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--acc)" strokeWidth="2" className="flow-dash" />
        </svg>
      </div>
    </div>
  );
}

export function Loop() {
  const sim = useSim();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 3600);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  const trade = sim.trades[0];
  const claiming = sim.phase === "claiming";

  const node = (i: number) =>
    `relative flex-1 rounded-2xl border p-5 transition-all duration-500 md:max-w-[300px] ${
      step === i
        ? "border-acc/50 bg-acc/[0.04] shadow-[0_0_60px_-20px_rgba(200,255,77,0.5)]"
        : "border-line-2 bg-panel/60"
    }`;

  return (
    <section id="loop" className="relative mx-auto max-w-6xl border-t border-line px-4 py-28 sm:px-6 sm:py-36">
      <Reveal>
        <SectionLabel n="01">The loop</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="min-h-[2em] max-w-4xl text-[clamp(36px,6vw,76px)] leading-[0.95] font-semibold tracking-[-0.045em]">
          {/* multi-line headline: keyed blur-swap instead of torph, which doesn't wrap */}
          <span key={step} className="swap-in block">
            {LOOP[step].title}
          </span>
        </h2>
      </Reveal>

      {/* diagram */}
      <Reveal delay={160} className="mt-16">
        <div className="flex flex-col items-stretch md:flex-row md:items-center">
          {/* pons */}
          <div className={node(0)} onMouseEnter={() => pick(0)}>
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>pons v2 · trades</span>
              <span className="text-acc">3%</span>
            </div>
            <div className="font-mono text-sm">
              <div className="flex justify-between text-muted">
                <span>{trade ? trade.side : "buy"}</span>
                <span>{trade ? trade.eth.toFixed(3) : "0.420"} ETH</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-dim">creator tax</span>
                <TextMorph className="text-lg text-acc tabular-nums">{`+${(trade ? trade.tax : 0.0126).toFixed(4)}`}</TextMorph>
              </div>
            </div>
          </div>

          <Connector active={step >= 0} />

          {/* splitter */}
          <div className={node(1)} onMouseEnter={() => pick(1)}>
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>splitter contract</span>
              <span className={claiming ? "text-acc" : ""}>{claiming ? "claiming" : `00:${String(sim.secondsLeft).padStart(2, "0")}`}</span>
            </div>
            <pre className="font-mono text-[12px] leading-relaxed text-muted">
              <span className="text-dim">creatorFeeRecipient</span>
              {"\n"}
              <span className="text-dim">{"  "}= </span>
              <span className="text-fg">Splitter</span>
              {"\n"}
              <span className="text-dim">since </span>
              <span className="text-acc">block 0</span>
              {"\n"}
              <span className="text-dim">founder </span>
              <span className="text-red line-through decoration-1">claim()</span>
            </pre>
          </div>

          <Connector active={step >= 1} />

          {/* holders */}
          <div className={node(2)} onMouseEnter={() => pick(2)}>
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>holders · pro rata</span>
              <span>ETH</span>
            </div>
            <div className="grid grid-cols-8 place-items-center gap-2">
              {HOLDERS.map((w, i) => (
                <span
                  key={i}
                  className="rounded-full bg-acc transition-all duration-700"
                  style={{
                    width: 4 + w * 1.4,
                    height: 4 + w * 1.4,
                    opacity: claiming || step === 2 ? 0.9 : 0.35,
                    transitionDelay: `${i * 25}ms`,
                    boxShadow: claiming ? "0 0 12px var(--acc)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* steps */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {LOOP.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <button
              onClick={() => pick(i)}
              className={`group h-full w-full rounded-2xl border p-6 text-left transition-colors ${
                step === i ? "border-line-2 bg-white/[0.03]" : "border-line hover:border-line-2"
              }`}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-acc">{s.n}</span>
                <span className="h-[2px] w-16 overflow-hidden rounded-full bg-line-2">
                  <span
                    key={step === i && auto ? `${step}-run` : "idle"}
                    className="block h-full bg-acc"
                    style={{
                      width: step === i ? "100%" : "0%",
                      animation: step === i && auto ? "grow 3.6s linear" : undefined,
                    }}
                  />
                </span>
              </div>
              <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
