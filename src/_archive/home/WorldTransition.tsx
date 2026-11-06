import type { ReactNode } from 'react'

type Props = {
  id: string
  /** 'dark' apertures set paper/lime copy, 'light' apertures ink/brand copy */
  theme: 'dark' | 'light'
  /** Left-rail label, e.g. 'Studio' */
  rail: string
  /** Aperture index, e.g. '01' — shown in the rail and as the giant number */
  index?: string
  /** Center statement — may embed .serif-it accents and <br/> */
  children: ReactNode
  /** Statement clamp override — each aperture carries its own in the design */
  statementClass?: string
  /** Scramble line under the statement (.wc-scr) */
  scramble: string
  /** Status label beside the pulsing dot */
  status?: string
  /** Status dot accent */
  statusDot?: 'lime' | 'brand'
  /** Bottom hairline row: left tag / middle tag / right scroll hint */
  footLeft?: string
  footMid?: string
  rightStat?: string
  keepScrolling?: string
  /** Puts data-nav-dark on the wc-panel so the fixed nav flips dark (wc1/wc3) */
  navDark?: boolean
}

const THEME = {
  dark: {
    statement: 'text-paper',
    rail: 'text-lime',
    railBar: 'bg-lime',
    railIndex: 'text-paper/60',
    hairMain: 'bg-paper/20',
    hairSub: ['bg-paper/15', 'bg-paper/10', 'bg-paper/5'],
    scramble: 'text-paper/85',
    status: 'text-paper/85',
    statusDivider: 'bg-paper/30',
    explore: 'text-paper/60',
    railWrap: 'text-paper/75',
    rightStat: 'text-paper/80',
    bigNum: 'text-paper/35',
    footBorder: 'border-paper/15',
    footText: 'text-paper/75',
    keep: 'text-paper/50',
    keepBar: 'bg-paper/40',
    frame: 'border-paper/10',
    gradient: 'from-paper/25',
  },
  light: {
    statement: 'text-ink',
    rail: 'text-ink',
    railBar: 'bg-ink',
    railIndex: 'text-ink/50',
    hairMain: 'bg-ink/20',
    hairSub: ['bg-ink/15', 'bg-ink/10', 'bg-ink/5'],
    scramble: 'text-ink/80',
    status: 'text-ink/85',
    statusDivider: 'bg-ink/25',
    explore: 'text-ink/60',
    railWrap: 'text-ink/75',
    rightStat: 'text-ink/80',
    bigNum: 'text-ink/30',
    footBorder: 'border-ink/15',
    footText: 'text-ink/75',
    keep: 'text-ink/55',
    keepBar: 'bg-ink/35',
    frame: 'border-ink/10',
    gradient: 'from-ink/25',
  },
} as const

/**
 * Full-viewport scroll transition between the site's "worlds".
 * A glass aperture frame whose center stays transparent so the 3D core
 * shows through. The panel is sticky (see .wc/.wc-panel in globals) and
 * ScrollFx scrubs it in as the section enters.
 */
export default function WorldTransition({
  id,
  theme,
  rail,
  index = '01',
  children,
  statementClass = 'text-[clamp(2.4rem,7vw,6.2rem)]',
  scramble,
  status,
  statusDot = 'lime',
  footLeft,
  footMid,
  rightStat,
  keepScrolling = 'Keep scrolling',
  navDark = false,
}: Props) {
  const c = THEME[theme]

  return (
    <section id={id} className="wc">
      <div
        className="wc-panel flex items-center p-4 md:p-10 pointer-events-none"
        {...(navDark ? { 'data-nav-dark': true } : {})}
      >
        <div className="w-full max-w-[1500px] mx-auto relative flex flex-col justify-center min-h-[70vh] md:min-h-[80vh]">
          {/* Glass aperture frame — transparent in the middle so the 3D core shows through */}
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left rail: index + label */}
            <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-10 opacity-90">
              <p
                className={`text-base sm:text-lg md:text-xl font-mono font-bold tracking-[0.2em] ${c.rail} uppercase flex items-center gap-3`}
              >
                <span className={`w-10 h-0.5 ${c.railBar}`} />
                {rail}
                <span className={c.railIndex}>/{index}</span>
              </p>
              <div className="hidden md:flex items-center gap-6 mt-4">
                <span className={`w-px h-32 ${c.hairMain}`} />
                <div className="flex flex-col gap-1.5">
                  <span className={`w-20 h-px ${c.hairSub[0]}`} />
                  <span className={`w-14 h-px ${c.hairSub[1]}`} />
                  <span className={`w-24 h-px ${c.hairSub[2]}`} />
                </div>
              </div>
            </div>

            {/* Center: editorial statement over a transparent window */}
            <div className="md:col-span-6 text-center md:text-left">
              <p
                className={`disp font-semibold ${statementClass} leading-[.98] tracking-[-.03em] ${c.statement}`}
              >
                {children}
              </p>
              <p
                className={`${c.scramble} text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] mt-8 max-w-2xl leading-relaxed md:leading-[1.35] font-normal`}
              >
                <span className="wc-scr">{scramble}</span>
              </p>
              {status ? (
                <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span
                    className={`text-sm sm:text-base font-mono font-medium tracking-[0.18em] uppercase ${c.status} flex items-center gap-2.5`}
                  >
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        statusDot === 'lime' ? 'bg-lime' : 'bg-brand-600'
                      } animate-pulse`}
                    />
                    {status}
                  </span>
                  <span
                    className={`hidden sm:block w-px h-5 ${c.statusDivider}`}
                  />
                  <span
                    className={`text-xs sm:text-sm font-mono tracking-[0.18em] uppercase ${c.explore}`}
                  >
                    Scroll to explore
                  </span>
                </div>
              ) : null}
            </div>

            {/* Right rail: vertical stat */}
            <div
              className={`md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-6 ${c.railWrap}`}
            >
              {rightStat ? (
                <span
                  className={`disp text-sm md:text-base font-semibold tracking-[0.25em] tnum md:mb-10 ${c.rightStat}`}
                >
                  {rightStat}
                </span>
              ) : null}
              <span
                className={`disp text-6xl md:text-7xl font-bold ${c.bigNum}`}
              >
                {index}
              </span>
            </div>
          </div>

          {/* Thin bottom hairline frame, keeps the aperture open */}
          <div
            className={`mt-10 md:mt-14 flex items-end justify-between gap-4 border-t ${c.footBorder} pt-5 opacity-80`}
          >
            {footLeft ? (
              <span
                className={`text-xs sm:text-sm font-mono tracking-[0.18em] uppercase ${c.footText}`}
              >
                {footLeft}
              </span>
            ) : null}
            {footMid ? (
              <span
                className={`text-xs sm:text-sm font-mono tracking-[0.18em] uppercase ${c.footText} hidden sm:block`}
              >
                {footMid}
              </span>
            ) : null}
            <span
              className={`text-xs sm:text-sm font-mono tracking-[0.18em] uppercase ${c.keep} flex items-center gap-2`}
            >
              {keepScrolling}{' '}
              <span className={`inline-flex h-4 w-px ${c.keepBar}`} />
            </span>
          </div>

          {/* Subtle corner framing only — no opaque wall */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className={`absolute inset-0 md:inset-6 border ${c.frame} rounded-[2.2rem]`}
            />
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b ${c.gradient} to-transparent`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
