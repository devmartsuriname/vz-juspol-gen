// src/lib/g03-managed-runtime-proof.ts — temporary; delete during cleanup
import { timingSafeEqual } from "node:crypto";
import { createRequire } from "node:module";
import type { Connection } from "mysql2/promise";

type ProofResult = Record<string, string | number>;
const proofPath = "/.well-known/vz-g03-runtime-proof";
const proofNonce = "qSav6nCjoN3Qr1FrENOX3EscfailD6npL3hgPHMfcnM";
let proofRun: Promise<ProofResult> | undefined;

function nonceMatches(value: string | null): boolean {
  if (!value || value.length !== proofNonce.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(proofNonce));
}

function grantScopeCategory(grants: unknown[], dbName: string | undefined): string {
  const text = grants.map((row) => Object.values(row as Record<string, unknown>).join(" ")).join("\n");
  const scope = dbName && text.includes(`\`${dbName}\`.*`) ? "CONFIGURED_DATABASE_SCOPE" : "SCOPE_NOT_CONFIRMED";
  return text.toUpperCase().includes("ALL PRIVILEGES") ? `${scope}_ALL_PRIVILEGES` : `${scope}_NON_ALL_PRIVILEGES`;
}

async function runProof(): Promise<ProofResult> {
  const require = createRequire(import.meta.url);
  try {
    require.resolve("mysql2/promise");
    require.resolve("drizzle-orm/mysql2");
    require.resolve("drizzle-kit/package.json");
  } catch {
    return { outcome: "STOP_MODULE_UNAVAILABLE" };
  }

  let connection: Connection | undefined;
  let timedOut = false;
  const watchdog = setTimeout(() => {
    timedOut = true;
    connection?.destroy();
  }, 8000);

  try {
    const mysql = await import("mysql2/promise");
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 5000,
    });
    const [serverRows] = await connection.query({
      sql: "SELECT VERSION() AS server_version, CURRENT_USER() AS current_principal, @@character_set_server AS server_charset, @@collation_server AS server_collation, @@max_allowed_packet AS max_allowed_packet, @@innodb_default_row_format AS default_row_format",
      timeout: 5000,
    });
    const [grantRows] = await connection.query({ sql: "SHOW GRANTS FOR CURRENT_USER()", timeout: 5000 });
    const server = (serverRows as Array<Record<string, unknown>>)[0];
    const principal = String(server?.current_principal ?? "");
    const configuredUser = process.env.DB_USER;
    return {
      outcome: "PASS",
      server_version: String(server?.server_version ?? "UNAVAILABLE"),
      server_charset: String(server?.server_charset ?? "UNAVAILABLE"),
      server_collation: String(server?.server_collation ?? "UNAVAILABLE"),
      max_allowed_packet: String(server?.max_allowed_packet ?? "UNAVAILABLE"),
      default_row_format: String(server?.default_row_format ?? "UNAVAILABLE"),
      principal_match: configuredUser && principal.split("@", 1)[0] === configuredUser ? "CONFIGURED_USER_MATCH" : "NO_CONFIGURED_USER_MATCH",
      grant_category: grantScopeCategory(grantRows as unknown[], process.env.DB_NAME),
      grant_count: (grantRows as unknown[]).length,
      module_status: "ALL_RESOLVED",
    };
  } catch {
    return { outcome: timedOut ? "STOP_OVERALL_TIMEOUT" : "FAIL_REDACTED" };
  } finally {
    clearTimeout(watchdog);
    if (connection) {
      try { await connection.end(); } catch { connection.destroy(); }
    }
    console.info("G03_PROOF_COMPLETED");
  }
}

export async function maybeHandleG03RuntimeProof(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  if (request.method !== "POST" || url.pathname !== proofPath || !nonceMatches(request.headers.get("x-vz-g03-proof-token"))) return undefined;
  proofRun ??= runProof();
  return new Response(JSON.stringify(await proofRun), { status: 200, headers: { "cache-control": "no-store", "content-type": "application/json; charset=utf-8" } });
}
