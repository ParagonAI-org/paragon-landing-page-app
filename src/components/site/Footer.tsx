'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { glState, universe } from '@/components/home/gl-state'
import BrandMark from './BrandMark'
import { scrollToTarget } from './lenis-store'

const FOOTER_COLS = [
  {
    heading: 'Products',
    links: [
      { label: 'LevelUP', href: '/products/levelup' },
      { label: 'Paragon Engine', href: '/products' },
      { label: 'Studios', href: '/products' },
      { label: 'Labs', href: '/blog' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'AI Systems', href: '/#services' },
      { label: 'Web Platforms', href: '/#services' },
      { label: 'Mobile', href: '/#services' },
      { label: 'Data & Analytics', href: '/#services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Research', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact-us' },
    ],
  },
  {
    heading: 'Socials',
    links: [
      { label: 'X / Twitter', href: 'https://x.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'GitHub', href: 'https://github.com' },
    ],
  },
]

function LocalTime() {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString('en-GB', {
            timeZone: 'Africa/Addis_Ababa',
            hour: '2-digit',
            minute: '2-digit',
          }),
        )
      } catch {
        setTime(
          new Date().toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        )
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <p className="tnum">Addis Ababa — {time} EAT</p>
}

export default function Footer() {
  const shellRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = shellRef.current
    if (!el) return

    /*
     * Finale world flip: while the footer is on screen, push the fixed
     * backdrop (nebula shader + 3D orb palette) to its dark portal state —
     * the design's `set3DTheme(true)` on `#contact top 75%`. On the home page
     * ScrollFx already owns both directions of this flip (its #contact latch
     * plus #insights leave-back), so there we only reinforce the dark state
     * and let the choreography restore the light world. On every other route
     * no choreography exists, so this observer also fades the backdrop back
     * to light as the footer scrolls out.
     */
    const homeOwnsBackdrop = !!document.getElementById('insights')
    const io = new IntersectionObserver(
      ([entry]) => {
        const dark = entry?.isIntersecting ?? false
        if (!dark && homeOwnsBackdrop) return
        if (universe.current) universe.current.set3DTheme(dark)
        else glState.nebula.themeTarget = dark ? 1 : 0
      },
      { rootMargin: '0px 0px -25% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    /*
     * dark-sec gives color:#f4f3ef + position:relative.
     * Transparent by design: the fixed nebula canvas (dark when #contact is
     * in view) and the 3D orb (scaled to 2.2 by ScrollFx) show through. The
     * radial brand-600 glow blur is the CSS "portal" layered on top. The
     * .footer-shell wrapper in the layout carries the opaque ink fallback
     * whenever the live WebGL backdrop isn't available.
     */
    <footer
      id="contact"
      data-nav-dark
      ref={shellRef}
      className="dark-sec rounded-t-[2.5rem] md:rounded-t-[4rem] pt-24 md:pt-36 px-5 md:px-10 relative overflow-hidden section-zoom"
    >
      {/* Radial brand-600 portal glow — centrepiece of the finale */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-600/25 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* ── Eyebrow ──────────────────────────────────────────── */}
        <p
          className="text-sm md:text-base font-mono font-semibold tracking-[0.2em] uppercase text-lime mb-8 flex items-center justify-center gap-3"
          data-rv
        >
          <span className="w-10 h-0.5 bg-lime" />
          Entering — The Finale
          <span className="w-10 h-0.5 bg-lime" />
        </p>

        {/* ── Hero heading ─────────────────────────────────────── */}
        <h2
          className="disp font-semibold text-center leading-[.95] text-[clamp(2.8rem,8vw,8rem)] mb-10"
          data-rv
        >
          Let&apos;s build what
          <br />
          Africa <em className="serif-it font-normal text-lime">needs next.</em>
        </h2>

        {/* ── Sub-copy ─────────────────────────────────────────── */}
        <p
          className="text-paper/75 text-base md:text-lg text-center max-w-lg mx-auto mb-12 leading-relaxed"
          data-rv
        >
          Whether you&apos;re launching a product, automating operations or
          reimagining a classroom — we&apos;ll build it with you.
        </p>

        {/* ── CTA buttons ──────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-24"
          data-rv
        >
          <Link
            href="mailto:hello@paragon.ai"
            className="btn btn-lime !px-9 !py-4 !text-base"
            data-cursor
          >
            Start a project <span className="fill" />
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </Link>
          <Link
            href="/contact-us"
            className="btn btn-wghost !px-9 !py-4 !text-base"
            data-cursor
          >
            Talk to our team <span className="fill" />
          </Link>
        </div>

        {/* ── Link grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 pb-20 border-b border-paper/10">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <BrandMark tone="white" className="w-9 h-9" />
              <span className="disp font-semibold text-lg">
                Paragon <span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-base text-paper/50 leading-relaxed max-w-xs mb-6">
              Engineering Africa&apos;s next chapter in intelligence — AI, web
              and product, end to end.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-paper/60 border border-paper/15 rounded-full px-3.5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Booking Q3 2026 projects
            </span>
          </div>

          {/* Nav link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs sm:text-sm font-mono tracking-[0.18em] uppercase text-paper/50 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3 text-sm text-paper/50">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link className="footlink" href={link.href} data-cursor>
                      <span>{link.label}</span>
                      <span aria-hidden="true">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Giant wordmark (GSAP scrubs xPercent + fontWeight) ── */}
        <div className="py-10 md:py-16 overflow-hidden" aria-hidden="true">
          <p
            id="giant"
            className="giant disp text-center text-paper/[.07] select-none will-change-transform"
          >
            PARAGON
          </p>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-10 text-xs text-paper/30">
          <p>© 2026 Paragon AI. Built for the Continent.</p>
          <LocalTime />
          <button
            type="button"
            onClick={() => scrollToTarget(0, 0)}
            className="group inline-flex items-center gap-2 font-semibold text-paper/40 hover:text-paper transition-colors"
            data-cursor
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-paper/20 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
