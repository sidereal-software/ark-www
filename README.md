# ark-www

The marketing site for **ARK** - mobile-first animal recordkeeping for zoos,
wildlife rehabilitation centres, sanctuaries and rescues.

Serves at <https://ark.sidereal.software>. Static HTML plus one hydrated island -
the mobile navigation menu, and nothing else - deployed to GitHub Pages by
Actions. That island costs **84.3 KB gzipped of JavaScript**; see
[The JavaScript budget](#the-javascript-budget) for what it buys and what it
replaced.

This repository is the _site_. The product lives in the private `ark`
repository, and nothing here imports from it - the design tokens were copied
across once, deliberately, and the copy is annotated where it diverges.

## Stack

|                 |                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Framework       | Astro 7, static output. One component asks for JavaScript; every other page section is prerendered and inert |
| Interactivity   | React 19 via `@astrojs/react`, on exactly one island                                                         |
| Components      | shadcn/ui, `new-york` style, Radix primitives - the ARK app's own setup                                      |
| Styles          | Tailwind CSS v4 via `@tailwindcss/vite`                                                                      |
| Fonts           | Fraunces and Plus Jakarta Sans, self-hosted from `@fontsource-variable`, latin subsets only                  |
| Images          | `astro:assets` with `sharp`, emitting WebP at five widths per photograph                                     |
| Package manager | pnpm                                                                                                         |
| Node            | 24                                                                                                           |

Tailwind arrives through the Vite plugin rather than `@astrojs/tailwind`. The
Astro integration is deprecated and caps at Astro 5 / Tailwind 3; the Vite plugin
is also what the ARK app itself uses, so both trees are on the same Tailwind.

`components.json` mirrors the app's, so `pnpm dlx shadcn@latest add <component>`
writes the same files here that it writes there. React and `radix-ui` are pinned
to the versions the app runs.

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
components.json          shadcn/ui config, mirroring the ARK app's
src/
  consts.ts              Site metadata and the one contact link
  data/                  Page content that is iterated over
    nav.ts               The page's table of contents, shared header and menu
    pricing.ts           The four plans and what each adds
    records.ts           What ARK records, by group
    never.ts             The "what we will never do" commitments
    sources.ts           Every citation on the page, numbered
    photos.ts            Every photograph, with its licence and credit
  assets/photos/         The photograph files themselves, optimized at build
  components/            One component per page section, plus shared pieces
    Photo.astro          The only way an image gets onto the site
    PhotoBand.astro      A full-bleed photograph between two sections
    MobileNav.tsx        The only hydrated component on the site
    ui/                  shadcn/ui components, added by its CLI
  lib/utils.ts           cn(), the shadcn class merger
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

## The JavaScript budget

This site shipped no JavaScript at all until it needed a navigation menu. Below
the `md` breakpoint the header's inline links do not fit, which left a visitor on
a phone with no way to navigate a page over 31,000px tall except to scroll it or
reach the footer. `src/components/MobileNav.tsx` is the fix, and it is the only
hydrated thing here.

What it costs, gzipped, measured from `dist/`:

| Chunk         | Raw      | Gzip        |
| ------------- | -------- | ----------- |
| React runtime | 180.6 KB | 56.4 KB     |
| `react-dom`   | 11.5 KB  | 4.2 KB      |
| The island    | 73.1 KB  | 23.8 KB     |
| **Total**     |          | **84.3 KB** |

This island roughly doubles what the page would otherwise ship in script and
markup. That is the honest price of a Radix dialog and it is not small.

Measured against `pnpm preview` at 1440px, first-view transfer for `/` is about
**338 KB** over 9 requests, of which **182 KB is photography** - four WebP
files, served from a five-width `srcset` so a phone fetches a much smaller cut
than a desktop does. The images cost more than the island, and they are worth
it: see [Photography](#photography). Two things to know before changing the
island:

- **It is `client:load` on purpose.** A navigation control sits in a sticky
  header, on screen from the first frame, and has to work when it is touched
  rather than when the browser gets round to it. `client:visible` and
  `client:idle` are the wrong trade for this one component.
- **Desktop pays for a control it never sees.** The trigger is `md:hidden`, so
  above 768px the whole 84.3 KB hydrates a button nobody can reach. Switching
  the directive to `client:media="(max-width: 767px)"` would take desktop to
  zero and leave mobile unchanged - at the cost of hydrating on media-query
  match rather than on load.

Everything else on the page is still prerendered and inert. Adding a `client:*`
directive anywhere else is a decision to be made deliberately, not by accident.

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
3. **There is no dark mode.** Not "no toggle" - no dark scheme at all. The
   page is a warm, paper-coloured surface whatever the operating system is set
   to, and `color-scheme: light` keeps form controls and scrollbars from
   inverting underneath it. The sage-on-near-black variant this site used to
   ship read as a developer tool, which is the one thing a page selling to
   zoos, sanctuaries and rehabilitation centres cannot look like. Deleting it
   touched four places, and the fourth is the one that bites: `button.tsx` had
   upstream's `dark:` variants, and Tailwind resolves `dark:` against the
   operating system whether or not any dark token exists. Grep for `dark:`
   before adding a shadcn component here.

Two further divergences are newer, and both exist to stop the page reading as
a developer tool:

4. **`--foreground` and `--ink` are rotated off the app's hue.** The app's
   near-black is `oklch(0.2417 0.0298 269.8827)`, and hue 270 is blue-violet -
   blue-slate under a sage accent is the house palette of every developer tool
   on the web. The site keeps the lightness and moves the hue to 152, the
   sage's own family, so the darkest ink reads as deep forest. Because only hue
   moved, every measured ratio shifted by hundredths.
5. **There is a second hue.** The app is monochrome sage, which is right for a
   workspace and wrong for the page that sells it. `--clay` is a terracotta at
   the same lightness as `--primary`, and `--muted` is warmed from a
   near-neutral grey to savanna sand. Together they give the page the earth
   register the sector actually lives in.

The clay is a **system, not decoration**, and the rule is worth keeping:

> **Sage means you can act on it.** Buttons, links, the focus ring.
> **Clay means it is a label.** Eyebrows, the field-notebook rules, the
> specimen numbering on the record cards.

Before the split, eyebrows were sage - the same colour as every link on the
page. That was a small affordance lie, painting static text in the site's one
interactive colour. Splitting the two fixes it and buys the warmth at once.

Clay and sage sit at identical lightness on purpose: they are peers, not a
colour and its tint. The cost of that choice is recorded in the forbidden-pairs
list at the bottom of `theme.css` - neither ever has enough contrast against a
tint of the other, so `--primary` on `--clay-soft` is measured at 4.29:1 and
banned. It is the one that looks fine and is not.

Every text and background pair on the site was computed rather than eyeballed,
and the full table is at the bottom of `theme.css`. If you add a pair, measure
it. One combination is measured and then _forbidden_: primary text on the accent
fill is 3.41:1, so text on accent is always `--accent-foreground`.

The mark is the product's, not the site's. `src/components/Logo.astro` and
`public/favicon.svg` carry the paw from the ARK app's own
`frontend/public/favicon.svg`, geometry unchanged; only the colour is different,
so that one mark works in both schemes. The site does not get to design a
different identity from the thing it is selling - if the app's mark changes,
this one changes with it.

Motion is CSS only, including the menu's - the sheet's enter and exit are
`tw-animate-css` keyframes that Radix toggles by `data-state`, not animation
driven from JavaScript. Section reveals use scroll-driven `animation-timeline:
view()`, wrapped in `@supports` and in `prefers-reduced-motion: no-preference`,
and content is fully visible by default - so a browser without scroll-driven
animations, or a visitor who asked for less motion, simply gets the finished
state. No page content can be left invisible by a script that did not run.

The two shadcn components here diverge from the ARK app's copies in one shared
way, recorded at the top of each file: neither draws its own focus ring. This
site has a single `:focus-visible` outline in `global.css` that every link,
button and menu item shares, and a component that opted out with `outline-none`
would be the only control on the page with a different one. `button.tsx` also
carries the site's semibold label and press affordance, and an `xl` step on both
size scales, because 44px touch targets are the floor on a site about software
used one-handed on a phone.

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
logos, no testimonials, no "trusted by", and no running totals. There is also no
paragraph pointing that out. A page earns trust by being specific about what the
software does, not by narrating its own honesty, and the two read very
differently to someone deciding whether to spend their rescue's money here.
Build a figures section when the figures exist and are measured.

## Photography

Four photographs, all openly licensed, all sourced from Wikimedia Commons. They
are what stops the page reading as a developer tool: every zoo, aquarium,
sanctuary and rehabilitation site this one has to feel familiar beside is
photograph-led, including Species360, the incumbent this product displaces.

Every image goes through `<Photo slug="..." />`, and every slug must exist in
`src/data/photos.ts` or the build throws - the same rule `<Footnote />` enforces
for citations, for the same reason. An unattributed CC BY-SA photograph is a
licence breach, not a cosmetic bug, so it must not survive to a deploy.

Three of the four are CC BY-SA and **oblige us to print a credit**, which
`Footer.astro` renders from the data file. The fourth, a US National Park
Service work, is public domain and asks nothing. Four things to keep in mind
before touching this:

- **Do not crop a BY-SA file.** ShareAlike binds adaptations, and a crop is
  arguably one. Framing is done with `object-position`, so the file on disk
  stays whole and the viewport does the cropping. If a design genuinely needs a
  cropped photograph, use one of the two public-domain files or license the crop.
- **Credits render in the page, not in this README.** A licence condition that
  only a developer can see has not been met.
- **No photograph here shows an ARK customer**, because there are none. The
  no-social-proof rule below still governs: nothing may be captioned to imply
  the people in these frames use this product.
- **The data file and the page stay in step.** The footer credits every entry
  in `photos.ts`, so a photograph that is declared but no longer placed on the
  page produces a credit for something nobody can see. Remove the last use,
  remove the entry and the file.

Replacing one means adding the file to `src/assets/photos/`, adding its entry
to `src/data/photos.ts` with the licence exactly as Commons records it, and
checking whether `attributionRequired` changes what the footer prints.

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
