// Devmart Admin — page metadata registry.
// One entry per active admin route. Extend when you add new pages.
export type AdminPageMeta = { title: string; description: string };

export const adminPageMeta: Record<string, AdminPageMeta> = {
  index: {
    title: "Dashboard · Devmart Admin",
    description: "Devmart Admin dashboard.",
  },
};
