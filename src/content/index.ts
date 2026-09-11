/**
 * VZ Juspol Gen — governed public content records (LFB-101).
 *
 * Every set below is intentionally EMPTY. Nothing may be invented here:
 * identity, contact data, categories, services, documents, FAQ, notices
 * and legal texts arrive only through a separate governed release.
 */

import type {
  ContactChannel,
  DocumentRequirement,
  FaqCategory,
  FaqItem,
  GovernedRecordSet,
  Identity,
  LegalText,
  Notice,
  Service,
  ServiceCategory,
} from "./types";

/** No approved institutional identity has been supplied yet. */
export const identity: Identity | null = null;

export const contactChannels: GovernedRecordSet<ContactChannel> = {
  status: "missing-blocking",
  items: [],
};

export const serviceCategories: GovernedRecordSet<ServiceCategory> = {
  status: "missing-blocking",
  items: [],
};

export const services: GovernedRecordSet<Service> = {
  status: "missing-blocking",
  items: [],
};

export const documentRequirements: GovernedRecordSet<DocumentRequirement> = {
  status: "missing-blocking",
  items: [],
};

export const faqCategories: GovernedRecordSet<FaqCategory> = {
  status: "missing-blocking",
  items: [],
};

export const faqItems: GovernedRecordSet<FaqItem> = {
  status: "missing-blocking",
  items: [],
};

/** Notices may legitimately be empty; the UI shows a dated empty state. */
export const notices: GovernedRecordSet<Notice> = {
  status: "empty-allowed",
  items: [],
};

export const legalTexts: GovernedRecordSet<LegalText> = {
  status: "missing-blocking",
  items: [],
};

export type * from "./types";
