export const SITE = {
  name: "ARK",
  /**
   * The motto. Short enough to sit under the mark, and the page's <h1>.
   *
   * "Accounted for" is doing two jobs at once, which is why it beat the
   * alternatives: it means *written down* and it means *safe*. That is the
   * product and the worry it removes in four words, and it is the only line
   * considered that earns the name - Noah counted them aboard.
   */
  motto: "Every animal, accounted for.",
  /**
   * Used in <title> after the site name, and as the OG site name.
   *
   * Deliberately the plain description rather than the motto. The home page's
   * <title> is the most valuable line of text on the site for someone
   * searching "zoo animal record keeping software", and a motto matches none
   * of those words. The motto gets the <h1>, where a human reads it; the
   * <title> gets the category, where a search engine does.
   *
   * If brand recall ever matters more than search here, swapping this for
   * SITE.motto is the whole change.
   */
  tagline: "Animal recordkeeping for zoos, sanctuaries and wildlife rehabilitation",
  description:
    "ARK is mobile-first animal recordkeeping for zoos, wildlife rehabilitation centres, sanctuaries and rescues. A keeper finds an animal and saves a categorized note with a photo to the permanent record, at the enclosure, online or off. Unlimited users on every plan.",
  url: "https://ark.sidereal.software",
  locale: "en",
  /** Owned by the operator of the site, not a shared inbox alias. */
  contactEmail: "ark@sidereal.software",
} as const;

/**
 * The only call to action on the site. There is no trial signup and no demo
 * environment yet, so this is a mailto rather than a form that would silently
 * drop what someone typed. See the commented seam in ContactCta.astro for
 * where the Formspree form goes when there is somewhere for it to post.
 */
export const CONTACT_HREF = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
  "ARK - tell me more",
)}&body=${encodeURIComponent(
  [
    "A few things that help us answer usefully:",
    "",
    "Facility type (zoo / rehabilitation / sanctuary / rescue / aquarium):",
    "Roughly how many animals are in your care at once:",
    "What you keep records in today:",
    "",
  ].join("\n"),
)}`;
