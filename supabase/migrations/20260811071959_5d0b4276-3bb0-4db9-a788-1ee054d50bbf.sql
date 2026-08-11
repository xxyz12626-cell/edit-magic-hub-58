CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  org_name text,
  whatsapp text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  organizer text NOT NULL DEFAULT '',
  category text NOT NULL,
  governorate text NOT NULL,
  city text NOT NULL,
  event_date date,
  attendees integer NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  in_kind boolean NOT NULL DEFAULT false,
  whatsapp text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_events TO authenticated;
GRANT ALL ON public.user_events TO service_role;
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_events_own" ON public.user_events FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.sponsorships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_slug text NOT NULL,
  event_title text NOT NULL,
  tier_name text NOT NULL,
  amount_egp integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sponsorships TO authenticated;
GRANT ALL ON public.sponsorships TO service_role;
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sponsorships_own" ON public.sponsorships FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX user_events_user_idx ON public.user_events(user_id);
CREATE INDEX sponsorships_user_idx ON public.sponsorships(user_id);