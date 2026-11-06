import Link from 'next/link'
import BrandMark from './BrandMark'

/**
 * The site-wide compact footer: brand line, the studio line, a single contact
 * link and the copyright. The landing page mounts it inside <Hero/> so the
 * whole page stays one screen; every other route gets it from the layout.
 */
export default function CompactFooter({ border = true }: { border?: boolean }) {
  return (
    <footer id="site-footer" className={border ? 'border-t border-ink/10' : ''}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-3 md:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <BrandMark className="!w-6 !h-6" />
          <span className="disp font-semibold text-sm">Paragon AI</span>
          <span className="hidden md:inline text-xs text-ink/40">
            A small software and app studio — Addis Ababa.
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] md:text-xs text-ink/40">
          <span className="disp font-semibold text-sm md:text-lg text-ink/75">
            Let&apos;s build what Africa needs next.
          </span>
          <Link
            href="/contact-us"
            className="hover:text-ink transition-colors"
            data-cursor
          >
            Contact
          </Link>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
