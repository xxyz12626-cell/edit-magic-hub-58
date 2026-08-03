import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { PageShell } from "../components/site/PageShell";
import { egp } from "../data/events";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "الأسعار والعمولة | رعايتي" },
      {
        name: "description",
        content:
          "النشر مجاني وعمولة عند التحصيل فقط. أسعار بالجنيه المصري مع فاتورة ضريبية ودعم إنستاباي وفوري والتحويل البنكي.",
      },
      { property: "og:title", content: "الأسعار والعمولة | رعايتي" },
      {
        property: "og:description",
        content: "خطط للمنظمين في مصر: مجاني، احترافي، ووكالات — بالجنيه المصري وبدون رسوم مخفية.",
      },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "مجاني",
    price: egp(0),
    note: "عمولة ٧٪ عند تحصيل الرعاية فقط",
    features: ["فعالية واحدة نشطة", "٣ باكدجات رعاية", "دفع بإنستاباي وفوري", "فاتورة ضريبية إلكترونية"],
    cta: "ابدأ مجانًا",
    highlight: false,
  },
  {
    name: "احترافي",
    price: `${egp(1900)} / شهر`,
    note: "عمولة ٤٪ عند التحصيل",
    features: [
      "٥ فعاليات نشطة",
      "توثيق المنظم (سجل تجاري/بطاقة ضريبية)",
      "ترشيح رعاة مطابقين",
      "تقرير أثر تلقائي بعد الحدث",
      "عقود عربي/إنجليزي جاهزة",
    ],
    cta: "اشترك الآن",
    highlight: true,
  },
  {
    name: "وكالات",
    price: `${egp(7500)} / شهر`,
    note: "عمولة ٢٪ عند التحصيل",
    features: [
      "فعاليات غير محدودة + عدة فرق",
      "حساب وسيط لاحتجاز الأموال",
      "مدير حساب مخصص",
      "تصدير بيانات ومزامنة CRM",
    ],
    cta: "تحدث مع المبيعات",
    highlight: false,
  },
];

const faqs = [
  {
    q: "بتاخدوا عمولة قبل ما أقبض؟",
    a: "لا. العمولة تُخصم من الدفعة عند تحصيلها فعليًا من الراعي، ومحسوبة في الفاتورة.",
  },
  {
    q: "إيه طرق الدفع المدعومة؟",
    a: "إنستاباي، فوري، محافظ المحمول (فودافون كاش وغيرها)، بطاقات ميزة/فيزا، وتحويل بنكي بالجنيه المصري.",
  },
  {
    q: "الشركة الراعية تقدر تحاسب الرعاية ضريبيًا؟",
    a: "نعم. نصدر فاتورة إلكترونية على منظومة الضرائب المصرية، ونجهز نموذج الخصم تحت حساب الضريبة.",
  },
  {
    q: "لو المنظم مانفّذش البنود؟",
    a: "في خطة الوكالات والاحترافي، الأموال محتجزة وتُصرف على مراحل مقابل إثبات تنفيذ، وإلا تُرد للراعي.",
  },
];

function PricingPage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h1 className="font-display text-3xl font-bold md:text-4xl">أسعار واضحة بالجنيه المصري</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            مفيش رسوم تحويل دولار، ومفيش مصاريف مخفية. تدفع لما تكسب.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.highlight ? "border-brand bg-card shadow-lg" : "border-border bg-card"
              }`}
            >
              {p.highlight && (
                <span className="mb-3 inline-block rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-brand-foreground">
                  الأكثر اختيارًا
                </span>
              )}
              <h2 className="font-display text-xl font-bold">{p.name}</h2>
              <p className="mt-3 font-display text-2xl font-bold text-brand">{p.price}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
              <ul className="mt-5 grid gap-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-6 w-full rounded-md px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
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
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">أسئلة متكررة</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-border bg-card p-5">
                <summary className="cursor-pointer font-display font-bold">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-6">
            <MessageCircle className="size-5 text-brand" />
            <p className="text-sm text-muted-foreground">عندك سؤال تاني؟ كلمنا على واتساب ونرد في نفس اليوم.</p>
            <Link
              to="/events"
              className="mr-auto rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              تصفح الفعاليات
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
