export type SponsorTier = {
  name: string;
  priceEGP: number;
  perks: string[];
};

export type EventItem = {
  id: string;
  title: string;
  organizer: string;
  city: "القاهرة" | "الجيزة" | "الإسكندرية" | "العاصمة الإدارية" | "الغردقة" | "أسيوط";
  category: "تكنولوجيا" | "رياضة" | "تعليم" | "فنون" | "أعمال" | "خيري";
  date: string;
  attendees: number;
  audience: string;
  needEGP: number;
  raisedEGP: number;
  verified: boolean;
  invoice: boolean;
  tiers: SponsorTier[];
};

export const EVENTS: EventItem[] = [
  {
    id: "cairo-dev-summit",
    title: "قمة مطوري القاهرة 2026",
    organizer: "مجتمع Cairo Devs",
    city: "القاهرة",
    category: "تكنولوجيا",
    date: "12 سبتمبر 2026",
    attendees: 1800,
    audience: "مهندسو برمجيات وشركات ناشئة، 22–35 سنة",
    needEGP: 900000,
    raisedEGP: 615000,
    verified: true,
    invoice: true,
    tiers: [
      { name: "برونزي", priceEGP: 45000, perks: ["لوجو على الموقع", "٢ تذاكر", "منشور واحد"] },
      { name: "ذهبي", priceEGP: 180000, perks: ["ركن معرض 3×3", "كلمة 10 دقائق", "بيانات الحضور المهتمين"] },
      { name: "الراعي الرئيسي", priceEGP: 450000, perks: ["اسم الحدث", "٦ منشورات", "تقرير أثر كامل"] },
    ],
  },
  {
    id: "alex-run",
    title: "ماراثون الإسكندرية الساحلي",
    organizer: "Alex Runners Club",
    city: "الإسكندرية",
    category: "رياضة",
    date: "3 أكتوبر 2026",
    attendees: 5200,
    audience: "عائلات ومهتمون بالصحة، 18–45 سنة",
    needEGP: 1400000,
    raisedEGP: 380000,
    verified: true,
    invoice: true,
    tiers: [
      { name: "نقطة مياه", priceEGP: 60000, perks: ["برنديد ستاند", "لوجو على اللافتات"] },
      { name: "راعي القمصان", priceEGP: 320000, perks: ["لوجو على 5200 تيشيرت", "بوث تفعيل"] },
      { name: "راعي المسار", priceEGP: 750000, perks: ["اسم الماراثون", "تغطية تليفزيونية مشتركة"] },
    ],
  },
  {
    id: "upper-egypt-school",
    title: "معامل العلوم لمدارس أسيوط",
    organizer: "مؤسسة نور التعليمية",
    city: "أسيوط",
    category: "تعليم",
    date: "20 نوفمبر 2026",
    attendees: 900,
    audience: "طلاب إعدادي وثانوي وأولياء أمور",
    needEGP: 500000,
    raisedEGP: 122000,
    verified: false,
    invoice: true,
    tiers: [
      { name: "تجهيز معمل", priceEGP: 70000, perks: ["لوحة شكر داخل المعمل", "تقرير أثر (CSR)"] },
      { name: "راعي المشروع", priceEGP: 250000, perks: ["اسم المشروع", "فيديو حالة", "تقرير للاستدامة"] },
    ],
  },
  {
    id: "sahel-arts",
    title: "مهرجان فنون الساحل",
    organizer: "استوديو مَشرَبية",
    city: "الغردقة",
    category: "فنون",
    date: "8 أغسطس 2026",
    attendees: 3400,
    audience: "شباب مدن + سياحة داخلية، 20–38 سنة",
    needEGP: 1100000,
    raisedEGP: 890000,
    verified: true,
    invoice: false,
    tiers: [
      { name: "راعي المسرح", priceEGP: 150000, perks: ["برانديج المسرح", "ريلز مشترك"] },
      { name: "الراعي الحصري", priceEGP: 600000, perks: ["حصرية الفئة", "تفعيل ٣ أيام"] },
    ],
  },
  {
    id: "newcapital-expo",
    title: "معرض التصنيع والتصدير",
    organizer: "غرفة صناعات صغيرة",
    city: "العاصمة الإدارية",
    category: "أعمال",
    date: "17 يناير 2027",
    attendees: 2600,
    audience: "أصحاب مصانع ومستوردون ومصدّرون",
    needEGP: 1800000,
    raisedEGP: 430000,
    verified: true,
    invoice: true,
    tiers: [
      { name: "قاعة جانبية", priceEGP: 120000, perks: ["جلسة نقاش", "٤ تذاكر VIP"] },
      { name: "راعي القاعة الرئيسية", priceEGP: 850000, perks: ["اسم القاعة", "قائمة العارضين", "فاتورة ضريبية"] },
    ],
  },
  {
    id: "giza-charity-iftar",
    title: "إفطار ٥٠٠٠ أسرة – الجيزة",
    organizer: "جمعية الوفاء الخيرية",
    city: "الجيزة",
    category: "خيري",
    date: "رمضان 1448",
    attendees: 5000,
    audience: "أسر تحت خط الفقر + متطوعون",
    needEGP: 750000,
    raisedEGP: 705000,
    verified: true,
    invoice: true,
    tiers: [
      { name: "١٠٠ كرتونة", priceEGP: 45000, perks: ["برانديج على الكراتين", "تقرير توزيع"] },
      { name: "راعي المبادرة", priceEGP: 400000, perks: ["حصرية الفئة", "تقرير CSR موثق"] },
    ],
  },
];

export const CITIES = ["كل المحافظات", "القاهرة", "الجيزة", "الإسكندرية", "العاصمة الإدارية", "الغردقة", "أسيوط"] as const;
export const CATEGORIES = ["كل الأنواع", "تكنولوجيا", "رياضة", "تعليم", "فنون", "أعمال", "خيري"] as const;

export const egp = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;
