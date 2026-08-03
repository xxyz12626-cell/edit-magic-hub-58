import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  FileText,
  Gift,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import { PageShell } from "../components/site/PageShell";
import { EVENTS, egp, num } from "../data/events";
import type { EventItem, SponsorTier } from "../data/events";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }): { event: EventItem } => {
    const event = EVENTS.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "الفعالية غير متاحة | سند" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    const description = `${event.title} — ${event.city}, ${event.governorate}. باقات رعاية تبدأ من ${egp(event.fromEGP)} بفاتورة ضريبية وتقرير نتائج.`;
    return {
      meta: [
        { title: `${event.title} | باقات الرعاية على سند` },
        { name: "description", content: description },
        { property: "og:title", content: `${event.title} | سند` },
        { property: "og:description", content: description },
        { property: "og:url", content: `/events/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/events/${params.slug}` }],
    };
  },
  component: EventPage,
  notFoundComponent: EventNotFound,
});

function EventNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">الفعالية دي مش موجودة</h1>
        <p className="mt-3 text-muted-foreground">يمكن اتقفلت للرعاية أو الرابط قديم.</p>
        <Link
          to="/discover"
          className="mt-6 inline-flex rounded-lg bg-brand px-5 py-2.5 font-semibold text-brand-foreground"
        >
          تصفّح الفعاليات
        </Link>
      </div>
    </PageShell>
  );
}

function EventPage() {
  const { event } = Route.useLoaderData();

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-card px-2.5 py-1">{event.category}</span>
            {event.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-brand">
                <ShieldCheck className="size-3.5" /> منظّم موثّق
              </span>
            )}
            {event.inKind && (
              <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                <Gift className="size-3.5" /> يقبل رعاية عينية
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{event.title}</h1>
          <p className="mt-2 text-muted-foreground">{event.organizer}</p>

          <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" /> {event.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> {event.city} — {event.governorate}
            </span>
            <span className="flex items-center gap-2">
              <Users className="size-4" /> {num(event.attendees)} حاضر متوقع
            </span>
          </div>

          <div className="mt-6 max-w-md">
            <div className="h-2 w-full overflow-hidden rounded-full bg-card">
              <div className="h-full rounded-full bg-gold" style={{ width: `${event.coverage}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              تم تغطية {event.coverage}% من احتياج الرعاية
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold">عن الفعالية</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{event.about}</p>

          <h3 className="mt-8 font-display text-xl font-bold">الجمهور</h3>
          <p className="mt-2 text-muted-foreground">{event.audience}</p>

          <h3 className="mt-8 font-display text-xl font-bold">باقات الرعاية</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {event.tiers.map((t: SponsorTier) => (
              <article key={t.name} className="rounded-xl border border-border bg-card p-6">
                <h4 className="font-semibold">{t.name}</h4>
                <p className="mt-1 font-display text-2xl font-bold text-brand">{egp(t.priceEGP)}</p>
                <p className="text-xs text-muted-foreground">شامل الضريبة</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {t.perks.map((p: string) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 text-brand" /> {p}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-5 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                >
                  احجز الباقة
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-bold">ضمانات سند</h3>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 text-brand" /> الفلوس محجوزة لحد تنفيذ الفعالية
              فعلاً.
            </li>
            <li className="flex items-start gap-2">
              <FileText className="mt-0.5 size-4 text-brand" /> فاتورة إلكترونية متوافقة مع مصلحة
              الضرائب.
            </li>
            <li className="flex items-start gap-2">
              <BadgeCheck className="mt-0.5 size-4 text-brand" /> توثيق بالسجل التجاري والبطاقة
              الضريبية.
            </li>
            <li className="flex items-start gap-2">
              <Gift className="mt-0.5 size-4 text-brand" /> تقرير نتائج خلال ١٠ أيام من الحدث.
            </li>
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            الدفع: إنستاباي · تحويل بنكي · فوري · محافظ المحمول
          </p>
          <Link
            to="/discover"
            className="mt-5 inline-flex w-full justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            فعاليات مشابهة
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
