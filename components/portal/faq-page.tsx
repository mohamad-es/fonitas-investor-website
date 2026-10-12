"use client";

import { useMemo, useState } from "react";
import { Code2, FileCode2, Laptop, Package, Search, Smartphone, Store, Wrench } from "lucide-react";
import type { HubPage } from "@/lib/developer-hub-content";

const patternIcons = [Code2, Store, Wrench, Package, Smartphone, FileCode2, Laptop];

export function FaqPage({ page, locale }: { page: HubPage; locale: "en" | "fa" | "ar" }) {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const searchLabel = locale === "fa" ? "جستجو" : locale === "ar" ? "بحث" : "Search";
  const placeholder = locale === "fa" ? "جستجو در سؤالات..." : locale === "ar" ? "ابحث في الأسئلة..." : "Search FAQs...";
  const filteredSections = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return page.sections;
    return page.sections.filter(section => `${section.title} ${section.body}`.toLowerCase().includes(value));
  }, [page.sections, query]);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-base-100 pb-[76px] text-base-content">
      <section className="relative grid min-h-[365px] place-items-center overflow-hidden bg-base-100 max-md:min-h-[320px]">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-7 grid-rows-[repeat(2,115px)] items-center justify-items-center text-primary/25 opacity-85 max-md:grid-cols-4 max-md:grid-rows-[repeat(3,105px)]" aria-hidden="true">
          {Array.from({ length: 21 }, (_, index) => {
            const Icon = patternIcons[index % patternIcons.length];
            return <Icon key={index} size={42} strokeWidth={1.35} className={index % 3 === 0 ? "-translate-y-[18px]" : index % 3 === 2 ? "translate-y-7" : ""} />;
          })}
        </div>
        <div className="relative z-[1] -mt-3 w-[min(620px,calc(100%-40px))] text-center max-sm:w-[calc(100%-28px)]">
          <h1 className="m-0 mb-3 text-[clamp(30px,3vw,40px)] font-semibold leading-[1.18] tracking-[-0.025em] text-base-content">{page.title}</h1>
          <p className="m-0 mx-auto max-w-[590px] text-base leading-[1.75] text-base-content/70 max-sm:text-sm">{page.intro}</p>
        </div>
      </section>

      <div className="relative z-[2] mx-auto -mt-7 mb-[70px] flex min-h-[58px] w-[min(605px,calc(100%-40px))] items-center gap-3 rounded-full border border-base-300 bg-base-100 px-5 py-[7px] shadow-lg max-md:mb-[42px] max-sm:w-[calc(100%-28px)] max-sm:px-[15px]">
        <Search size={20} strokeWidth={1.7} className="shrink-0 text-base-content/55" aria-hidden="true" />
        <input type="search" value={query} onChange={event => { setQuery(event.target.value); setOpenIndex(null); }} placeholder={placeholder} aria-label={placeholder} className="min-w-0 flex-1 border-0 bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/40 focus:outline-none" />
        <button type="button" onClick={() => setQuery(query.trim())} className="btn btn-ghost min-h-0 h-[38px] min-w-[88px] rounded-full border border-primary bg-base-100 px-4 py-2 text-[13px] font-semibold text-primary hover:bg-primary/10 max-sm:min-w-[74px]">{searchLabel}</button>
      </div>

      <section className="mx-auto grid w-[min(1005px,calc(100%-48px))] gap-[18px] max-md:w-[min(100%-28px,680px)] max-md:gap-3" aria-label={page.title}>
        {filteredSections.map((section, index) => {
          const isOpen = openIndex === index;
          return (
            <article className={`overflow-hidden rounded-[9px] border bg-base-100 transition-[border-color,box-shadow] duration-200 ${isOpen ? "border-primary/30 shadow-md" : "border-base-300"}`} key={section.title}>
              <button type="button" className="flex min-h-[72px] w-full items-center justify-between gap-6 bg-transparent px-6 py-[18px] text-start text-[15px] font-semibold leading-[1.5] text-base-content hover:bg-base-200 max-sm:min-h-16 max-sm:px-4 max-sm:text-sm" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)}>
                <span>{section.title}</span>
                <span className={`shrink-0 text-xl leading-none text-base-content/55 transition-transform duration-200 ${isOpen ? "rotate-180" : "-translate-y-0.5"}`} aria-hidden="true">⌄</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-[22px] text-sm leading-[1.8] text-base-content/70 max-sm:px-4">
                  <p className="m-0">{section.body}</p>
                  {section.items?.length ? <ul className="mb-0 mt-3 list-disc ps-5">{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
