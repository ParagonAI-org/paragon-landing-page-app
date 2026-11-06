import { TESTIMONIALS, type Testimonial } from '@/lib/home-content'

const VARIANT = {
  ink: 'bg-ink text-paper',
  brand: 'bg-brand-600 text-paper',
  bone: 'bg-bone text-ink',
} as const

function Card({ t }: { t: Testimonial }) {
  const isBrand = t.variant === 'brand'
  const isBone = t.variant === 'bone'

  return (
    <div
      className={`tm-item bento-card p-8 md:p-10 flex flex-col justify-between shadow-xl w-[420px] shrink-0 ${
        VARIANT[t.variant]
      }`}
    >
      <div>
        <p className="disp font-semibold text-5xl tnum">
          {t.stat}
          {t.statSuffix && (
            <span
              className={`text-3xl align-top ${
                isBrand ? 'text-paper' : isBone ? 'text-brand-600' : 'text-lime'
              }`}
            >
              {t.statSuffix}
            </span>
          )}
        </p>
        <p
          className={`text-xs sm:text-sm font-mono tracking-[0.18em] uppercase mt-2 mb-6 ${
            isBrand
              ? 'text-brand-200/90'
              : isBone
                ? 'text-ink/65'
                : 'text-paper/60'
          }`}
        >
          {t.label}
        </p>
        <p
          className={`leading-relaxed text-base sm:text-lg ${
            isBrand ? 'text-paper/90' : isBone ? 'text-ink/80' : 'text-paper/85'
          }`}
        >
          {t.quote}
        </p>
      </div>

      <div
        className={`flex items-center gap-3 pt-6 mt-6 border-t ${
          isBrand
            ? 'border-paper/20'
            : isBone
              ? 'border-ink/10'
              : 'border-paper/10'
        }`}
      >
        {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
        <img
          src={t.avatar}
          className="w-10 h-10 rounded-full object-cover"
          alt={t.name}
          loading="lazy"
        />
        <div>
          <p className="text-base font-semibold">{t.name}</p>
          <p
            className={`text-xs sm:text-sm ${
              isBrand
                ? 'text-paper/70'
                : isBone
                  ? 'text-ink/60'
                  : 'text-paper/60'
            }`}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials({
  testimonials = TESTIMONIALS,
}: {
  testimonials?: readonly Testimonial[]
}) {
  return (
    <section
      id="stories"
      className="dark-sec py-28 md:py-36 overflow-hidden relative"
    >
      <div className="px-5 md:px-10 max-w-[1500px] mx-auto mb-14 flex items-end justify-between relative z-10">
        <div>
          <span className="text-sm md:text-base font-mono font-semibold tracking-[0.2em] uppercase text-brand-600 mb-3 block">
            07 — TESTIMONIALS
          </span>
          <h2
            className="disp font-semibold text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95] text-paper"
            data-rv
          >
            Clients &amp; learners,
            <br />
            <em className="serif-it font-normal text-brand-600">
              levelling up.
            </em>
          </h2>
        </div>
        <p
          className="text-xs sm:text-sm font-mono tracking-[0.18em] uppercase text-paper/50 hidden md:block"
          data-rv
        >
          Auto-scrolling →
        </p>
      </div>

      {/* Rendered three times so the CSS/GSAP marquee loops seamlessly */}
      <div className="mq relative z-10" id="tmMq">
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex gap-6 px-3" aria-hidden={copy > 0}>
            {testimonials.map((t) => (
              <Card key={`${copy}-${t.name}`} t={t} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
