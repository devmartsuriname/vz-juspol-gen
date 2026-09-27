/**
 * Canonical `GET /api/v1/health` server route (ND-030 DQ-FDP-02 / DQ-FDP-05).
 *
 * Contract: VZ-JUSPOL-GEN-G03-R2-MANAGED-RUNTIME-DB-PROOF-001, section 3.2.
 *
 * Public behaviour: a generic, values-free, detail-free,
 * `Cache-Control: no-store` health response that never opens a DB connection.
 *
 * This route has only a `server` property, so the build prunes it from the
 * client route tree; no server code reaches the browser bundle.
 */
import { createFileRoute } from "@tanstack/react-router";

const HEALTH_HEADERS: Record<string, string> = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function publicHealthResponse(): Response {
  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: HEALTH_HEADERS,
  });
}

export const Route = createFileRoute("/api/v1/health")({
  server: {
    handlers: {
      GET: async () => publicHealthResponse(),
    },
  },
});
