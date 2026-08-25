CREATE TABLE public.ingest_config (
  id boolean NOT NULL DEFAULT true PRIMARY KEY CHECK (id),
  ingest_url text NOT NULL,
  ingest_secret text NOT NULL DEFAULT encode(extensions.gen_random_bytes(24), 'hex'),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.ingest_config TO service_role;
ALTER TABLE public.ingest_config ENABLE ROW LEVEL SECURITY;

INSERT INTO public.ingest_config (ingest_url)
VALUES ('https://project--bb4abe40-2d6b-4b10-a5b3-c643738dda26-dev.lovable.app/api/public/ingest-events');

CREATE OR REPLACE FUNCTION public.trigger_event_ingest()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  cfg public.ingest_config;
BEGIN
  SELECT * INTO cfg FROM public.ingest_config LIMIT 1;
  IF cfg IS NULL THEN
    RETURN;
  END IF;
  PERFORM net.http_post(
    url := cfg.ingest_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-ingest-secret', cfg.ingest_secret),
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
END;
$$;

REVOKE ALL ON FUNCTION public.trigger_event_ingest() FROM anon, authenticated;