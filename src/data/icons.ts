/**
 * The site's icon set, from game-icons.net.
 *
 * The ARK app moved to game-icons for its own iconography and the site follows
 * it, for the same reason the two share a token layer: they should read as one
 * company. What was here before was three hand-drawn stroke glyphs plus two
 * more from `lucide-react`, so the site ran two icon vocabularies at once and
 * neither of them was the app's.
 *
 * **Everything here is CC BY 3.0 and the credit is a licence condition, not a
 * courtesy.** game-icons.net is one licence across many authors, and the
 * attribution names the author of each icon used - which is why `author` is
 * stored per icon rather than assumed. The footer renders the distinct set, so
 * adding an icon by a new author updates the credit on its own.
 *
 * Two things are normalised on the way in, and both matter if you add one:
 *
 *  1. **The black background plate is dropped.** Every file upstream is a
 *     512x512 black square with the glyph painted white on top. Kept, it would
 *     paint a filled box behind every icon on the page.
 *  2. **The glyph is `currentColor`, not `#fff`.** That is what lets one path
 *     serve the sage on a cream page and the phosphor green on a dark one.
 *
 * `lucide-react` is uninstalled. `components.json` still names lucide as the
 * icon library because it mirrors the app's, so a freshly added shadcn
 * component arrives with lucide imports and will not compile until they are
 * swapped for these - which is the point. A build error is a better guard
 * against a second icon set than a comment nobody reads.
 *
 * These are filled glyphs on a 512 grid, not 24px line icons, so they carry
 * more visual weight at the same box size. Sizes were tuned down when they
 * landed; if one looks heavy, shrink the box before reaching for another icon.
 */

export type IconName = "check" | "cross" | "arrow-right" | "menu" | "close" | "sun" | "moon";

export type IconDef = {
  /** Path data, verbatim from the upstream file. */
  path: string;
  /** Applied to the path, for icons upstream draws in another orientation. */
  transform?: string;
  /** The icon's author on game-icons.net. Named in the footer credit. */
  author: string;
  /** Upstream filename, so the original is findable. */
  slug: string;
};

/** Every icon is drawn on this grid, which is game-icons.net's own. */
export const ICON_VIEWBOX = "0 0 512 512";

/** A tick, for anything a plan or the product includes. */
export const CHECK: IconDef = {
  path: "M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z",
  author: "Delapouite",
  slug: "check-mark",
};

/** A crossed circle, for the commitments ARK will never make. It carries its
 * own ring, which is why the callers that used to draw one around the old bare
 * X no longer do. */
export const CROSS: IconDef = {
  path: "M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm-80.625 60c-.97-.005-2.006.112-3.063.313v-.032c-18.297 3.436-45.264 34.743-33.375 46.626l73.157 73.125-73.156 73.126c-14.63 14.625 29.275 58.534 43.906 43.906L256 299.906l73.156 73.156c14.63 14.628 58.537-29.28 43.906-43.906l-73.156-73.125 73.156-73.124c14.63-14.625-29.275-58.5-43.906-43.875L256 212.157l-73.156-73.125c-2.06-2.046-4.56-3.015-7.47-3.03z",
  author: "sbed",
  slug: "cancel",
};

/** A solid arrow. Upstream points down; the site only ever needs it pointing
 * right, so it is rotated in the path rather than by a class every caller has
 * to remember to add. */
export const ARROW_RIGHT: IconDef = {
  path: "M130.81 21.785v245.95H43.84L256 489.382l212.158-221.644H381.19V21.786H130.81z",
  transform: "rotate(-90 256 256)",
  author: "Delapouite",
  slug: "plain-arrow",
};

/** The mobile navigation trigger. Used by the React island. */
export const MENU: IconDef = {
  path: "M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z",
  author: "Delapouite",
  slug: "hamburger-menu",
};

/** Dismiss, on the mobile navigation sheet. Used by the React island. */
export const CLOSE: IconDef = {
  path: "M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm-80.625 60c-.97-.005-2.006.112-3.063.313v-.032c-18.297 3.436-45.264 34.743-33.375 46.626l73.157 73.125-73.156 73.126c-14.63 14.625 29.275 58.534 43.906 43.906L256 299.906l73.156 73.156c14.63 14.628 58.537-29.28 43.906-43.906l-73.156-73.125 73.156-73.124c14.63-14.625-29.275-58.5-43.906-43.875L256 212.157l-73.156-73.125c-2.06-2.046-4.56-3.015-7.47-3.03z",
  author: "sbed",
  slug: "cancel",
};

