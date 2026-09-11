/**
 * VZ Juspol Gen — typed public content foundations (LFB-101).
 *
 * These types describe governed content records only. No institutional
 * identity, contact data, service, fee, document, FAQ, legal text or
 * notice is defined here: every record set ships empty until Delroy
 * supplies approved content.
 */

/** A record set that is deliberately empty until governed content arrives. */
export type GovernedStatus = "missing-blocking" | "empty-allowed" | "supplied";

export interface GovernedRecordSet<T> {
  /** Why the set may be empty, for the governed empty-state UI. */
  status: GovernedStatus;
  items: ReadonlyArray<T>;
}

export interface Identity {
  name: string;
  shortName?: string;
  mandate?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface ContactChannel {
  kind: "address" | "phone" | "email" | "hours" | "other";
  label: string;
  value: string;
  note?: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  summary?: string;
}

export interface ServiceBlock {
  heading: string;
  body?: string;
  items?: ReadonlyArray<string>;
}

export interface Service {
  slug: string;
  categorySlug: string;
  title: string;
  summary?: string;
  /** The mandated block order, rendered only for blocks that exist. */
  blocks: ReadonlyArray<ServiceBlock>;
}

export interface DocumentRequirement {
  slug: string;
  title: string;
  description?: string;
}

export interface FaqCategory {
  slug: string;
  title: string;
}

export interface FaqItem {
  id: string;
  categorySlug: string;
  question: string;
  answer: string;
}

export interface Notice {
  slug: string;
  title: string;
  /** ISO date string. */
  publishedAt: string;
  summary?: string;
  body?: string;
}

export interface LegalText {
  slug: "privacy" | "disclaimer";
  title: string;
  body: string;
}
