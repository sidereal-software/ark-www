// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The site serves at the apex of its own subdomain, so there is no `base`.
// Tailwind arrives through the Vite plugin, the same one the ARK app uses -
// @astrojs/tailwind is deprecated and pins to Astro 5 / Tailwind 3.
export default defineConfig({
  site: "https://ark.sidereal.software",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
