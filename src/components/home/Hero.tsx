import Link from 'next/link'
import { HERO, type HeroDockCard, MARQUEE_ITEMS } from '@/lib/home-content'

export type MarqueeItem = { text: string; serif?: boolean; dot?: string }

/** Pick the dock card of a given theme out of the dock list. */
function dockCard<T extends HeroDockCard['theme']>(
  dock: readonly HeroDockCard[],
  theme: T,
): Extract<HeroDockCard, { theme: T }> | undefined {
  return dock.find(
    (d): d is Extract<HeroDockCard, { theme: T }> => d.theme === theme,
  )
}

export default function Hero({
  eyebrow = HERO.masthead.eyebrow,
  place = HERO.masthead.place,
  copy = HERO.masthead.copy,
  primary = HERO.masthead.primary,
  secondary = HERO.masthead.secondary,
  statusPill = HERO.statusPill,
  statusTag = HERO.statusTag,
  dock = HERO.dock,
  marquee = MARQUEE_ITEMS,
}: {
  eyebrow?: string
  place?: string
  copy?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  statusPill?: string
  statusTag?: string
  dock?: readonly HeroDockCard[]
  marquee?: readonly MarqueeItem[]
}) {
  const limeCard = dockCard(dock, 'lime')
  const inkCard = dockCard(dock, 'ink')
  const brandCard = dockCard(dock, 'brand')

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 md:pt-36 pb-12 px-5 md:px-10 flex flex-col justify-between"
    >
      <div className="max-w-[1500px] mx-auto w-full my-auto">
        <div className="grid md:grid-cols-12 gap-5 items-stretch">
          {/* Top Left: Masthead Bento Card (7 cols) */}
          <div
            className="bento-card md:col-span-7 bg-bone/80 border border-ink/8 p-8 md:p-14 flex flex-col justify-between backdrop-blur-md shadow-sm"
            id="heroMasthead"
          >
            <div>
              <div
                className="flex items-center justify-between mb-8"
                id="heroMeta"
              >
                <span className="label text-brand-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-600" />
                  {eyebrow}
                </span>
                <span className="label text-ink/40">{place}</span>
              </div>

              <h1 className="disp font-semibold leading-[.92] tracking-[-.04em] text-[clamp(2.8rem,7vw,6.4rem)]">
                <span className="hline">
                  <span>We build the</span>
                </span>
                <span className="hline">
                  <span>
                    technology{' '}
                    <em className="serif-it font-normal text-brand-600">
                      Africa
                    </em>
                  </span>
                </span>
                <span className="hline">
                  <span className="text-ink">
                    runs on<span className="text-brand-600">.</span>
                  </span>
                </span>
              </h1>

              <p
                className="text-ink/65 text-base md:text-lg mt-6 leading-relaxed max-w-lg"
                id="heroCopy"
              >
                {copy}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={primary.href} className="btn btn-ink" data-cursor>
                {primary.label} <span className="fill" />
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
              <Link href={secondary.href} className="btn btn-ghost" data-cursor>
                {secondary.label} <span className="fill" />
              </Link>
            </div>
          </div>

          {/* Top Right: Open Canvas Stage (5 cols) -> Globe spins 100% visible */}
          <div className="md:col-span-5 relative min-h-[340px] flex flex-col justify-between p-6 pointer-events-none">
            <div className="self-end pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-bone/80 backdrop-blur-md border border-ink/10 text-xs font-mono text-ink/75 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{statusPill}</span>
            </div>

            <div className="self-end pointer-events-auto text-right font-mono text-[11px] text-ink/40">
              <span>{statusTag}</span>
            </div>
          </div>

          {/* Bottom Row: 3-Card Bento Dock */}
          {/* Dock Card 1 — lime */}
          <div className="bento-card md:col-span-4 bg-lime text-ink p-8 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold tracking-[0.18em] uppercase text-ink/65">
                {limeCard?.label}
              </span>
              <span className="w-2 h-2 rounded-full bg-ink" />
            </div>
            <div className="my-4">
              <h3 className="disp font-semibold text-2xl md:text-3xl leading-snug">
                {limeCard?.title}
              </h3>
              <p className="text-sm sm:text-base text-ink/80 mt-2">
                {limeCard?.sub}
              </p>
            </div>
            <Link
              href={limeCard?.cta.href ?? '/#contact'}
              className="btn btn-ink w-full justify-center !py-3"
              data-cursor
            >
              {limeCard?.cta.label ?? 'Start a project'}{' '}
              <span className="fill" />
            </Link>
          </div>

          {/* Dock Card 2 — ink */}
          <div className="bento-card md:col-span-3 bg-ink text-paper p-8 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold tracking-[0.18em] uppercase text-paper/60">
                {inkCard?.label}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-lime" />
            </div>
            <div className="my-4">
              <p className="disp font-semibold text-5xl tnum">
                {inkCard?.stat}
                <span className="text-lime">{inkCard?.statSuffix}</span>
              </p>
              <p className="text-sm sm:text-base text-paper/75 mt-2">
                {inkCard?.sub}
              </p>
            </div>
            <span className="text-xs font-mono font-semibold tracking-wider text-lime">
              {inkCard?.tag}
            </span>
          </div>

          {/* Dock Card 3 — brand */}
          <div className="bento-card md:col-span-5 bg-brand-600 text-paper p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-lime" />
                <span className="text-xs font-mono font-semibold tracking-[0.18em] uppercase text-brand-200">
                  {brandCard?.label}
                </span>
              </div>
              <h3 className="disp font-semibold text-2xl mt-1">
                {brandCard?.title}
              </h3>
              <p className="text-sm sm:text-base text-paper/85 mt-2 max-w-sm">
                {brandCard?.sub}
              </p>
            </div>
            <Link
              href={brandCard?.cta.href ?? '/#levelup'}
              className="btn btn-lime shrink-0 !py-3 !px-5 text-xs sm:text-sm font-semibold"
              data-cursor
            >
              {brandCard?.cta.label ?? 'Meet LevelUP'} <span className="fill" />
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div id="heroStrip">
        <div className="mq" id="mq1">
          {[0, 1].map((copyIdx) => (
            <div
              key={copyIdx}
              className="flex items-center"
              aria-hidden={copyIdx > 0}
            >
              {marquee.map((item) => (
                <span
                  key={`${copyIdx}-${item.text}`}
                  className="flex items-center"
                >
                  <span
                    className={`mq-item disp font-semibold text-2xl md:text-4xl px-6 ${
                      item.serif ? 'serif-it font-normal' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dot}`}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
