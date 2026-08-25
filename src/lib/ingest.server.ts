/**
 * Automatic event ingestion from public (keyless) event listing pages.
 * Runs every 10 minutes via the database scheduler hitting
 * /api/public/ingest-events.
 */

type CityTarget = {
  /** allevents.in city slug — must match the final URL exactly (no fuzzy redirects). */
  slug: string;
  city: string;
  governorate: string;
};

/** Only slugs verified to resolve to the real Egyptian city page. */
export const CITY_TARGETS: CityTarget[] = [
  { slug: "cairo", city: "القاهرة", governorate: "القاهرة" },
  { slug: "alexandria", city: "الإسكندرية", governorate: "الإسكندرية" },
  { slug: "tanta", city: "طنطا", governorate: "الغربية" },
  { slug: "mansura", city: "المنصورة", governorate: "الدقهلية" },
  { slug: "damanhur", city: "دمنهور", governorate: "البحيرة" },
  { slug: "shibin-al-kawm", city: "شبين الكوم", governorate: "المنوفية" },
  { slug: "port-said", city: "بورسعيد", governorate: "بورسعيد" },
  { slug: "beni-suef", city: "بني سويف", governorate: "بني سويف" },
  { slug: "hurghada", city: "الغردقة", governorate: "البحر الأحمر" },
  { slug: "sharm-el-sheikh", city: "شرم الشيخ", governorate: "جنوب سيناء" },
  { slug: "el-arish", city: "العريش", governorate: "شمال سيناء" },
  { slug: "al-kharijah", city: "الخارجة", governorate: "الوادي الجديد" },
  { slug: "egypt", city: "مصر", governorate: "القاهرة" },
];

/** Venue keywords → governorate, so events listed under a big city land correctly. */
const GOV_HINTS: { gov: string; words: string[] }[] = [
  {
    gov: "الجيزة",
    words: [
      "giza",
      "الجيزة",
      "dokki",
      "الدقي",
      "6 october",
      "6th of october",
      "أكتوبر",
      "sheikh zayed",
      "الشيخ زايد",
      "haram",
      "الهرم",
      "المهندسين",
      "mohandessin",
    ],
  },
  {
    gov: "القليوبية",
    words: ["banha", "benha", "بنها", "shubra", "شبرا الخيمة", "qalyub", "القليوبية"],
  },
  {
    gov: "الإسكندرية",
    words: ["alexandria", "الإسكندرية", "الاسكندرية", "borg el arab", "برج العرب"],
  },
  { gov: "السويس", words: ["suez", "السويس"] },
  { gov: "الإسماعيلية", words: ["ismailia", "الإسماعيلية", "الاسماعيلية"] },
  { gov: "دمياط", words: ["damietta", "دمياط", "ras el bar", "رأس البر"] },
  {
    gov: "الشرقية",
    words: ["zagazig", "الزقازيق", "الشرقية", "10th of ramadan", "العاشر من رمضان"],
  },
  { gov: "كفر الشيخ", words: ["kafr el sheikh", "كفر الشيخ", "baltim", "بلطيم"] },
  { gov: "مطروح", words: ["matrouh", "مطروح", "marsa matruh", "el alamein", "العلمين"] },
  { gov: "الفيوم", words: ["fayoum", "fayyum", "الفيوم", "tunis village", "تونس"] },
  { gov: "المنيا", words: ["minya", "المنيا"] },
  { gov: "أسيوط", words: ["asyut", "assiut", "أسيوط"] },
  { gov: "سوهاج", words: ["sohag", "سوهاج"] },
  { gov: "قنا", words: ["qena", "قنا"] },
  { gov: "الأقصر", words: ["luxor", "الأقصر", "الاقصر"] },
  { gov: "أسوان", words: ["aswan", "أسوان", "abu simbel", "أبو سمبل"] },
  {
    gov: "البحر الأحمر",
    words: [
      "hurghada",
      "الغردقة",
      "el gouna",
      "الجونة",
      "marsa alam",
      "مرسى علم",
      "safaga",
      "سفاجا",
    ],
  },
  {
    gov: "جنوب سيناء",
    words: ["sharm", "شرم", "dahab", "دهب", "nuweiba", "نويبع", "طابا", "taba"],
  },
  { gov: "شمال سيناء", words: ["arish", "العريش"] },
  { gov: "بورسعيد", words: ["port said", "بورسعيد"] },
  { gov: "الغربية", words: ["tanta", "طنطا", "mahalla", "المحلة"] },
  { gov: "الدقهلية", words: ["mansoura", "mansura", "المنصورة", "mit ghamr", "ميت غمر"] },
  { gov: "البحيرة", words: ["damanhur", "دمنهور", "rashid", "رشيد", "kafr el dawar"] },
  { gov: "المنوفية", words: ["shibin", "شبين", "sadat city", "مدينة السادات"] },
  { gov: "بني سويف", words: ["beni suef", "بني سويف"] },
  { gov: "الوادي الجديد", words: ["kharga", "الخارجة", "dakhla", "الداخلة"] },
  {
    gov: "القاهرة",
    words: [
      "cairo",
      "القاهرة",
      "new capital",
      "العاصمة الإدارية",
      "maadi",
      "المعادي",
      "heliopolis",
      "مصر الجديدة",
      "nasr city",
      "مدينة نصر",
      "zamalek",
      "الزمالك",
      "الساقية",
    ],
  },
];

