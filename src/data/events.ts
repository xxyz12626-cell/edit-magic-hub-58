export type SponsorTier = {
  name: string;
  priceEGP: number;
  perks: string[];
};

export const CATEGORIES = [
  "تكنولوجيا وستارت أب",
  "رياضة",
  "تعليم وجامعات",
  "ثقافة وفنون",
  "طبي وصحي",
  "صناعة وتصدير",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "أسيوط",
  "المنصورة",
  "بورسعيد",
] as const;

export type EventItem = {
  slug: string;
  title: string;
  organizer: string;
  verified: boolean;
  category: Category;
  date: string;
  city: string;
  governorate: (typeof GOVERNORATES)[number];
  attendees: number;
  coverage: number;
  inKind: boolean;
  fromEGP: number;
  audience: string;
  about: string;
  tiers: SponsorTier[];
};

export const EVENTS: EventItem[] = [
  {
    slug: "cairo-tech-summit",
    title: "قمة القاهرة للتكنولوجيا 2026",
    organizer: "Cairo Tech Community",
    verified: true,
    category: "تكنولوجيا وستارت أب",
    date: "12 سبتمبر 2026",
    city: "القاهرة الجديدة",
    governorate: "القاهرة",
    attendees: 3500,
    coverage: 68,
    inKind: true,
    fromEGP: 45000,
    audience: "مهندسو برمجيات ومؤسسو شركات ناشئة ومستثمرون، 24–40 سنة",
    about:
      "أكبر تجمع سنوي لمجتمع التكنولوجيا في مصر: يومان، ٤ مسارح، ومعرض لأكثر من ٦٠ شركة ناشئة.",
    tiers: [
      { name: "برونزي", priceEGP: 45000, perks: ["لوجو على الموقع والشاشات", "٤ تذاكر", "منشور تعريفي"] },
      { name: "ذهبي", priceEGP: 190000, perks: ["ركن معرض 3×3", "كلمة 10 دقائق", "بيانات الليدز المهتمة"] },
      { name: "الراعي الرئيسي", priceEGP: 480000, perks: ["اسم الحدث", "حصرية القطاع", "تقرير أثر كامل"] },
    ],
  },
  {
    slug: "giza-ai-hackathon",
    title: "هاكاثون الذكاء الاصطناعي – 6 أكتوبر",
    organizer: "AI Egypt",
    verified: true,
    category: "تكنولوجيا وستارت أب",
    date: "8 أغسطس 2026",
    city: "6 أكتوبر",
    governorate: "الجيزة",
    attendees: 600,
    coverage: 85,
    inKind: true,
    fromEGP: 25000,
    audience: "طلاب هندسة وحاسبات ومطورون شباب، 19–28 سنة",
    about: "٤٨ ساعة برمجة متواصلة لبناء حلول ذكاء اصطناعي لمشاكل مصرية حقيقية.",
    tiers: [
      { name: "راعي وجبات", priceEGP: 25000, perks: ["برانديج في منطقة الأكل", "لوجو على اللافتات"] },
      { name: "راعي التحدي", priceEGP: 90000, perks: ["تحدي باسم الشركة", "لجنة تحكيم", "بيانات المتسابقين"] },
      { name: "الراعي الحصري", priceEGP: 220000, perks: ["اسم الهاكاثون", "توظيف مباشر", "تقرير نتائج"] },
    ],
  },
  {
    slug: "alex-marathon",
    title: "ماراثون الإسكندرية على الكورنيش",
    organizer: "Alex Runners",
    verified: true,
    category: "رياضة",
    date: "3 نوفمبر 2026",
    city: "الإسكندرية",
    governorate: "الإسكندرية",
    attendees: 12000,
    coverage: 41,
    inKind: true,
    fromEGP: 60000,
    audience: "عائلات ومهتمون بالصحة واللياقة، 18–45 سنة",
    about: "٢١ كم على كورنيش الإسكندرية بتغطية إعلامية وبث مباشر.",
    tiers: [
      { name: "نقطة مياه", priceEGP: 60000, perks: ["ستاند برانديد", "لوجو على لافتات المسار"] },
      { name: "راعي القمصان", priceEGP: 340000, perks: ["لوجو على ١٢٠٠٠ تيشيرت", "بوث تفعيل"] },
      { name: "راعي المسار", priceEGP: 780000, perks: ["اسم الماراثون", "تغطية تليفزيونية مشتركة"] },
    ],
  },
  {
    slug: "assiut-university-career",
    title: "ملتقى التوظيف بجامعة أسيوط",
    organizer: "مركز التطوير المهني",
    verified: false,
    category: "تعليم وجامعات",
    date: "20 نوفمبر 2026",
    city: "أسيوط",
    governorate: "أسيوط",
    attendees: 4200,
    coverage: 23,
    inKind: true,
    fromEGP: 30000,
    audience: "طلاب سنوات نهائية وحديثو التخرج من الصعيد",
    about: "معرض توظيف بـ ٨٠ جناح شركة وورش مهارات على مدار ٣ أيام.",
    tiers: [
      { name: "جناح", priceEGP: 30000, perks: ["جناح 3×2", "قائمة السي فيهات"] },
      { name: "راعي الورش", priceEGP: 120000, perks: ["٣ ورش باسم الشركة", "لوجو على كل المواد"] },
    ],
  },
  {
    slug: "mansoura-health-week",
    title: "أسبوع الصحة والكشف المجاني – المنصورة",
    organizer: "مؤسسة صحة الدلتا",
    verified: true,
    category: "طبي وصحي",
    date: "5 ديسمبر 2026",
    city: "المنصورة",
    governorate: "المنصورة",
    attendees: 8000,
    coverage: 57,
    inKind: true,
    fromEGP: 35000,
    audience: "أسر محدودة الدخل في مدن ومراكز الدقهلية",
    about: "قوافل كشف وتحاليل مجانية بمشاركة ١٢٠ طبيبًا متطوعًا.",
    tiers: [
      { name: "راعي قافلة", priceEGP: 35000, perks: ["برانديج القافلة", "تقرير CSR"] },
      { name: "راعي الأسبوع", priceEGP: 260000, perks: ["اسم المبادرة", "فيديو حالة", "تقرير أثر موثق"] },
    ],
  },
  {
    slug: "portsaid-export-expo",
    title: "معرض الصناعة والتصدير – بورسعيد",
    organizer: "غرفة الصناعات الصغيرة",
    verified: true,
    category: "صناعة وتصدير",
    date: "17 يناير 2027",
    city: "بورسعيد",
    governorate: "بورسعيد",
    attendees: 2600,
    coverage: 34,
    inKind: false,
    fromEGP: 80000,
    audience: "أصحاب مصانع ومصدّرون ومشترون من إفريقيا والخليج",
    about: "٣ أيام مقابلات B2B مع مشترين دوليين وجلسات عن فتح أسواق التصدير.",
    tiers: [
      { name: "قاعة جانبية", priceEGP: 80000, perks: ["جلسة نقاش", "٤ تذاكر VIP"] },
      { name: "راعي القاعة الرئيسية", priceEGP: 620000, perks: ["اسم القاعة", "قائمة العارضين", "فاتورة ضريبية"] },
    ],
  },
  {
    slug: "cairo-art-nights",
    title: "ليالي الفن في وسط البلد",
    organizer: "استوديو مَشرَبية",
    verified: true,
    category: "ثقافة وفنون",
    date: "22 أكتوبر 2026",
    city: "وسط البلد",
    governorate: "القاهرة",
    attendees: 5400,
    coverage: 76,
    inKind: true,
    fromEGP: 40000,
    audience: "شباب مدن ومهتمون بالفن والتصوير، 20–38 سنة",
    about: "٤ ليالٍ من العروض الموسيقية والمعارض الفنية في مباني وسط البلد التاريخية.",
    tiers: [
      { name: "راعي مسرح", priceEGP: 40000, perks: ["برانديج المسرح", "ريلز مشترك"] },
      { name: "الراعي الحصري", priceEGP: 300000, perks: ["حصرية الفئة", "تفعيل ٤ أيام", "تقرير وصول"] },
    ],
  },
];

export const egp = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;
export const num = (n: number) => n.toLocaleString("ar-EG");
