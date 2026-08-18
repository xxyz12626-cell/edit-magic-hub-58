import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Gift, MapPin, Search, ShieldCheck, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { PageShell } from "../components/site/PageShell";
import { CATEGORIES, EVENTS, GOVERNORATES, egp, num } from "../data/events";
import { listImportedEvents } from "../lib/events.functions";

export const Route = createFileRoute("/discover")({
  loader: async () => ({ imported: await listImportedEvents() }),
  errorComponent: () => (
    <PageShell>
      <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">
        حصلت مشكلة في تحميل الفعاليات — جرّب تحديث الصفحة.
      </p>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <p className="mx-auto max-w-6xl px-4 py-24 text-muted-foreground">مفيش فعاليات حاليًا.</p>
    </PageShell>
  ),
  head: () => ({
    meta: [
      { title: "تصفّح الفعاليات المتاحة للرعاية | سند" },
      {
        name: "description",
        content:
          "فلتر فعاليات مصر بالمحافظة والقطاع والميزانية بالجنيه، وشوف الباقات المتاحة للرعاية فورًا.",
      },
      { property: "og:title", content: "تصفّح الفعاليات المتاحة للرعاية | سند" },
      {
        property: "og:description",
        content: "٤٢٠+ فعالية في ٢٧ محافظة بأسعار معروضة بالجنيه المصري.",
      },
      { property: "og:url", content: "/discover" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/discover" }],
  }),
  component: DiscoverPage,
});

const BUDGETS = [
  { label: "أي ميزانية", max: Infinity },
  { label: "أقل من ٥٠ ألف", max: 50000 },
  { label: "أقل من ١٠٠ ألف", max: 100000 },
  { label: "أقل من ٣٠٠ ألف", max: 300000 },
];

function DiscoverPage() {
  const [q, setQ] = useState("");
  const [gov, setGov] = useState("all");
  const [cat, setCat] = useState("all");
  const [budget, setBudget] = useState(0);
  const [inKindOnly, setInKindOnly] = useState(false);
  const [sort, setSort] = useState("price-asc");

  const results = useMemo(
    () =>
      [...EVENTS]
        .sort((a, b) =>
          sort === "price-desc"
            ? b.fromEGP - a.fromEGP
            : sort === "attendees-desc"
              ? b.attendees - a.attendees
              : a.fromEGP - b.fromEGP,
        )
        .filter(
        (e) =>
          (gov === "all" || e.governorate === gov) &&
          (cat === "all" || e.category === cat) &&
          e.fromEGP <= (BUDGETS[budget]?.max ?? Infinity) &&
          (!inKindOnly || e.inKind) &&
          (q.trim() === "" ||
            e.title.includes(q.trim()) ||
            e.organizer.toLowerCase().includes(q.trim().toLowerCase())),
      ),
    [q, gov, cat, budget, inKindOnly, sort],
  );

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            فعاليات مفتوحة للرعاية في مصر
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            كل الأسعار بالجنيه المصري وشاملة الضريبة، وكل منظم موثق بالسجل التجاري والبطاقة
            الضريبية.
          </p>

          <div className="mt-8 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-4">
            <label className="relative md:col-span-2">
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث باسم الفعالية أو المنظم"
                className="w-full rounded-lg border border-input bg-background py-2.5 pe-4 ps-10 text-sm outline-none focus:border-brand"
              />
            </label>
            <select
              value={gov}
              onChange={(e) => setGov(e.target.value)}
              aria-label="المحافظة"
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
            >
              <option value="all">كل المحافظات</option>
              {GOVERNORATES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              aria-label="القطاع"
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
            >
              <option value="all">كل القطاعات</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              aria-label="الميزانية"
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand md:col-span-2"
            >
              {BUDGETS.map((b, i) => (
                <option key={b.label} value={i}>
                  {b.label}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="الترتيب"
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand md:col-span-2"
            >
              <option value="price-asc">الأرخص أولًا</option>
              <option value="price-desc">الأغلى أولًا</option>
              <option value="attendees-desc">الأكثر حضورًا</option>
            </select>
            <label className="flex items-center gap-2 px-1 text-sm text-muted-foreground md:col-span-4">
              <input
                type="checkbox"
                checked={inKindOnly}
                onChange={(e) => setInKindOnly(e.target.checked)}
                className="size-4 accent-[var(--brand)]"
              />
              يقبل رعاية عينية (منتجات أو خدمات)
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm text-muted-foreground">
          {num(results.length)} فعالية مطابقة من {num(EVENTS.length)} فعالية في{" "}
          {num(GOVERNORATES.length)} محافظة
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {results.map((e) => (
            <article key={e.slug} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                  {e.category}
                </span>
                {e.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-brand">
                    <ShieldCheck className="size-3.5" /> موثّق
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-display text-lg font-bold leading-snug">{e.title}</h2>
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
                  <span>تم تغطية {e.coverage}%</span>
                  {e.inKind && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5">
                      <Gift className="size-3" /> عينية
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
          {results.length === 0 && (
            <p className="text-muted-foreground md:col-span-3">
              مفيش نتائج بالفلاتر دي — وسّع الميزانية أو غيّر المحافظة.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
