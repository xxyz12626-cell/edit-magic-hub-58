import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Filter, ReceiptText, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { PageShell } from "../components/site/PageShell";
import { egp } from "../data/events";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "للرعاة | ميزانية تسويق بعائد موثق — رعايتي" },
      {
        name: "description",
        content:
          "للشركات في مصر: اختر فعاليات تناسب جمهورك، ادفع بالجنيه بفاتورة ضريبية، واستلم تقرير أثر موثق بعد الحدث.",
      },
      { property: "og:title", content: "للرعاة | ميزانية تسويق بعائد موثق — رعايتي" },
      {
        property: "og:description",
        content: "احتجاز الأموال حتى إثبات التنفيذ، تقارير أثر، وفواتير جاهزة للمحاسبة المصرية.",
      },
    ],
  }),
  component: SponsorsPage,
});

const benefits = [
  { icon: Target, t: "استهداف حسب المحافظة والقطاع", d: "فلترة بالجمهور، السن، المدينة، ونوع الفعالية قبل ما تدفع مليم." },
  { icon: ShieldCheck, t: "أموالك محتجزة لحد التنفيذ", d: "الدفعات تُصرف على مراحل مقابل إثبات تنفيذ كل بند في الباكدج." },
  { icon: ReceiptText, t: "مستندات جاهزة للمحاسبة", d: "فاتورة إلكترونية، عقد عربي/إنجليزي، ونموذج الخصم تحت حساب الضريبة." },
  { icon: TrendingUp, t: "تقرير أثر بعد الحدث", d: "وصول، ظهور اللوجو، ليدز مؤكدة، وصور تنفيذ في ملف واحد." },
];

const budgets = [
  { label: "تجربة أولى", range: `${egp(45000)} – ${egp(150000)}`, d: "٢–٣ فعاليات محلية لقياس العائد قبل التوسع." },
  { label: "خطة ربع سنوية", range: `${egp(150000)} – ${egp(600000)}`, d: "حضور ثابت في قطاع واحد بحصرية فئة." },
  { label: "رعاية رئيسية", range: `${egp(600000)}+`, d: "اسم الحدث، تغطية إعلامية، وتفعيل متعدد الأيام." },
];

function SponsorsPage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
            <Building2 className="size-3.5" /> للشركات والعلامات
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
            ميزانية الرعاية بتضيع بسبب غياب الإثبات. إحنا بنحلّ دي.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-foreground/75">
            بدل ما تعتمد على PDF وأرقام مبالغ فيها، تشوف بيانات موثقة، تدفع بالجنيه بفاتورة، وتستلم تقرير أثر.
          </p>
          <Link
            to="/events"
            className="mt-8 inline-block rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
          >
            تصفح الفرص المتاحة
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {benefits.map((b) => (
            <article key={b.t} className="rounded-xl border border-border bg-card p-6">
              <b.icon className="size-5 text-brand" />
              <h2 className="mt-4 font-display text-lg font-bold">{b.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">ميزانيات شائعة في السوق المصري</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {budgets.map((b) => (
              <div key={b.label} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">{b.label}</p>
                <p className="mt-2 font-display text-xl font-bold text-brand">{b.range}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-6">
          <Filter className="size-5 text-brand" />
          <p className="text-sm text-muted-foreground">
            عايز نرشّح لك فعاليات على مقاس جمهورك؟ ابعت الجمهور المستهدف والميزانية، ونرجع لك بقائمة في ٤٨ ساعة.
          </p>
          <Link
            to="/pricing"
            className="mr-auto rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            اطلب ترشيحات
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
