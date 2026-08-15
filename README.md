# ark-www

The marketing site for **ARK** - mobile-first animal recordkeeping for zoos,
wildlife rehabilitation centres, sanctuaries and rescues.

Serves at <https://ark.sidereal.software>. Static, zero JavaScript shipped to the
browser, deployed to GitHub Pages by Actions.

This repository is the _site_. The product lives in the private `ark`
repository, and nothing here imports from it - the design tokens were copied
across once, deliberately, and the copy is annotated where it diverges.

## Stack

|                 |                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- |
| Framework       | Astro 7 (static output, no JavaScript unless a component asks for it - none currently does) |
| Styles          | Tailwind CSS v4 via `@tailwindcss/vite`                                                     |
| Fonts           | Fraunces and Plus Jakarta Sans, self-hosted from `@fontsource-variable`, latin subsets only |
| Package manager | pnpm                                                                                        |
| Node            | 24                                                                                          |

Tailwind arrives through the Vite plugin rather than `@astrojs/tailwind`. The
Astro integration is deprecated and caps at Astro 5 / Tailwind 3; the Vite plugin
is also what the ARK app itself uses, so both trees are on the same Tailwind.

## Local development

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

Other commands:

```sh
pnpm build        # static site into dist/
pnpm preview      # serve dist/ locally, which is what CI builds
pnpm check        # astro check - types and template diagnostics
pnpm format       # prettier --write
pnpm format:check # what CI runs
```

`pnpm-workspace.yaml` exists only to approve esbuild's install script. pnpm 11
blocks dependency build scripts by default and exits non-zero when one is
ignored, and esbuild's script is what resolves its platform binary.

## Layout

```
src/
  consts.ts              Site metadata and the one contact link
  data/                  Page content that is iterated over
    pricing.ts           The four plans and what each adds
    records.ts           What ARK records, by group
    never.ts             The "what we will never do" commitments
    sources.ts           Every citation on the page, numbered
  components/            One component per page section, plus shared pieces
  layouts/BaseLayout.astro   <head>, metadata, skip link, header and footer
  pages/
    index.astro          The whole site
    404.astro
  styles/
    theme.css            Design tokens, and the measured contrast table
    global.css           Base styles, section helpers, the motion system
public/                  favicon, touch icon, OG image, robots.txt
```

One page, deliberately. Splitting pricing or the feature list onto their own
URLs would make someone navigate to finish a decision they are already making by
scrolling. Split when a section earns its own URL, not before.

## Design system

The tokens in `src/styles/theme.css` are the ARK app's own, so the site and the
product look like one company. Three things are deliberately not inherited, and
each is commented where it happens:

1. **The primary colour is darker.** The app's
   `oklch(0.6333 0.0309 154.9039)` measures **3.40:1** against white - fine for
   large text and UI, a failure for the small white button labels this page is
   full of. The site uses `oklch(0.5 0.06 155)`, same hue family, **5.82:1**
   with white on it and **5.43:1** as text on the page background.
2. **Spacing and the type scale are marketing-sized.** The app runs a `0.23rem`
   spacing base to fit dense record lists on a phone; reading matter wants room,
   so this uses Tailwind's own `0.25rem` and a larger scale with display
   leading.
3. **Dark mode follows the operating system.** No toggle, no storage key, no
   inline anti-flash script. The app has a theme switch because it is a
   workspace someone sits in all day; a one-page site does not earn one.

Every text and background pair on the site was computed rather than eyeballed,
and the full table is at the bottom of `theme.css`. If you add a pair, measure
it. One combination is measured and then _forbidden_: primary text on the accent
fill is 3.41:1, so text on accent is always `--accent-foreground`.

Motion is CSS only. Section reveals use scroll-driven `animation-timeline:
view()`, wrapped in `@supports` and in `prefers-reduced-motion: no-preference`,
and content is fully visible by default - so a browser without scroll-driven
animations, or a visitor who asked for less motion, simply gets the finished
state. Nothing can be left invisible by a script that did not run.

