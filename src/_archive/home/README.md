# Archived landing-page sections

The landing page was reduced to **hero → marquee** plus the footer. Everything
between the marquee and the footer was moved here instead of being deleted.

Nothing in this folder is imported, type-checked, linted or bundled
(`tsconfig.json` and `biome.json` exclude `src/_archive`). The files are kept
verbatim so a section can be restored exactly as it shipped.

## What was archived

| File | Section | Anchors / hooks |
| --- | --- | --- |
| `WorldTransition.tsx` | The four aperture panels between worlds | `#wc1`–`#wc4`, `.wc-panel`, `.wc-scr` |
| `Manifesto.tsx` | Studio manifesto + focus stats | `#manifesto`, `#mtext`, `.mword` |
| `Services.tsx` | Six service rows + hover preview | `#services`, `#svcList`, `#svcPreview` |
| `Work.tsx` | Horizontal work cards | `#work`, `#hWrap`, `#hTrack`, `#hProg`, `#hCount` |
| `LevelUp.tsx` | Pinned LevelUP product story | `#levelup`, `#lvlPin`, `#lvlImg`, `#lvlDots` |
| `Process.tsx` | Stacked process cards | `#process`, `#procCards`, `.stack-card` |
| `Principles.tsx` | Four principle cards | `#principles`, `#prinGrid` |
| `Perspective.tsx` | Perspective marquee | `#stories`, `#tmMq`, `.tm-item` |
| `Updates.tsx` | Latest posts list | `#insights`, `#upList`, `.up-row` |
| `Testimonials.tsx` | Earlier testimonial layout — **already unused and broken before archiving** | `#stories`, `#tmMq` |
| `sections.css` | The section-only CSS blocks cut from `globals.css` | — |
| `ScrollFx.full.tsx` | The complete scroll choreography from before the trim | — |

Kept live: `Hero.tsx`, `Nebula.tsx`, `Universe.tsx` (orb), `gl-state.ts`, the
trimmed `ScrollFx.tsx`, and every content constant in `src/lib/home-content.ts`
(the Payload `Homepage` global still mirrors those fields).

## Restoring one section

1. **Move the component back** into `src/components/home/`.
2. **Re-import it** in `src/app/(frontend)/page.tsx` and render it after
   `<Hero/>` in the original order:
   `WorldTransition #wc1 → Manifesto → Services → #wc2 → Work → LevelUp →
   #wc3 → Process → Principles → #wc4 → Perspective → Updates`.
3. **Restore its copy merge** in `page.tsx`. The CMS fields and fallback
   constants are all still present — copy the merge block from git history
   (`git show 042fcc7:'src/app/(frontend)/page.tsx'`).
4. **Move its CSS** from `sections.css` back into the `@layer components`
   block in `src/styles/globals.css`.
5. **Move its behaviour** from `ScrollFx.full.tsx` back into a scroll
   component. The live `ScrollFx.tsx` was reduced to `HeroIntro.tsx` for the
   single-screen design, so either restore the full timeline as `ScrollFx.tsx`
   or copy the relevant blocks (`buildWorldChange`, the manifesto word scrub,
   the horizontal work pin, the LevelUP timeline, `.stack-card` smoothing,
   `#tmMq`, `.up-row` thumbs) into a new client component.
   `ScrollFx.full.tsx` imports `./gl-state` and `LEVELUP` from
   `@/lib/home-content`; both still exist.

Restoring the orb's scroll journey is the one piece that needs care: the theme
flip now belongs solely to `Footer.tsx`, so re-add the per-section
`ScrollTrigger.create` calls from `ScrollFx.full.tsx` and remove the footer's
observer only if you want the choreography to own it again.

## Notes

- The hero marquee is gone: `MARQUEE_ITEMS`, `#heroStrip`, the `#mq1` tween and
  its CSS were removed with the single-screen redesign. The `.mq` / `.mq-item`
  classes remain here because the archived Perspective/Testimonials sections
  use them.
- The landing page now renders its own compact footer (`#home-footer` inside
  `Hero.tsx`); the large `Footer.tsx` returns `null` for `/` and still renders
  on every other route.
- `Perspective.tsx` replaced the old testimonials section. It was untracked and
  is archived in its final working-tree state.
- `Testimonials.tsx` imports `TESTIMONIALS` / `Testimonial` from
  `home-content.ts`, which were removed before this archive. Restore those
  constants from git history (`git log -S TESTIMONIALS -- src/lib/home-content.ts`)
  if you ever want that layout back.
- The CMS needs no changes to restore any section: `Homepage.ts` and
  `payload-types.ts` were deliberately left untouched. The `heroStatusPill`
  and `marquee` fields are simply no longer read by the page.
