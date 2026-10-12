import {
  Ban, ChevronDown, ChevronRight, CircleHelp, ClipboardCheck, Copyright, CreditCard, FileCheck2,
  FileText, Gauge, GraduationCap, History, Home, LockKeyhole, Megaphone, ShieldCheck, UserRound, Workflow,
} from "lucide-react";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import type { HubPage } from "@/lib/developer-hub-content";
import { FaqPage } from "./faq-page";
import { PrintButton } from "./print-button";

const links = [["guidelines", "Guidelines"], ["rules", "Rules"], ["faq", "FAQs"]] as const;
const icons = { guidelines: Workflow, rules: ShieldCheck, faq: CircleHelp } as const;
const pageIcons = { guidelines: Workflow, rules: ShieldCheck, faq: CircleHelp } as const;
const rulesSidebar = [["Content", FileText], ["Quality", ClipboardCheck], ["Security", LockKeyhole], ["Users Privacy", UserRound], ["Copyright", Copyright], ["Payment", CreditCard], ["Advertisements", Megaphone], ["Deceptive Behavior", Ban], ["Rules Update History", History]] as const;
const guidelinesSidebar = [["Getting Started", Gauge], ["Developer Account", UserRound], ["Application Setup", FileText], ["Submission", ClipboardCheck], ["Review Process", Workflow], ["Quality & QA", ShieldCheck], ["Publication", FileCheck2]] as const;

const pageClass = "mx-auto max-w-[1280px] px-8 pb-16 pt-[30px] max-[900px]:px-6 max-[700px]:px-5 max-[700px]:pb-[52px] max-[700px]:pt-7";
const breadcrumbsClass = "mb-7 flex items-center gap-2.5 overflow-x-auto whitespace-nowrap text-xs text-base-content/55";
const sidebarClass = "sticky top-[94px] grid gap-1 text-base-content max-[900px]:static max-[700px]:grid-cols-2";
const contentClass = "min-w-0 max-w-[920px]";

