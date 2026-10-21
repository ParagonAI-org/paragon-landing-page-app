'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/home-content'
import BrandMark from './BrandMark'
import { getLenis } from './lenis-store'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Glass state + hide-on-scroll-down
  useEffect(() => {
    const nav = document.getElementById('nav')
    if (!nav) return
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      nav.classList.toggle('scrolled', y > 60)
      if (y > lastY && y > 300 && !menuOpen) nav.classList.add('hide')
      else nav.classList.remove('hide')
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  // Flip the nav to its light-on-dark palette while a dark world is at the
  // top of the viewport. Dark sections (on any page) declare data-nav-dark;
  // the dark footer declares it too. Light worlds keep the default palette.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname re-observes the dark sections of the new page
  useEffect(() => {
    const nav = document.getElementById('nav')
    if (!nav) return
    const darks = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-dark]'),
    )
    if (!darks.length) {
      nav.classList.remove('on-dark')
      return
    }
    const active = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.add(entry.target)
          else active.delete(entry.target)
        })
        nav.classList.toggle('on-dark', active.size > 0)
      },
      { rootMargin: '-74px 0px -74px 0px' },
    )
    darks.forEach((d) => {
      io.observe(d)
    })
    return () => io.disconnect()
  }, [pathname])

  // Lock scroll while the drawer is open
  useEffect(() => {
    const lenis = getLenis()
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [menuOpen])

  return (
    <>
      <header id="nav" className="site-nav" data-cursor>
        <div className="nav-inner">
          <Link href="/" className="logo-link" aria-label="Paragon AI — home">
            <BrandMark />
            <span className="logo-word disp font-semibold text-[15px]">
              Paragon <span className="opacity-60">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="navlink">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="nav-cta hidden sm:inline-flex items-center gap-1.5"
            >
              Start a project
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
            <button
              type="button"
              className="nav-burger md:hidden w-10 h-10 rounded-xl border flex items-center justify-center"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[210] bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <span className="flex items-center gap-2.5">
            <BrandMark tone="white" />
            <span className="disp font-semibold text-lg">
              Paragon <span className="opacity-60">AI</span>
            </span>
          </span>
          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-paper/15 flex items-center justify-center"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 mt-14 gap-2" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`disp font-semibold text-4xl py-3 border-b border-paper/10 transition-all duration-500 ${
                menuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-10">
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-lime w-full justify-center"
          >
            Start a project <span className="fill" />
          </Link>
        </div>

        <p className="absolute bottom-8 left-6 label text-paper/30">
          Addis Ababa — Ethiopia
        </p>
      </div>
    </>
  )
}
