/**
 * Server-only DB client boundary (Route R2).
 *
 * Contract: VZ-JUSPOL-GEN-G03-R2-MANAGED-RUNTIME-DB-PROOF-001, section 3.1.
 *
 * Rules enforced here:
 * - literal `mysql2/promise` import (bundled by the Nitro build); no runtime
 *   module-resolution gate of any kind, no filesystem package-presence check,
 *   and no reference to the migration CLI tool;
 * - the pool is created lazily on first use; DB_HOST / DB_PORT / DB_NAME /
 *   DB_USER / DB_PASSWORD are read only inside request-triggered functions,
 *   never at module scope, and their values are never logged or returned;
 * - bounded pool (max 5 connections), connect timeout 5 s, per-statement
 *   watchdog 5 s, no keep-alive timers;
 * - no durable in-process state is assumed (idle-stop / restart safe);
 * - callers receive category values only; raw errors, principals, grants,
 *   identifiers and credentials never leave this module.
 *
 * This file lives under `src/server/**`, which the build's import protection
 * forbids from client bundles.
 */
import { createPool } from "mysql2/promise";
import type { Pool, PoolConnection, RowDataPacket } from "mysql2/promise";

const POOL_CONNECTION_LIMIT = 5;
const CONNECT_TIMEOUT_MS = 5_000;
const STATEMENT_TIMEOUT_MS = 5_000;
const IDLE_TIMEOUT_MS = 10_000;

const ENV_HOST = "DB_HOST";
const ENV_PORT = "DB_PORT";
const ENV_NAME = "DB_NAME";
const ENV_USER = "DB_USER";
const ENV_PASSWORD = "DB_PASSWORD";

export type DriverResult = "MYSQL2_EXECUTED" | "MYSQL2_FAILED_INIT";

export type ConnectivityResult =
  | "CONNECTED"
  | "FAILED_CONFIG_MISSING"
  | "FAILED_CONFIG_INVALID"
  | "FAILED_HOST_UNRESOLVED"
  | "FAILED_CONNECTION_REFUSED"
  | "FAILED_HOST_UNREACHABLE"
  | "FAILED_TIMEOUT"
  | "FAILED_ACCESS_DENIED"
  | "FAILED_DATABASE_ACCESS_DENIED"
  | "FAILED_UNKNOWN_DATABASE"
  | "FAILED_CONNECTION_LOST"
  | "FAILED_OTHER";

export type PrincipalMatch = "MATCH" | "MISMATCH" | "UNKNOWN";

export type GrantScope =
  | "GLOBAL"
  | "SINGLE_DATABASE_CONFIGURED"
  | "SINGLE_DATABASE_OTHER"
  | "MULTIPLE_DATABASES"
  | "TABLE_LEVEL_ONLY"
  | "NONE"
  | "UNKNOWN";

export type GrantPrivilege = "ALL_PRIVILEGES" | "PARTIAL_PRIVILEGES" | "USAGE_ONLY" | "UNKNOWN";

export type TimingCategory = "UNDER_1S" | "1S_TO_5S" | "OVER_5S";

/** Values-free diagnostic result (contract section 7, categories 1-10). */
export interface G03R2DiagnosticResult {
  driver: DriverResult;
  connectivity: ConnectivityResult;
  serverVersion: string | null;
  serverCharset: string | null;
  serverCollation: string | null;
  maxAllowedPacket: number | null;
  defaultRowFormat: string | null;
  principalMatch: PrincipalMatch;
  grantScope: GrantScope;
  grantPrivilege: GrantPrivilege;
  timing: TimingCategory;
}

interface DbConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

class DbClientError extends Error {
  readonly category: ConnectivityResult;
  constructor(category: ConnectivityResult) {
    super(category);
    this.name = "DbClientError";
    this.category = category;
  }
}

let pool: Pool | undefined;

/** Reads the five runtime variables. Called per request; never at module scope. */
function readDbConfig(): DbConfig {
  const env = process.env;
  const host = env[ENV_HOST];
  const portRaw = env[ENV_PORT];
  const database = env[ENV_NAME];
  const user = env[ENV_USER];
  const password = env[ENV_PASSWORD];
  if (!host || !portRaw || !database || !user || password === undefined || password === "") {
    throw new DbClientError("FAILED_CONFIG_MISSING");
  }
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new DbClientError("FAILED_CONFIG_INVALID");
  }
  return { host, port, database, user, password };
}

