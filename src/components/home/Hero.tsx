import Link from 'next/link'
import CompactFooter from '@/components/site/CompactFooter'
import { HERO, type HeroDockCard } from '@/lib/home-content'

/** Pick the dock card of a given theme out of the dock list. */
function dockCard<T extends HeroDockCard['theme']>(
  dock: readonly HeroDockCard[],
  theme: T,
): Extract<HeroDockCard, { theme: T }> | undefined {
  return dock.find(
    (d): d is Extract<HeroDockCard, { theme: T }> => d.theme === theme,
  )
}

/**
 * The one-screen landing page: flat bar, the hero copy and the three studio
 * notes as a plain typographic grid on the page background, the fixed orb
 * holding the right side, and a borderless compact footer closing the screen.
 */
export default function Hero({
  copy = HERO.masthead.copy,
  primary = HERO.masthead.primary,
  secondary = HERO.masthead.secondary,
  dock = HERO.dock,
}: {
  copy?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  dock?: readonly HeroDockCard[]
}) {
  const limeCard = dockCard(dock, 'lime')
  const inkCard = dockCard(dock, 'ink')
  const brandCard = dockCard(dock, 'brand')

  return (
    <section id="hero" className="relative min-h-[100svh] pt-16 flex flex-col">
      {/* Mobile/tablet orb stage: the absolute canvas is positioned into this
          slot by .webgl-canvas; the copy below starts underneath it. */}
      <div className="lg:hidden h-[320px] shrink-0" aria-hidden="true" />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-5 md:px-10 flex items-center py-6 md:py-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            {/* ── Masthead ─────────────────────────────────────── */}
            <div id="heroMasthead" data-hero-rise>
              <h1 className="disp font-semibold leading-[.92] tracking-[-.04em] text-[clamp(2.15rem,4.4vw,4.4rem)]">
                <span className="hline">
                  <span>We build AI products</span>
                </span>
                <span className="hline">
                  <span>
                    for{' '}
                    <span className="inline-block bg-brand-600 text-paper px-2.5 md:px-3.5 rounded-lg leading-[.9]">
                      <em className="serif-it font-normal">Africa&rsquo;s</em>
                    </span>
                  </span>
                </span>
                <span className="hline">
                  <span className="text-ink">
                    next chapter<span className="text-brand-600">.</span>
                  </span>
                </span>
              </h1>

              <p
                className="text-ink/65 text-sm md:text-base mt-4 leading-relaxed max-w-xl"
                id="heroCopy"
              >
                {copy}
              </p>

              <div className="flex flex-wrap gap-2.5 mt-6">
                <Link
                  href={primary.href}
                  className="btn btn-ink !px-5 !py-2.5 !text-[13px]"
                  data-cursor
                >
                  {primary.label} <span className="fill" />
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
                <Link
                  href={secondary.href}
                  className="btn btn-ghost !px-5 !py-2.5 !text-[13px]"
                  data-cursor
                >
                  {secondary.label} <span className="fill" />
                </Link>
              </div>
            </div>

            {/* ── Studio notes — plain content, no containers ───── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5 mt-7 md:mt-10">
              {/* Collaboration */}
              <div
                data-hero-rise
                className="border-t border-ink/15 pt-4 flex flex-col"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime ring-1 ring-ink/15" />
                  <span className="text-[9px] font-mono font-semibold tracking-[0.14em] uppercase text-ink/50">
                    {limeCard?.label}
                  </span>
                </div>
                <h3 className="disp font-semibold text-sm leading-snug mt-3">
                  {limeCard?.title}
                </h3>
                <p className="hidden sm:block [@media(max-height:820px)]:hidden text-xs text-ink/50 mt-1.5 leading-relaxed">
                  {limeCard?.sub}
                </p>
                <Link
                  href={limeCard?.cta.href ?? '/contact-us'}
                  className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-ink hover:text-brand-600 transition-colors"
                  data-cursor
                >
                  {limeCard?.cta.label ?? 'Get in touch'}{' '}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

              {/* Mission */}
              <div
                data-hero-rise
                className="border-t border-ink/15 pt-4 flex flex-col"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                  <span className="text-[9px] font-mono font-semibold tracking-[0.14em] uppercase text-ink/50">
                    {inkCard?.label}
                  </span>
                </div>
                <p className="disp font-semibold text-3xl tnum leading-none mt-3">
                  {inkCard?.stat}
                  <span className="text-brand-600">{inkCard?.statSuffix}</span>
                </p>
                <p className="hidden sm:block [@media(max-height:820px)]:hidden text-xs text-ink/50 mt-1.5 leading-relaxed">
                  {inkCard?.sub}
                </p>
                <span className="text-[9px] font-mono tracking-[0.14em] text-ink/45 mt-3">
                  {inkCard?.tag}
                </span>
              </div>

              {/* Flagship */}
              <div
                data-hero-rise
                className="border-t border-ink/15 pt-4 flex flex-col"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                  <span className="text-[9px] font-mono font-semibold tracking-[0.14em] uppercase text-ink/50">
                    {brandCard?.label}
                  </span>
                </div>
                <h3 className="disp font-semibold text-sm mt-3">
                  {brandCard?.title}
                </h3>
                <p className="hidden sm:block [@media(max-height:820px)]:hidden text-xs text-ink/50 mt-1.5 leading-relaxed">
                  {brandCard?.sub}
                </p>
                <Link
                  href={brandCard?.cta.href ?? '/products/levelup'}
                  className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-ink hover:text-brand-600 transition-colors"
                  data-cursor
                >
                  {brandCard?.cta.label ?? 'Meet LevelUP'}{' '}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Compact footer — content only ────────────────────── */}
      <CompactFooter border={false} />
    </section>
  )
}
