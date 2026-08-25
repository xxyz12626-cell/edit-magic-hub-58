import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, FileText, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageShell } from "../components/site/PageShell";
import { CATEGORIES, GOVERNORATES, PRICE_OPTIONS, TIER_PRESETS, egp, num } from "../data/events";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "أضف فعاليتك | اعرضها للرعاية على سند" },
      {
        name: "description",
        content:
          "سجّل فعاليتك على سند في ٤ خطوات: بيانات الفعالية، الجمهور، باقات رعاية جاهزة بالجنيه، ومستندات التوثيق.",
      },
      { property: "og:title", content: "أضف فعاليتك | سند" },
      {
        property: "og:description",
        content: "اعرض باقات رعايتك بالجنيه على شركات في كل محافظات مصر.",
      },
      { property: "og:url", content: "/submit" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const TIER_ROWS = [
  { label: "الباقة الأولى", required: true, defaultTier: "برونزي", defaultPrice: 25000 },
  { label: "الباقة الثانية", required: false, defaultTier: "ذهبي", defaultPrice: 75000 },
  { label: "الباقة الثالثة", required: false, defaultTier: "", defaultPrice: 0 },
];

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand";

function SubmitPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    title: "",
    organizer: "",
    category: "",
    governorate: "",
    city: "",
    event_date: "",
    attendees: "",
    description: "",
    audience: "",
    coverage: "",
    whatsapp: "",
    email: "",
    commercial: "",
    tax: "",
    in_kind: false,
  });

  const [tiers, setTiers] = useState(
    TIER_ROWS.map((r) => ({ name: r.defaultTier, priceEGP: r.defaultPrice })),
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;
      const { data: prof } = await supabase
        .from("profiles")
        .select("full_name, org_name, whatsapp")
        .eq("id", user.id)
        .maybeSingle();
      setForm((f) => ({
        ...f,
        email: f.email || (user.email ?? ""),
        organizer: f.organizer || (prof?.org_name ?? prof?.full_name ?? ""),
        whatsapp: f.whatsapp || (prof?.whatsapp ?? ""),
      }));
    })();
  }, [isAuthenticated]);

  const set = (k: keyof typeof form) => (v: string | boolean) => setForm({ ...form, [k]: v });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const chosen = tiers.filter((t) => t.name && t.priceEGP > 0);
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) {
      setBusy(false);
      toast.error("لازم تسجّل دخولك الأول");
      return;
    }
    const { error } = await supabase.from("user_events").insert({
      user_id: uid,
      title: form.title,
      organizer: form.organizer,
      category: form.category,
      governorate: form.governorate,
      city: form.city,
      event_date: form.event_date || null,
      attendees: Number(form.attendees) || 0,
      description: form.description,
      audience: form.audience,
      tiers: chosen,
      in_kind: form.in_kind,
      whatsapp: form.whatsapp,
      email: form.email,
    });
    setBusy(false);
    if (error) {
      toast.error("مقدرناش نحفظ الفعالية، جرّب تاني");
      return;
    }
    setSent(true);
  }

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">أضف فعاليتك</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            املأ البيانات مرة واحدة، وفعاليتك تظهر لشركات بتدور على رعاية في{" "}
            {num(GOVERNORATES.length)} محافظة. العرض مجاني، والعمولة بتتخصم من الرعاية المحصّلة بس.
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
        {!loading && !isAuthenticated ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <ShieldCheck className="mx-auto size-10 text-brand" />
            <h2 className="mt-4 font-display text-2xl font-bold">سجّل دخولك الأول</h2>
            <p className="mt-3 text-muted-foreground">
              الحساب بيخلّي بياناتك محفوظة، وبتلاقي فعالياتك ورعاياتك كلها في صفحة حسابك.
            </p>
            <Link
              to="/auth"
              className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground"
            >
              دخول أو إنشاء حساب
            </Link>
          </div>
        ) : sent ? (
          <div className="rounded-xl border border-brand/40 bg-brand/5 p-8 text-center">
            <CheckCircle2 className="mx-auto size-10 text-brand" />
            <h2 className="mt-4 font-display text-2xl font-bold">استلمنا فعاليتك</h2>
            <p className="mt-3 text-muted-foreground">
              فريق سند بيراجع البيانات والمستندات وبيرد عليك على واتساب خلال ٤٨ ساعة. تلاقيها في
              صفحة حسابك تحت «الفعاليات اللي شاركت بيها».
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => navigate({ to: "/account" })}
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
              >
                روح لحسابي
              </button>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                أضف فعالية تانية
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-8">
            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">١. بيانات الفعالية</legend>
              <Field label="اسم الفعالية" required>
                <input
                  required
                  className={inputCls}
                  value={form.title}
                  onChange={(e) => set("title")(e.target.value)}
                  placeholder="مثال: ملتقى الشركات الناشئة"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="اسم المنظم" required>
                  <input
                    required
                    className={inputCls}
                    value={form.organizer}
                    onChange={(e) => set("organizer")(e.target.value)}
                    placeholder="الشركة أو الجهة"
                  />
                </Field>
                <Field label="القطاع" required>
                  <select
                    required
                    className={inputCls}
                    value={form.category}
                    onChange={(e) => set("category")(e.target.value)}
                  >
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
                  <select
                    required
                    className={inputCls}
                    value={form.governorate}
                    onChange={(e) => set("governorate")(e.target.value)}
                  >
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
                  <input
                    required
                    className={inputCls}
                    value={form.city}
                    onChange={(e) => set("city")(e.target.value)}
                    placeholder="مثال: المنصورة"
                  />
                </Field>
                <Field label="تاريخ الفعالية" required>
                  <input
                    required
                    type="date"
                    className={inputCls}
                    value={form.event_date}
                    onChange={(e) => set("event_date")(e.target.value)}
                  />
                </Field>
                <Field label="عدد الحضور المتوقع" required>
                  <input
                    required
                    type="number"
                    min={20}
                    className={inputCls}
                    value={form.attendees}
                    onChange={(e) => set("attendees")(e.target.value)}
                    placeholder="1500"
                  />
                </Field>
              </div>
              <Field label="وصف مختصر" required>
                <textarea
                  required
                  rows={4}
                  className={inputCls}
                  value={form.description}
                  onChange={(e) => set("description")(e.target.value)}
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
                  value={form.audience}
                  onChange={(e) => set("audience")(e.target.value)}
                  placeholder="مثال: طلاب هندسة ومطورون شباب، 19–28 سنة"
                />
              </Field>
              <Field label="نسبة الوصول على السوشيال (اختياري)">
                <input
                  className={inputCls}
                  value={form.coverage}
                  onChange={(e) => set("coverage")(e.target.value)}
                  placeholder="مثال: ١٢٠ ألف وصول في آخر حدث"
                />
              </Field>
            </fieldset>

            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">
                ٣. باقات الرعاية (اختيار جاهز)
              </legend>
              <p className="text-xs text-muted-foreground">
                اختار الباقة والسعر من القوائم — مش محتاج تكتب حاجة. سيب الباقة فاضية لو مش محتاجها.
              </p>
              {TIER_ROWS.map((row, i) => {
                const tier = tiers[i]!;
                const preset = TIER_PRESETS.find((p) => p.name === tier.name);
                return (
                  <div
                    key={row.label}
                    className="grid gap-3 rounded-lg border border-border/70 p-4"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label={`${row.label} — النوع`} required={row.required}>
                        <select
                          required={row.required}
                          className={inputCls}
                          value={tier.name}
                          onChange={(e) =>
                            setTiers(
                              tiers.map((t, idx) =>
                                idx === i ? { ...t, name: e.target.value } : t,
                              ),
                            )
                          }
                        >
                          <option value="">— بدون باقة —</option>
                          {TIER_PRESETS.map((p) => (
                            <option key={p.name} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="السعر بالجنيه" required={row.required}>
                        <select
                          required={row.required}
                          className={inputCls}
                          value={tier.priceEGP || ""}
                          onChange={(e) =>
                            setTiers(
                              tiers.map((t, idx) =>
                                idx === i ? { ...t, priceEGP: Number(e.target.value) } : t,
                              ),
                            )
                          }
                        >
                          <option value="">— اختر السعر —</option>
                          {PRICE_OPTIONS.map((p) => (
                            <option key={p} value={p}>
                              {egp(p)}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    {preset && (
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {preset.perks.map((perk) => (
                          <span key={perk} className="rounded-full bg-secondary px-2.5 py-1">
                            {perk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="size-4 accent-[var(--brand)]"
                  checked={form.in_kind}
                  onChange={(e) => set("in_kind")(e.target.checked)}
                />
                أقبل رعاية عينية (منتجات أو خدمات أو مقر)
              </label>
            </fieldset>

            <fieldset className="grid gap-4 rounded-xl border border-border bg-card p-6">
              <legend className="px-1 font-display font-bold">٤. التوثيق والتواصل</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="رقم واتساب" required>
                  <input
                    required
                    inputMode="tel"
                    className={inputCls}
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp")(e.target.value)}
                    placeholder="+20 1XX XXX XXXX"
                  />
                </Field>
                <Field label="البريد الإلكتروني" required>
                  <input
                    required
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="you@company.eg"
                  />
                </Field>
                <Field label="رقم السجل التجاري (اختياري)">
                  <input
                    className={inputCls}
                    value={form.commercial}
                    onChange={(e) => set("commercial")(e.target.value)}
                    placeholder="للحصول على علامة موثّق"
                  />
                </Field>
                <Field label="الرقم الضريبي (اختياري)">
                  <input
                    className={inputCls}
                    value={form.tax}
                    onChange={(e) => set("tax")(e.target.value)}
                    placeholder="لإصدار فاتورة إلكترونية"
                  />
                </Field>
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input required type="checkbox" className="mt-0.5 size-4 accent-[var(--brand)]" />
                أقر بصحة البيانات وأوافق على شروط سند وسياسة احتجاز المبالغ لحد التنفيذ.
              </label>
            </fieldset>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              أرسل الفعالية للمراجعة
            </button>
          </form>
        )}
      </section>
    </PageShell>
  );
}

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
