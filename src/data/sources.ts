/**
 * Every factual claim on this page that is not a claim about ARK itself is
 * numbered and lands here. Two rules held while writing it:
 *
 *  1. A source gets an `href` only where the exact URL is known to resolve.
 *     A citation a reader can look up beats a link that 404s in a year, so
 *     the rest are cited by name, section and date and left unlinked.
 *  2. Nothing was paraphrased into a stronger claim than the source makes.
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
    text: "Hanson M, Hollingshead N, Schuler K, Siemer WF, Martin P, Bunting EM. Species, causes, and outcomes of wildlife rehabilitation in New York State. PLOS ONE. 2021;16(9):e0257675. 58,185 cases across the three reporting years ending 2012, 2013 and 2014. The study describes archived paper records and handwritten logs, states that “Data on these handwritten logs… were manually transcribed into digital spreadsheets”, notes that decades of collected data “were collected, but were not in a form conducive for such data summaries”, and records that “reporting errors and inconsistencies both within and between rehabilitation centers occurred”, ranging from spelling errors to misidentified species to failure to report distress causes and final disposition.",
    href: "https://doi.org/10.1371/journal.pone.0257675",
  },
  {
    id: "iwrc",
    text: "International Wildlife Rehabilitation Council, “Keeping Your Data Straight”, on transcribing a year of paper intake sheets into a spreadsheet: “Tedious for sure, but quite amazing once all that data was entered and we suddenly saw that 70% of our waterfowl came from Oshkosh…”. The same article surveys the systems rehabilitators actually use, pen and paper among them.",
    href: "https://theiwrc.org/keeping-records/",
  },
  {
    id: "wildwelfare",
    text: "Wild Welfare, husbandry and record-keeping training material for zoos and sanctuaries, which instructs facilities to keep a daily whiteboard or noticeboard at the section and transfer its contents into the permanent animal record.",
  },
  {
    id: "aza",
    text: "Association of Zoos and Aquariums, Accreditation Standards and Related Policies, 2026 edition. The animal records standards accommodate paper systems alongside electronic ones and require that daily records be entered the same day or by the end of the next working day.",
  },
  {
    id: "species360-workflow",
    text: "Species360 ZIMS documentation describing the standard division of labour in which keepers enter observations and a registrar reviews, accepts or rejects them before they become part of the permanent record.",
  },
  {
    id: "species360-mobile",
    text: "Species360 ZIMS documentation on mobile support: “While not all modules are fully supported on mobile… For the best experience, we still recommend using a desktop for more complex tasks.” ZIMS added mobile data entry with QR codes at the enclosure in May 2026.",
  },
  {
    id: "retention",
    text: "Record retention periods vary by the authority you hold. Licensed exhibitors under the Animal Welfare Act keep records for one year after an animal is disposed of or dies (9 CFR 2.80), longer where other law applies; federal migratory bird rehabilitation permits require five years (50 CFR 21.76). State schedules differ again. Check the ones that bind you rather than trusting a vendor's number.",
  },
  {
    id: "standards-bodies",
    text: "AZA, the Zoological Association of America and the Global Federation of Animal Sanctuaries each require accredited members to maintain an animal records system. None of them requires a specific vendor's software.",
  },
  {
    id: "reporting",
    text: "Annual reporting deadlines that are confirmed: California, 14 CCR 679, form DFW 486, due 31 January; Washington, WAC 220-450-130, due 31 January; New York, Department of Environmental Conservation rehabilitator log, due 1 December. Other states differ and several could not be verified.",
  },
  {
    id: "oerca",
    text: "OERCA lists per-user pricing, quoted publicly at $110 per month for five users plus a $250 setup fee. Tracks Software prices by full-time equivalent staff. Both figures were taken from the vendors' own published pricing.",
  },
];

/** Index for footnote markers, so the numbering follows the array order. */
export const SOURCE_INDEX: Record<string, number> = Object.fromEntries(
  SOURCES.map((s, i) => [s.id, i + 1]),
);
