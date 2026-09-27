/**
 * Canonical `GET /api/v1/health` server route (ND-030 DQ-FDP-02 / DQ-FDP-05).
 *
 * Contract: VZ-JUSPOL-GEN-G03-R2-MANAGED-RUNTIME-DB-PROOF-001, sections 3.2
 * and 3.3.
 *
 * Public behaviour (section 3.2): a generic, values-free, detail-free,
 * `Cache-Control: no-store` health response that never opens a DB connection.
 * A missing, wrong, malformed or absent diagnostic token is observationally
 * equivalent to ordinary public health traffic.
 *
 * Temporary diagnostic branch (section 3.3): executes only when a runtime-only
 * `G03_R2_PROOF_TOKEN` is present in the process environment, the request
 * header `x-vz-g03-r2-proof-token` matches it in constant time, and the
 * single-use allowance of this process has not been consumed. It returns
 * category values only and is removed by the separately governed cleanup.
 *
 * This route has only a `server` property, so the build prunes it from the
 * client route tree; no DB or crypto code reaches the browser bundle.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";

import { runG03R2Diagnostic } from "@/server/db/client";

const PROOF_TOKEN_ENV = "G03_R2_PROOF_TOKEN";
const PROOF_TOKEN_HEADER = "x-vz-g03-r2-proof-token";

const HEALTH_HEADERS: Record<string, string> = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

/** Single-use allowance for this process (section 3.3). Restart-safe by design. */
let diagnosticConsumed = false;

function publicHealthResponse(): Response {
  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: HEALTH_HEADERS,
  });
}

/**
 * Constant-time token check. Both values are hashed before comparison so the
 * comparison length is fixed and no length information leaks. Returns false
 * when the runtime token is absent or the header is missing.
 */
function diagnosticAuthorized(request: Request): boolean {
  const expected = process.env[PROOF_TOKEN_ENV];
  if (typeof expected !== "string" || expected.length === 0) return false;
  const presented = request.headers.get(PROOF_TOKEN_HEADER);
  if (presented === null || presented.length === 0) return false;
  const expectedDigest = createHash("sha256").update(expected, "utf8").digest();
  const presentedDigest = createHash("sha256").update(presented, "utf8").digest();
  return timingSafeEqual(expectedDigest, presentedDigest);
}

export const Route = createFileRoute("/api/v1/health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (diagnosticConsumed || !diagnosticAuthorized(request)) {
          return publicHealthResponse();
        }
        diagnosticConsumed = true;
        const diagnostic = await runG03R2Diagnostic();
        return new Response(JSON.stringify({ status: "ok", g03r2: diagnostic }), {
          status: 200,
          headers: HEALTH_HEADERS,
        });
      },
    },
  },
});