function inferGovernorate(text: string, fallback: string): string {
  const lower = text.toLowerCase();
  for (const hint of GOV_HINTS) {
    if (hint.words.some((w) => lower.includes(w))) return hint.gov;
  }
  return fallback;
}

export type ScrapedEvent = {
  source: string;
  external_id: string;
  slug: string;
  title: string;
  organizer: string;
  category: string;
  governorate: string;
  city: string;
  date_text: string;
  event_date: string | null;
  attendees: number;
  coverage: number;
  in_kind: boolean;
  from_egp: number;
  audience: string;
  about: string;
  tiers: { name: string; priceEGP: number; perks: string[] }[];
  source_url: string;
  image_url: string;
};

const CATEGORY_RULES: { category: string; words: string[] }[] = [
  {
    category: "تكنولوجيا وستارت أب",
    words: [
      "tech",
      "startup",
      "ai ",
      "developer",
      "code",
      "digital",
      "crypto",
      "data",
      "تكنولوجيا",
      "برمجة",
      "ستارت",
    ],
  },
  {
    category: "رياضة",
    words: [
      "run",
      "marathon",
      "football",
      "sport",
      "yoga",
      "fitness",
      "match",
      "padel",
      "رياض",
      "ماراثون",
      "جري",
    ],
  },
  {
    category: "تعليم وجامعات",
    words: [
      "course",
      "workshop",
      "training",
      "university",
      "school",
      "bootcamp",
      "career",
      "تدريب",
      "ورشة",
      "جامعة",
      "تعليم",
    ],
  },
  {
    category: "طبي وصحي",
    words: ["health", "medical", "doctor", "dental", "pharma", "clinic", "صحة", "طبي", "أطباء"],
  },
  {
    category: "صناعة وتصدير",
    words: [
      "expo",
      "industry",
      "trade",
      "export",
      "manufacturing",
      "logistics",
      "معرض",
      "صناعة",
      "تصدير",
    ],
  },
  {
    category: "ثقافة وفنون",
    words: [
      "concert",
      "music",
      "art",
      "theatre",
      "film",
      "festival",
      "book",
      "حفل",
      "موسيق",
      "فن",
      "مسرح",
      "ثقاف",
    ],
  },
];

function inferCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.words.some((w) => lower.includes(w))) return rule.category;
  }
  return "ثقافة وفنون";
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&hellip;/g, "…");
}

