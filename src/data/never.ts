/**
 * The "what we will never do" block.
 *
 * Every promise here is a property of how the product is actually built, not a
 * policy someone could quietly reverse in a pricing page revision:
 *
 *  - no seat cap exists in the entitlement resolver at all;
 *  - the entitlement gates are attached to capture endpoints only, so a
 *    downgrade or a lapsed trial cannot make a record unreadable;
 *  - CSV takeout carries no feature key.
 *
 * That is why these promises can be made. It is deliberately **not** what the
 * `because` lines say. Nobody reading this page knows or cares what an
 * entitlement resolver is, and "there is nothing for a price to attach to" is
 * an answer to a question a keeper never asked. Each `because` says what the
 * promise means for the person reading it; the engineering that backs it stays
 * up here, where the next person editing this file will see it.
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
      "Add everyone who works with your animals - staff, volunteers, students, the vet who visits on Thursdays. The price is the same. Nobody has to share a login to save money, which matters because a shared login means nobody knows who wrote what.",
  },
  {
    never: "Charge you per adoption or per animal moved",
    because:
      "A sanctuary's happy ending is lifetime care and a rehabilitation centre's is release. Charging per adoption would bill you for an event that many of the facilities ARK is for never have.",
  },
  {
    never: "Lock you out of records you already wrote",
    because:
      "If you downgrade, or your trial ends, or your card fails, you stop being able to add new entries. You can still read, search, print and download every record you have ever written. Work you already did does not get held hostage.",
  },
  {
    never: "Charge you to get your records back out",
    because:
      "Downloading your animals and your logs as a spreadsheet is on every plan, including the cheapest. So is bringing your records in from wherever they are now.",
  },
  {
    never: "Sell medical records as a separate add-on",
    because:
      "One price per plan. No line items to reconcile, and nothing you assumed was included turning up as an extra at renewal.",
  },
];
