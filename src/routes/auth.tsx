import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "../components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | سند لرعاية الفعاليات" },
      {
        name: "description",
        content:
          "سجّل دخولك على سند لمتابعة فعالياتك ورعاياتك في مكان واحد، ببيانات محفوظة ودائمة على حسابك.",
      },
      { property: "og:title", content: "تسجيل الدخول | سند" },
      {
        property: "og:description",
        content: "حسابك على سند بيحفظ فعالياتك ورعاياتك وبيانات جهتك.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [busy, setBusy] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/account", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/account", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName, org_name: orgName, whatsapp },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setCheckEmail(true);
          return;
        }
        toast.success("تم إنشاء الحساب");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("أهلاً بيك تاني");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "حصلت مشكلة، جرّب تاني");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("تسجيل الدخول بجوجل مانجحش، جرّب تاني");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
  }

  if (checkEmail) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <Mail className="mx-auto size-10 text-brand" />
          <h1 className="mt-4 font-display text-2xl font-bold">أكّد إيميلك</h1>
          <p className="mt-3 text-muted-foreground">
            بعتنا لينك تأكيد على <span className="font-semibold">{email}</span>. افتحه وارجع سجّل
            دخولك.
          </p>
          <button
            type="button"
            onClick={() => {
              setCheckEmail(false);
              setMode("signin");
            }}
            className="mt-6 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
          >
            رجوع لتسجيل الدخول
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="font-display text-3xl font-bold">
            {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            حسابك بيحفظ بياناتك وفعالياتك ورعاياتك على السايت.
          </p>

          <button
            type="button"
            onClick={onGoogle}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-secondary disabled:opacity-60"
          >
            <GoogleIcon />
            الدخول بحساب جوجل
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> أو بالإيميل{" "}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            {mode === "signup" && (
              <>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">الاسم بالكامل</span>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputCls}
                    placeholder="محمد أحمد"
                  />
                </label>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">الجهة أو الشركة</span>
                  <input
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className={inputCls}
                    placeholder="اختياري"
                  />
                </label>
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium">رقم واتساب</span>
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={inputCls}
                    placeholder="+20 1XX XXX XXXX"
                  />
                </label>
              </>
            )}
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">البريد الإلكتروني</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@company.eg"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">كلمة السر</span>
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
                placeholder="٦ حروف على الأقل"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              {mode === "signin" ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>

          <p className="mt-5 text-sm text-muted-foreground">
            {mode === "signin" ? "معندكش حساب؟" : "عندك حساب بالفعل؟"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-brand hover:underline"
            >
              {mode === "signin" ? "أنشئ حساب" : "سجّل دخولك"}
            </button>
          </p>
        </div>

        <aside className="order-1 h-fit rounded-xl border border-border bg-card p-6 md:order-2">
          <h2 className="font-display text-lg font-bold">إيه اللي بيستفاد بالحساب؟</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" /> بياناتك (الاسم، الجهة،
              واتساب) محفوظة ومش هتكتبها كل مرة.
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" /> صفحة مخصوصة بالفعاليات
              اللي أضفتها وحالة مراجعتها.
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" /> كل الرعايات اللي عملتها
              بالمبالغ والباقات.
            </li>
          </ul>
          <Link
            to="/discover"
            className="mt-6 inline-flex w-full justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
          >
            تصفّح الفعاليات
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2a7 7 0 0 1-6.6-4.8H1.4v3.1A12 12 0 0 0 12 24z"
      />
      <path fill="#FBBC05" d="M5.4 14.5a7.2 7.2 0 0 1 0-4.6V6.8H1.4a12 12 0 0 0 0 10.4l4-2.7z" />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.8l4 3.1A7 7 0 0 1 12 4.8z"
      />
    </svg>
  );
}
