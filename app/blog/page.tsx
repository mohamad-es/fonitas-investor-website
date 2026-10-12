import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Tag } from "lucide-react";
import { getLocale } from "next-intl/server";

const posts = {
  en: [
    ["Publishing", "What to prepare before submitting your application", "A practical checklist for getting your product information, assets, documentation, and review details ready.", "Oct 8, 2026", "5 min read"],
    ["Guidelines", "A clearer path from submission to publication", "Understand the stages that separate application review, QA, publication, and Gallery visibility.", "Oct 5, 2026", "4 min read"],
    ["Best practices", "How to keep an application easy to review", "Small improvements to metadata, supporting material, and version readiness can make review smoother.", "Sep 28, 2026", "6 min read"],
    ["Developer guide", "Understanding the Fonitas developer workflow", "A concise overview of the developer journey from preparation through authorized publication.", "Sep 22, 2026", "7 min read"],
    ["Quality", "Common mistakes that slow down application review", "Review the details developers most often need to revisit before an application can move forward.", "Sep 16, 2026", "5 min read"],
    ["Updates", "Keeping your published application maintainable", "What to consider when preparing new versions, updating assets, and responding to review feedback.", "Sep 10, 2026", "6 min read"],
  ],
  fa: [
    ["انتشار", "قبل از ارسال اپلیکیشن چه چیزهایی را آماده کنیم؟", "چک‌لیستی کاربردی برای آماده‌سازی اطلاعات محصول، دارایی‌ها، مستندات و جزئیات بررسی.", "۸ اکتبر ۲۰۲۶", "۵ دقیقه مطالعه"],
    ["راهنما", "مسیر روشن‌تر از ارسال تا انتشار", "تفاوت میان بررسی اپلیکیشن، QA، انتشار و نمایش در Gallery را بهتر بشناسید.", "۵ اکتبر ۲۰۲۶", "۴ دقیقه مطالعه"],
    ["بهترین روش‌ها", "چطور اپلیکیشن را برای بررسی ساده‌تر آماده کنیم؟", "بهبودهای کوچک در متادیتا، مستندات و آمادگی نسخه می‌تواند فرایند بررسی را روان‌تر کند.", "۲۸ سپتامبر ۲۰۲۶", "۶ دقیقه مطالعه"],
    ["راهنمای توسعه‌دهنده", "آشنایی با مسیر توسعه‌دهنده در Fonitas", "مروری کوتاه بر مسیر آماده‌سازی تا انتشار مجاز اپلیکیشن.", "۲۲ سپتامبر ۲۰۲۶", "۷ دقیقه مطالعه"],
    ["کیفیت", "اشتباهات رایجی که بررسی اپلیکیشن را کند می‌کنند", "جزئیاتی را بررسی کنید که توسعه‌دهندگان معمولاً پیش از ادامه فرایند نیاز به اصلاح آن‌ها دارند.", "۱۶ سپتامبر ۲۰۲۶", "۵ دقیقه مطالعه"],
    ["به‌روزرسانی", "چطور اپلیکیشن منتشرشده را قابل نگهداری نگه داریم؟", "نکاتی برای آماده‌سازی نسخه‌های جدید، به‌روزرسانی دارایی‌ها و پاسخ به بازخورد بررسی.", "۱۰ سپتامبر ۲۰۲۶", "۶ دقیقه مطالعه"],
  ],
  ar: [
    ["النشر", "ما الذي يجب تجهيزه قبل إرسال التطبيق؟", "قائمة عملية لتجهيز معلومات المنتج والأصول والمستندات وتفاصيل المراجعة.", "8 أكتوبر 2026", "5 دقائق"],
    ["الإرشادات", "مسار أوضح من الإرسال إلى النشر", "تعرّف على المراحل التي تفصل بين مراجعة التطبيق وQA والنشر والظهور في Gallery.", "5 أكتوبر 2026", "4 دقائق"],
    ["أفضل الممارسات", "كيف تجعل تطبيقك أسهل للمراجعة؟", "تحسينات بسيطة في البيانات الوصفية والمستندات وجاهزية الإصدار تجعل المراجعة أكثر سلاسة.", "28 سبتمبر 2026", "6 دقائق"],
    ["دليل المطور", "فهم مسار المطور في Fonitas", "نظرة مختصرة على رحلة المطور من التجهيز إلى النشر المصرح به.", "22 سبتمبر 2026", "7 دقائق"],
    ["الجودة", "أخطاء شائعة تؤخر مراجعة التطبيق", "راجع التفاصيل التي يحتاج المطورون غالبًا إلى تصحيحها قبل متابعة العملية.", "16 سبتمبر 2026", "5 دقائق"],
    ["التحديثات", "الحفاظ على قابلية صيانة التطبيق المنشور", "نقاط مهمة عند تجهيز الإصدارات الجديدة وتحديث الأصول والاستجابة لملاحظات المراجعة.", "10 سبتمبر 2026", "6 دقائق"],
  ],
} as const;

