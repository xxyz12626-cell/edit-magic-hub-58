import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileText, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";

import { PageShell } from "../components/site/PageShell";
import { CATEGORIES, GOVERNORATES } from "../data/events";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "أضف فعاليتك | اعرضها للرعاية على سند" },
      {
        name: "description",
        content:
          "سجّل فعاليتك على سند في ٤ خطوات: بيانات الفعالية، الجمهور، باقات الرعاية بالجنيه، ومستندات التوثيق.",
      },
      { property: "og:title", content: "أضف فعاليتك | سند" },
      {
        property: "og:description",
        content: "اعرض باقات رعايتك بالجنيه على شركات في كل محافظات مصر.",
      },
      { property: "og:url", content: "/submit" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/submit" }],
  }),
  component: SubmitPage,
});

const CHECKS = [
  { icon: ShieldCheck, text: "مراجعة السجل التجاري والبطاقة الضريبية خلال ٤٨ ساعة" },
  { icon: Wallet, text: "المبلغ محتجز لحد تنفيذ الفعالية وتسليم التقرير" },
  { icon: FileText, text: "عقد رعاية وفاتورة إلكترونية بيتولدوا أوتوماتيك" },
];

const TIER_LABELS = ["الباقة الأولى", "الباقة الثانية", "الباقة الثالثة"];

function SubmitPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">أضف فعاليتك</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            املأ البيانات مرة واحدة، وفعاليتك تظهر لشركات بتدور على رعاية في {GOVERNORATES.length}{" "}
            محافظة. العرض مجاني، والعمولة بتتخصم من الرعاية المحصّلة بس.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {CHECKS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-brand" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        {sent ? (
          <div className="rounded-xl border border-brand/40 bg-brand/5 p-8 text-center">
            <CheckCircle2 className="mx-auto size-10 text-brand" />
            <h2 className="mt-4 font-display text-2xl font-bold">استلمنا فعاليتك</h2>
            <p className="mt-3 text-muted-foreground">
              فريق سند بيراجع البيانات والمستندات وبيرد عليك على واتساب خلال ٤٨ ساعة.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              أضف فعالية تانية
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-8"
          >
            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">١. بيانات الفعالية</legend>
              <Field label="اسم الفعالية" required>
                <input required className={inputCls} placeholder="مثال: ملتقى الشركات الناشئة" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="اسم المنظم" required>
                  <input required className={inputCls} placeholder="الشركة أو الجهة" />
                </Field>
                <Field label="القطاع" required>
                  <select required className={inputCls} defaultValue="">
                    <option value="" disabled>
                      اختر القطاع
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="المحافظة" required>
                  <select required className={inputCls} defaultValue="">
                    <option value="" disabled>
                      اختر المحافظة
                    </option>
                    {GOVERNORATES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="المدينة" required>
                  <input required className={inputCls} placeholder="مثال: المنصورة" />
                </Field>
                <Field label="تاريخ الفعالية" required>
                  <input required type="date" className={inputCls} />
                </Field>
                <Field label="عدد الحضور المتوقع" required>
                  <input required type="number" min={20} className={inputCls} placeholder="1500" />
                </Field>
              </div>
              <Field label="وصف مختصر" required>
                <textarea
                  required
                  rows={4}
                  className={inputCls}
                  placeholder="إيه اللي بيحصل في الفعالية؟ المسارح، المعرض، الأنشطة…"
                />
              </Field>
            </fieldset>

            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">٢. الجمهور</legend>
              <Field label="وصف الجمهور" required>
                <input
                  required
                  className={inputCls}
                  placeholder="مثال: طلاب هندسة ومطورون شباب، 19–28 سنة"
                />
              </Field>
              <Field label="نسبة الوصول على السوشيال (اختياري)">
                <input className={inputCls} placeholder="مثال: ١٢٠ ألف وصول في آخر حدث" />
              </Field>
            </fieldset>

            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">٣. باقات الرعاية (بالجنيه)</legend>
              {TIER_LABELS.map((t, i) => (
                <div key={t} className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Field label={`${t} — الاسم`}>
                    <input
                      className={inputCls}
                      required={i === 0}
                      placeholder={i === 0 ? "برونزي" : "اختياري"}
                    />
                  </Field>
                  <Field label="السعر بالجنيه">
                    <input
                      type="number"
                      min={1000}
                      step={1000}
                      required={i === 0}
                      className={`${inputCls} sm:w-40`}
                      placeholder="45000"
                    />
                  </Field>
                </div>
              ))}
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="size-4 accent-[var(--brand)]" />
                أقبل رعاية عينية (منتجات أو خدمات أو مقر)
              </label>
            </fieldset>

            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">٤. التوثيق والتواصل</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="رقم واتساب" required>
                  <input required inputMode="tel" className={inputCls} placeholder="+20 1XX XXX XXXX" />
                </Field>
                <Field label="البريد الإلكتروني" required>
                  <input required type="email" className={inputCls} placeholder="you@company.eg" />
                </Field>
                <Field label="رقم السجل التجاري (اختياري)">
                  <input className={inputCls} placeholder="للحصول على علامة موثّق" />
                </Field>
                <Field label="الرقم الضريبي (اختياري)">
                  <input className={inputCls} placeholder="لإصدار فاتورة إلكترونية" />
                </Field>
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input required type="checkbox" className="mt-0.5 size-4 accent-[var(--brand)]" />
                أقر بصحة البيانات وأوافق على شروط سند وسياسة احتجاز المبالغ لحد التنفيذ.
              </label>
            </fieldset>

            <button
              type="submit"
              className="rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              أرسل الفعالية للمراجعة
            </button>
          </form>
        )}
      </section>
    </PageShell>
  );
}

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </label>
  );
}
