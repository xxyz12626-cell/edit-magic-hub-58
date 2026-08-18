import { createFileRoute } from "@tanstack/react-router";

/**
 * Scheduled ingest endpoint. Called every 10 minutes by the database
 * scheduler with the shared secret header.
 */
export const Route = createFileRoute("/api/public/ingest-events")({
  server: {
    handlers: {
      POST: async ({ request }) => handle(request),
      GET: async ({ request }) => handle(request),
    },
  },
});

async function handle(request: Request) {
  const secret = process.env["INGEST_SECRET"];
  const provided =
    request.headers.get("x-ingest-secret") ??
    new URL(request.url).searchParams.get("secret") ??
    "";
  if (!secret || provided !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { runIngest } = await import("@/lib/ingest.server");
    const summary = await runIngest();
    return Response.json({ ok: true, ...summary });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "ingest failed" },
      { status: 500 },
    );
  }
}
