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
      className="dark-sec py-32 md:py-44 px-5 md:px-10 relative overflow-hidden section-zoom"
    >
      <div className="max-w-[1100px] mx-auto relative z-10">
        <p className="label text-lime mb-10 flex items-center gap-3" data-rv>
          <span className="w-8 h-px bg-lime" />
          {label}
        </p>
        <p
          id="mtext"
          className="disp font-medium text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[1.25] tracking-[-.02em]"
        >
          {textPre}
          <em className="serif-it text-lime">{textEm}</em>
        </p>
        <div
          className="grid grid-cols-3 gap-6 mt-20 pt-10 border-t border-paper/10"
          data-rv
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="disp font-semibold text-3xl md:text-5xl tnum">
                {stat.value}
                <span className="text-lime">{stat.suffix}</span>
              </p>
              <p className="label text-paper/35 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
