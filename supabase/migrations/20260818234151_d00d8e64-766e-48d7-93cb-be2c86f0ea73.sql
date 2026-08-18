CREATE TABLE public.imported_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source text NOT NULL,
  external_id text NOT NULL,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  organizer text NOT NULL DEFAULT '',
  category text NOT NULL,
  governorate text NOT NULL,
  city text NOT NULL,
  date_text text NOT NULL DEFAULT '',
  event_date date,
  attendees integer NOT NULL DEFAULT 0,
  coverage integer NOT NULL DEFAULT 0,
  in_kind boolean NOT NULL DEFAULT false,
  from_egp integer NOT NULL DEFAULT 0,
  audience text NOT NULL DEFAULT '',
  about text NOT NULL DEFAULT '',
  tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_url text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source, external_id)
);

GRANT SELECT ON public.imported_events TO anon;
GRANT SELECT ON public.imported_events TO authenticated;
GRANT ALL ON public.imported_events TO service_role;

ALTER TABLE public.imported_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "imported_events_public_read" ON public.imported_events
  FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX imported_events_gov_idx ON public.imported_events (governorate);
CREATE INDEX imported_events_created_idx ON public.imported_events (created_at DESC);

CREATE TABLE public.ingest_runs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source text NOT NULL DEFAULT '',
  fetched integer NOT NULL DEFAULT 0,
  inserted integer NOT NULL DEFAULT 0,
  updated integer NOT NULL DEFAULT 0,
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.ingest_runs TO service_role;
ALTER TABLE public.ingest_runs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER imported_events_updated_at BEFORE UPDATE ON public.imported_events
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();