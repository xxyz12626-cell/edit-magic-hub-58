CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.trigger_event_ingest()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  endpoint text := current_setting('app.ingest_url', true);
  secret text := current_setting('app.ingest_secret', true);
BEGIN
  IF endpoint IS NULL OR secret IS NULL THEN
    RETURN;
  END IF;
  PERFORM net.http_post(
    url := endpoint,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-ingest-secret', secret),
    body := '{}'::jsonb
  );
END;
$$;

REVOKE ALL ON FUNCTION public.trigger_event_ingest() FROM anon, authenticated;

SELECT cron.unschedule('ingest-events-10min')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'ingest-events-10min');

SELECT cron.schedule('ingest-events-10min', '*/10 * * * *', 'SELECT public.trigger_event_ingest();');