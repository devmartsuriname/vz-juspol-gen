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
 * - bounded pool (max 5 connections), connect timeout 5 s, no keep-alive
 *   timers;
 * - no durable in-process state is assumed (idle-stop / restart safe);
 * - callers receive category values only; raw errors, identifiers and
 *   credentials never leave this module.
 *
 * This file lives under `src/server/**`, which the build's import protection
 * forbids from client bundles.
 */
import { createPool } from "mysql2/promise";
import type { Pool } from "mysql2/promise";

const POOL_CONNECTION_LIMIT = 5;
const CONNECT_TIMEOUT_MS = 5_000;
const IDLE_TIMEOUT_MS = 10_000;

const ENV_HOST = "DB_HOST";
const ENV_PORT = "DB_PORT";
const ENV_NAME = "DB_NAME";
const ENV_USER = "DB_USER";
const ENV_PASSWORD = "DB_PASSWORD";

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
