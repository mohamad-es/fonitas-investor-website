export type HubLocale = "en" | "fa" | "ar";

export type HubPage = {
  title: string;
  intro: string;
  sections: { title: string; body: string; items?: string[] }[];
};

const en = {
  home: {
    title: "The FONITAS Investor Overview",
    intro: "A concise view of the company, the opportunity, and the platform we are building for application publishing and growth.",
    sections: [
      { title: "The opportunity", body: "FONITAS is building a specialized publishing partner for application creators, connecting publishing, promotion, distribution, and growth support in one operating model." },
      { title: "The problem we address", body: "Application creators often need more than a store listing. They need a partner that can help navigate publishing requirements, marketplace distribution, visibility, and ongoing growth." },
      { title: "The long-term vision", body: "Our goal is to become a trusted infrastructure and operating partner for application businesses expanding across digital marketplaces." }
    ]
  },
  "how-it-works": {
    title: "Why FONITAS",
    intro: "FONITAS is positioned as a publishing and growth partner for application creators, not as an application builder.",
    sections: [
      { title: "1. Publishing partnership", body: "FONITAS helps application producers navigate the operational side of getting products published and distributed across relevant digital marketplaces." },
      { title: "2. Distribution and visibility", body: "The model extends beyond publication by creating opportunities for application promotion, marketplace visibility, and broader distribution." },
      { title: "3. A partner for growth", body: "The relationship is designed around the ongoing needs of application businesses rather than a one-time publishing transaction.", items: ["Publishing support and operational guidance.", "Promotion and distribution capabilities.", "Long-term partnership around application growth."] },
      { title: "4. Built for application producers", body: "FONITAS is designed for developers, studios, publishers, and application owners that want a dedicated partner on the publishing and growth side of their business." },
      { title: "5. A scalable platform opportunity", body: "As the application ecosystem grows, a specialized partner layer can capture value across publishing, distribution, promotion, and related services." }
    ]
  },
  requirements: {
    title: "Market Opportunity",
    intro: "The application ecosystem continues to create demand for specialized infrastructure and partners that can help products reach users and marketplaces.",
    sections: [
      { title: "A growing application economy", body: "More developers and companies are building digital products, creating a larger addressable ecosystem for publishing, distribution, and growth services." },
      { title: "Fragmented publishing needs", body: "Creators can face different marketplace requirements, operational workflows, promotion challenges, and distribution decisions. A specialized partner can simplify this complexity." },
      { title: "Recurring demand", body: "Publishing is not the only need. Applications require updates, promotion, distribution, visibility, and ongoing operational support throughout their lifecycle." },
      { title: "Room for a dedicated partner", body: "FONITAS aims to occupy the partner layer between application producers and the marketplaces where their products need to compete." }
    ]
  },
  guidelines: {
    title: "Investment Opportunity",
    intro: "FONITAS is building a business around the recurring operational needs of application producers and the expanding digital application economy.",
    sections: [
      { title: "Business model", body: "The model is designed around services and partnerships connected to application publishing, promotion, distribution, and growth." },
      { title: "Why now", body: "The continued expansion of digital applications increases the need for reliable partners that can help creators move from product development to market distribution." },
      { title: "Scalable direction", body: "A focused publishing-partner model can expand across applications, producers, marketplaces, and adjacent services as the operating platform matures." },
      { title: "Capital purpose", body: "Investment can support platform development, marketplace expansion, commercial growth, operational capabilities, and the infrastructure required to scale the partner network." },
      { title: "Investor process", body: "Verified financials, current traction, forecasts, ownership information, and fundraising terms should be evaluated through the formal investor process rather than assumed from public website copy." }
    ]
  },
  faq: {
    title: "Investor Frequently Asked Questions",
    intro: "A concise introduction to FONITAS for investors and strategic partners.",
    sections: [
      { title: "What is FONITAS?", body: "FONITAS is a publishing partner for application producers, helping connect application publishing with promotion, distribution, and growth services." },
      { title: "Is FONITAS an application builder?", body: "No. FONITAS is not positioned as an app-building platform. Its focus is the publishing, distribution, promotion, and growth side of the application lifecycle." },
      { title: "Who is the target customer?", body: "The target audience includes developers, studios, publishers, companies, and application owners that need support beyond simply creating a product." },
      { title: "How does FONITAS create value?", body: "FONITAS aims to create value by becoming an operating partner around recurring publishing, distribution, promotion, and growth needs." },
      { title: "What information is available to investors?", body: "Detailed financials, verified traction, forecasts, ownership structure, and fundraising terms can be shared through the appropriate investor process." },
      { title: "How can I contact FONITAS about investment?", body: "Investors and strategic partners can request an investor discussion or deck through the contact option in the website header." }
    ]
  }
} satisfies Record<string, HubPage>;

