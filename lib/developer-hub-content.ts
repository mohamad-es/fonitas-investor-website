export type HubLocale = "en" | "fa" | "ar";

export type HubPage = {
  title: string;
  intro: string;
  sections: { title: string; body: string; items?: string[] }[];
};

const en = {
  home: {
    title: "The Fonitas Developer Hub",
    intro: "Everything you need to understand how Fonitas works, prepare an application, and publish with confidence.",
    sections: [
      { title: "Start with the model", body: "Fonitas is the publisher. You are the developer or application owner. This website explains the rules and workflow; the separate Developer Dashboard handles authenticated work." },
      { title: "Prepare before you submit", body: "Use the requirements and guidelines before creating an application so your product, documentation, assets, and publisher information are ready for review." },
      { title: "Know what happens next", body: "After submission, Fonitas reviews the application. Accepted products continue through the supported contract, QA, and publication process. Publication and Gallery visibility are controlled separately." }
    ]
  },
  "how-it-works": {
    title: "How Fonitas works",
    intro: "A clear path from developer setup to a published application.",
    sections: [
      { title: "1. Become a developer", body: "Create your Fonitas account and provide the person, company, or team information required by the onboarding process." },
      { title: "2. Prepare an application", body: "Create your application in the separate Developer Dashboard. Keep its product information, assets, technical details, and documentation aligned with these published requirements." },
      { title: "3. Submit for review", body: "Submit the application through the Dashboard. Fonitas reviews it and may request changes before acceptance. Developers cannot approve their own applications.", items: ["Review is performed by Fonitas, not by the developer.", "Requested changes should be addressed and resubmitted through the Dashboard.", "Do not treat profile completion as application approval."] },
      { title: "4. Contract and QA", body: "An accepted application proceeds through the supported store-compatible contract and version QA gates. Required artifacts and checklist items must be satisfied before authorized publication." },
      { title: "5. Publication and Gallery", body: "Publication is a distinct stage. A published store listing and explicit Gallery eligibility are required before an application can be marketed through Gallery." }
    ]
  },
  requirements: {
    title: "Developer & application requirements",
    intro: "Use this checklist before you start. Exact field-level requirements are owned by the current Fonitas backend contracts and may evolve.",
    sections: [
      { title: "Developer information", body: "Be ready to provide accurate ownership and contact information for the person, company, or development team responsible for the application.", items: ["Use accurate legal and contact information.", "Keep your developer profile current.", "Only provide information you are authorized to represent."] },
      { title: "Application information", body: "Your application should be understandable to both reviewers and future users.", items: ["Clear product identity and description.", "Complete application metadata required by the Dashboard.", "Accurate screenshots, icons, media, and supporting assets where required.", "Documentation and support information appropriate to the product."] },
      { title: "Technical readiness", body: "Before submission, make sure the application matches the supported Fonitas contract and is ready for QA. Do not rely on undocumented behavior or assumptions about approval." },
      { title: "Ownership and permissions", body: "The backend remains authoritative for organization membership, application access, review decisions, and publication permission. Never assume that completing a form grants publishing rights." }
    ]
  },
  guidelines: {
    title: "Guidelines & publishing rules",
    intro: "These principles define the boundary between preparing an application and getting it published.",
    sections: [
      { title: "Be accurate", body: "Product claims, ownership information, application metadata, and supporting material should be truthful and kept up to date." },
      { title: "Respect the review process", body: "Fonitas controls acceptance. A developer can submit and respond to requested changes, but cannot self-approve or bypass review." },
      { title: "Keep versions reviewable", body: "Changes that affect a published application may require the supported version, QA, artifact, or publication gates. Treat the Dashboard and backend state as authoritative." },
      { title: "Publication is not automatic", body: "Profile completion or application acceptance does not by itself make a product visible in Gallery. Publication and Gallery eligibility are separate backend-controlled stages." },
      { title: "Do not invent platform behavior", body: "If a rule, field, status, or publishing capability is not documented here or exposed by the current Dashboard contract, do not assume it exists. Contact Fonitas support for clarification." }
    ]
  },
  faq: {
    title: "Frequently asked questions",
    intro: "Short answers to the questions developers usually have before starting.",
    sections: [
      { title: "Is this the Developer Dashboard?", body: "No. This is the public Developer Hub for documentation, requirements, rules, and onboarding guidance. Authenticated application management belongs to a separate Developer Dashboard." },
      { title: "Does completing my developer profile publish my app?", body: "No. Profile completion does not approve an application, grant a publisher role, establish payout eligibility, or create Gallery visibility." },
      { title: "Who approves an application?", body: "Fonitas performs the acceptance process. Developers cannot approve their own applications." },
      { title: "Can one developer account own more than one application?", body: "Yes. An organization/developer identity can be associated with multiple applications, subject to the backend permissions and application contracts." },
      { title: "When does Gallery visibility happen?", body: "Gallery visibility is a separate stage. An existing published listing and explicit eligibility/opt-in are required; acceptance alone is not enough." },
      { title: "Where do I manage my application?", body: "Use the separate Developer Dashboard for authenticated application work. This website remains the source for public explanations and guidelines." }
    ]
  }
} satisfies Record<string, HubPage>;

