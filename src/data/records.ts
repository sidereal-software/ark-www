/**
 * What ARK records. Every entry here maps to something that exists in the
 * product; nothing is aspirational. The tier note names the cheapest plan the
 * capability appears on, so the grid and the pricing table cannot drift apart.
 */

export type RecordGroup = {
  title: string;
  blurb: string;
  items: string[];
  /** Omitted where the capability is on every plan. */
  tier?: "Standard" | "Pro";
};

export const RECORD_GROUPS: RecordGroup[] = [
  {
    title: "The animal",
    blurb:
      "One record per animal or per group, with the identifiers a registrar actually needs and a provenance timeline that keeps its real dates.",
    items: [
      "Individuals and groups on the same record shape",
      "Microchip, band, USDA, studbook and case identifiers",
      "Intake, transfer, release, death - each with the date it happened",
      "Photos, taken at the enclosure",
      "Promote an individual out of a group, with linked history on both",
    ],
  },
  {
    title: "The daily log",
    blurb:
      "The 30-second entry the whole product is built around: a categorized note, a photo, and a timestamp that means the moment it was observed.",
    items: [
      "Categories your organization defines, not ours",
      "Observed-at time separate from entered-at time",
      "Captured offline and synced exactly once",
      "Search across every log you have ever written",
    ],
  },
  {
    title: "Measurements and readings",
    blurb:
      "Weights on an animal, water chemistry on a tank. The same machinery, because a reading belongs to an enclosure and not to a separate module.",
    items: [
      "Measurement types your organization defines, with units",
      "Enclosure readings: pH, temperature, salinity, whatever you track",
      "Desired ranges, with a per-location override",
      "An out-of-range reading flags itself and raises one task",
      "Trends on the animal profile and on the location",
    ],
  },
  {
    title: "Feeding and diet",
    blurb:
      "What was offered, what happened to it, and whether the refusals are becoming a pattern.",
    items: [
      "Food items your organization curates",
      "Eaten, partial, refused or regurgitated",
      "Quantity recorded as it was entered, not converted",
      "Refusal streaks surfaced on the profile and the list",
    ],
  },
  {
    title: "Tasks and reminders",
    blurb: "Work that recurs, assigned or not, and visible to whoever walks in next.",
    items: [
      "Recurring tasks tied to an animal or to the organization",
      "Due today and overdue, on the home screen",
      "Email digest and push reminders",
      "Complete from the dashboard in one tap",
    ],
  },
  {
    title: "Medical",
    tier: "Standard",
    blurb:
      "A record-keeping module, deliberately not a clinical system. No dosing calculators, no diagnostics.",
    items: [
      "Medication schedules that generate their own tasks",
      "Vaccinations with lot numbers",
      "Vet visit notes with attachments",
      "A chronological medical tab on the profile",
    ],
  },
  {
    title: "Welfare checks",
    tier: "Standard",
    blurb:
      "A rubric your organization owns, seeded from the Five Domains model, scored 1-5 in five taps.",
    items: [
      "Every domain scored, so a check always means every lens was used",
      "A low score raises exactly one open task per animal",
      "Per-domain trends over time",
      "An overdue-for-a-check list",
    ],
  },
  {
    title: "Documents and files",
    tier: "Standard",
    blurb: "Permits, intake forms, lab results and transfer paperwork, attached where they belong.",
    items: [
      "Attach to an animal, a vet visit or the organization",
      "Permits with expiry dates and renewal reminders",
      "Everything downloadable, on every plan",
    ],
  },
  {
    title: "Compliance documents",
    tier: "Pro",
    blurb:
      "The paperwork that has to be produced rather than browsed, generated from the records you already keep.",
    items: [
      "Annual inventory by species, with acquisitions and dispositions",
      "Printable transfer form: identity, provenance, medical summary, permits",
      "Care sheet for the enclosure door, built from observed diet and routines",
      "Permit renewal reminders in the daily digest",
      "CSV and XLSX",
    ],
  },
  {
    title: "The facility",
    blurb:
      "Areas, sections and enclosures, restructured by dragging - and history that survives the restructure.",
    items: [
      "Three levels: area, section, enclosure",
      "Occupancy rolled up from every enclosure beneath",
      "Advisory capacity that flags a crowded enclosure and never blocks a move",
      "Old records keep the location they were written against",
    ],
  },
  {
    title: "Orientation",
    blurb: "For the volunteer who was last here on Sunday and needs to know what changed.",
    items: [
      "Since your last visit: new logs, completed tasks, new intakes, alerts",
      "Activity calendar over logs and tasks",
      "Role-aware home screen",
      // Tiered mid-list rather than badging the whole card: everything else in
      // this group is on every plan, and a card-level badge would say otherwise.
      "Saved searches (Standard and up)",
    ],
  },
  {
    title: "Getting your data in and out",
    blurb:
      "Import is data exit's twin, and neither is ever paywalled. Both work on every plan, including an expired trial.",
    items: [
      "Import wizard: upload, map columns, preview, then commit",
      "Documented recipes for AnimalCare and ZIMS exports",
      "Re-run the same file and nothing duplicates",
      "CSV takeout of animals and logs, always",
      "API access with personal tokens (Pro)",
    ],
  },
];