const fa = {
  home: {
    title: "نمای کلی سرمایه‌گذاری FONITAS",
    intro: "نگاهی خلاصه به شرکت، فرصت بازار و پلتفرمی که FONITAS برای انتشار و رشد اپلیکیشن‌ها می‌سازد.",
    sections: [
      { title: "فرصت بازار", body: "FONITAS در حال ساخت یک شریک تخصصی انتشار برای تولیدکنندگان اپلیکیشن است که انتشار، تبلیغ، توزیع و رشد را در یک مدل عملیاتی به هم متصل می‌کند." },
      { title: "مشکلی که حل می‌کنیم", body: "تولیدکنندگان اپلیکیشن فقط به یک صفحه در فروشگاه نیاز ندارند؛ آن‌ها به شریکی برای انتشار، توزیع، دیده‌شدن و رشد محصول نیاز دارند." },
      { title: "چشم‌انداز بلندمدت", body: "هدف FONITAS تبدیل‌شدن به یک شریک قابل اعتماد برای کسب‌وکارهای اپلیکیشنی در مسیر توسعه و حضور در مارکت‌های دیجیتال است." }
    ]
  },
  "how-it-works": {
    title: "چرا FONITAS؟",
    intro: "FONITAS یک شریک انتشار و رشد برای تولیدکنندگان اپلیکیشن است، نه یک سازنده اپلیکیشن.",
    sections: [
      { title: "۱. شراکت در انتشار", body: "FONITAS بخش عملیاتی انتشار و توزیع محصولات را برای تولیدکنندگان اپلیکیشن ساده‌تر و منسجم‌تر می‌کند." },
      { title: "۲. توزیع و دیده‌شدن", body: "مدل FONITAS فقط به انتشار محدود نیست و فرصت‌هایی برای تبلیغ، دیده‌شدن در مارکت‌ها و توزیع گسترده‌تر ایجاد می‌کند." },
      { title: "۳. شریک رشد", body: "این رابطه بر نیازهای مداوم کسب‌وکارهای اپلیکیشنی بنا شده است، نه یک تراکنش یک‌باره.", items: ["پشتیبانی و راهنمایی در انتشار.", "ظرفیت‌های تبلیغ و توزیع.", "شراکت بلندمدت برای رشد اپلیکیشن."] },
      { title: "۴. ساخته‌شده برای تولیدکنندگان اپلیکیشن", body: "FONITAS برای توسعه‌دهندگان، استودیوها، ناشران و صاحبان اپلیکیشن طراحی شده که در بخش انتشار و رشد به یک شریک تخصصی نیاز دارند." },
      { title: "۵. یک فرصت مقیاس‌پذیر", body: "با رشد اکوسیستم اپلیکیشن، یک لایه تخصصی برای انتشار، توزیع، تبلیغ و خدمات مرتبط می‌تواند ارزش قابل توجهی ایجاد کند." }
    ]
  },
  requirements: {
    title: "فرصت بازار",
    intro: "رشد اکوسیستم اپلیکیشن‌ها تقاضا برای زیرساخت و شرکای تخصصی جهت رساندن محصولات به کاربران و مارکت‌ها را افزایش می‌دهد.",
    sections: [
      { title: "اقتصاد رو‌به‌رشد اپلیکیشن", body: "توسعه‌دهندگان و شرکت‌های بیشتری در حال ساخت محصولات دیجیتال هستند و این موضوع بازار بزرگ‌تری برای خدمات انتشار، توزیع و رشد ایجاد می‌کند." },
      { title: "نیازهای پراکنده انتشار", body: "تولیدکنندگان با الزامات متفاوت مارکت‌ها، فرایندهای عملیاتی، چالش‌های تبلیغاتی و تصمیمات توزیع روبه‌رو هستند. یک شریک تخصصی می‌تواند این پیچیدگی را کاهش دهد." },
      { title: "تقاضای تکرارشونده", body: "نیاز اپلیکیشن فقط انتشار نیست؛ به‌روزرسانی، تبلیغ، توزیع، دیده‌شدن و پشتیبانی عملیاتی در طول عمر محصول ادامه دارد." },
      { title: "فضا برای یک شریک تخصصی", body: "FONITAS قصد دارد لایه شراکت میان تولیدکنندگان اپلیکیشن و مارکت‌هایی باشد که محصولات باید در آن‌ها رقابت کنند." }
    ]
  },
  guidelines: {
    title: "فرصت سرمایه‌گذاری",
    intro: "FONITAS کسب‌وکاری را بر پایه نیازهای تکرارشونده تولیدکنندگان اپلیکیشن و رشد اقتصاد دیجیتال می‌سازد.",
    sections: [
      { title: "مدل کسب‌وکار", body: "مدل کسب‌وکار بر خدمات و شراکت‌هایی پیرامون انتشار، تبلیغ، توزیع و رشد اپلیکیشن‌ها طراحی شده است." },
      { title: "چرا اکنون؟", body: "گسترش مداوم اپلیکیشن‌های دیجیتال نیاز به شرکای قابل اتکا برای انتقال محصول از مرحله توسعه به بازار را بیشتر می‌کند." },
      { title: "مسیر مقیاس‌پذیری", body: "یک مدل متمرکز بر شراکت انتشار می‌تواند با بلوغ پلتفرم در میان اپلیکیشن‌ها، تولیدکنندگان، مارکت‌ها و خدمات جانبی توسعه پیدا کند." },
      { title: "کاربرد سرمایه", body: "سرمایه می‌تواند برای توسعه پلتفرم، گسترش مارکت‌ها، رشد تجاری، ظرفیت‌های عملیاتی و زیرساخت لازم برای توسعه شبکه شرکا استفاده شود." },
      { title: "فرایند سرمایه‌گذاری", body: "اطلاعات مالی تأییدشده، میزان traction، پیش‌بینی‌ها، ساختار مالکیت و شرایط جذب سرمایه باید در فرایند رسمی سرمایه‌گذاری بررسی شوند و از متن عمومی سایت برداشت نشوند." }
    ]
  },
  faq: {
    title: "سؤالات متداول سرمایه‌گذاران",
    intro: "معرفی کوتاه FONITAS برای سرمایه‌گذاران و شرکای استراتژیک.",
    sections: [
      { title: "FONITAS چیست؟", body: "FONITAS یک شریک انتشار برای تولیدکنندگان اپلیکیشن است که انتشار را به خدمات تبلیغ، توزیع و رشد متصل می‌کند." },
      { title: "آیا FONITAS سازنده اپلیکیشن است؟", body: "خیر. FONITAS یک پلتفرم ساخت اپلیکیشن نیست و تمرکز آن بر انتشار، توزیع، تبلیغ و رشد در چرخه عمر اپلیکیشن است." },
      { title: "مشتری هدف چه کسانی هستند؟", body: "توسعه‌دهندگان، استودیوهای اپلیکیشن، ناشران، شرکت‌ها و صاحبان اپلیکیشن که فراتر از ساخت محصول به خدمات انتشار و رشد نیاز دارند." },
      { title: "FONITAS چگونه ارزش ایجاد می‌کند؟", body: "FONITAS با تبدیل‌شدن به شریک عملیاتی در نیازهای تکرارشونده انتشار، توزیع، تبلیغ و رشد برای کسب‌وکارهای اپلیکیشنی ارزش ایجاد می‌کند." },
      { title: "چه اطلاعاتی برای سرمایه‌گذاران ارائه می‌شود؟", body: "اطلاعات مالی دقیق، traction تأییدشده، پیش‌بینی‌ها، ساختار مالکیت و شرایط جذب سرمایه از طریق فرایند مناسب سرمایه‌گذاری ارائه می‌شوند." },
      { title: "چطور درباره سرمایه‌گذاری با FONITAS تماس بگیریم؟", body: "سرمایه‌گذاران و شرکای استراتژیک می‌توانند از گزینه تماس یا درخواست Investor Deck در هدر سایت برای شروع گفتگو استفاده کنند." }
    ]
  }
} satisfies Record<string, HubPage>;

const ar = en;

export const developerHubContent = { en, fa, ar } satisfies Record<HubLocale, Record<string, HubPage>>;
