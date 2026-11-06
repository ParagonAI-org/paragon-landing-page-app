'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { glState, universe } from './gl-state'

/**
 * The landing page's only motion: the hero reveal (headline lines, masthead,
 * dock cards, nav) and the orb's elastic spawn. The page is a single screen,
 * so there is no scroll choreography left. The full pre-redesign timeline is
 * preserved in src/_archive/home/ScrollFx.full.tsx.
 */
export default function HeroIntro() {
  const bootedRef = useRef(false)

  useEffect(() => {
    const REDUCED = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (REDUCED) {
      document.documentElement.classList.add('reduced')
      // The landing page keeps the original blue orb on its white canvas.
      universe.current?.setOrbPalette('indigo', false)
      return
    }

    const heroIntro = () => {
      // StrictMode guard: never boot twice within one mount. Cleanup resets
      // the flag so a remount reverts and replays cleanly.
      if (bootedRef.current) return
      bootedRef.current = true
      // Snappy entrance: the whole sequence settles in ~1.2s so the first
      // load feels instant while keeping the choreographed reveal.
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.hline > span', { y: 0, rotate: 0, duration: 0.8, stagger: 0.08 })
        .fromTo(
          '#heroMasthead',
          { opacity: 0, y: 24, scale: 0.99 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          '-=.65',
        )
        .fromTo(
          '#hero [data-hero-rise]:not(#heroMasthead)',
          { opacity: 0, y: 26, scale: 0.99 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.05 },
          '-=.5',
        )
        .fromTo(
          '#nav',
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=.45',
        )

      const u = universe.current
      if (u) {
        // The old scroll journey shifted the orb to its green palette as the
        // page entered the dark worlds. The one-screen landing keeps the original blue orb permanently —
        // orb only, on the clean white canvas.
        u.setOrbPalette('indigo', false)
        // Spawn: the core sits at ~0 (set by <Universe/> init) so it never
        // paints at full size pre-boot; elastic-scale up to its placement
        // value exactly once. The orb then stays in its hero position.
        const s = glState.universe.homeScale
        gsap.to(u.coreGroup.scale, {
          x: s,
          y: s,
          z: s,
          duration: 1.3,
          ease: 'elastic.out(1, 0.75)',
        })
      }
    }

    // Initial hidden states, applied immediately so hero elements keep their
    // pre-animated state while the choreography waits for fonts.
    const preCtx = gsap.context(() => {
      gsap.set('.hline > span', { y: '112%', rotate: 2 })
      gsap.set('#heroMasthead', { opacity: 0, y: 24 })
      gsap.set('#nav', { opacity: 0 })
    })

    let ctx: gsap.Context | null = null
    let disposed = false

    const boot = () => {
      if (disposed) return
      ctx = gsap.context(heroIntro)
    }

    // Boot as soon as fonts settle (capped at 1.2s) — deliberately NOT the
    // window `load` event: load stalls on every image/analytics request,
    // which held the whole hero hostage for seconds on cold loads.
    const fonts = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => setTimeout(resolve, 1200)),
    ])
    fonts.then(boot)

    return () => {
      disposed = true
      // Reset the boot guard so a StrictMode remount replays the intro after
      // the reverts below restore the hidden initial states.
      bootedRef.current = false
      ctx?.revert()
      preCtx.revert()
    }
  }, [])

  return null
}
