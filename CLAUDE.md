# Working in ark-www

The marketing site for ARK. Astro, static output, one React island. Full detail
is in [README.md](./README.md); this file is the short list of things that are
expensive to rediscover.

## The rule that matters most

**Verify in the frame the failure appears in.**

Six separate defects here have been the same defect: a value checked against one
reference while the failure happened against a different one. The check was
correct every time. See
[The bug this repo keeps having](./README.md#the-bug-this-repo-keeps-having) for
the six and why re-reading the diff does not catch it.

In practice, before calling a change done:

- Measure **what a person sees** - header bottom to first visible text - not
  what an element declares its boundary to be.
- Hold a new colour against **every surface it can meet**, not just the one it
  was designed against.
- If a mechanism resolves against something outside the file - the operating
  system, the rendering component, another CSS property - say so where it is
  used.
- Two mechanisms producing one outcome is the smell. Pick one, delete the other.

## Traps that have actually fired

- **`dark:` is banned.** Tailwind resolves it against the operating system, and
  this site's theme can be pinned against the OS by the header toggle, so a
  `dark:` rule fires for someone who explicitly chose light. Every colour
  already flips through a token. `components.json` still names lucide, so a
  freshly added shadcn component arrives with `dark:` variants - strip them.
- **`<style>` in a component only reaches that component's own elements.** If it
  styles something rendered by a child component, it needs `is:global`. This has
  cost two attempts on `ThemeToggle.astro`.
- **One scroll offset, on `html`.** Never add `scroll-mt-*` to a target as well;
  they add. Section fragment ids sit on the content container, not the
  `<section>`, so anchors land on the heading rather than on 128px of padding.
- **Icons come from lucide, imported as components.** Never inline path data -
  that is how five hand-drawn glyphs ended up pretending to be lucide.
- **Do not import an icon _map_ into anything that ships to the browser.** It
  pulls every path into the island. Import the components used, by name.

## Claims and content

The page sells to keepers and rehabilitators, not engineers. Two standing rules,
both with a history:

- **No figure the page cannot stand behind.** The capture loop was once labelled
  `0s / 8s / 15s / 30s` and nobody had timed a keeper.
- **No selling by comparison.** The test for naming another product is whether
  the sentence survives them fixing the thing you mentioned.

Anything tiered in `records.ts` or `pricing.ts` must read as tiered everywhere
else on the page.

## Before committing

`pnpm format:check && pnpm check && pnpm build`. Commit only when asked; this
repo deploys to production on push to `main`.
