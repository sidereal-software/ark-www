/**
 * The site's navigation, across four pages.
 *
 * This was one page until it measured 15,188px on a desktop and 28,309px on a
 * phone. The argument for a single page was that scrolling beats navigating
 * while somebody is still deciding, and that holds right up until the page is
 * longer than anyone will scroll.
 *
 * **The menu is grouped by destination, not flat.** The first version listed
 * nine links in one column, and it mixed three different kinds of thing:
 * sections of the home page, other pages, and sections of those other pages.
 * A reader could not tell from the list which links would move them somewhere
 * new and which would only scroll, so the grouping now says it - each group is
 * headed by the page it belongs to, and the footer is grouped the same way.
 *
 * Three rules hold here:
 *
 *  1. **Every href is absolute from the root, never a bare fragment.** The
 *     header renders on every page including /404, and a bare "#pricing"
 *     resolves against whatever path the visitor is on.
 *  2. **Every target exists.** A page link points at a file in src/pages/; a
 *     fragment points at an id that page actually renders.
 *  3. **`inBar` marks the three that also render inline in the desktop
 *     header**, and they are the three questions a visitor arrives with: how
 *     does this work, what does it hold, what does it cost. "The problem" used
 *     to sit there too and no longer does - it is the first thing on the home
 *     page, so a link to it is only ever useful to someone already reading it.
 */
export type NavLink = {
  href: string;
  label: string;
  inBar?: boolean;
};

export type NavGroup = {
  /** The page this group belongs to. Rendered as a heading in the menu. */
  heading: string;
  href: string;
  links: NavLink[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Start here",
    href: "/",
    links: [
      { href: "/#problem", label: "The problem" },
      { href: "/#how", label: "How it works", inBar: true },
      { href: "/#different", label: "Design decisions" },
    ],
  },
  {
    heading: "What it records",
    href: "/what-it-records",
    links: [
      { href: "/what-it-records", label: "Everything it records", inBar: true },
      { href: "/what-it-records#standards", label: "Standards and compliance" },
    ],
  },
  {
    heading: "Pricing",
    href: "/pricing",
    links: [
      { href: "/pricing", label: "Plans and limits", inBar: true },
      { href: "/pricing#never", label: "What we will never do" },
      { href: "/pricing#trust", label: "Your records" },
    ],
  },
];

/** Flat list, for anything that wants every destination in reading order. */
export const SECTION_LINKS: NavLink[] = NAV_GROUPS.flatMap((group) => group.links);

/**
 * The desktop bar. Labelled by destination rather than by section title, so
 * "Everything it records" reads as "What it records" beside the others.
 */
export const BAR_LINKS: NavLink[] = [
  { href: "/#how", label: "How it works" },
  { href: "/what-it-records", label: "What it records" },
  { href: "/pricing", label: "Pricing" },
];
