/**
 * Canonical public route map (LFB-101).
 *
 * Documentation-level constant only: it does not create routes. Route files
 * are added in later, separately released batches.
 */

export const publicRoutes = {
  home: "/",
  about: "/over-ons",
  services: "/diensten",
  serviceCategory: "/diensten/$categorie",
  serviceDetail: "/diensten/$categorie/$slug",
  aanvraaghulp: "/aanvraaghulp",
  documents: "/documentenlijsten",
  faq: "/veelgestelde-vragen",
  news: "/nieuws",
  newsDetail: "/nieuws/$slug",
  contact: "/contact",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
} as const;

export type PublicRouteKey = keyof typeof publicRoutes;
