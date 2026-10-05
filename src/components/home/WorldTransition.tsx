import type { ReactNode } from 'react'

type Props = {
  id: string
  /** 'cover' slides up as a full panel; 'circle' expands as a clip-path portal */
  variant: 'cover' | 'circle'
  theme: 'ink' | 'coal' | 'paper'
  accent: 'lime' | 'brand'
  label: string
  children: ReactNode
  scramble: string
  keepScrolling?: boolean
}

const THEME = {
  ink: 'bg-ink text-paper',
  coal: 'bg-coal text-paper',
  paper: 'bg-paper text-ink',
} as const

const ACCENT = {
  lime: 'text-lime',
  brand: 'text-brand-600',
} as const

/**
 * Full-viewport scroll transition between the site's "worlds".
 * Animation is driven by ScrollFx (cover slide / circle portal).
 */
export default function WorldTransition({
  id,
  variant,
  theme,
  accent,
  label,
  children,
  scramble,
  keepScrolling,
}: Props) {
  return (
    <section id={id} className="wc">
      <div
        className={`wc-panel ${variant === 'circle' ? 'wc-circle' : ''} ${THEME[theme]} flex items-center justify-center`}
        {...(theme === 'ink' || theme === 'coal'
          ? { 'data-nav-dark': true }
          : {})}
      >
        <div className="wc-inner text-center px-6 max-w-5xl">
          <p
            className={`label mb-8 flex items-center justify-center gap-3 ${ACCENT[accent]}`}
          >
            <span
              className={`w-8 h-px ${ACCENT[accent].replace('text-', 'bg-')}`}
            />
            {label}
            <span
              className={`w-8 h-px ${ACCENT[accent].replace('text-', 'bg-')}`}
            />
          </p>
          <p className="disp font-semibold text-[clamp(2.4rem,7vw,6.2rem)] leading-[.98] tracking-[-.03em]">
            {children}
          </p>
          <p
            className={`wc-scr text-sm md:text-base mt-8 max-w-md mx-auto ${
              theme === 'paper' ? 'text-ink/45' : 'text-paper/40'
            }`}
          >
            {scramble}
          </p>
        </div>
        {keepScrolling && (
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 label text-paper/25">
            Keep scrolling
          </p>
        )}
      </div>
    </section>
  )
}
