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
  integrations: [
    // /og-card is the source artwork for public/og.png, not a destination. It
    // carries noindex too; this keeps it out of the sitemap as well, so it is
    // never offered to a crawler as a page of the site.
    sitemap({ filter: (page) => !page.includes("/og-card") }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
