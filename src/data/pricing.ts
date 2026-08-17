/**
 * Published pricing. These numbers are the ones the product's entitlement
 * resolver actually enforces (ARK's `apps/billing/entitlements.py`): the caps
 * are active animals and storage, and nothing else. There is no seat cap in
 * the code, which is why "unlimited users" appears on every row here and is
 * not a marketing rounding of "quite a lot of users".
 */

export type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  /** One line on who the tier is shaped for. */
  audience: string;
  animals: string;
  storage: string;
  /** What this tier adds over the one to its left. */
  adds: string[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    cadence: "per month",
    audience: "Home-based rehabilitators and small rescues.",
    animals: "25 active animals",
    storage: "5 GB of photos and files",
    adds: [
      "Animals, groups and the daily log",
      "Weights, measurements and enclosure readings",
      "Feeding and diet log",
      "Tasks and reminders",
      "Search, a full history of changes, and spreadsheet download",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "$49",
    cadence: "per month",
    audience: "Working rehabilitation centres and sanctuaries.",
    animals: "250 active animals",
    storage: "50 GB of photos and files",
    adds: [
      "Medical records and medication schedules",
      "Documents and attachments",
      "Welfare checks, scored on the Five Domains",
      "Saved searches",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$129",
    cadence: "per month",
    audience: "Zoos, aquariums and multi-site operations.",
    animals: "1,000 active animals",
    storage: "250 GB of photos and files",
    adds: [
      "Annual inventory, transfer forms and care sheets, filled in for you",
      "Formatted reports, and downloads that open in Excel",
      "Connect ARK to another system, if you have someone who wants to",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    // No cadence: "Custom talk to us" wraps inside the price row and knocks the
    // four cards' baselines out of line for no informational gain. The card's
    // own button says to talk to us.
    cadence: "",
    audience: "Institutions with procurement and an IT department.",
    animals: "Unlimited active animals",
    storage: "Storage to suit",
    adds: [
      "Single sign-on and custom roles",
      "Exportable audit history, and a support agreement",
      "Invoicing rather than a card",
    ],
  },
];

/** Shown once, above the plan cards, because it applies to every one of them. */
export const PLAN_CONSTANTS = [
  "Unlimited users, every plan",
  "30-day free trial with Pro features",
  "Works with no signal, on every plan",
  "Download your records on every plan",
];
