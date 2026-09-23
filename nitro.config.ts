import { defineConfig } from "nitro/config";

/**
 * Release baseline (MAIN-RELEASE-BASELINE-TRACK-A-001): the production build
 * targets the Node server preset explicitly. Without this file the Lovable
 * Vite wrapper only supplies `defaultPreset: "cloudflare-module"`, so a plain
 * `bun run build` would emit a Worker bundle instead of the Node output
 * (`.output/server/index.mjs`) that the Hostinger Node runtime starts.
 */
export default defineConfig({
  preset: "node-server",
});
