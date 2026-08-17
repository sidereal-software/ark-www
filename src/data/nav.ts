/**
 * The site's navigation, across four pages.
 *
 * This was one page until it measured 15,188px on a desktop and 28,309px on a
 * phone - seventeen screens and thirty-four. The argument for a single page
 * was that scrolling beats navigating while somebody is still deciding, and
 * that holds right up until the page is longer than anyone will scroll. The
 * two things people go looking for deliberately, what it records and what it
 * costs, now have their own URLs - which also means either can be sent to a
 * colleague or a board without a fragment hanging off it.
 *
 * Three rules hold here:
 *
 *  1. **Every href is absolute from the root, never a bare fragment.** The
 *     header renders on every page including /404, and a bare "#pricing"
 *     resolves against whatever path the visitor is on and leaves them exactly
 *     where they were.
 *  2. **Every target exists.** A page link points at a file in src/pages/; a
 *     fragment points at an id that page actually renders.
 *  3. **`inBar` marks the four that also render inline in the desktop
 *     header.** Four and not nine, because nine labels plus the logo plus the
 *     call to action do not fit on one 768px line, and wrapping the header or
 *     abbreviating the labels would be a worse trade than letting the menu
 *     carry the long tail. The menu is a superset of the bar at every width,
 *     never a copy of it.
 */
export type NavLink = {
  href: string;
  label: string;
  inBar?: boolean;
};

export const SECTION_LINKS: NavLink[] = [
  { href: "/#problem", label: "The problem", inBar: true },
  { href: "/#how", label: "How it works", inBar: true },
  { href: "/#different", label: "Design decisions" },
  { href: "/what-it-records", label: "What it records", inBar: true },
  { href: "/what-it-records#standards", label: "Standards and compliance" },
  { href: "/pricing", label: "Pricing", inBar: true },
  { href: "/pricing#never", label: "What we will never do" },
  { href: "/pricing#trust", label: "Your records" },
  { href: "/sources", label: "Sources" },
];

export const BAR_LINKS: NavLink[] = SECTION_LINKS.filter((link) => link.inBar);
