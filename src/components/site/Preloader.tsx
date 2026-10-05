'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export const BOOT_EVENT = 'paragon:boot'

/**
 * Cinematic preloader — draws the mark, counts up, then lifts away.
 * Dispatches `paragon:boot` when the reveal begins so the scroll
 * choreography can start the hero intro.
 */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) {
      setDone(true)
      window.dispatchEvent(new Event(BOOT_EVENT))
      return
    }

    root.querySelectorAll<SVGPathElement>('.draw-path').forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = String(len)
      p.style.strokeDashoffset = String(len)
    })

    const num = root.querySelector<HTMLElement>('.loader-num')
    const word = root.querySelector<HTMLElement>('.loader .word span')
    const tick = root.querySelector<HTMLElement>('.loader-tick')
    if (!num || !word || !tick) return

    const counter = { v: 0 }
    let fired = false
    const fireBoot = () => {
      if (!fired) {
        fired = true
        clearTimeout(fallbackId)
        window.dispatchEvent(new Event(BOOT_EVENT))
      }
    }
    const fallbackId = setTimeout(fireBoot, 6000)

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    })
    tl.to(
      '.draw-path',
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.15,
      },
      0.1,
    )
      .to(word, { y: 0, duration: 0.9, ease: 'power4.out' }, 0.5)
      .to(
        counter,
        {
          v: 100,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v))
          },
        },
        0.5,
      )
      .to(
        '.loader-bar',
        { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
        0.5,
      )
      .to(tick, { opacity: 0, duration: 0.3 }, 1.9)
      .to(word, { y: '-112%', duration: 0.6, ease: 'power4.in' }, 2.0)
      .to(num, { opacity: 0, duration: 0.35 }, '<')
      // defer out of the timeline tick so the boot handler runs outside any
      // active gsap context
      .add(() => setTimeout(fireBoot, 0), 2.3)
      .to(root, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, 2.3)
      .set(root, { display: 'none' })

    return () => {
      tl.kill()
    }
  }, [])

  if (done) return null

  return (
    <div ref={ref} className="loader" aria-hidden="true">
      <svg
        className="w-12 h-12 text-brand-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path className="draw-path" d="M12 2 3 6.5 12 11l9-4.5L12 2z" />
        <path className="draw-path" d="M3 17.5 12 22l9-4.5" />
      </svg>
      <div className="word disp text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-tight">
        <span>
          Paragon&nbsp;
          <em className="serif-it text-brand-400 not-italic">AI</em>
        </span>
      </div>
      <p className="loader-tick label">Initializing universe</p>
      <p className="loader-num disp font-semibold tnum">0</p>
      <div className="loader-bar" />
    </div>
  )
}
