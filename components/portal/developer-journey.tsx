"use client";

import Image from "next/image";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

const heroImages = ["/img/register-step-1.png", "/img/register-step-2.png", "/img/register-step-3.png"];
const heroSteps = ["create account", "upload", "publish"] as const;

type HeroShowcaseProps = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

function HeroShowcase({ activeIndex, setActiveIndex }: HeroShowcaseProps) {
  useEffect(() => {
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % heroImages.length), 3200);
    return () => window.clearInterval(interval);
  }, [setActiveIndex]);

  return (
    <div className="relative min-h-[280px] overflow-hidden bg-transparent sm:min-h-[390px] lg:min-h-[430px]">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 flex items-center justify-center p-0 transition-opacity duration-700 sm:p-2 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={src}
            alt="FONITAS app marketplace showcase"
            width={1100}
            height={880}
            priority={index === 0}
            className="h-auto max-h-[300px] w-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.12)] sm:max-h-[390px] lg:max-h-[430px]"
          />
        </div>
      ))}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/70 px-2.5 py-1.5 backdrop-blur">
        {heroImages.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-5 bg-shop-green" : "w-1.5 bg-shop-green/35"}`}
            aria-label={`Show showcase ${index + 1}`}
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
          <div className="max-w-[520px] text-left">
            <span className="shop-eyebrow text-[10px] text-shop-green md:text-[11px]">FONITAS DEVELOPER</span>
            <h1 className="!mt-3 !max-w-[600px] !text-[clamp(2.55rem,4.6vw,4.25rem)] !leading-[1.04] !tracking-[-0.045em] font-bold">
              Publish your account in 3 steps
            </h1>
            <p className="!mt-4 max-w-[500px] !text-[16px] !leading-6 text-shop-muted md:!text-[17px]">
              Explore launch, publishing, promotion and growth services from FONITAS — all in one place.
            </p>

            <div className="mt-4 flex justify-between py-2 text-[12px] sm:mt-5 sm:py-3">
              {heroSteps.map((step, index) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`text-left transition-colors text-lg! sm:text-xl! capitalize ${index === activeIndex ? "font-semibold! text-shop-green" : "text-shop-muted hover:text-shop-ink"}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                >
                  <span className="mr-1.5">{index + 1}.</span>
                  {step}
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
