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
      "One record per animal or per group, with the identifiers a registrar needs and a history that keeps the dates things really happened on.",
    items: [
      "One animal, or a whole group, recorded the same way",
      "Microchip, band, USDA, studbook and case identifiers",
      "Intake, transfer, release, death - each with the date it happened",
      "Photos on the animal record",
      "Split one animal out of a group when it needs its own record, and keep the history on both",
    ],
  },
  {
    title: "The daily log",
    blurb:
      "The entry everything else hangs off: a note, a category, a photo, and the time you actually saw it.",
    items: [
      "Categories you name yourself, matching what your team already says",
      "Written up later still carries the time you actually saw it",
      "Works with no signal, and will not save the same note twice",
      "Search across every log you have ever written",
    ],
  },
  {
    title: "Measurements and readings",
    blurb:
      "Weights on an animal, water chemistry on a tank. Recorded the same way, because a reading belongs to the animal or the place it was taken from.",
    items: [
      "Whatever you measure, in the units you already use",
      "Enclosure readings: pH, temperature, salinity, whatever you track",
      "Set the range you expect, and a different one for a particular enclosure",
      "A reading outside that range flags itself and puts a job on someone's list",
      "See how it has moved over weeks and months, per animal or per enclosure",
    ],
  },
  {
    title: "Feeding and diet",
    blurb:
      "What was offered, what happened to it, and whether the refusals are becoming a pattern.",
    items: [
      "Food items your organization curates",
      "Eaten, partial, refused or regurgitated",
      "Amounts stay in the units you entered them in",
      "Repeated refusals get flagged before anyone would have noticed the pattern",
    ],
  },
  {
    title: "Tasks and reminders",
    blurb: "Work that recurs, assigned or not, and visible to whoever walks in next.",
    items: [
      "Jobs that repeat, attached to an animal or to the whole facility",
      "Due today and overdue, on the home screen",
      "Email digest and push reminders",
      "Complete from the dashboard in one tap",
    ],
  },
  {
    title: "Medical",
    tier: "Standard",
    blurb:
      "Somewhere to write down what was done. Deliberately not a clinical system: it will not work out a dose for you or suggest a diagnosis.",
    items: [
      "Medication schedules that put themselves on the task list",
      "Vaccinations with lot numbers",
      "Vet visit notes with attachments",
      "The whole medical history in date order on the animal's page",
    ],
  },
  {
    title: "Welfare checks",
    tier: "Standard",
    blurb:
      "Your own checklist, starting from the Five Domains model, scored one to five in five taps.",
    items: [
      "Every domain has to be scored, so a check is never half-done",
      "A low score raises one job to follow up, not a pile of them",
      "See whether an animal is improving or sliding",
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
      "Download any of it, on any plan",
    ],
  },
  {
    title: "Compliance documents",
    tier: "Pro",
    blurb:
      "The paperwork that has to be produced rather than browsed, generated from the records you already keep.",
    items: [
      "Annual inventory by species, with every acquisition and disposition in the period",
      "Printable transfer form with what a receiving facility asks for, filled in already",
      "Care sheet for the enclosure door, built from observed diet and routines",
      "Permit renewal reminders in the daily digest",
      "Download as a spreadsheet, or as a file that opens in Excel",
    ],
  },
  {
    title: "The facility",
    blurb:
      "Areas, sections and enclosures, rearranged by dragging - and history that survives the rearranging.",
    items: [
      "Three levels: area, section, enclosure",
      "See how full an area is, counted up from the enclosures inside it",
      "A crowding warning that never stops you moving an animal",
      "Reorganize or rename, and old records still show where the animal really was",
    ],
  },
  {
    title: "Orientation",
    blurb: "For the volunteer who was last here on Sunday and needs to know what changed.",
    items: [
      "Since your last visit: new logs, completed tasks, new intakes, alerts",
      "Activity calendar over logs and tasks",
      "A home screen that shows what your role needs",
      // Tiered mid-list rather than badging the whole card: everything else in
      // this group is on every plan, and a card-level badge would say otherwise.
      "Saved searches (Standard and up)",
    ],
  },
  {
    title: "Getting your data in and out",
    blurb: "Moving records in from a spreadsheet or another system, and taking them out again.",
    items: [
      "Upload a spreadsheet, say which column is which, check the preview, then import",
      "Step-by-step instructions for files exported from AnimalCare and ZIMS",
      "Import the same file twice and you will not get two of everything",
      "Download your animals and logs as a spreadsheet, on any plan",
      "Connect ARK to another system, if you have someone who wants to (Pro)",
    ],
  },
];
