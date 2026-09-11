/**
 * Canonical public route map and typed navigation configuration.
 *
 * LFB-101 introduced the route constants. LFB-102 adds the navigation
 * configuration used by the public shell.
 *
 * Availability rule: a navigation entry is only rendered as a link when its
 * route file actually exists (`available: true`). Planned routes stay in this
 * file as documentation so the shell can be completed batch by batch, but they
 * are never exposed as public links, so the shell can never produce a broken
 * link.
 */

import type { FileRoutesByPath } from "@tanstack/react-router";

export const publicRoutes = {
  home: "/",
  about: "/over-ons",
  services: "/diensten",
  serviceCategory: "/diensten/$categorie",
  serviceDetail: "/diensten/$categorie/$slug",
  aanvraaghulp: "/aanvraaghulp",
  documents: "/documentenlijsten",
  faq: "/veelgestelde-vragen",
  stakeholders: "/instanties",
  news: "/nieuws",
  newsDetail: "/nieuws/$slug",
  contact: "/contact",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
} as const;

export type PublicRouteKey = keyof typeof publicRoutes;

/**
 * Paths for which a public route file exists today. Admin paths are excluded
 * by construction, so the public shell can never link into /admin.
 */
export type ExistingRoutePath = Exclude<
  keyof FileRoutesByPath,
  `/admin${string}` | `${string}/`
> | "/";

/** A navigation entry whose route file exists and may be linked. */
export type AvailableNavItem = {
  key: PublicRouteKey;
  label: string;
  to: ExistingRoutePath;
  available: true;
};

/** A navigation entry that is planned but has no route file yet. */
export type PlannedNavItem = {
  key: PublicRouteKey;
  label: string;
  path: string;
  available: false;
};

export type PublicNavConfigItem = AvailableNavItem | PlannedNavItem;

/**
 * Primary navigation. Labels are Dutch interface labels for the planned
 * public route set; they are not institutional claims.
 */
export const primaryNav: readonly PublicNavConfigItem[] = [
  { key: "home", label: "Home", to: "/", available: true },
  { key: "about", label: "Over ons", to: publicRoutes.about, available: true },
  { key: "services", label: "Diensten", to: publicRoutes.services, available: true },
  { key: "aanvraaghulp", label: "Aanvraaghulp", to: publicRoutes.aanvraaghulp, available: true },
  { key: "documents", label: "Documentenlijsten", to: publicRoutes.documents, available: true },
  { key: "faq", label: "Veelgestelde vragen", to: publicRoutes.faq, available: true },
  { key: "news", label: "Nieuws", to: publicRoutes.news, available: true },
  { key: "contact", label: "Contact", to: publicRoutes.contact, available: true },
  { key: "stakeholders", label: "Instanties", to: publicRoutes.stakeholders, available: true },
];

/** Footer link groups, using the same availability rule as the primary nav. */
export const footerNav: readonly {
  heading: string;
  items: readonly PublicNavConfigItem[];
}[] = [
  {
    heading: "Informatie",
    items: [
      { key: "about", label: "Over ons", to: publicRoutes.about, available: true },
      { key: "news", label: "Nieuws en mededelingen", to: publicRoutes.news, available: true },
      { key: "faq", label: "Veelgestelde vragen", to: publicRoutes.faq, available: true },
    ],
  },
  {
    heading: "Voorbereiding",
    items: [
      { key: "services", label: "Diensten", to: publicRoutes.services, available: true },
      { key: "aanvraaghulp", label: "Aanvraaghulp", to: publicRoutes.aanvraaghulp, available: true },
      {
        key: "documents",
        label: "Documentenlijsten",
        to: publicRoutes.documents,
        available: true,
      },
    ],
  },
];

/** Legal links shown in the footer bottom bar. */
export const legalNav: readonly PublicNavConfigItem[] = [
  { key: "privacy", label: "Privacy", to: publicRoutes.privacy, available: true },
  { key: "disclaimer", label: "Disclaimer", to: publicRoutes.disclaimer, available: true },
];

export function availableItems(
  items: readonly PublicNavConfigItem[],
): readonly AvailableNavItem[] {
  return items.filter((item): item is AvailableNavItem => item.available);
}
