"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["/guidelines", "Why FONITAS"],
  ["/rules", "Investment"],
  ["/blog", "Investor Insights"],
  ["/faq", "Investor FAQ"],
] as const;

const localizedLabels = {
  en: { "/guidelines": "Why FONITAS", "/rules": "Investment", "/blog": "Investor Insights", "/faq": "Investor FAQ" },
  fa: { "/guidelines": "چرا فونیتاس", "/rules": "سرمایه‌گذاری", "/blog": "بینش سرمایه‌گذاری", "/faq": "سؤالات سرمایه‌گذاران" },
  ar: { "/guidelines": "لماذا فونيتاس", "/rules": "الاستثمار", "/blog": "رؤى المستثمرين", "/faq": "أسئلة المستثمرين" },
} as const;

const accessLabel = { en: "Investor access", fa: "دسترسی سرمایه‌گذار", ar: "وصول المستثمر" } as const;
const deckLabel = { en: "Investor deck", fa: "Investor Deck", ar: "ملف المستثمر" } as const;
const menuLabels = { en: ["Open menu", "Close menu"], fa: ["باز کردن منو", "بستن منو"], ar: ["فتح القائمة", "إغلاق القائمة"] } as const;

export function PortalShell({ children }: { children: ReactNode }) {
  const t = useTranslations("portal");
  const locale = useLocale() as "en" | "fa" | "ar";
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const labels = localizedLabels[locale];
  const menuLabel = menuLabels[locale][open ? 1 : 0];

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <a className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-base-100 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-lg" href="#portal-content">{t("skip")}</a>
      <header className="sticky inset-x-0 top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
        <div className="mx-auto flex min-h-[70px] w-full max-w-[1440px] items-center gap-5 px-5 sm:px-7 lg:gap-6 lg:px-8">
          <Link href="/" aria-label={t("home")} className="relative z-10 block w-[126px] shrink-0 transition-opacity hover:opacity-85 lg:w-[132px]">
            <Image src="/img/fonitas-logo.png" alt="Fonitas" width={350} height={92} priority className="h-auto w-full" />
          </Link>
          <nav aria-label={t("navigation")} className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-7">
            {navItems.map(([href, fallback]) => {
              const active = isActive(href);
              return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`relative whitespace-nowrap py-2 text-[12px] font-medium transition-colors ${active ? "text-base-content" : "text-base-content/70 hover:text-base-content"}`}>
                {labels[href] ?? fallback}
                {active && <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-primary" />}
              </Link>;
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2 lg:gap-2.5">
            <label className="sr-only" htmlFor="portal-language">{t("language")}</label>
            <select id="portal-language" className="select select-sm hidden h-10 min-w-[96px] rounded-xl border-base-300 bg-base-100 px-3 text-[12px] font-medium text-base-content sm:inline-flex" value={locale} onChange={(e) => { const value = e.target.value; if (!["en", "fa", "ar"].includes(value)) return; document.cookie = `fonitas-locale=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`; window.location.reload(); }}>
              <option value="en">English</option><option value="fa">فارسی</option><option value="ar">العربية</option>
            </select>
            <a href="mailto:investors@fonitas.com?subject=FONITAS%20Investor%20Deck" className="hidden h-10 items-center whitespace-nowrap rounded-xl border border-base-300 bg-base-100 px-3.5 text-[12px] font-medium text-base-content transition hover:border-primary/30 hover:bg-base-200 sm:inline-flex">{deckLabel[locale]}</a>
            <Link href="/rules" className="btn btn-primary h-10 whitespace-nowrap rounded-xl border-0 px-4 text-[12px] font-semibold shadow-none lg:px-5">
              <span className="hidden sm:inline">{accessLabel[locale]}</span>
              <span className="sm:hidden">{locale === "fa" ? "سرمایه‌گذار" : locale === "ar" ? "مستثمر" : "Invest"}</span>
              <ArrowRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
            <button type="button" aria-label={menuLabel} aria-expanded={open} onClick={() => setOpen(v => !v)} className="relative z-10 grid size-10 place-items-center rounded-full border border-base-300 bg-base-100 text-base-content transition hover:bg-base-200 xl:hidden">
              {open ? <X className="size-4" strokeWidth={1.8} /> : <Menu className="size-4" strokeWidth={1.8} />}
            </button>
          </div>
        </div>
        <div className={`overflow-hidden border-t border-base-300 bg-base-100 transition-all duration-300 xl:hidden ${open ? "max-h-[calc(100vh-70px)] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`} aria-hidden={!open}>
          <nav aria-label={t("navigation")} className="mx-auto max-w-[1320px] px-5 py-3 sm:px-6">
            <div className="divide-y divide-base-300">{navItems.map(([href, fallback]) => <Link key={href} href={href} tabIndex={open ? 0 : -1} className={`flex items-center justify-between py-4 text-lg ${isActive(href) ? "text-base-content" : "text-base-content/60"}`}><span>{labels[href] ?? fallback}</span><ArrowUpRight className="size-4 text-primary rtl:-scale-x-100" aria-hidden="true" /></Link>)}</div>
            <div className="mt-4 grid grid-cols-2 gap-3"><a href="mailto:investors@fonitas.com?subject=FONITAS%20Investor%20Deck" tabIndex={open ? 0 : -1} className="btn btn-secondary rounded-xl">{deckLabel[locale]}</a><Link href="/rules" tabIndex={open ? 0 : -1} className="btn btn-primary rounded-xl">{accessLabel[locale]}</Link></div>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