/** Lazily creates the bounded pool. Safe to call after an idle stop or restart. */
export function getPool(): Pool {
  if (pool) return pool;
  const config = readDbConfig();
  pool = createPool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    connectionLimit: POOL_CONNECTION_LIMIT,
    maxIdle: 1,
    idleTimeout: IDLE_TIMEOUT_MS,
    queueLimit: POOL_CONNECTION_LIMIT,
    waitForConnections: true,
    connectTimeout: CONNECT_TIMEOUT_MS,
    enableKeepAlive: false,
    multipleStatements: false,
  });
  return pool;
}

function normalizeError(error: unknown): ConnectivityResult {
  if (error instanceof DbClientError) return error.category;
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code ?? "")
      : "";
  switch (code) {
    case "ENOTFOUND":
    case "EAI_AGAIN":
      return "FAILED_HOST_UNRESOLVED";
    case "ECONNREFUSED":
      return "FAILED_CONNECTION_REFUSED";
    case "EHOSTUNREACH":
    case "ENETUNREACH":
      return "FAILED_HOST_UNREACHABLE";
    case "ETIMEDOUT":
    case "ETIMEOUT":
      return "FAILED_TIMEOUT";
    case "ER_ACCESS_DENIED_ERROR":
    case "ER_ACCESS_DENIED_NO_PASSWORD_ERROR":
      return "FAILED_ACCESS_DENIED";
    case "ER_DBACCESS_DENIED_ERROR":
      return "FAILED_DATABASE_ACCESS_DENIED";
    case "ER_BAD_DB_ERROR":
      return "FAILED_UNKNOWN_DATABASE";
    case "PROTOCOL_CONNECTION_LOST":
    case "ECONNRESET":
      return "FAILED_CONNECTION_LOST";
    default:
      return "FAILED_OTHER";
  }
}