/** Day, on the theme toggle. */
export const SUN: IconDef = {
  path: "M320.063 19.72c-72.258 14.575-19.248 71.693-74.344 108.81 4.846-.49 9.746-.702 14.655-.624 16.288.26 32.785 3.72 48.594 10.72 4.96 2.196 9.723 4.667 14.25 7.405 12.107-47.476-37.103-96.38-3.158-126.31zM136.75 44.47c-40.76 61.357 36.984 64.33 24.406 129.405 17.407-21.255 41.17-35.9 67.156-42.313-25.006-42.138-94.4-41.924-91.562-87.093zm297.313 75.405c-32.547.872-45.475 46.314-96.594 36.22 21.35 17.42 36.034 41.25 42.467 67.31 42.306-24.92 42.053-94.466 87.282-91.624-13.43-8.92-24.06-12.15-33.158-11.905zm-177.97 26.656c-23.656.46-46.53 8.82-64.906 23.626l18.657 36.156L170 193.156c-3.576 5.264-6.737 10.908-9.406 16.938-8.726 19.708-11.002 40.59-7.78 60.344l44.78 2.125-34 30.312c10.798 20.622 28.414 37.852 51.406 48.03 3.077 1.364 6.186 2.574 9.313 3.626l24.53-38.25 9.095 43.814c27.3.075 53.737-10.387 73.593-29.188l-19.186-37.125 38.406 12.658c1.822-3.188 3.512-6.506 5.03-9.938 9.746-22.01 11.457-45.498 6.44-67.22l-37.626-1.75 27.687-24.718c-10.83-20.194-28.236-37.07-50.874-47.093-1.37-.607-2.745-1.176-4.125-1.72l-25.874 40.313-9.906-47.75c-.5-.016-1-.023-1.5-.032-1.3-.02-2.61-.024-3.906 0zM133.407 186.5c-41.652.725-82.483 34.847-108.72 5.094 14.573 72.234 71.664 19.3 108.783 74.312-2.154-20.972.934-42.758 10.06-63.375 2.178-4.915 4.637-9.604 7.345-14.093-5.822-1.47-11.642-2.038-17.47-1.937zm249.5 53.97c2.204 21.047-.867 42.926-10.03 63.624l-.188.375c-2.143 4.796-4.57 9.393-7.22 13.78 47.524 12.244 96.507-37.137 126.47-3.156-14.603-72.388-71.92-19.04-109.032-74.625zM136.53 283.405c-42.123 25.014-41.928 94.37-87.093 91.53 61.422 40.803 64.322-37.123 129.594-24.342-21.344-17.385-36.03-41.167-42.5-67.188zm219.064 48.906c-17.406 21.46-41.236 36.24-67.344 42.72 24.944 42.263 94.497 42.004 91.656 87.218 40.867-61.52-37.402-64.358-24.312-129.938zM193.406 360.72c-12.047 47.456 37.087 96.33 3.156 126.25 72.305-14.587 19.195-71.79 74.47-108.908-21.04 2.204-42.898-.9-63.594-10.062-4.884-2.162-9.57-4.594-14.032-7.28z",
  author: "Lorc",
  slug: "sun",
};

/** Night, on the theme toggle. */
export const MOON: IconDef = {
  path: "M253.125 18.563c-131.53 0-238.375 106.813-238.375 238.343 0 131.53 106.846 238.344 238.375 238.344 131.53 0 238.344-106.815 238.344-238.344 0-131.528-106.816-238.344-238.345-238.344zm-23.938 52.093c40.517 0 77.988 12.904 108.532 34.813-5.597-.624-11.302-.97-17.064-.97-84.157 0-152.375 68.25-152.375 152.406 0 84.157 68.22 152.375 152.376 152.375 5.762 0 11.467-.313 17.063-.936-30.545 21.91-68.016 34.812-108.533 34.812-102.98 0-186.28-83.272-186.28-186.25 0-102.977 83.3-186.25 186.28-186.25z",
  author: "Lorc",
  slug: "moon",
};

/**
 * The lookup map, for the Astro side, which asks for an icon by name.
 *
 * The React island deliberately does not import this. It draws two glyphs, and
 * a lookup map is a single object, so importing it pulled all seven path
 * strings into the island bundle - 1.7 KB gzipped of icons the menu never
 * draws. It imports the two consts it needs directly, which tree-shake.
 */
export const ICONS: Record<IconName, IconDef> = {
  check: CHECK,
  cross: CROSS,
  "arrow-right": ARROW_RIGHT,
  menu: MENU,
  close: CLOSE,
  sun: SUN,
  moon: MOON,
};

/**
 * The authors to credit, deduplicated and in a stable order. Two icons share
 * an author and one file is used under two names, so the footer would
 * otherwise print a name more than once.
 *
 * A function, not a computed constant. As a top-level `[...new Set(...)]` it
 * ran at module evaluation, which the bundler cannot prove is side-effect
 * free - so it retained `ICONS`, which references every icon, and the whole
 * set landed in the island bundle even though the island imports two consts
 * by name. Deferring the work lets the map drop out entirely.
 */
export function iconAuthors(): string[] {
  return [...new Set(Object.values(ICONS).map((i) => i.author))].sort();
}