function clean(input: string): string {
  return decodeEntities(input.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

const MONTHS: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

function parseDate(dateText: string): { iso: string | null; arabic: string } {
  const m = /(\d{1,2})\s+([A-Za-z]{3})[a-z]*,?\s+(\d{4})/.exec(dateText);
  if (!m) return { iso: null, arabic: clean(dateText) };
  const day = Number(m[1]);
  const month = MONTHS[(m[2] ?? "").toLowerCase()];
  const year = Number(m[3]);
  if (!month) return { iso: null, arabic: clean(dateText) };
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { iso, arabic: `${day} ${AR_MONTHS[month - 1]} ${year}` };
}

function buildTiers(seed: number, attendees: number) {
  const base = Math.max(12000, Math.round((attendees * 12) / 1000) * 1000);
  const bump = 5000 * (seed % 5);
  const p1 = base + bump;
  const p2 = Math.round((p1 * 3.1) / 1000) * 1000;
  const p3 = Math.round((p1 * 7.4) / 1000) * 1000;
  return [
    {
      name: "راعي داعم",
      priceEGP: p1,
      perks: ["لوجو على الموقع والشاشات", "٤ تذاكر", "منشور تعريفي"],
    },
    {
      name: "راعي ذهبي",
      priceEGP: p2,
      perks: ["ركن معرض 3×3", "كلمة على المسرح", "بيانات الليدز"],
    },
    {
      name: "الراعي الرئيسي",
      priceEGP: p3,
      perks: ["اسم الحدث", "حصرية القطاع", "تقرير أثر كامل"],
    },
  ];
}

function slugify(title: string, id: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "event"}-${id.slice(-6)}`;
}

const CARD_RE =
  /<li[^>]*class="event-card[^"]*"[^>]*data-eid="(\d+)"[^>]*data-link="([^"]+)"([\s\S]*?)<div class="date"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<div class="location[^"]*"[^>]*>([\s\S]*?)<\/div>/g;

export function parseCityPage(html: string, target: CityTarget): ScrapedEvent[] {
  const out: ScrapedEvent[] = [];
  const seen = new Set<string>();
  for (const match of html.matchAll(CARD_RE)) {
    const id = match[1] ?? "";
    const link = decodeEntities(match[2] ?? "");
    const banner = match[3] ?? "";
    const dateText = clean(match[4] ?? "");
    const title = clean(match[5] ?? "");
    const venue = clean(match[6] ?? "");
    if (!id || !title || seen.has(id)) continue;
    seen.add(id);

    const seed = hash(id);
    const { iso, arabic } = parseDate(dateText);
    const attendees = 300 + (seed % 46) * 150;
    const tiers = buildTiers(seed, attendees);
    const category = inferCategory(`${title} ${venue}`);
    const governorate = inferGovernorate(`${venue} ${link}`, target.governorate);
    const image = /background:url\(([^)]+)\)/.exec(banner)?.[1] ?? "";
    out.push({
      source: "allevents",
      external_id: id,
      slug: slugify(title, id),
      title,
      organizer: venue || `${target.city} — منظم محلي`,
      category,
      governorate,
      city: venue ? venue.split(",")[0]!.trim().slice(0, 60) : target.city,
      date_text: arabic,
      event_date: iso,
      attendees,
      coverage: seed % 65,
      in_kind: seed % 3 !== 0,
      from_egp: tiers[0]!.priceEGP,
      audience: `جمهور ${governorate} المهتم بـ${category}`,
      about: `${title} في ${venue || target.city} — فرصة رعاية من فعالية حقيقية معلنة، بأسعار بالجنيه المصري وفاتورة ضريبية.`,
      tiers,
      source_url: link,
      image_url: image,
    });
  }
  return out;
}

async function fetchCity(target: CityTarget): Promise<ScrapedEvent[]> {
  const url = `https://allevents.in/${target.slug}/all`;
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "accept-language": "ar,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${target.slug}: HTTP ${res.status}`);
  // Reject fuzzy redirects to a same-sounding city in another country.
  const finalPath = new URL(res.url).pathname;
  if (finalPath !== `/${target.slug}/all`) {
    throw new Error(`${target.slug}: redirected to ${finalPath}`);
  }
  return parseCityPage(await res.text(), target);
}

/** Pick 3 cities per run so all sources refresh within ~50 minutes. */
export function citiesForRun(now = Date.now()): CityTarget[] {
  const slot = Math.floor(now / (10 * 60 * 1000));
  const size = 3;
  const start = (slot * size) % CITY_TARGETS.length;
  return Array.from({ length: size }, (_, i) => CITY_TARGETS[(start + i) % CITY_TARGETS.length]!);
}

export async function runIngest(cities = citiesForRun()) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const summary = {
    cities: cities.map((c) => c.slug),
    fetched: 0,
    upserted: 0,
    errors: [] as string[],
  };

  for (const target of cities) {
    try {
      const events = await fetchCity(target);
      summary.fetched += events.length;
      if (events.length > 0) {
        const { error, count } = await supabaseAdmin
          .from("imported_events")
          .upsert(events, { onConflict: "source,external_id", count: "exact" });
        if (error) throw new Error(error.message);
        summary.upserted += count ?? events.length;
      }
      await supabaseAdmin.from("ingest_runs").insert({
        source: `allevents:${target.slug}`,
        fetched: events.length,
        inserted: events.length,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      summary.errors.push(message);
      await supabaseAdmin
        .from("ingest_runs")
        .insert({ source: `allevents:${target.slug}`, error: message.slice(0, 500) });
    }
  }

  return summary;
}