const copy = {
  en: { eyebrow: "Fonitas Developers", title: "Developer Blog", intro: "Practical guidance, publishing insights, and updates to help you build and publish with confidence.", featured: "Featured", latest: "Latest articles", view: "Read article", all: "All articles", categories: ["All", "Publishing", "Guidelines", "Best practices", "Quality", "Updates"] },
  fa: { eyebrow: "توسعه‌دهندگان Fonitas", title: "وبلاگ توسعه‌دهندگان", intro: "راهنماهای کاربردی، نکات انتشار و به‌روزرسانی‌هایی برای ساخت و انتشار مطمئن‌تر.", featured: "مقاله منتخب", latest: "آخرین مقالات", view: "مطالعه مقاله", all: "همه مقالات", categories: ["همه", "انتشار", "راهنما", "بهترین روش‌ها", "کیفیت", "به‌روزرسانی"] },
  ar: { eyebrow: "مطورو Fonitas", title: "مدونة المطورين", intro: "إرشادات عملية ورؤى حول النشر وتحديثات تساعدك على البناء والنشر بثقة.", featured: "مقالة مميزة", latest: "أحدث المقالات", view: "اقرأ المقال", all: "جميع المقالات", categories: ["الكل", "النشر", "الإرشادات", "أفضل الممارسات", "الجودة", "التحديثات"] },
} as const;

export default async function BlogPage() {
  const locale = (await getLocale()) as "en" | "fa" | "ar";
  const content = copy[locale];
  const articles = posts[locale];
  const featured = articles[0];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-base-200">
      <section className="relative overflow-hidden border-b border-base-300 bg-base-100" aria-labelledby="blog-title">
        <div className="pointer-events-none absolute inset-x-auto -top-[120px] left-1/2 h-80 w-[620px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1080px] px-7 pb-[42px] pt-[72px] text-center max-md:px-5 max-md:pb-[34px] max-md:pt-[52px]">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-primary">{content.eyebrow}</p>
          <h1 id="blog-title" className="m-0 mt-3 text-[clamp(42px,6vw,68px)] font-bold leading-[1.02] tracking-[-0.045em] text-base-content">{content.title}</h1>
          <p className="mx-auto mt-3 max-w-[650px] text-[17px] leading-[1.7] text-base-content/65 max-md:text-[15px]">{content.intro}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 max-md:justify-start" aria-label={content.all}>
            {content.categories.map((category, index) => (
              <button type="button" className={index === 0 ? "btn btn-primary min-h-0 rounded-full px-4 py-2 text-[13px]" : "btn btn-ghost min-h-0 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-[13px] font-normal text-base-content/70 hover:border-primary hover:bg-primary/5"} key={category}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-7 pb-20 pt-12 max-md:px-[18px] max-md:pb-14 max-md:pt-8" aria-labelledby="featured-title">
        <div className="grid min-h-[330px] grid-cols-[1fr_1.15fr] overflow-hidden rounded-[24px] border border-base-300 bg-base-100 shadow-lg max-md:grid-cols-1">
          <div className="grid min-h-[180px] place-items-center bg-primary/10 text-[120px] font-extrabold tracking-[-0.08em] text-primary max-md:text-[90px]" aria-hidden="true"><span>F</span></div>
          <div className="flex flex-col p-[46px] max-md:p-7">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-primary">{content.featured}</p>
            <h2 id="featured-title" className="mb-0 mt-2 text-[34px] font-bold leading-[1.15] tracking-[-0.035em] text-base-content max-md:text-[28px]">{featured[1]}</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-base-content/65">{featured[2]}</p>
            <div className="mt-6 flex flex-wrap gap-[18px] text-xs text-base-content/55">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" />{featured[3]}</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" />{featured[4]}</span>
            </div>
            <Link href="#latest" className="mt-6 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-primary hover:text-primary/80 focus-visible:outline-none">{content.view}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="mt-[62px] flex items-end justify-between gap-5 max-md:mt-11 max-md:flex-col max-md:items-start" id="latest">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-primary">{content.eyebrow}</p>
            <h2 className="m-0 mt-2 text-[32px] font-bold tracking-[-0.035em] text-base-content">{content.latest}</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-100 px-3 py-2 text-xs text-base-content/60"><Tag size={15} aria-hidden="true" />{articles.length}</span>
        </div>

        <div className="mt-[22px] grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
          {articles.slice(1).map((article, index) => (
            <article className="flex min-h-[250px] overflow-hidden rounded-[20px] border border-base-300 bg-base-100 transition hover:-translate-y-0.5 hover:shadow-lg" key={article[1]}>
              <div className="flex w-[86px] shrink-0 items-start justify-center bg-primary/5 pt-[22px] text-xs font-bold text-primary/50 max-sm:w-16" aria-hidden="true"><span>0{index + 2}</span></div>
              <div className="flex flex-1 flex-col p-[26px_28px] max-sm:p-[22px_18px]">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-primary">{article[0]}</p>
                <h3 className="mb-0 mt-2 text-[21px] font-bold leading-[1.28] text-base-content max-sm:text-[19px]">{article[1]}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-base-content/65">{article[2]}</p>
                <div className="mt-auto flex justify-between gap-3 pt-6 text-[11px] text-base-content/50 max-sm:flex-col max-sm:gap-1">
                  <span>{article[3]}</span><span>{article[4]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
