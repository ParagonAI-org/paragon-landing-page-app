'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CTA } from '@/lib/home-content'
import { scrollToTarget } from './lenis-store'

const FOOTER_COLS: {
  heading: string
  links: { label: string; href: string }[]
}[] = [
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
  return (
    <footer
      id="contact"
      data-nav-dark
      className="dark-sec rounded-t-[2.5rem] md:rounded-t-[4rem] pt-24 md:pt-36 px-5 md:px-10 relative z-10 overflow-hidden section-zoom"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-600/25 blur-[130px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* CTA */}
        <p
          className="label text-lime mb-8 flex items-center justify-center gap-3"
          data-rv
        >
          <span className="w-8 h-px bg-lime" />
          {CTA.label}
          <span className="w-8 h-px bg-lime" />
        </p>
        <h2
          className="disp font-semibold text-center leading-[.95] text-[clamp(2.8rem,8vw,8rem)] mb-10"
          data-rv
        >
          Let&apos;s build what
          <br />
          Africa <em className="serif-it font-normal text-lime">needs next.</em>
        </h2>
        <p className="text-paper/45 text-center max-w-md mx-auto mb-12" data-rv>
          {CTA.copy}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-24"
          data-rv
        >
          <Link
            href={CTA.primary.href}
            className="btn btn-lime !px-9 !py-4 !text-base"
            data-cursor
          >
            {CTA.primary.label} <span className="fill" />
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
            href={CTA.secondary.href}
            className="btn btn-wghost !px-9 !py-4 !text-base"
            data-cursor
          >
            {CTA.secondary.label} <span className="fill" />
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 pb-20 border-b border-paper/10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-full bg-paper/10 border border-paper/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-paper"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path d="M12 2 3 6.5 12 11l9-4.5L12 2z" />
                  <path d="M3 17.5 12 22l9-4.5" />
                </svg>
              </span>
              <span className="disp font-semibold text-lg">
                Paragon <span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-paper/35 leading-relaxed max-w-xs mb-6">
              Engineering Africa&apos;s next chapter in intelligence — AI, web
              and product, end to end.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-paper/50 border border-paper/15 rounded-full px-3.5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {CTA.badge}
            </span>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="label text-paper/30 mb-5">{col.heading}</h4>
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

        {/* Giant wordmark */}
        <div className="py-10 md:py-16 overflow-hidden" aria-hidden="true">
          <p className="giant disp text-center text-paper/[.07] select-none will-change-transform">
            PARAGON
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-10 text-xs text-paper/30">
          <p>
            © {new Date().getFullYear()} Paragon AI. Built for the Continent.
          </p>
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
