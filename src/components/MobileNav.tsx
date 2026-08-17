import * as React from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SECTION_LINKS } from "@/data/nav";

/**
 * The whole of this site's JavaScript: the navigation a visitor gets below the
 * `md` breakpoint, where the header's inline links do not fit.
 *
 * It is a Radix dialog rather than a `<details>` disclosure because a
 * disclosure cannot close on Escape, cannot close on an outside click, cannot
 * trap focus while it covers the page, and cannot hand focus back to the
 * trigger afterwards. All four arrive with the dialog.
 *
 * Most of the links here are now page navigations rather than jumps within one
 * document - the site was split into four pages once the single page passed
 * 28,000px on a phone. The scroll handling below still matters, because the
 * home page's own sections are still fragments and the same lock applies to
 * them.
 */
export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const pendingHref = React.useRef<string | null>(null);

  /**
   * A tap has to do two things that fight each other: close the sheet and move
   * the page. Radix locks body scroll for as long as the sheet is mounted, and
   * the sheet stays mounted through its exit animation, so a plain anchor
   * navigates against a page that cannot scroll and lands short of the
   * section. Measured at 375px on the single-page version of this site, where
   * a link near the bottom landed 341px short through a closing sheet, and
   * 16,012px short once `scroll-behavior: smooth` had its animation cut off
   * mid-flight. The distances are smaller now that the site is four pages, and
   * the failure is not - a fragment on the home page still lands short if it
   * is followed while the sheet holds the scroll lock.
   *
   * So the navigation waits its turn. The click records the destination,
   * `onCloseAutoFocus` fires once the sheet has unmounted and released the
   * lock, and the jump happens against a page that can actually move.
   */
  function handleLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Modified and non-primary clicks stay the browser's business, so
    // cmd-click still opens the section in a new tab.
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    pendingHref.current = event.currentTarget.href;
    setOpen(false);
  }

  /**
   * Radix restores focus here with a bare `focus()`, and this page sets
   * `scroll-padding-top` for its sticky header, so the browser satisfies the
   * padding by sliding the document 341px up - measured as exactly 341px from
   * every scroll position tried, on every close. Focus therefore goes back by
   * hand, with the scroll suppressed.
   */
  function handleCloseAutoFocus(event: Event) {
    event.preventDefault();

    const href = pendingHref.current;
    // Escape and outside clicks leave nothing pending, and want what Radix
    // wanted: focus back on the trigger, minus the scroll.
    if (href === null) {
      triggerRef.current?.focus({ preventScroll: true });
      return;
    }

    // A followed link leaves focus alone. The fragment jump sets the sequential
    // focus starting point to the section, and grabbing focus back to the
    // header would throw that away.
    pendingHref.current = null;
    window.location.assign(href);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button ref={triggerRef} variant="ghost" size="icon-xl" className="md:hidden">
          <MenuIcon className="size-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[86%] max-w-sm gap-0"
        aria-describedby={undefined}
        onCloseAutoFocus={handleCloseAutoFocus}
      >
        {/* No description. Radix wants one and warns without `aria-describedby`
            being set explicitly, so it is set to undefined above rather than
            filled with text. The only sentence that fitted here described the
            order of the list the visitor is already looking at, which tells
            someone opening a menu nothing they came for. The title names the
            thing; the links are the content. */}
        <SheetHeader className="pr-14">
          <SheetTitle className="text-base">Sections</SheetTitle>
        </SheetHeader>

        <nav aria-label="Sections" className="overflow-y-auto px-4 pb-6">
          <ul className="flex flex-col gap-1">
            {SECTION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex min-h-11 items-center rounded-lg px-3 font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