const fa = {
  home: {
    title: "مرکز توسعه‌دهندگان فونیتاس",
    intro: "هر چیزی که برای شناخت فرایند فونیتاس، آماده‌سازی اپلیکیشن و انتشار مطمئن نیاز دارید.",
    sections: [
      { title: "مدل همکاری را بشناسید", body: "Fonitas ناشر است و شما توسعه‌دهنده یا مالک اپلیکیشن هستید. این وب‌سایت قوانین و فرایند را توضیح می‌دهد و داشبورد جداگانه توسعه‌دهندگان برای کارهای احراز هویت‌شده استفاده می‌شود." },
      { title: "قبل از ارسال آماده شوید", body: "پیش از ساخت اپلیکیشن، الزامات و راهنماها را بررسی کنید تا محصول، مستندات، دارایی‌ها و اطلاعات ناشر برای بررسی آماده باشند." },
      { title: "مراحل بعدی را بدانید", body: "پس از ارسال، Fonitas اپلیکیشن را بررسی می‌کند. موارد پذیرفته‌شده وارد فرایند قرارداد، کنترل کیفیت و انتشار می‌شوند. انتشار و نمایش در Gallery مراحل جداگانه هستند." }
    ]
  },
  "how-it-works": {
    title: "Fonitas چگونه کار می‌کند؟",
    intro: "مسیر روشن از آماده‌سازی توسعه‌دهنده تا انتشار اپلیکیشن.",
    sections: [
      { title: "۱. به‌عنوان توسعه‌دهنده آماده شوید", body: "حساب Fonitas را ایجاد کنید و اطلاعات لازم برای شخص، شرکت یا تیم توسعه‌دهنده را تکمیل کنید." },
      { title: "۲. اپلیکیشن را آماده کنید", body: "اپلیکیشن را در داشبورد جداگانه توسعه‌دهندگان ایجاد کنید و اطلاعات محصول، دارایی‌ها، جزئیات فنی و مستندات را مطابق الزامات آماده کنید." },
      { title: "۳. برای بررسی ارسال کنید", body: "اپلیکیشن را از طریق داشبورد ارسال کنید. Fonitas آن را بررسی می‌کند و ممکن است اصلاحاتی درخواست کند. توسعه‌دهنده نمی‌تواند اپلیکیشن خودش را تأیید کند.", items: ["بررسی توسط Fonitas انجام می‌شود.", "اصلاحات درخواستی باید در داشبورد انجام و دوباره ارسال شوند.", "تکمیل پروفایل به معنی تأیید اپلیکیشن نیست."] },
      { title: "۴. قرارداد و کنترل کیفیت", body: "اپلیکیشن پذیرفته‌شده وارد مراحل قرارداد سازگار با فروشگاه و کنترل کیفیت نسخه می‌شود. دارایی‌ها و چک‌لیست‌های لازم باید پیش از انتشار مجاز تکمیل شوند." },
      { title: "۵. انتشار و Gallery", body: "انتشار یک مرحله مستقل است. برای نمایش در Gallery، وجود لیست منتشرشده و شرایط/اجازه لازم است." }
    ]
  },
  requirements: {
    title: "الزامات توسعه‌دهنده و اپلیکیشن",
    intro: "قبل از شروع این چک‌لیست را بررسی کنید. جزئیات فیلدها توسط قراردادهای فعلی بک‌اند Fonitas تعیین می‌شوند و ممکن است تغییر کنند.",
    sections: [
      { title: "اطلاعات توسعه‌دهنده", body: "اطلاعات دقیق مالکیت و تماس شخص، شرکت یا تیم مسئول اپلیکیشن را آماده کنید.", items: ["اطلاعات قانونی و تماس دقیق وارد کنید.", "پروفایل توسعه‌دهنده را به‌روز نگه دارید.", "فقط اطلاعاتی را ارائه کنید که مجاز به نمایندگی از آن هستید."] },
      { title: "اطلاعات اپلیکیشن", body: "اپلیکیشن باید برای بررسی‌کننده و کاربر آینده قابل درک باشد.", items: ["هویت و توضیح روشن محصول.", "متادیتای کامل موردنیاز داشبورد.", "اسکرین‌شات، آیکن، رسانه و دارایی‌های لازم.", "مستندات و اطلاعات پشتیبانی مناسب محصول."] },
      { title: "آمادگی فنی", body: "قبل از ارسال مطمئن شوید اپلیکیشن با قرارداد پشتیبانی‌شده Fonitas سازگار و آماده QA است. به رفتارهای مستندنشده یا فرضیات درباره تأیید تکیه نکنید." },
      { title: "مالکیت و دسترسی", body: "بک‌اند مرجع نهایی عضویت سازمان، دسترسی اپلیکیشن، تصمیم بررسی و مجوز انتشار است. تکمیل فرم به‌تنهایی مجوز انتشار ایجاد نمی‌کند." }
    ]
  },
  guidelines: {
    title: "راهنما و قوانین انتشار",
    intro: "این اصول مرز میان آماده‌سازی اپلیکیشن و انتشار آن را مشخص می‌کنند.",
    sections: [
      { title: "دقیق باشید", body: "ادعاهای محصول، اطلاعات مالکیت، متادیتای اپلیکیشن و محتوای پشتیبان باید واقعی و به‌روز باشند." },
      { title: "فرایند بررسی را رعایت کنید", body: "تأیید توسط Fonitas انجام می‌شود. توسعه‌دهنده می‌تواند ارسال و اصلاحات را انجام دهد اما نمی‌تواند بررسی را دور بزند یا خودش تأیید کند." },
      { title: "نسخه‌ها را قابل بررسی نگه دارید", body: "تغییرات مهم ممکن است نیازمند مراحل نسخه، QA، دارایی یا انتشار باشند. وضعیت داشبورد و بک‌اند مرجع نهایی هستند." },
      { title: "انتشار خودکار نیست", body: "تکمیل پروفایل یا پذیرش اپلیکیشن به‌تنهایی باعث نمایش در Gallery نمی‌شود. انتشار و شرایط Gallery جداگانه کنترل می‌شوند." },
      { title: "رفتار پلتفرم را حدس نزنید", body: "اگر قانون، فیلد، وضعیت یا قابلیت انتشار در این راهنما یا قرارداد داشبورد مشخص نشده، وجود آن را فرض نکنید و برای ابهام با پشتیبانی Fonitas تماس بگیرید." }
    ]
  },
  faq: {
    title: "سؤالات متداول",
    intro: "پاسخ کوتاه به پرسش‌هایی که توسعه‌دهندگان پیش از شروع دارند.",
    sections: [
      { title: "آیا این همان Developer Dashboard است؟", body: "خیر. اینجا مرکز عمومی مستندات، الزامات، قوانین و راهنمای شروع است. مدیریت احراز هویت‌شده اپلیکیشن در داشبورد جداگانه انجام می‌شود." },
      { title: "آیا تکمیل پروفایل باعث انتشار می‌شود؟", body: "خیر. تکمیل پروفایل باعث تأیید اپلیکیشن، اعطای نقش ناشر، احراز شرایط تسویه یا نمایش در Gallery نمی‌شود." },
      { title: "چه کسی اپلیکیشن را تأیید می‌کند؟", body: "فرایند پذیرش توسط Fonitas انجام می‌شود و توسعه‌دهنده نمی‌تواند اپلیکیشن خودش را تأیید کند." },
      { title: "آیا یک توسعه‌دهنده می‌تواند چند اپلیکیشن داشته باشد؟", body: "بله. هویت توسعه‌دهنده/سازمان می‌تواند طبق دسترسی‌ها و قراردادهای بک‌اند مالک چند اپلیکیشن باشد." },
      { title: "چه زمانی اپلیکیشن در Gallery نمایش داده می‌شود؟", body: "Gallery مرحله‌ای جداگانه است و به لیست منتشرشده و شرایط یا opt-in لازم نیاز دارد؛ پذیرش به‌تنهایی کافی نیست." },
      { title: "اپلیکیشن را کجا مدیریت کنم؟", body: "برای کارهای احراز هویت‌شده از Developer Dashboard جداگانه استفاده کنید. این سایت منبع توضیحات و قوانین عمومی باقی می‌ماند." }
    ]
  }
} satisfies Record<string, HubPage>;

