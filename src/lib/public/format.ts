/**
 * Dutch-first formatting helpers for the public frontend (LFB-101).
 */

const DUTCH_LOCALE = "nl-NL";

/** Formats an ISO date string as a long Dutch date, e.g. "3 maart 2026". */
export function formatDateNl(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(DUTCH_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Machine-readable value for a <time dateTime> attribute. */
export function isoDateAttr(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}