## Content rules

The page makes claims about an industry, so it carries a bibliography.
`src/data/sources.ts` holds every one, `<Footnote id="..." />` renders the
marker, and the component throws at build time if the id is not in the file - a
footnote cannot point at nothing.

Two habits worth keeping:

- **A source gets a link only where the URL is known to resolve.** The rest are
  cited by name, section and date. A citation someone can look up beats a link
  that 404s in a year.
- **Nothing is quoted beyond what the source says.** Where quotation marks
  appear on the page, the words inside them are the source's, verified against
  the source itself and not reconstructed from a summary.

There is no social proof on the site, because ARK has no customers yet: no
logos, no testimonials, no "trusted by". `src/components/LiveCounters.astro` is
a marked placeholder for real running totals later, with the wiring instructions
in its own comment. It renders a dash rather than a number. Do not put a number
in it until there is one.

## Screenshots

There are none yet. Three marked placeholders stand in for them;
[`SCREENSHOTS.md`](./SCREENSHOTS.md) says what to capture, at what viewport, and
how to swap each one in.

## The contact form seam

The only call to action is a `mailto:`, defined once as `CONTACT_HREF` in
`src/consts.ts`. There is no signup, no demo and no backend for this site, and a
contact form that posts nowhere loses whatever someone took the trouble to write.

`src/components/ContactCta.astro` carries a commented seam describing exactly how
to swap in a Formspree form when there is somewhere for it to go - Formspree is
already the house pattern on the main Sidereal site. It deliberately does not
invent an endpoint id, because a wrong one fails silently, which is the failure
the mailto exists to avoid.

## Deployment

Pushing to `main` builds and publishes. `.github/workflows/deploy.yml` runs
format check, `astro check` and the build, uploads `dist` as a Pages artifact,
and a second job deploys it.

### This repository is public, and has to be

`sidereal-software/ark-www` is public. That is not incidental: **GitHub Pages is
not available for private repositories on GitHub Free.** It is the reason the
site cannot simply live inside the private `ark` repository, and the reason this
repository must stay public unless the organization moves to a paid plan. Keep
the product's source out of here accordingly.

### One-time setup

1. **Settings -> Pages -> Build and deployment -> Source: GitHub Actions.**
   Not "Deploy from a branch". If it is left on branch deployment, GitHub's
   built-in Jekyll workflow runs alongside this one and you get two competing
   deployments on every push.
2. **Settings -> Pages -> Custom domain: `ark.sidereal.software`.** Verify the
   domain first, under the organization's Pages settings, before adding it here.
   An unverified custom domain is how subdomain takeover happens.
3. **DNS: one record.**

   | Type    | Name  | Value                          |
   | ------- | ----- | ------------------------------ |
   | `CNAME` | `ark` | `sidereal-software.github.io.` |

   Note the trailing dot, and note that the target is the **organization's**
   Pages domain - `sidereal-software.github.io` - not the repository name. This
   is a subdomain, so it takes a CNAME; only an apex domain would need the four
   A records GitHub also documents.

4. **Wait for the certificate.** Provisioning can take up to an hour, and
   **Enforce HTTPS** cannot be ticked until it has issued. Tick it once it can be.

### Two files that are deliberately absent

- **There is no `public/CNAME`.** With a custom Actions workflow, GitHub does not
  create a `CNAME` file and ignores one if it is there; the custom domain lives
  in the repository's Pages settings. Astro's own documentation says to add one,
  and it is wrong for this setup. Please do not helpfully add it back.
- **There is no `.nojekyll`.** Jekyll only runs on branch-based publishing.
  Nothing here is passed through it.

### Nothing is pushed automatically from a working copy

The workflow is the only thing that deploys. There is no `gh-pages` branch to
push to and no manual publish step.

## Licence

All rights reserved. This is a marketing site, not a template.