const ar = {
  home: {
    title: "مركز مطوري Fonitas",
    intro: "كل ما تحتاجه لفهم طريقة عمل Fonitas وتجهيز تطبيقك ونشره بثقة.",
    sections: [
      { title: "افهم النموذج", body: "Fonitas هي الناشر، وأنت المطور أو مالك التطبيق. يشرح هذا الموقع القواعد وسير العمل، بينما يتولى لوحة المطور المنفصلة المهام التي تتطلب تسجيل الدخول." },
      { title: "استعد قبل الإرسال", body: "راجع المتطلبات والإرشادات قبل إنشاء التطبيق حتى تكون معلومات المنتج والوثائق والأصول وبيانات الناشر جاهزة للمراجعة." },
      { title: "اعرف ما يحدث بعد ذلك", body: "بعد الإرسال تراجع Fonitas التطبيق. تنتقل التطبيقات المقبولة إلى مراحل العقد وضمان الجودة والنشر. النشر والظهور في Gallery مرحلتان منفصلتان." }
    ]
  },
  "how-it-works": {
    title: "كيف تعمل Fonitas؟",
    intro: "مسار واضح من إعداد المطور إلى نشر التطبيق.",
    sections: [
      { title: "١. جهّز نفسك كمطور", body: "أنشئ حساب Fonitas وقدّم المعلومات المطلوبة للشخص أو الشركة أو فريق التطوير." },
      { title: "٢. جهّز التطبيق", body: "أنشئ التطبيق في لوحة المطور المنفصلة، وحافظ على اتساق معلومات المنتج والأصول والتفاصيل التقنية والوثائق مع المتطلبات المنشورة." },
      { title: "٣. أرسل للمراجعة", body: "أرسل التطبيق من خلال اللوحة. تراجعه Fonitas وقد تطلب تعديلات قبل القبول. لا يمكن للمطور اعتماد تطبيقه بنفسه.", items: ["المراجعة تتم بواسطة Fonitas.", "يجب تنفيذ التعديلات المطلوبة وإعادة الإرسال من خلال اللوحة.", "إكمال الملف الشخصي لا يعني قبول التطبيق."] },
      { title: "٤. العقد وضمان الجودة", body: "ينتقل التطبيق المقبول إلى مراحل العقد المتوافق مع المتجر وضمان جودة الإصدار. يجب استيفاء الأصول وقائمة التحقق قبل النشر المصرح به." },
      { title: "٥. النشر وGallery", body: "النشر مرحلة مستقلة. يلزم وجود إدراج منشور واستيفاء شروط Gallery أو الاشتراك المطلوب قبل التسويق عبر Gallery." }
    ]
  },
  requirements: {
    title: "متطلبات المطور والتطبيق",
    intro: "استخدم هذه القائمة قبل البدء. التفاصيل الدقيقة للحقول يحددها عقد Fonitas الخلفي الحالي وقد تتغير.",
    sections: [
      { title: "معلومات المطور", body: "جهّز معلومات ملكية واتصال دقيقة للشخص أو الشركة أو الفريق المسؤول عن التطبيق.", items: ["استخدم معلومات قانونية ومعلومات اتصال دقيقة.", "حافظ على تحديث ملف المطور.", "قدّم فقط المعلومات التي تملك صلاحية تمثيلها."] },
      { title: "معلومات التطبيق", body: "يجب أن يكون التطبيق واضحاً للمراجعين والمستخدمين المستقبليين.", items: ["هوية ووصف واضح للمنتج.", "بيانات التطبيق المطلوبة في لوحة المطور.", "لقطات الشاشة والأيقونات والوسائط والأصول المطلوبة.", "وثائق ومعلومات دعم مناسبة للمنتج."] },
      { title: "الجاهزية التقنية", body: "قبل الإرسال تأكد من توافق التطبيق مع عقد Fonitas المدعوم واستعداده لضمان الجودة. لا تعتمد على سلوك غير موثق أو افتراضات حول القبول." },
      { title: "الملكية والصلاحيات", body: "الخلفية هي المرجع النهائي لعضوية المؤسسة والوصول إلى التطبيق وقرارات المراجعة وصلاحيات النشر. إكمال نموذج لا يمنح صلاحية النشر تلقائياً." }
    ]
  },
  guidelines: {
    title: "الإرشادات وقواعد النشر",
    intro: "تحدد هذه المبادئ الفرق بين تجهيز التطبيق والحصول على نشره.",
    sections: [
      { title: "كن دقيقاً", body: "يجب أن تكون ادعاءات المنتج ومعلومات الملكية وبيانات التطبيق والمواد الداعمة صحيحة ومحدثة." },
      { title: "احترم المراجعة", body: "Fonitas هي التي تقوم بالقبول. يمكن للمطور الإرسال والاستجابة للتعديلات، لكنه لا يستطيع اعتماد التطبيق بنفسه أو تجاوز المراجعة." },
      { title: "اجعل الإصدارات قابلة للمراجعة", body: "قد تتطلب التغييرات مراحل الإصدار أو ضمان الجودة أو الأصول أو النشر المدعومة. حالة اللوحة والخلفية هي المرجع النهائي." },
      { title: "النشر ليس تلقائياً", body: "إكمال الملف أو قبول التطبيق لا يجعله ظاهراً في Gallery تلقائياً. النشر وأهلية Gallery مرحلتان منفصلتان." },
      { title: "لا تفترض سلوك المنصة", body: "إذا لم تكن قاعدة أو حالة أو ميزة نشر موثقة هنا أو في عقد اللوحة الحالي، فلا تفترض وجودها وتواصل مع دعم Fonitas للتوضيح." }
    ]
  },
  faq: {
    title: "الأسئلة الشائعة",
    intro: "إجابات قصيرة عن أكثر الأسئلة شيوعاً قبل البدء.",
    sections: [
      { title: "هل هذا هو Developer Dashboard؟", body: "لا. هذا مركز المطورين العام للتوثيق والمتطلبات والقواعد والإرشادات. إدارة التطبيقات التي تتطلب تسجيل الدخول تتم في لوحة مطور منفصلة." },
      { title: "هل إكمال ملف المطور ينشر التطبيق؟", body: "لا. إكمال الملف لا يعني قبول التطبيق أو منح دور ناشر أو إثبات أهلية الدفع أو إنشاء ظهور في Gallery." },
      { title: "من يوافق على التطبيق؟", body: "تقوم Fonitas بعملية القبول، ولا يمكن للمطور اعتماد تطبيقه بنفسه." },
      { title: "هل يمكن لمطور واحد امتلاك عدة تطبيقات؟", body: "نعم. يمكن لهوية المطور أو المؤسسة امتلاك عدة تطبيقات وفق صلاحيات وعقود الخلفية." },
      { title: "متى يظهر التطبيق في Gallery؟", body: "Gallery مرحلة منفصلة وتتطلب إدراجاً منشوراً واستيفاء الأهلية أو الاشتراك المطلوب؛ القبول وحده غير كافٍ." },
      { title: "أين أدير تطبيقي؟", body: "استخدم لوحة Developer Dashboard المنفصلة للمهام التي تتطلب تسجيل الدخول. يبقى هذا الموقع مصدراً للتوضيحات والقواعد العامة." }
    ]
  }
} satisfies Record<string, HubPage>;

export const developerHubContent: Record<HubLocale, Record<string, HubPage>> = { en, fa, ar };
