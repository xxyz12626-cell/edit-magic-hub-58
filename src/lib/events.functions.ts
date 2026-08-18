import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import type { Category, EventItem, Governorate, SponsorTier } from "@/data/events";

type Row = Database["public"]["Tables"]["imported_events"]["Row"];

function toEventItem(row: Row): EventItem {
  const tiers = Array.isArray(row.tiers) ? (row.tiers as unknown as SponsorTier[]) : [];
  return {
    slug: row.slug,
    title: row.title,
    organizer: row.organizer,
    verified: false,
    category: row.category as Category,
    date: row.date_text,
    city: row.city,
    governorate: row.governorate as Governorate,
    attendees: row.attendees,
    coverage: row.coverage,
    inKind: row.in_kind,
    fromEGP: row.from_egp,
    audience: row.audience,
    about: row.about,
    tiers,
  };
}

export const listImportedEvents = createServerFn({ method: "GET" }).handler(
  async (): Promise<EventItem[]> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const url = process.env["SUPABASE_URL"]!;
    if (!key || !url) return [];
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data, error } = await supabase
      .from("imported_events")
      .select(
        "slug, title, organizer, category, governorate, city, date_text, attendees, coverage, in_kind, from_egp, audience, about, tiers",
      )
      .order("created_at", { ascending: false })
      .limit(600);

    if (error || !data) return [];
    return (data as Row[]).map(toEventItem);
  },
);
