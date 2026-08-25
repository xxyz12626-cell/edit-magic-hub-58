import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarDays,
  FileText,
  Gift,
  HandCoins,
  LineChart,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";

import { PageShell } from "../components/site/PageShell";
import { CATEGORIES, EVENTS, egp, num } from "../data/events";
import { listImportedEvents } from "../lib/events.functions";
import heroImage from "../assets/hero-events.jpg";

export const Route = createFileRoute("/")({
  loader: async () => ({ imported: await listImportedEvents() }),
  errorComponent: () => (
    <PageShell>
      <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">
        حصلت مشكلة في تحميل الصفحة — جرّب تحديثها.
      </p>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">الصفحة غير موجودة.</p>
    </PageShell>
  ),
  head: () => ({
    meta: [
      { title: "سند | رعاية الفعاليات في مصر بالجنيه المصري" },
      {
        name: "description",
        content:
          "سند سوق يربط الشركات بمنظمي الفعاليات في كل محافظات مصر: أسعار بالجنيه، منظمون موثقون، فواتير ضريبية، وتقارير نتائج بعد الحدث.",
      },
      { property: "og:title", content: "سند | رعاية الفعاليات في مصر" },
      {
        property: "og:description",
        content: "ارعَ فعاليات مصرية حقيقية وشوف نتيجة فلوسك بالأرقام.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const STATS = [
  { value: "+٤٢٠", label: "فعالية مسجلة" },
  { value: "٢٧", label: "محافظة" },
  { value: "١٨ م ج.م", label: "قيمة رعايات" },
  { value: "٩٦٪", label: "تقارير مسلّمة" },
];

const PROBLEMS = [
  {
    icon: FileText,
    problem: "أسعار مخفية بالدولار",
    solution: "كل باقة معروضة بالجنيه المصري وشاملة الضريبة، من غير «كلمنا لمعرفة السعر».",
  },
  {
    icon: BadgeCheck,
    problem: "منظمون مجهولون",
    solution: "توثيق بالسجل التجاري والبطاقة الضريبية، وتقييم من رعاة سابقين.",
  },
  {
    icon: FileText,
    problem: "لا توجد فواتير رسمية",
    solution: "فاتورة إلكترونية متوافقة مع مصلحة الضرائب المصرية لكل صفقة.",
  },
  {
    icon: LineChart,
    problem: "الرعاية تنتهي بلا نتائج",
    solution: "تقرير إلزامي بعد الحدث: صور، أعداد حضور، وصول السوشيال، وبيانات الليدز.",
  },
  {
    icon: Gift,
    problem: "الرعاية العينية مرفوضة",
    solution: "ادعم بمنتجات أو خدمات أو مقر، والمنصة بتقدّر قيمتها السوقية.",
  },
  {
    icon: MapPin,
    problem: "فعاليات القاهرة بس",
    solution: "تغطية الصعيد والدلتا والمدن الساحلية، مع فلترة بالمحافظة.",
  },
];

const STEPS = [
  { n: "١", title: "اختار جمهورك", text: "فلتر بالمحافظة والقطاع وعدد الحضور وميزانيتك." },
  { n: "٢", title: "قارن الباقات", text: "كل مزايا الباقة والأسعار ظاهرة قدامك بالجنيه." },
  { n: "٣", title: "احجز وادفع بأمان", text: "الفلوس محجوزة لحد ما الفعالية تتنفذ فعلاً." },
  { n: "٤", title: "استلم تقرير النتائج", text: "خلال ١٠ أيام من الحدث، بالأرقام والصور." },
];

function HomePage() {
  const { imported } = Route.useLoaderData();
  const [active, setActive] = useState<string>(CATEGORIES[0]);
  const shown = [...imported, ...EVENTS].filter((e) => e.category === active).slice(0, 3);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="جمهور في مؤتمر مصري ولافتات رعاة على المسرح"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/80" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-center text-ink-foreground sm:py-32">
          <span className="inline-flex rounded-full border border-ink-foreground/25 px-4 py-1.5 text-xs">
            أسعار بالجنيه · منظمون موثقون · فواتير ضريبية
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            ارعَ فعاليات مصرية حقيقية، وشوف نتيجة فلوسك بالأرقام.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-foreground/80">
            «سند» سوق يربط الشركات بمنظمي الفعاليات في كل محافظات مصر — من هاكاثون في أسيوط
            لماراثون على كورنيش الإسكندرية.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              أنا راعي — دوّر على فعالية
            </Link>
            <Link
              to="/organizers"
              className="rounded-lg border border-ink-foreground/30 px-6 py-3 font-semibold transition-colors hover:bg-ink-foreground/10"
            >
              أنا منظم — اعرض فعاليتي
            </Link>
          </div>
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-gold">{s.value}</dt>
                <dd className="mt-1 text-xs text-ink-foreground/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            مشاكل الرعاية في مصر… وحلّها هنا
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            كل نقطة تحت دي شكوى متكررة من رعاة ومنظمين مصريين، والمنصة مبنية عشان تحلها.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, problem, solution }) => (
            <article key={problem} className="rounded-xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-secondary text-brand">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">
                <span className="text-muted-foreground">المشكلة: </span>
                {problem}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{solution}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
            فعاليات مفتوحة للرعاية دلوقتي
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active === c
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {shown.length === 0 && (
              <p className="md:col-span-3 text-center text-muted-foreground">
                مفيش فعاليات مفتوحة في القطاع ده حاليًا — جرّب قطاع تاني.
              </p>
            )}
            {shown.map((e) => (
              <article
                key={e.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                    {e.category}
                  </span>
                  {e.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-brand">
                      <ShieldCheck className="size-3.5" /> منظّم موثّق
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.organizer}</p>

                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CalendarDays className="size-4" /> {e.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4" /> {e.city} — {e.governorate}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="size-4" /> {num(e.attendees)} حاضر متوقع
                  </li>
                </ul>

                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${e.coverage}%` }} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>تم تغطية {e.coverage}% من الرعاية</span>
                    {e.inKind && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5">
                        <Gift className="size-3" /> يقبل رعاية عينية
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 font-display text-lg font-bold text-brand">
                  تبدأ من {egp(e.fromEGP)}
                </p>
                <Link
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className="mt-4 inline-flex justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  شوف الباقات
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/discover"
              className="inline-flex rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              شوف كل الفعاليات
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">إزاي بتشتغل؟</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-xl border border-border bg-card p-6">
              <span className="grid size-9 place-items-center rounded-full bg-brand font-display font-bold text-brand-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <HandCoins className="mx-auto size-8 text-gold" />
          <h2 className="mt-4 font-display text-3xl font-bold">
            جاهز تحوّل ميزانية التسويق لنتائج على أرض الواقع؟
          </h2>
          <p className="mt-3 text-ink-foreground/75">
            ابدأ بأول رعاية من ١٥٬٠٠٠ جنيه، وادفع بانستاباي أو تحويل بنكي أو فوري.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/discover"
              className="rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              ابدأ كراعي
            </Link>
            <Link
              to="/organizers"
              className="rounded-lg border border-ink-foreground/30 px-6 py-3 font-semibold transition-colors hover:bg-ink-foreground/10"
            >
              سجّل فعاليتك
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
