import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  FileText,
  Handshake,
  LineChart,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { PageShell } from "../components/site/PageShell";
import { EVENTS, egp } from "../data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "رعايتي | منصة رعاية الفعاليات في مصر" },
      {
        name: "description",
        content:
          "اربط فعاليتك بالشركات الراعية في مصر: باكدجات بالجنيه، فواتير ضريبية، دفع بإنستاباي وفوري، وتقارير أثر موثقة.",
      },
      { property: "og:title", content: "رعايتي | منصة رعاية الفعاليات في مصر" },
      {
        property: "og:description",
        content: "منصة مصرية تربط منظمي الفعاليات بالرعاة، بأسعار بالجنيه المصري وحماية للأموال.",
      },
    ],
  }),
  component: Home,
});

const problems = [
  {
    icon: Wallet,
    problem: "الأسعار بالدولار ورسوم تحويل عالية",
    fix: "كل الباكدجات بالجنيه المصري، ودفع بإنستاباي وفوري ومحافظ المحمول وتحويل بنكي محلي.",
  },
  {
    icon: ReceiptText,
    problem: "الشركات مش بتقدر تحاسب الرعاية ضريبيًا",
    fix: "فاتورة إلكترونية على منظومة الضرائب المصرية + نموذج الخصم تحت حساب الضريبة تلقائيًا.",
  },
  {
    icon: ShieldCheck,
    problem: "الراعي بيدفع والتنفيذ ميحصلش",
    fix: "الأموال محتجزة في حساب وسيط وتُصرف على مراحل بعد إثبات تنفيذ كل بند.",
  },
  {
    icon: BadgeCheck,
    problem: "أرقام حضور مبالغ فيها وبدون إثبات",
    fix: "توثيق المنظم بالسجل التجاري/البطاقة الضريبية، وأرقام الحضور من التذاكر والباركود.",
  },
  {
    icon: FileText,
    problem: "العروض بتتبعت PDF ورد على واتساب",
    fix: "ملف رعاية موحد بصيغة عربية/إنجليزية، وتفاوض ورد داخل المنصة مع تسجيل كل خطوة.",
  },
  {
    icon: LineChart,
    problem: "مفيش تقرير أثر بعد الحدث",
    fix: "تقرير تلقائي: وصول، ظهور اللوجو، ليدز، وصور تنفيذ — جاهز لإدارة التسويق أو CSR.",
  },
];

const steps = [
  { n: "١", t: "انشر ملف الرعاية", d: "أضف تفاصيل الفعالية، الجمهور، وباكدجات بالجنيه في ١٥ دقيقة." },
  { n: "٢", t: "اتطابق مع رعاة مناسبين", d: "نرشّح شركات بتستهدف نفس الجمهور والمحافظة والقطاع." },
  { n: "٣", t: "اتفق ووقّع أونلاين", d: "عقد جاهز بالعربية، وتحصيل آمن مع فاتورة ضريبية." },
  { n: "٤", t: "نفّذ وسلّم تقرير", d: "ارفع إثباتات التنفيذ، والراعي يستلم تقرير أثر موثق." },
];

function Home() {
  const totalNeed = EVENTS.reduce((s, e) => s + e.needEGP, 0);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="absolute -left-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
              <Handshake className="size-3.5" /> مصنوعة للسوق المصري
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              رعاية فعاليتك بالجنيه المصري، من غير وسطاء ولا وعود.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-foreground/75 md:text-lg">
              رعايتي بتربط منظمي الفعاليات في مصر بالشركات الراعية، وبتحل المشاكل اللي بتعطل
              الاتفاق: التسعير، الفاتورة الضريبية، أمان الدفع، وإثبات التنفيذ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
              >
                انشر فعاليتك مجانًا
              </Link>
              <Link
                to="/events"
                className="rounded-md border border-ink-foreground/25 px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink-foreground/10"
              >
                أنا راعٍ — تصفح الفرص
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ink-foreground/15 pt-6 text-sm">
              <div>
                <dt className="text-ink-foreground/60">فرص رعاية</dt>
                <dd className="font-display text-2xl font-bold">{EVENTS.length * 27}</dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">قيمة مطلوبة</dt>
                <dd className="font-display text-2xl font-bold">{egp(totalNeed * 27)}</dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">متوسط الرد</dt>
                <dd className="font-display text-2xl font-bold">‎٤٨ ساعة</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/[0.04] p-5">
            <p className="text-xs text-ink-foreground/60">أحدث فرصة</p>
            {EVENTS.slice(0, 2).map((e) => (
              <div key={e.id} className="mt-4 rounded-xl bg-background p-4 text-foreground">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold">{e.title}</h3>
                  {e.verified && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] text-brand">
                      <BadgeCheck className="size-3" /> موثق
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {e.city} · {e.date} · {e.attendees.toLocaleString("ar-EG")} حاضر
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${Math.round((e.raisedEGP / e.needEGP) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {egp(e.raisedEGP)} من {egp(e.needEGP)}
                </p>
              </div>
            ))}
            <Link to="/events" className="mt-4 inline-block text-sm text-gold hover:underline">
              شوف كل الفعاليات ←
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl font-bold md:text-4xl">٦ مشاكل بتوقف الرعاية في مصر — وإزاي بنحلها</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          المنصات العالمية بتفترض دفع بالدولار وعقود إنجليزي ومحاسبة أمريكية. ده مش واقع السوق المصري.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <article key={p.problem} className="rounded-xl border border-border bg-card p-5">
              <p.icon className="size-5 text-brand" />
              <h3 className="mt-4 font-display text-base font-bold">{p.problem}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.fix}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="font-display text-3xl font-bold md:text-4xl">إزاي بتشتغل؟</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="grid size-10 place-items-center rounded-full bg-brand font-display text-lg font-bold text-brand-foreground">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="rounded-2xl bg-ink px-6 py-12 text-center text-ink-foreground md:px-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl">جاهز تجيب راعي لفعاليتك؟</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-foreground/75">
            النشر مجاني، ومفيش عمولة غير لما تقبض فعلًا.
          </p>
          <Link
            to="/pricing"
            className="mt-7 inline-block rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
          >
            ابدأ الآن
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
