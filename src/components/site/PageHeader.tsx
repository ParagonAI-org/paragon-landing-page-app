import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Shared flat page header for every non-landing route: optional back link,
 * eyebrow, display headline, lede and an optional actions slot. Keeps the
 * typographic rhythm identical across Products, Blog, About, Careers, etc.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  back,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  back?: { href: string; label: string }
  children?: ReactNode
}) {
  return (
    <header className="pt-28 md:pt-36 pb-10 md:pb-14">
      <div className="max-w-[1300px] mx-auto px-5 md:px-10">
        {back ? (
          <Link
            href={back.href}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45 hover:text-ink transition-colors mb-8 md:mb-10"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
            {back.label}
          </Link>
        ) : null}

        {eyebrow ? (
          <p className="label text-brand-600 flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
            {eyebrow}
          </p>
        ) : null}

        <h1 className="disp font-semibold text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[.95] tracking-[-.035em] max-w-5xl">
          {title}
        </h1>

        {lede ? (
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ink/60">
            {lede}
          </p>
        ) : null}

        {children ? <div className="mt-7 md:mt-9">{children}</div> : null}
      </div>
    </header>
  )
}
