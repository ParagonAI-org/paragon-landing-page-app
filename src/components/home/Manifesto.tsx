import { MANIFESTO } from '@/lib/home-content'

export type ManifestoStat = { value: string; suffix?: string; label: string }

export default function Manifesto({
  label = MANIFESTO.label,
  textPre = MANIFESTO.textPre,
  textEm = MANIFESTO.textEm,
  stats = MANIFESTO.stats,
}: {
  label?: string
  textPre?: string
  textEm?: string
  stats?: readonly ManifestoStat[]
}) {
  return (
    <section
      id="manifesto"
      data-nav-dark
      className="dark-sec py-32 md:py-44 px-5 md:px-10 relative overflow-hidden bg-transparent"
    >
      <div className="max-w-[1200px] mx-auto relative z-10 text-center md:text-left">
        <p
          className="text-sm md:text-base font-mono font-semibold tracking-[0.2em] uppercase text-lime mb-10 flex items-center justify-center md:justify-start gap-3"
          data-rv
        >
          <span className="w-10 h-0.5 bg-lime" />
          {label}
        </p>

        <p
          id="mtext"
          className="disp font-medium text-[clamp(1.8rem,4.5vw,3.8rem)] leading-[1.25] tracking-[-.02em] text-paper"
        >
          {textPre}
          <em className="serif-it text-lime">{textEm}</em>
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 pt-10 border-t border-paper/10"
          data-rv
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bento-card p-6 md:p-8 bg-white/[0.04] border border-paper/10 backdrop-blur-md"
            >
              <p className="disp font-semibold text-4xl md:text-6xl tnum text-paper">
                {stat.value}
                <span className="text-lime">{stat.suffix}</span>
              </p>
              <p className="text-xs sm:text-sm font-mono tracking-[0.18em] uppercase text-paper/60 mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
