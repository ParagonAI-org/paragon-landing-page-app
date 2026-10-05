'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { glState } from '@/components/home/gl-state'
import { scrollToTarget, setLenis } from './lenis-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Site-wide Lenis smooth scrolling, wired into GSAP's ticker so
 * ScrollTrigger stays in sync. Also intercepts in-page hash anchors.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })
    setLenis(lenis)

    const onScroll = (e: Lenis) => {
      ScrollTrigger.update()
      glState.STATE.velTarget = gsap.utils.clamp(-100, 100, e.velocity || 0)
    }
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href]',
      )
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      // bare "#" or "#top" style links
      if (href === '#' || href === '#top') {
        e.preventDefault()
        scrollToTarget(0, 0)
        return
      }

      // same-page hash links ("#work" and "/#work" while on home)
      const hash = href.startsWith('/#')
        ? href.slice(1)
        : href.startsWith('#')
          ? href
          : null
      if (hash) {
        if (href.startsWith('/#') && window.location.pathname !== '/') return // let Next navigate home
        const target = document.querySelector(hash)
        if (target) {
          e.preventDefault()
          scrollToTarget(target as HTMLElement)
        }
        return
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
