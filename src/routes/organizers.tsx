import { Link, createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, FileText, LineChart, ShieldCheck, Users, Wallet } from "lucide-react";

import { PageShell } from "../components/site/PageShell";

export const Route = createFileRoute("/organizers")({
  head: () => ({
    meta: [
      { title: "لمنظمي الفعاليات | اعرض فعاليتك على سند" },
      {
        name: "description",
        content:
          "سجّل فعاليتك على سند، اعرض باقات الرعاية بالجنيه، واستلم فلوسك بأمان بعد التنفيذ مع فاتورة رسمية.",
      },
      { property: "og:title", content: "لمنظمي الفعاليات | سند" },
      {
        property: "og:description",
        content: "اعرض فعاليتك على شركات باحثة عن رعاية في ٢٧ محافظة مصرية.",
      },
      { property: "og:url", content: "/organizers" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/organizers" }],
  }),
  component: OrganizersPage,
});

const BENEFITS = [
  {
    icon: Users,
    title: "وصول لشركات جدّية",
    text: "بروفايل فعاليتك يوصل لمديري تسويق وCSR في شركات بتدور على رعاية فعليًا.",
  },
  {
    icon: Wallet,
    title: "فلوسك مضمونة",
    text: "الراعي يدفع للمنصة، والمبلغ يتحوّل لك بعد تنفيذ الفعالية وتسليم التقرير.",
  },
  {
    icon: FileText,
    title: "ورق رسمي جاهز",
    text: "عقد رعاية وفاتورة إلكترونية بيتولدوا أوتوماتيك لكل صفقة.",
  },
  {
    icon: BadgeCheck,
    title: "توثيق يفرق",
    text: "علامة «منظّم موثّق» بعد مراجعة السجل التجاري والبطاقة الضريبية.",
  },
  {
    icon: LineChart,
    title: "قوالب تقارير",
    text: "قوالب جاهزة لتقرير النتائج: حضور، وصول سوشيال، صور، وليدز.",
  },
  {
    icon: ShieldCheck,
    title: "رعاية عينية كذلك",
    text: "اقبل منتجات أو خدمات أو مقر، والمنصة بتقدّر قيمتها السوقية.",
  },
];

const PLANS = [
  {
    name: "مجاني",
    price: "٠ ج.م",
    note: "عمولة ٨٪ على الرعاية المحصّلة",
    features: ["فعالية واحدة نشطة", "٣ باقات رعاية", "تقرير نتائج أساسي"],
    cta: "ابدأ مجانًا",
    highlight: false,
  },
  {
    name: "منظّم محترف",
    price: "٧٥٠ ج.م/شهر",
    note: "عمولة ٥٪ فقط",
    features: ["فعاليات غير محدودة", "باقات وإضافات غير محدودة", "أولوية في الظهور", "دعم واتساب"],
    cta: "جرّب ١٤ يوم",
    highlight: true,
  },
  {
    name: "وكالة",
    price: "سعر مخصص",
    note: "عمولة تفاوضية",
    features: ["حساب فريق", "إدارة عملاء متعددين", "مدير حساب مخصص", "ربط API"],
    cta: "كلّمنا",
    highlight: false,
  },
];

function OrganizersPage() {
  return (
    <PageShell>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="max-w-2xl font-display text-3xl font-black leading-tight sm:text-5xl">
            فعاليتك تستحق راعي محترم — لا واسطة ولا تليفونات فاضية.
          </h1>
          <p className="mt-5 max-w-2xl text-ink-foreground/80">
            اعرض باقاتك بالجنيه، خلي الشركات تقارن وتحجز، واستلم فلوسك بأمان بعد التنفيذ.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/submit"
              className="rounded-lg bg-gold px-6 py-3 font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              سجّل فعاليتك
            </Link>
            <Link
              to="/discover"
              className="rounded-lg border border-ink-foreground/30 px-6 py-3 font-semibold transition-colors hover:bg-ink-foreground/10"
            >
              شوف فعاليات موجودة
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
          إيه اللي بتاخده من سند؟
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-secondary text-brand">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
            أسعار واضحة بالجنيه
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            بدون رسوم مخفية، والعمولة بتتخصم من الرعاية المحصّلة بس.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PLANS.map((p) => (
              <article
                key={p.name}
                className={`flex flex-col rounded-xl border bg-card p-6 ${
                  p.highlight ? "border-brand ring-1 ring-brand" : "border-border"
                }`}
              >
                {p.highlight && (
                  <span className="mb-3 w-fit rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
                    الأكثر اختيارًا
                  </span>
                )}
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-2 font-display text-2xl font-bold text-brand">{p.price}</p>
                <p className="text-xs text-muted-foreground">{p.note}</p>
                <ul className="mt-5 grid flex-1 gap-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    p.highlight
                      ? "bg-brand text-brand-foreground"
                      : "border border-border bg-background text-foreground"
                  }`}
                >
                  {p.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
