/**
 * Every photograph on the site, with the attribution its licence requires.
 *
 * Nothing here is stock bought from an agency and nothing is a customer's.
 * ARK has no customers yet, and the README's no-social-proof rule still
 * governs: a photograph of a keeper is not a claim that the keeper uses ARK,
 * and no caption on the site may imply otherwise.
 *
 * One of the four licences asks nothing of us (a US National Park Service
 * work, public domain). The other three are Creative Commons
 * Attribution-ShareAlike, which require the title, the author, the licence and
 * a link, displayed to the person looking at the image. The footer renders
 * that from this file, which is why the credits are data rather than alt
 * strings scattered through the components - an attribution that lives next to
 * the markup is an attribution that gets dropped when the markup is refactored.
 *
 * Every entry here is on the page. If you remove the last use of a photograph,
 * remove it from this file too: the footer credits everything listed, so a
 * stale entry credits a photograph nobody can see.
 *
 * ShareAlike, and what it means here: CC BY-SA obliges an *adaptation* to
 * carry the same licence. Displaying a photograph on a web page is not an
 * adaptation, and neither is scaling it. Cropping is the grey area, so every
 * BY-SA image below is placed with CSS `object-position` and shown whole in
 * the file - the framing is done by the viewport, not by a destructive edit.
 * If you ever need a genuinely cropped BY-SA image, either license the crop
 * BY-SA or use a public-domain file instead.
 *
 * `credit` is the byline. `href` points at the file page on Wikimedia Commons,
 * which carries the full licence deed and the original.
 */

export interface Photo {
  /** Matches the filename in src/assets/photos/. */
  slug: string;
  /**
   * The work's title, for the credit line. Creative Commons asks for title,
   * author, source and licence; without the title two photographs by the same
   * photographer produce two identical credits, which reads as a duplicate
   * rather than as two separate attributions.
   */
  title: string;
  /** Alt text. Describes what is happening, because that is what carries meaning here. */
  alt: string;
  /** Author, as Commons records them. */
  credit: string;
  license: string;
  licenseHref: string;
  /** The Commons file page. */
  href: string;
  /** Whether the licence obliges us to print the credit. */
  attributionRequired: boolean;
}

const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";

export const PHOTOS: Photo[] = [
  {
    slug: "banding-record-sheet",
    title: "A researcher with a Magnolia warbler at a bird banding station",
    alt: "A bird bander holds a Magnolia warbler in one hand above a ring binder of paper record sheets, a pencil resting across the columns. A field guide, banding pliers and a ruler lie on the table.",
    credit: "Lorie Shaull",
    license: "CC BY-SA 4.0",
    licenseHref: CC_BY_SA_4,
    href: "https://commons.wikimedia.org/wiki/File:A_researcher_with_a_Magnolia_warbler_at_a_bird_banding_station.jpg",
    attributionRequired: true,
  },
  {
    slug: "wing-measurement",
    title: "A researcher uses a wing ruler to measure a Lincoln's sparrow wing",
    alt: "A hand holds a Lincoln's sparrow while a metal wing ruler is laid along its outstretched wing to take a measurement.",
    credit: "Lorie Shaull",
    license: "CC BY-SA 4.0",
    licenseHref: CC_BY_SA_4,
    href: "https://commons.wikimedia.org/wiki/File:A_researcher_uses_a_wing_ruler_to_measures_a_Lincoln%27s_sparrow_wing.jpg",
    attributionRequired: true,
  },
  {
    slug: "keeper-and-elephant",
    title: "Baby elephant and zoo keeper, the Maryland Zoo",
    alt: "A keeper in a green zoo sweatshirt stands beside a young elephant, both looking off in the same direction.",
    credit: "RadioFan",
    license: "CC BY-SA 3.0",
    licenseHref: CC_BY_SA_3,
    href: "https://commons.wikimedia.org/wiki/File:Baby_elephant_and_zoo_keeper_-Maryland_Zoo-8a.jpg",
    attributionRequired: true,
  },
  {
    slug: "raptor-release",
    title: "Eagle release at Dead Horse Point State Park",
    alt: "A handler at the edge of a canyon overlook opens their gloved hands and a released raptor takes off under a heavy sky.",
    credit: "Canyonlands National Park",
    license: "Public domain",
    licenseHref: "https://www.nps.gov/aboutus/disclaimer.htm",
    href: "https://commons.wikimedia.org/wiki/File:Eagle_Release_at_Dead_Horse_Point_State_Park_(7167165062).jpg",
    attributionRequired: false,
  },
];

/** Lookup by slug, so a component asks for a photo by name and cannot typo one in silently. */
export function photo(slug: string): Photo {
  const found = PHOTOS.find((p) => p.slug === slug);
  if (!found) {
    throw new Error(
      `Unknown photo "${slug}". Add it to src/data/photos.ts with its licence and credit before using it.`,
    );
  }
  return found;
}
