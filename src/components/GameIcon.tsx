import { CLOSE, MENU, ICON_VIEWBOX, type IconDef } from "@/data/icons";

/**
 * The React half of the icon set, for the one hydrated island.
 *
 * It exists so the sheet and its trigger draw from `src/data/icons.ts` like
 * everything else. Before this they imported `lucide-react`, which meant the
 * site ran two icon vocabularies at once - game-icons everywhere prerendered,
 * lucide inside the menu - and the only two glyphs a visitor met on a phone
 * were the only two on the site that were not the app's.
 *
 * **It imports the two icon consts, not the `ICONS` map.** The map is one
 * object holding all seven, so importing it put every path string in the
 * island bundle: 1.7 KB gzipped of icons this component never draws. Naming
 * the two lets the bundler drop the rest. Keep it that way - if the island
 * ever needs a third, add it here by name rather than reaching for the map.
 */
const ISLAND_ICONS = { menu: MENU, close: CLOSE } satisfies Record<string, IconDef>;

export function GameIcon({
  name,
  className,
}: {
  name: keyof typeof ISLAND_ICONS;
  className?: string;
}) {
  const icon = ISLAND_ICONS[name];

  return (
    <svg viewBox={ICON_VIEWBOX} fill="currentColor" className={className} aria-hidden="true">
      <path d={icon.path} transform={icon.transform} />
    </svg>
  );
}
