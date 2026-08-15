/**
 * The "what we will never do" block. Every promise here is a property of how
 * the product is actually built, not a policy someone could quietly reverse in
 * a pricing page revision:
 *
 *  - no seat cap exists in the entitlement resolver at all;
 *  - the entitlement gates are attached to capture endpoints only, so a
 *    downgrade or a lapsed trial cannot make a record unreadable;
 *  - CSV takeout carries no feature key.
 *
 * If any of these stops being true, the code has to change first, and this
 * file is the reminder that the change would be visible.
 */

export type Promise_ = {
  never: string;
  because: string;
};

export const NEVER: Promise_[] = [
  {
    never: "Charge you per user",
    because:
      "This work runs on volunteers. Pricing that counts them punishes exactly the organizations that need the records most, and it teaches a rescue to share one login. Our caps are active animals and storage. There is no seat limit anywhere in the product.",
  },
  {
    never: "Charge you per adoption or per animal moved",
    because:
      "A sanctuary's terminal outcome is lifetime care and a rehabilitation centre's is release. Billing on adoptions taxes an event half this sector never has, and the half that does have it should not pay more for a good day.",
  },
  {
    never: "Lock you out of records you already wrote",
    because:
      "If you downgrade, or your trial lapses, or your card fails, new entries stop. Reading, searching, printing and exporting everything you have ever recorded does not. An expired organization goes read-only, never dark.",
  },
  {
    never: "Put your data behind a paid export",
    because:
      "CSV takeout of your animals and your logs is on every plan and carries no feature flag. So is the import wizard. Leaving is not a billable event.",
  },
  {
    never: "Sell a medical module as a separate add-on",
    because:
      "One number per tier. No configurator, no line items to reconcile, no discovering at renewal that the thing you use daily was optional.",
  },
];
