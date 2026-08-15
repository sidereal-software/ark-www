// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The site serves at the apex of its own subdomain, so there is no `base`.
// Tailwind arrives through the Vite plugin, the same one the ARK app uses -
// @astrojs/tailwind is deprecated and pins to Astro 5 / Tailwind 3.
//
// React renders one island, the mobile menu. Nothing else on the site carries
// a client: directive, so React never reaches the browser on any other route.
export default defineConfig({
  site: "https://ark.sidereal.software",
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
