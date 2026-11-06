# Archived site chrome

`Footer.big.tsx` is the previous large footer: dark finale CTA, four link
columns, giant `PARAGON` wordmark, local-time line and the `#contact` anchor.

It was replaced site-wide by the compact `src/components/site/CompactFooter.tsx`
(the landing page mounts it inside `Hero.tsx`; every other route gets it from
`Footer.tsx`). The old footer's theme-flip `IntersectionObserver` (nebula +
orb palette) and the `footer-shell` wrapper were removed with it.

## Restoring it

1. Move `Footer.big.tsx` back to `src/components/site/Footer.tsx`.
2. Restore the removed CSS from git: `.footer-shell`, `html.nebula-live
   .footer-shell`, `.giant`, `.footlink*`, `.dark-sec`, `.section-zoom` and the
   `.noise` overlay (globals.css).
3. Re-mount `<Nebula />` in `app/(frontend)/layout.tsx` and wrap `<Footer />` in
   `<div className="footer-shell relative z-[2]">`.
4. The footer's effect depends on `glState` / `universe` from
   `components/home/gl-state.ts`; both still exist.
