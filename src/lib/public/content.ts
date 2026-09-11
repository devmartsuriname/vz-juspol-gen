/**
 * Read helpers for governed public content (LFB-101).
 *
 * These helpers never fabricate a fallback value. When a record is absent
 * the caller must render a governed empty state or omit the block.
 */

import type { GovernedRecordSet } from "@/content/types";

export function isEmpty<T>(set: GovernedRecordSet<T>): boolean {
  return set.items.length === 0;
}

/** True when the route may render, i.e. content exists or emptiness is allowed. */
export function mayRender<T>(set: GovernedRecordSet<T>): boolean {
  return set.items.length > 0 || set.status === "empty-allowed";
}

/** Returns the value only when it is present; never substitutes placeholder text. */
export function present<T>(value: T | null | undefined): T | null {
  return value ?? null;
}