function withWatchdog<T>(work: Promise<T>, ms: number, onTimeout: () => void): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      try {
        onTimeout();
      } catch {
        // ignore; the connection is being discarded anyway
      }
      reject(new DbClientError("FAILED_TIMEOUT"));
    }, ms);
  });
  return Promise.race([work, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

function timingCategory(elapsedMs: number): TimingCategory {
  if (elapsedMs < 1_000) return "UNDER_1S";
  if (elapsedMs <= 5_000) return "1S_TO_5S";
  return "OVER_5S";
}

/** Only the contract section 7 server-facts statement. Database-read-only. */
const SERVER_FACTS_SQL =
  "SELECT VERSION() AS server_version, " +
  "@@character_set_server AS server_charset, " +
  "@@collation_server AS server_collation, " +
  "@@max_allowed_packet AS max_allowed_packet, " +
  "@@innodb_default_row_format AS default_row_format, " +
  "CURRENT_USER() AS current_principal";

/** Only the contract section 7 grants statement. Database-read-only. */
const GRANTS_SQL = "SHOW GRANTS FOR CURRENT_USER()";

function principalMatchCategory(currentPrincipal: unknown, configuredUser: string): PrincipalMatch {
  if (typeof currentPrincipal !== "string" || currentPrincipal.length === 0) return "UNKNOWN";
  const at = currentPrincipal.indexOf("@");
  const userPart = at >= 0 ? currentPrincipal.slice(0, at) : currentPrincipal;
  return userPart === configuredUser ? "MATCH" : "MISMATCH";
}

function unquoteIdentifier(raw: string): string {
  let s = raw.trim();
  if (s.startsWith("`") && s.endsWith("`") && s.length >= 2) s = s.slice(1, -1);
  // SHOW GRANTS escapes wildcard characters inside database names.
  return s.replace(/\\_/g, "_").replace(/\\%/g, "%").replace(/``/g, "`");
}

function grantCategories(
  rows: ReadonlyArray<RowDataPacket>,
  configuredDatabase: string,
): { scope: GrantScope; privilege: GrantPrivilege } {
  let globalNonUsage = false;
  let anyAll = false;
  let anyPartial = false;
  let tableLevel = 0;
  const databases = new Set<string>();

  for (const row of rows) {
    const text = Object.values(row).find((v) => typeof v === "string") as string | undefined;
    if (!text) continue;
    const m = /^GRANT\s+(.+?)\s+ON\s+(.+?)\s+TO\s+/i.exec(text);
    if (!m) continue; // e.g. PROXY grants or unrecognized syntax are ignored
    const privileges = m[1].trim().toUpperCase();
    const scope = m[2].trim();
    const isUsageOnly = privileges === "USAGE";
    const isAll = privileges === "ALL PRIVILEGES" || privileges === "ALL";

    if (!isUsageOnly) {
      if (isAll) anyAll = true;
      else anyPartial = true;
    }

    if (scope === "*.*") {
      if (!isUsageOnly) globalNonUsage = true;
      continue;
    }
    const dot = scope.lastIndexOf(".");
    if (dot < 0) continue;
    const dbPart = unquoteIdentifier(scope.slice(0, dot));
    const objPart = scope.slice(dot + 1).trim();
    if (isUsageOnly) continue;
    if (objPart === "*") databases.add(dbPart);
    else tableLevel += 1;
  }

  let scopeCategory: GrantScope;
  if (globalNonUsage) scopeCategory = "GLOBAL";
  else if (databases.size === 1) {
    const only = [...databases][0];
    scopeCategory = only === configuredDatabase ? "SINGLE_DATABASE_CONFIGURED" : "SINGLE_DATABASE_OTHER";
  } else if (databases.size > 1) scopeCategory = "MULTIPLE_DATABASES";
  else if (tableLevel > 0) scopeCategory = "TABLE_LEVEL_ONLY";
  else scopeCategory = rows.length > 0 ? "NONE" : "UNKNOWN";

  const privilegeCategory: GrantPrivilege = anyAll
    ? "ALL_PRIVILEGES"
    : anyPartial
      ? "PARTIAL_PRIVILEGES"
      : rows.length > 0
        ? "USAGE_ONLY"
        : "UNKNOWN";

  return { scope: scopeCategory, privilege: privilegeCategory };
}

/**
 * Executes the bounded, database-read-only G-03 R2 diagnostic (contract
 * section 7) and returns category values only. Never throws; every failure is
 * normalized into `connectivity`. Never logs.
 */
export async function runG03R2Diagnostic(): Promise<G03R2DiagnosticResult> {
  const result: G03R2DiagnosticResult = {
    driver: typeof createPool === "function" ? "MYSQL2_EXECUTED" : "MYSQL2_FAILED_INIT",
    connectivity: "FAILED_OTHER",
    serverVersion: null,
    serverCharset: null,
    serverCollation: null,
    maxAllowedPacket: null,
    defaultRowFormat: null,
    principalMatch: "UNKNOWN",
    grantScope: "UNKNOWN",
    grantPrivilege: "UNKNOWN",
    timing: "UNDER_1S",
  };

  const startedAt = Date.now();
  let connection: PoolConnection | undefined;
  try {
    const config = readDbConfig();
    const activePool = getPool();
    connection = await withWatchdog(activePool.getConnection(), CONNECT_TIMEOUT_MS + 500, () => undefined);
    const conn = connection;
    result.connectivity = "CONNECTED";

    const [factRows] = await withWatchdog(
      conn.query<RowDataPacket[]>(SERVER_FACTS_SQL),
      STATEMENT_TIMEOUT_MS,
      () => conn.destroy(),
    );
    const facts = factRows[0] ?? {};
    result.serverVersion = typeof facts.server_version === "string" ? facts.server_version : null;
    result.serverCharset = typeof facts.server_charset === "string" ? facts.server_charset : null;
    result.serverCollation = typeof facts.server_collation === "string" ? facts.server_collation : null;
    result.maxAllowedPacket =
      typeof facts.max_allowed_packet === "number"
        ? facts.max_allowed_packet
        : typeof facts.max_allowed_packet === "string" && /^\d+$/.test(facts.max_allowed_packet)
          ? Number.parseInt(facts.max_allowed_packet, 10)
          : null;
    result.defaultRowFormat = typeof facts.default_row_format === "string" ? facts.default_row_format : null;
    result.principalMatch = principalMatchCategory(facts.current_principal, config.user);

    const [grantRows] = await withWatchdog(
      conn.query<RowDataPacket[]>(GRANTS_SQL),
      STATEMENT_TIMEOUT_MS,
      () => conn.destroy(),
    );
    const categories = grantCategories(grantRows, config.database);
    result.grantScope = categories.scope;
    result.grantPrivilege = categories.privilege;
  } catch (error) {
    // A failure before the connection is established becomes the connectivity
    // category. A failure after a successful connection keeps CONNECTED; the
    // affected server-fact / grant fields simply remain null / UNKNOWN.
    if (result.connectivity !== "CONNECTED") result.connectivity = normalizeError(error);
  } finally {
    if (connection) {
      try {
        connection.release();
      } catch {
        // a destroyed connection cannot be released; nothing to do
      }
    }
    result.timing = timingCategory(Date.now() - startedAt);
  }
  return result;
}
