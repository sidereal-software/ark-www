/**
 * The page's own table of contents, in the order the page argues them.
 *
 * Two rules hold here:
 *
 *  1. **Every href is root-relative, never a bare fragment.** The header
 *     renders on /404 as well as /, and a bare "#pricing" there resolves
 *     against the missing path and leaves the visitor exactly where they were.
 *  2. **Every id in this file exists in a section.** These are the ids the
 *     page actually renders, minus `#sources`, which is a bibliography rather
 *     than an argument and stays a footer link.
 *
 * `inBar` marks the four that also render as inline links in the desktop
 * header. It is four and not nine because nine labels plus the logo plus the
 * call to action do not fit on one 768px line, and wrapping the header or
 * abbreviating the labels to fit would be a worse trade than letting the menu
 * carry the long tail. The menu is therefore a superset of the bar at every
 * width, never a copy of it.
 */
export type NavLink = {
  href: string;
  label: string;
  inBar?: boolean;
};

export const SECTION_LINKS: NavLink[] = [
  { href: "/#problem", label: "The problem", inBar: true },
  { href: "/#how", label: "How it works", inBar: true },
  { href: "/#records", label: "What it records", inBar: true },
  { href: "/#standards", label: "Standards and compliance" },
  { href: "/#different", label: "Design decisions" },
  { href: "/#pricing", label: "Pricing", inBar: true },
  { href: "/#never", label: "What we will never do" },
  { href: "/#trust", label: "Your records" },
  // Labelled to distinguish it from the header's "Get in touch" button, which
  // sits beside the menu and opens a mail client rather than scrolling.
  { href: "/#contact", label: "Talk to us" },
];

export const BAR_LINKS: NavLink[] = SECTION_LINKS.filter((link) => link.inBar);