function DocsLayout({ page, locale, title, sectionTitle, sidebar, icon: PageIcon, children }: {
  page: HubPage;
  locale: "en" | "fa" | "ar";
  title: string;
  sectionTitle: string;
  sidebar: readonly (readonly [string, typeof FileText])[];
  icon: typeof ShieldCheck;
  children: React.ReactNode;
}) {
  const printLabel = locale === "fa" ? "چاپ" : locale === "ar" ? "طباعة" : "Print";
  const labels = locale === "fa"
    ? (sidebar.length === 9 ? ["محتوا", "کیفیت", "امنیت", "حریم خصوصی کاربران", "کپی‌رایت", "پرداخت", "تبلیغات", "رفتار فریبنده", "تاریخچه تغییر قوانین"] : ["شروع کار", "حساب توسعه‌دهنده", "آماده‌سازی اپلیکیشن", "ارسال", "فرایند بررسی", "کیفیت و QA", "انتشار"])
    : locale === "ar"
      ? (sidebar.length === 9 ? ["المحتوى", "الجودة", "الأمان", "خصوصية المستخدمين", "حقوق النشر", "الدفع", "الإعلانات", "السلوك المضلل", "سجل تحديث القواعد"] : ["البدء", "حساب المطوّر", "إعداد التطبيق", "الإرسال", "عملية المراجعة", "الجودة وQA", "النشر"])
      : sidebar.map(([label]) => label);

  return (
    <main className={pageClass}>
      <div className={breadcrumbsClass}>
        <Link href="/" className="font-semibold text-base-content/65 hover:text-primary">Fonitas</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span>{locale === "fa" ? "توسعه‌دهندگان" : locale === "ar" ? "المطوّرون" : "Developers"}</span>
        <ChevronRight size={14} aria-hidden="true" />
        <strong className="font-semibold text-base-content/70">{sectionTitle}</strong>
        <ChevronRight size={14} aria-hidden="true" />
        <strong className="font-semibold text-base-content/70">{title}</strong>
      </div>

      <div className="mb-[30px] flex justify-end max-[700px]:mb-6"><PrintButton label={printLabel} /></div>

      <div className="grid grid-cols-[250px_minmax(0,1fr)] items-start gap-[52px] max-[900px]:grid-cols-[190px_minmax(0,1fr)] max-[900px]:gap-[30px] max-[700px]:grid-cols-1 max-[700px]:gap-6">
        <aside className={sidebarClass} aria-label={sectionTitle}>
          <div className="grid gap-1 max-[700px]:col-span-full">
            <div className="flex min-h-8 items-center gap-2 text-sm font-bold text-primary"><ChevronDown size={16} aria-hidden="true" /><span>{title}</span></div>
            {sidebar.map(([label, Icon], index) => (
              <Link key={label} href="#" className={`flex min-h-[30px] items-center gap-2.5 ps-[39px] text-sm font-medium text-base-content hover:text-primary max-[700px]:rounded-lg max-[700px]:border max-[700px]:border-base-300 max-[700px]:bg-base-100 max-[700px]:px-3.5 ${index === 0 ? "text-primary" : ""}`}>
                <Icon size={15} strokeWidth={1.9} aria-hidden="true" /><span>{labels[index]}</span>
              </Link>
            ))}
          </div>
          <div className="flex min-h-8 items-center gap-2 text-sm font-semibold text-base-content/80"><ChevronRight size={16} aria-hidden="true" /><span>{locale === "fa" ? "اجرای قوانین" : locale === "ar" ? "إنفاذ القواعد" : "Rules Enforcement"}</span></div>
          <div className="flex min-h-8 items-center gap-2 text-sm font-semibold text-base-content/80"><ChevronRight size={16} aria-hidden="true" /><GraduationCap size={15} strokeWidth={1.9} aria-hidden="true" /><span>Academy</span></div>
        </aside>

        <article className={contentClass}>
          <div className="mb-6 flex items-center gap-7 max-[700px]:items-start max-[700px]:gap-3.5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[7px] border-2 border-primary text-primary" aria-hidden="true"><PageIcon size={29} strokeWidth={1.6} /></div>
            <h1 className="m-0 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-base-content">{title}</h1>
          </div>
          <p className="mb-[18px] text-base leading-[1.7] text-base-content/85">{page.intro}</p>
          {children}
          <div className="mt-[42px] border-t border-base-300" />
        </article>
      </div>
    </main>
  );
}

function RulesPageView({ page, locale }: { page: HubPage; locale: "en" | "fa" | "ar" }) {
  const title = locale === "fa" ? "قوانین" : locale === "ar" ? "القواعد" : "Rules";
  const sectionTitle = locale === "fa" ? "قوانین انتشار" : locale === "ar" ? "قواعد النشر" : "Publishing Rules";
  return (
    <DocsLayout page={page} locale={locale} title={title} sectionTitle={sectionTitle} sidebar={rulesSidebar} icon={ShieldCheck}>
      {page.sections.map(section => <section className="mt-5 pb-0" key={section.title}><h2 className="mb-2 text-[19px] font-semibold leading-[1.4] text-base-content">{section.title}</h2><p className="mb-3 text-[15px] leading-[1.75] text-base-content/85">{section.body}</p>{section.items ? <ul className="m-0 mt-2 list-disc ps-5">{section.items.map(item => <li className="my-1.5 text-[15px] leading-[1.7] text-base-content/85" key={item}>{item}</li>)}</ul> : null}</section>)}
    </DocsLayout>
  );
}

