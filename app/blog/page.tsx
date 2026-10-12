import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Tag } from "lucide-react";
import { getLocale } from "next-intl/server";

const posts = {
  en: [
    ["Company", "Why FONITAS is building a publishing partner", "The opportunity behind a dedicated operating layer for application publishing, distribution, promotion, and growth.", "Oct 8, 2026", "5 min read"],
    ["Market", "The opportunity beyond application development", "Why application producers need partners that can help turn finished products into distributed and visible businesses.", "Oct 5, 2026", "4 min read"],
    ["Business model", "From publishing to long-term partnership", "How recurring publishing, distribution, promotion, and growth needs can support a partner-led business model.", "Sep 28, 2026", "6 min read"],
    ["Strategy", "Building the infrastructure behind application growth", "The strategic direction for creating a scalable operating layer between application producers and digital marketplaces.", "Sep 22, 2026", "7 min read"],
    ["Growth", "Where a publishing partner can create leverage", "The areas where distribution, visibility, operational support, and marketplace relationships can compound value.", "Sep 16, 2026", "5 min read"],
    ["Investor update", "What we are building next", "A look at the priorities that can strengthen the platform, expand the partner network, and support future growth.", "Sep 10, 2026", "6 min read"],
  ],
  fa: [
    ["شرکت", "چرا FONITAS یک شریک انتشار می‌سازد؟", "فرصت ایجاد یک لایه عملیاتی تخصصی برای انتشار، توزیع، تبلیغ و رشد اپلیکیشن‌ها.", "۸ اکتبر ۲۰۲۶", "۵ دقیقه مطالعه"],
    ["بازار", "فرصتی فراتر از توسعه اپلیکیشن", "چرا تولیدکنندگان اپلیکیشن به شریکی نیاز دارند که محصول آماده را به کسب‌وکاری توزیع‌شده و دیده‌شده تبدیل کند.", "۵ اکتبر ۲۰۲۶", "۴ دقیقه مطالعه"],
    ["مدل کسب‌وکار", "از انتشار تا شراکت بلندمدت", "چطور نیازهای تکرارشونده انتشار، توزیع، تبلیغ و رشد می‌توانند یک مدل کسب‌وکار شراکت‌محور بسازند.", "۲۸ سپتامبر ۲۰۲۶", "۶ دقیقه مطالعه"],
    ["استراتژی", "ساخت زیرساخت پشت رشد اپلیکیشن‌ها", "مسیر استراتژیک ایجاد یک لایه عملیاتی مقیاس‌پذیر میان تولیدکنندگان اپلیکیشن و مارکت‌های دیجیتال.", "۲۲ سپتامبر ۲۰۲۶", "۷ دقیقه مطالعه"],
    ["رشد", "یک شریک انتشار کجا می‌تواند اهرم ایجاد کند؟", "حوزه‌هایی که توزیع، دیده‌شدن، پشتیبانی عملیاتی و روابط مارکتی می‌توانند ارزش را تقویت کنند.", "۱۶ سپتامبر ۲۰۲۶", "۵ دقیقه مطالعه"],
    ["به‌روزرسانی سرمایه‌گذاری", "قدم بعدی ما چیست؟", "نگاهی به اولویت‌هایی که می‌توانند پلتفرم و شبکه شرکا را تقویت کرده و از رشد آینده حمایت کنند.", "۱۰ سپتامبر ۲۰۲۶", "۶ دقیقه مطالعه"],
  ],
  ar: [
    ["الشركة", "لماذا تبني FONITAS شريكًا للنشر؟", "الفرصة وراء إنشاء طبقة تشغيلية متخصصة للنشر والتوزيع والترويج والنمو.", "8 أكتوبر 2026", "5 دقائق"],
    ["السوق", "الفرصة تتجاوز تطوير التطبيقات", "لماذا يحتاج منتجو التطبيقات إلى شريك يساعدهم على تحويل المنتجات الجاهزة إلى أعمال موزعة ومرئية.", "5 أكتوبر 2026", "4 دقائق"],
    ["نموذج الأعمال", "من النشر إلى الشراكة طويلة الأمد", "كيف يمكن للاحتياجات المتكررة في النشر والتوزيع والترويج والنمو أن تدعم نموذجًا قائمًا على الشراكة.", "28 سبتمبر 2026", "6 دقائق"],
    ["الاستراتيجية", "بناء البنية التحتية وراء نمو التطبيقات", "الاتجاه الاستراتيجي لبناء طبقة تشغيلية قابلة للتوسع بين منتجي التطبيقات والأسواق الرقمية.", "22 سبتمبر 2026", "7 دقائق"],
    ["النمو", "أين يمكن لشريك النشر أن يصنع الرافعة؟", "المجالات التي يمكن أن يضاعف فيها التوزيع والظهور والدعم التشغيلي والعلاقات مع الأسواق القيمة.", "16 سبتمبر 2026", "5 دقائق"],
    ["تحديث المستثمر", "ما الذي نبنيه بعد ذلك؟", "نظرة على الأولويات التي يمكن أن تعزز المنصة وشبكة الشركاء وتدعم النمو المستقبلي.", "10 سبتمبر 2026", "6 دقائق"],
  ],
} as const;

const copy = {
  en: { eyebrow: "FONITAS Investors", title: "Investor Insights", intro: "Company perspectives, market observations, and strategic updates for investors and partners.", featured: "Featured", latest: "Latest insights", view: "Read insight", all: "All insights", categories: ["All", "Company", "Market", "Business model", "Strategy", "Growth"] },
  fa: { eyebrow: "سرمایه‌گذاران FONITAS", title: "بینش سرمایه‌گذاری", intro: "دیدگاه‌های شرکت، تحلیل فرصت بازار و به‌روزرسانی‌های استراتژیک برای سرمایه‌گذاران و شرکا.", featured: "مقاله منتخب", latest: "آخرین مطالب", view: "مطالعه مطلب", all: "همه مطالب", categories: ["همه", "شرکت", "بازار", "مدل کسب‌وکار", "استراتژی", "رشد"] },
  ar: { eyebrow: "مستثمرو FONITAS", title: "رؤى المستثمرين", intro: "رؤى الشركة وملاحظات السوق والتحديثات الاستراتيجية للمستثمرين والشركاء.", featured: "مقالة مميزة", latest: "أحدث الرؤى", view: "اقرأ المقال", all: "جميع المقالات", categories: ["الكل", "الشركة", "السوق", "نموذج الأعمال", "الاستراتيجية", "النمو"] },
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
              <button type="button" className={index === 0 ? "btn btn-primary min-h-0 rounded-full px-4 py-2 text-[13px]" : "btn btn-ghost min-h-0 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-[13px] font-normal text-base-content/70 hover:border-primary hover:bg-primary/5"} key={category}>{category}</button>
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
            <div className="mt-6 flex flex-wrap gap-[18px] text-xs text-base-content/55"><span className="inline-flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" />{featured[3]}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" />{featured[4]}</span></div>
            <Link href="#latest" className="mt-6 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-primary hover:text-primary/80 focus-visible:outline-none">{content.view}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="mt-[62px] flex items-end justify-between gap-5 max-md:mt-11 max-md:flex-col max-md:items-start" id="latest">
          <div><p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-primary">{content.eyebrow}</p><h2 className="m-0 mt-2 text-[32px] font-bold tracking-[-0.035em] text-base-content">{content.latest}</h2></div>
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
                <div className="mt-auto flex justify-between gap-3 pt-6 text-[11px] text-base-content/50 max-sm:flex-col max-sm:gap-1"><span>{article[3]}</span><span>{article[4]}</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
