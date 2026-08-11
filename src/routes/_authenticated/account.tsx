import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Handshake,
  LogOut,
  MapPin,
  PartyPopper,
  Save,
  Users,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "../../components/site/PageShell";
import { egp, num } from "../../data/events";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "حسابي | فعالياتي ورعاياتي على سند" },
      {
        name: "description",
        content: "صفحة حسابك على سند: بياناتك الثابتة، الفعاليات اللي شاركت بيها، والرعايات اللي عملتها.",
      },
      { property: "og:title", content: "حسابي | سند" },
      { property: "og:description", content: "فعالياتك ورعاياتك في مكان واحد." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

type ProfileRow = { full_name: string | null; org_name: string | null; whatsapp: string | null };
type EventRow = {
  id: string;
  title: string;
  category: string;
  city: string;
  governorate: string;
  event_date: string | null;
  attendees: number;
  status: string;
  tiers: { name: string; priceEGP: number }[] | null;
};
type SponsorshipRow = {
  id: string;
  event_slug: string;
  event_title: string;
  tier_name: string;
  amount_egp: number;
  status: string;
  created_at: string;
};

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand";

const STATUS_LABEL: Record<string, string> = {
  pending: "تحت المراجعة",
  approved: "منشورة",
  rejected: "مرفوضة",
  confirmed: "مؤكدة",
};

function AccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<ProfileRow>({
    full_name: "",
    org_name: "",
    whatsapp: "",
  });
  const [events, setEvents] = useState<EventRow[]>([]);
  const [sponsorships, setSponsorships] = useState<SponsorshipRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"events" | "sponsorships">("events");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user || !active) return;
      setEmail(user.email ?? "");

      const meta = user.user_metadata as Record<string, string | undefined>;
      const { data: prof } = await supabase
        .from("profiles")
        .select("full_name, org_name, whatsapp")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;
      if (prof) {
        setProfile(prof as ProfileRow);
      } else {
        const seed = {
          id: user.id,
          full_name: meta["full_name"] ?? meta["name"] ?? "",
          org_name: meta["org_name"] ?? "",
          whatsapp: meta["whatsapp"] ?? "",
        };
        await supabase.from("profiles").insert(seed);
        setProfile(seed);
      }

      const [{ data: ev }, { data: sp }] = await Promise.all([
        supabase
          .from("user_events")
          .select("id, title, category, city, governorate, event_date, attendees, status, tiers")
          .order("created_at", { ascending: false }),
        supabase
          .from("sponsorships")
          .select("id, event_slug, event_title, tier_name, amount_egp, status, created_at")
          .order("created_at", { ascending: false }),
      ]);
      if (!active) return;
      setEvents((ev ?? []) as EventRow[]);
      setSponsorships((sp ?? []) as SponsorshipRow[]);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profile.full_name,
      org_name: profile.org_name,
      whatsapp: profile.whatsapp,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) toast.error("مقدرناش نحفظ البيانات");
    else toast.success("تم حفظ بياناتك");
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const totalSponsored = sponsorships.reduce((s, r) => s + r.amount_egp, 0);

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-10">
          <div>
            <h1 className="font-display text-3xl font-bold">حسابي</h1>
            <p className="mt-2 text-sm text-muted-foreground">{email}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
          >
            <LogOut className="size-4" /> خروج
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-3">
        <form
          onSubmit={saveProfile}
          className="h-fit rounded-xl border border-border bg-card p-6 lg:order-2"
        >
          <h2 className="font-display text-lg font-bold">بياناتك الثابتة</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            بنستخدمها أوتوماتيك في فورم أضف فعاليتك وفي طلبات الرعاية.
          </p>
          <div className="mt-4 grid gap-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الاسم بالكامل</span>
              <input
                className={inputCls}
                value={profile.full_name ?? ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الجهة أو الشركة</span>
              <input
                className={inputCls}
                value={profile.org_name ?? ""}
                onChange={(e) => setProfile({ ...profile, org_name: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">رقم واتساب</span>
              <input
                className={inputCls}
                value={profile.whatsapp ?? ""}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
            >
              <Save className="size-4" /> حفظ البيانات
            </button>
          </div>
        </form>

        <div className="lg:col-span-2 lg:order-1">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat icon={PartyPopper} label="فعالياتي" value={num(events.length)} />
            <Stat icon={Handshake} label="رعاياتي" value={num(sponsorships.length)} />
            <Stat icon={Wallet} label="إجمالي الرعاية" value={egp(totalSponsored)} />
          </div>

          <div className="mt-8 flex gap-2 border-b border-border">
            {(
              [
                ["events", "الفعاليات اللي شاركت بيها"],
                ["sponsorships", "الرعايات اللي عملتها"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  tab === key
                    ? "border-brand text-brand"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "events" ? (
            events.length === 0 ? (
              <Empty
                text="لسه مضفتش أي فعالية."
                cta={{ to: "/submit", label: "أضف فعاليتك" }}
              />
            ) : (
              <ul className="mt-5 grid gap-4">
                {events.map((ev) => (
                  <li key={ev.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{ev.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{ev.category}</p>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                        {STATUS_LABEL[ev.status] ?? ev.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="size-4" /> {ev.event_date ?? "—"}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="size-4" /> {ev.city} — {ev.governorate}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="size-4" /> {num(ev.attendees)} حاضر
                      </span>
                    </div>
                    {ev.tiers && ev.tiers.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {ev.tiers.map((t) => (
                          <span key={t.name} className="rounded-full bg-brand/10 px-2.5 py-1 text-brand">
                            {t.name} · {egp(t.priceEGP)}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )
          ) : sponsorships.length === 0 ? (
            <Empty text="لسه معملتش أي رعاية." cta={{ to: "/discover", label: "تصفّح الفعاليات" }} />
          ) : (
            <ul className="mt-5 grid gap-4">
              {sponsorships.map((sp) => (
                <li key={sp.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/events/$slug"
                        params={{ slug: sp.event_slug }}
                        className="font-semibold hover:text-brand"
                      >
                        {sp.event_title}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">باقة {sp.tier_name}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-display text-lg font-bold text-brand">
                        {egp(sp.amount_egp)}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {STATUS_LABEL[sp.status] ?? sp.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="size-4 text-brand" />
      <p className="mt-3 font-display text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Empty({ text, cta }: { text: string; cta: { to: string; label: string } }) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-border p-10 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
      <Link
        to={cta.to}
        className="mt-4 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
      >
        {cta.label}
      </Link>
    </div>
  );
}