function GuidelinesPageView({ page, locale }: { page: HubPage; locale: "en" | "fa" | "ar" }) {
  const title = locale === "fa" ? "راهنما" : locale === "ar" ? "الإرشادات" : "Guidelines";
  return (
    <DocsLayout page={page} locale={locale} title={title} sectionTitle={title} sidebar={guidelinesSidebar} icon={Workflow}>
      {page.sections.map(section => <section className="mt-5 pb-0" key={section.title}><h2 className="mb-2 text-[19px] font-semibold leading-[1.4] text-base-content">{section.title.replace(/^\d+\.\s*/, "").replace(/^[۱-۵]\.\s*/, "")}</h2><p className="mb-3 text-[15px] leading-[1.75] text-base-content/85">{section.body}</p>{section.items ? <ul className="m-0 mt-2 list-disc ps-5">{section.items.map(item => <li className="my-1.5 text-[15px] leading-[1.7] text-base-content/85" key={item}>{item}</li>)}</ul> : null}</section>)}
    </DocsLayout>
  );
}

export function HubPageView({ page, slug, locale = "en" }: { page: HubPage; slug: string; locale?: "en" | "fa" | "ar" }) {
  if (slug === "guidelines") return <GuidelinesPageView page={page} locale={locale} />;
  if (slug === "rules") return <RulesPageView page={page} locale={locale} />;
  if (slug === "faq") return <FaqPage page={page} locale={locale} />;

  const PageIcon = pageIcons[slug as keyof typeof pageIcons] ?? FileText;
  return (
    <main className="mx-auto max-w-[1280px] px-8 py-8 max-md:px-5">
      <div className="mb-7 flex items-center gap-2 text-xs text-base-content/55"><Link href="/" aria-label="Home" className="text-base-content/65 hover:text-primary"><Home size={14} strokeWidth={2} /></Link><span aria-hidden="true">/</span><span>{page.title}</span></div>
      <header className="mx-auto max-w-[850px] text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-primary bg-primary/5 text-primary" aria-hidden="true"><PageIcon size={22} strokeWidth={1.9} /></div><p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-primary">Developer Hub</p><h1 className="m-0 text-4xl font-bold tracking-tight text-base-content max-md:text-3xl">{page.title}</h1><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-base-content/70">{page.intro}</p></header>
      <div className="mt-12 grid grid-cols-[220px_minmax(0,1fr)] gap-12 max-md:grid-cols-1 max-md:gap-7">
        <aside className="flex flex-col gap-1" aria-label="Documentation navigation">{links.map(([key, label]) => { const Icon = icons[key]; return <Link key={key} href={`/${key}`} aria-current={slug === key ? "page" : undefined} className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${slug === key ? "bg-primary/10 text-primary" : "text-base-content/75 hover:bg-base-200 hover:text-primary"}`}><Icon size={16} strokeWidth={2} aria-hidden="true" /><span>{label}</span></Link>; })}</aside>
        <div className="space-y-6">{page.sections.map((section, index) => <section className="flex gap-5 rounded-2xl border border-base-300 bg-base-100 p-6 max-sm:p-5" key={section.title}><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div><div><h2 className="m-0 text-lg font-semibold text-base-content">{section.title}</h2><p className="mt-2 text-sm leading-7 text-base-content/70">{section.body}</p>{section.items ? <ul className="mt-3 space-y-2">{section.items.map(item => <li className="flex items-start gap-2 text-sm leading-6 text-base-content/70" key={item}><FileCheck2 className="mt-1 shrink-0 text-primary" size={15} strokeWidth={2} aria-hidden="true" /><span>{item}</span></li>)}</ul> : null}</div></section>)}</div>
      </div>
    </main>
  );
}

export async function HubPageRoute({ slug }: { slug: string }) {
  const locale = await getLocale() as "en" | "fa" | "ar";
  const { developerHubContent } = await import("@/lib/developer-hub-content");
  const contentSlug = slug === "guidelines" ? "how-it-works" : slug === "rules" ? "guidelines" : slug;
  const page = developerHubContent[locale][contentSlug] ?? developerHubContent.en[contentSlug];
  return <HubPageView page={page} slug={slug} locale={locale} />;
}
