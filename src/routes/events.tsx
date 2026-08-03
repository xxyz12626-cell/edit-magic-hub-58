import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ReceiptText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "../components/site/PageShell";
import { CATEGORIES, CITIES, EVENTS, egp } from "../data/events";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "فرص رعاية فعاليات في مصر | رعايتي" },
      {
        name: "description",
        content:
          "تصفح فعاليات مصرية تبحث عن رعاة: تكنولوجيا، رياضة، تعليم، فنون وخيري — بباكدجات بالجنيه المصري وأرقام حضور موثقة.",
      },
      { property: "og:title", content: "فرص رعاية فعاليات في مصر | رعايتي" },
      {
        property: "og:description",
        content: "فلتر حسب المحافظة والنوع والميزانية، وشوف باكدجات الرعاية بالجنيه المصري.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState<string>(CITIES[0]);
  const [cat, setCat] = useState<string>(CATEGORIES[0]);
  const [maxBudget, setMaxBudget] = useState(1000000);

  const results = useMemo(
    () =>
      EVENTS.filter((e) => {
        const cheapest = Math.min(...e.tiers.map((t) => t.priceEGP));
        return (
          (city === CITIES[0] || e.city === city) &&
          (cat === CATEGORIES[0] || e.category === cat) &&
          cheapest <= maxBudget &&
          (q.trim() === "" ||
            e.title.includes(q.trim()) ||
            e.organizer.includes(q.trim()) ||
            e.audience.includes(q.trim()))
        );
      }),
    [q, city, cat, maxBudget],
  );

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="font-display text-3xl font-bold md:text-4xl">فرص الرعاية المتاحة</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            كل فرصة بتوضح الجمهور والمحافظة وسعر كل باكدج بالجنيه، وهل المنظم موثق وبيصدر فاتورة ضريبية.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr]">
        <aside className="grid h-fit gap-5 rounded-xl border border-border bg-card p-5">
          <div>
            <label htmlFor="q" className="text-sm font-medium">بحث</label>
            <div className="relative mt-2">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="اسم الفعالية أو الجمهور"
                className="w-full rounded-md border border-input bg-background py-2 pr-9 pl-3 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="text-sm font-medium">المحافظة</label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="cat" className="text-sm font-medium">النوع</label>
            <select
              id="cat"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="text-sm font-medium">
              أقل باكدج حتى {egp(maxBudget)}
            </label>
            <input
              id="budget"
              type="range"
              min={20000}
              max={1000000}
              step={10000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="mt-3 w-full accent-brand"
            />
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-muted-foreground">{results.length} فرصة مطابقة</p>
          <div className="grid gap-4">
            {results.map((e) => {
              const pct = Math.round((e.raisedEGP / e.needEGP) * 100);
              return (
                <article key={e.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl font-bold">{e.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {e.organizer} · {e.city} · {e.date}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full bg-secondary px-2.5 py-1">{e.category}</span>
                      {e.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-brand">
                          <BadgeCheck className="size-3" /> منظم موثق
                        </span>
                      )}
                      {e.invoice && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-2.5 py-1 text-accent-foreground">
                          <ReceiptText className="size-3" /> فاتورة ضريبية
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm">
                    <span className="text-muted-foreground">الجمهور: </span>
                    {e.audience} · {e.attendees.toLocaleString("ar-EG")} حاضر متوقع
                  </p>

                  <div className="mt-4">
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      تم تغطية {pct}% — {egp(e.raisedEGP)} من {egp(e.needEGP)}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {e.tiers.map((t) => (
                      <div key={t.name} className="rounded-lg border border-border p-3.5">
                        <p className="font-display text-sm font-bold">{t.name}</p>
                        <p className="mt-1 font-display text-lg font-bold text-brand">{egp(t.priceEGP)}</p>
                        <ul className="mt-2 grid gap-1 text-xs text-muted-foreground">
                          {t.perks.map((p) => <li key={p}>• {p}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    اطلب ملف الرعاية
                  </button>
                </article>
              );
            })}
            {results.length === 0 && (
              <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                مفيش نتائج بالفلاتر الحالية — جرّب توسّع الميزانية أو المحافظة.
              </p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
