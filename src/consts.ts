export const SITE = {
  name: "ARK",
  /** Used in <title> after the page title, and as the OG site name. */
  tagline: "Animal recordkeeping that gets written at the enclosure",
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
