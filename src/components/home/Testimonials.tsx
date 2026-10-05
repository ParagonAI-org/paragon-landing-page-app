import { TESTIMONIALS, type Testimonial } from '@/lib/home-content'

const VARIANT = {
  ink: 'bg-ink text-paper',
  brand: 'bg-brand-600 text-paper',
  bone: 'bg-bone text-ink',
} as const

function Card({ t }: { t: Testimonial }) {
  const dark = t.variant !== 'bone'
  return (
    <div
      className={`tm-item rounded-3xl p-8 flex flex-col shadow-xl ${VARIANT[t.variant]}`}
    >
      <p className="disp font-semibold text-5xl tnum">
        {t.stat}
        {t.statSuffix && (
          <span
            className={`text-3xl align-top ${t.variant === 'brand' ? 'text-paper' : 'text-lime'}`}
          >
            {t.statSuffix}
          </span>
        )}
      </p>
      <p
        className={`label mt-2 mb-6 ${dark ? (t.variant === 'brand' ? 'text-paper/50' : 'text-paper/35') : 'text-ink/40'}`}
      >
        {t.label}
      </p>
      <p
        className={`leading-relaxed mb-8 ${dark ? (t.variant === 'brand' ? 'text-paper/80' : 'text-paper/70') : 'text-ink/65'}`}
      >
        {t.quote}
      </p>
      <div
        className={`mt-auto flex items-center gap-3 pt-5 border-t ${dark ? (t.variant === 'brand' ? 'border-paper/20' : 'border-paper/10') : 'border-ink/10'}`}
      >
        {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
        <img
          src={t.avatar}
          className="w-10 h-10 rounded-full object-cover"
          alt=""
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p
            className={`text-xs ${dark ? (t.variant === 'brand' ? 'text-paper/50' : 'text-paper/40') : 'text-ink/45'}`}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="py-28 md:py-36 overflow-hidden relative section-zoom"
    >
      <div className="px-5 md:px-10 max-w-[1500px] mx-auto mb-14 flex items-end justify-between relative z-10">
        <h2
          className="disp font-semibold text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95]"
          data-rv
        >
          Clients &amp; learners,
          <br />
          <em className="serif-it font-normal text-brand-600">levelling up.</em>
        </h2>
        <p className="label text-ink/40 hidden md:block" data-rv>
          Auto-scrolling →
        </p>
      </div>

      {/* Rendered three times so the CSS/GSAP marquee loops seamlessly */}
      <div className="mq relative z-10" id="tmMq">
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex gap-6 px-3" aria-hidden={copy > 0}>
            {TESTIMONIALS.map((t) => (
              <Card key={`${copy}-${t.name}`} t={t} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
