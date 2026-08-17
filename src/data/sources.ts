/**
 * Every factual claim on this page that is not a claim about ARK itself is
 * numbered and lands here. Three rules hold:
 *
 *  1. A source gets an `href` only where the exact URL is known to resolve.
 *     A citation a reader can look up beats a link that 404s in a year, so
 *     the rest are cited by name, section and date and left unlinked.
 *  2. Nothing is paraphrased into a stronger claim than the source makes.
 *  3. **Cite what a reader could reasonably doubt, and nothing else.** This
 *     list used to run to ten entries, including two that existed only to
 *     support comparisons with other vendors' pricing and mobile support.
 *     Those comparisons are gone. So are the citations that decorated plain
 *     descriptions of ordinary practice - a footnote on "keepers write on a
 *     whiteboard" is not rigour, it is throat-clearing, and it makes the
 *     citations that are load-bearing harder to see.
 *
 * What is left is the regulatory detail, where being precise actually matters
 * to a reader deciding whether they are compliant, and one research finding.
 */

export type Source = {
  id: string;
  /** Rendered as the footnote body. */
  text: string;
  href?: string;
};

export const SOURCES: Source[] = [
  {
    id: "hanson",
    text: "Hanson M, Hollingshead N, Schuler K, Siemer WF, Martin P, Bunting EM. Species, causes, and outcomes of wildlife rehabilitation in New York State. PLOS ONE. 2021;16(9):e0257675. 58,185 cases across the three reporting years ending 2012, 2013 and 2014. The study describes archived paper records and handwritten logs, states that “Data on these handwritten logs… were manually transcribed into digital spreadsheets”, and records that “reporting errors and inconsistencies both within and between rehabilitation centers occurred”, ranging from spelling errors to misidentified species to failure to report distress causes and final disposition. Records that were incomplete were excluded from the analysis.",
    href: "https://doi.org/10.1371/journal.pone.0257675",
  },
  {
    id: "standards-bodies",
    text: "AZA, the Zoological Association of America and the Global Federation of Animal Sanctuaries each require accredited members to maintain an animal records system. None of them requires a specific vendor's software.",
  },
  {
    id: "aza",
    text: "Association of Zoos and Aquariums, Accreditation Standards and Related Policies, 2026 edition. The animal records standards accommodate paper systems alongside electronic ones and require that daily records be entered the same day or by the end of the next working day.",
  },
  {
    id: "retention",
    text: "Record retention periods vary by the authority you hold. Licensed exhibitors under the Animal Welfare Act keep records for one year after an animal is disposed of or dies (9 CFR 2.80), longer where other law applies; federal migratory bird rehabilitation permits require five years (50 CFR 21.76). State schedules differ again. Check the ones that bind you rather than trusting a vendor's number.",
  },
  {
    id: "reporting",
    text: "Annual reporting deadlines that are confirmed: California, 14 CCR 679, form DFW 486, due 31 January; Washington, WAC 220-450-130, due 31 January; New York, Department of Environmental Conservation rehabilitator log, due 1 December. Other states differ and several could not be verified.",
  },
];

/** Index for footnote markers, so the numbering follows the array order. */
export const SOURCE_INDEX: Record<string, number> = Object.fromEntries(
  SOURCES.map((s, i) => [s.id, i + 1]),
);
