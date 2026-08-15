# Screenshots still to take

The site ships with three marked placeholders instead of product screenshots,
because ARK has none yet. Each one renders a panel on the page saying what
belongs in it; this file is the same list in one place, with enough detail that
whoever takes the shots does not have to guess.

They are `<ScreenshotPlaceholder>` components
(`src/components/ScreenshotPlaceholder.astro`). Each already reserves the right
aspect ratio, so nothing below a placeholder moves when the real image lands.

## Before you start

Run ARK locally per the `ark` repository's own README, sign in as a seeded
account, and **use an organization with real history**. A screenshot of an empty
account is worse than no screenshot: it advertises that there is nothing in
there. The seed data has animals with a year of logs, weights and events - use
those.

House rules for every shot:

- **Light mode.** The site's placeholders are sized for light captures, and a
  dark screenshot on a cream page reads as a hole.
- **Real content, not lorem.** Real species, real enclosure names, a note a
  keeper would actually write. Nothing rude, nothing that identifies a person.
- **No personal data.** Seeded names are fine; a real vet's phone number is not.
  Check avatars, email addresses and audit rows before exporting.
- **Device pixel ratio 2** so the image is crisp on a retina display, then let
  Astro's image pipeline emit the responsive sizes.
- **Hide the browser chrome.** These are product shots, not browser shots.

## 1. Log capture, mid-flow

|                      |                                                       |
| -------------------- | ----------------------------------------------------- |
| **Where it appears** | Hero, right-hand column (`src/components/Hero.astro`) |
| **Frame**            | `phone` - 390 x 844                                   |
| **Viewport**         | 390 x 844, DPR 2, light mode                          |

The capture sheet open on an animal profile, part-way through an entry - not
blank and not submitted. It needs to show, in one glance, the whole claim the
headline makes:

- the animal's name and species visible above the sheet, so it is obvious the
  entry is attached to a specific animal;
- the category chips with one selected;
- the note field with a real sentence typed into it, roughly the length a keeper
  writes ("Ate all of the morning mice. Bright, alert, using the high perch.");
- a photo thumbnail already attached;
- the Save button in its enabled state.

This is the single most important image on the site. It is the product's whole
argument. If only one shot ever gets taken, take this one.

## 2. Captured offline, waiting to sync

|                      |                                                                           |
| -------------------- | ------------------------------------------------------------------------- |
| **Where it appears** | How it works, inside the offline card (`src/components/HowItWorks.astro`) |
| **Frame**            | `phone` - 390 x 844                                                       |
| **Viewport**         | 390 x 844, DPR 2, light mode, **airplane mode / network offline**         |

An animal profile immediately after saving a log with no connection. It has to
show the state, not just claim it:

- the offline indicator in the app chrome;
- the just-saved log at the top of the stream, carrying its pending-sync chip;
- earlier logs beneath it with no chip, so the difference between "queued" and
  "synced" is visible in one image.

Take it with the network genuinely disabled (DevTools offline throttling, or a
real phone in airplane mode) rather than by mocking the state. If the real thing
does not look convincing, that is worth knowing before it goes on the page.

## 3. The animal profile, on a desk

|                      |                                                                       |
| -------------------- | --------------------------------------------------------------------- |
| **Where it appears** | What it records, above the card grid (`src/components/Records.astro`) |
| **Frame**            | `app` - 16:9                                                          |
| **Viewport**         | 1680 x 1050, DPR 2, light mode                                        |

A full animal profile at desk width, on an animal with a long history. The
placeholder is 16:9, so frame the capture to that rather than cropping a
16:10 window afterwards. It should include:

- the identity header with typed identifiers and current status;
- the provenance timeline with several real dated events;
- the weight trend chart with enough points to look like a trend and not a
  scatter of three;
- the recent log stream below.

This is the "it is a real record system" shot, and it is the counterweight to
the two phone images.

## Replacing a placeholder

1. Put the image in `src/assets/` (not `public/`) so Astro processes it.
2. In the component, import it and Astro's `<Image>`:

   ```astro
   ---
   import { Image } from "astro:assets";
   import captureShot from "../assets/log-capture.png";
   ---

   <Image
     src={captureShot}
     alt="An ARK log entry part-way through capture, with a category chosen, a note typed and a photo attached."
     class="rounded-2xl border border-border shadow-lg"
     widths={[380, 760]}
     sizes="(min-width: 1024px) 19rem, 100vw"
   />
   ```

3. Delete the `<ScreenshotPlaceholder>` for that slot and its import if it is no
   longer used.
4. Write a real `alt`. It describes what is happening in the screenshot, for
   someone who cannot see it - not "ARK screenshot".
5. Remove that section from this file, so the file always lists exactly what is
   still missing.

When all three are gone, delete `src/components/ScreenshotPlaceholder.astro` and
this document with them.
