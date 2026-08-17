import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui button, new-york style, as the CLI writes it for the ARK app -
 * with three deliberate divergences, recorded here the way theme.css records
 * its own:
 *
 *   1. **No component-level focus ring.** shadcn opts each button out of the
 *      platform outline (`outline-none`) and draws its own 3px `ring-ring/50`.
 *      This site has exactly one focus treatment, the `:focus-visible` outline
 *      in global.css, and it applies to every link, summary and button on the
 *      page. A button that opted out would be the only control on the site
 *      with a different focus indicator, so the opt-out and the ring are gone
 *      and the site's outline governs.
 *   2. **Semibold labels and a press affordance.** Every button-shaped thing
 *      on this site is semibold and drops a pixel when pressed. That is the
 *      marketing design, and the component has to speak it or the header
 *      button stops matching the hero button beside it.
 *   3. **An `xl` step on both scales.** 44px, because this is a site about
 *      software used one-handed on a phone and the touch targets should not
 *      undercut the argument. `lg` tops out at 40px.
 *   4. **Still no `dark:` variants, now that night mode exists.** They were
 *      stripped when the first dark scheme was deleted, and they are staying
 *      out. Upstream needs them because its tokens do not change between
 *      schemes; ours do - every colour here resolves through a custom property
 *      that theme.css redefines for night, so `bg-primary` is already the
 *      phosphor green on a dark page without a second class to say so.
 *
 *      Putting them back would be worse than redundant. Tailwind's `dark:`
 *      resolves against the operating system alone, and this site's theme can
 *      be pinned against the operating system by the header toggle - so a
 *      `dark:` rule would fire for a visitor who has explicitly chosen the
 *      light palette on a dark laptop, and it would be the only thing on the
 *      page that did. Style through the tokens; never through `dark:`.
 *
 * Everything else is upstream, so `shadcn add button --diff` stays useful.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-11 rounded-lg px-5 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
