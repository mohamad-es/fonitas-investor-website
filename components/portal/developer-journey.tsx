"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

const investorSteps = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the FONITAS opportunity and the market we are building for.",
    metric: "Publishing infrastructure",
  },
  {
    number: "02",
    title: "Evaluate",
    description: "Explore our business model, market potential, traction and growth strategy.",
    metric: "Built for scale",
  },
  {
    number: "03",
    title: "Invest",
    description: "Join FONITAS as we build the operating layer for application publishing.",
    metric: "Long-term opportunity",
  },
] as const;

type HeroShowcaseProps = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

function HeroShowcase({ activeIndex, setActiveIndex }: HeroShowcaseProps) {
  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % investorSteps.length),
      3200,
    );
    return () => window.clearInterval(interval);
  }, [setActiveIndex]);

  const step = investorSteps[activeIndex];

  return (
    <div className="relative min-h-[300px] overflow-hidden sm:min-h-[390px] lg:min-h-[470px]">
      <div className="absolute inset-8 rounded-[2rem] bg-white/70 shadow-[0_30px_90px_rgba(20,80,45,0.12)] backdrop-blur-sm sm:inset-10" />
      <div className="relative flex min-h-[300px] items-center justify-center p-8 sm:min-h-[390px] sm:p-12 lg:min-h-[470px]">
        <div className="w-full max-w-[470px] rounded-[1.75rem] border border-white/80 bg-white/90 p-7 shadow-[0_20px_60px_rgba(20,80,45,0.10)] transition-all duration-500 sm:p-9">
          <div className="mb-10 flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-shop-green text-sm font-bold text-white">
              {step.number}
            </span>
            <span className="rounded-full border border-shop-green/15 bg-shop-green/5 px-3 py-1.5 text-[11px] font-semibold text-shop-green">
              FONITAS INVESTOR
            </span>
          </div>
          <p className="text-sm font-medium text-shop-muted">{step.metric}</p>
          <h2 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-shop-ink sm:text-5xl">
            {step.title}
          </h2>
          <p className="mt-5 max-w-[390px] text-[15px] leading-6 text-shop-muted sm:text-base">
            {step.description}
          </p>
          <div className="mt-9 h-2 overflow-hidden rounded-full bg-shop-green/10">
            <div
              className="h-full rounded-full bg-shop-green transition-all duration-700"
              style={{ width: `${((activeIndex + 1) / investorSteps.length) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-shop-muted">
            <span>Opportunity</span>
            <span>Growth</span>
            <span>Partnership</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/80 px-2.5 py-1.5 shadow-sm backdrop-blur">
        {investorSteps.map((item, index) => (
          <button
            key={item.number}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-5 bg-shop-green" : "w-1.5 bg-shop-green/35"
            }`}
            aria-label={`Show investor step ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export function DeveloperJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-[calc(100svh-70px)] overflow-hidden bg-[radial-gradient(circle_at_78%_44%,rgba(255,255,255,.92)_0%,rgba(255,255,255,.62)_20%,transparent_44%),linear-gradient(135deg,#edf6f0_0%,#f8fbf9_52%,#eef7f1_100%)] px-0 py-5 sm:py-7 md:py-9 lg:min-h-[calc(100vh-90px)] lg:py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_srgb,var(--shop-green)_6%,transparent)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1208px] items-start px-5 sm:px-6 lg:min-h-[calc(100vh-80px)] lg:items-center lg:px-0">
        <div className="grid w-full items-start gap-5 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 xl:gap-14">
          <div className="max-w-[560px] text-left">
            <span className="shop-eyebrow text-[10px] text-shop-green md:text-[11px]">FONITAS INVESTOR</span>
            <h1 className="!mt-3 !max-w-[650px] !text-[clamp(2.55rem,4.6vw,4.25rem)] !leading-[1.04] !tracking-[-0.045em] font-bold">
              Invest in the future of application publishing
            </h1>
            <p className="!mt-4 max-w-[530px] !text-[16px] !leading-6 text-shop-muted md:!text-[17px]">
              FONITAS is building the infrastructure that helps application creators launch, publish, promote and grow across digital marketplaces.
            </p>

            <div className="mt-5 grid gap-2 border-t border-shop-green/10 pt-4 sm:mt-7 sm:grid-cols-3 sm:gap-4">
              {investorSteps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group text-left transition-colors ${
                    index === activeIndex ? "text-shop-green" : "text-shop-muted hover:text-shop-ink"
                  }`}
                  aria-current={index === activeIndex ? "step" : undefined}
                >
                  <span className="block text-[11px] font-semibold tracking-[0.14em]">{step.number}</span>
                  <span className="mt-1 block text-base font-semibold sm:text-lg">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
          <HeroShowcase activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
      </div>
    </section>
  );
}
