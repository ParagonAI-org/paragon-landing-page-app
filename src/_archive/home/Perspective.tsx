import { PERSPECTIVE, type PerspectiveItem } from '@/lib/home-content'

/*
 * The voices section, rebuilt from testimonials to company beliefs: the
 * visual language (marquee cards, id="stories", .tm-item/#tmMq hooks the
 * ScrollFx marquee drives) is unchanged. When genuine LevelUP user feedback
 * exists, real words — used with permission — belong here.
 */

const VARIANT = {
  ink: 'bg-ink text-paper',
  brand: 'bg-brand-600 text-paper',
  bone: 'bg-bone text-ink',
} as const

function Card({ item }: { item: PerspectiveItem }) {
  const isBrand = item.variant === 'brand'
  const isBone = item.variant === 'bone'

  return (
    <div
      className={`tm-item bento-card p-8 md:p-10 flex flex-col justify-between shadow-xl w-[420px] shrink-0 min-h-[320px] ${
        VARIANT[item.variant]
      }`}
    >
      <div>
        <p
          className={`text-xs sm:text-sm font-mono tracking-[0.18em] uppercase mb-6 ${
            isBrand ? 'text-brand-200/90' : isBone ? 'text-brand-600' : 'text-lime'
          }`}
        >
          {item.num}
        </p>
        <h3 className="disp font-semibold text-3xl md:text-4xl leading-tight">
          {item.title}
        </h3>
      </div>

      <p
        className={`leading-relaxed text-base sm:text-lg ${
          isBrand ? 'text-paper/90' : isBone ? 'text-ink/80' : 'text-paper/85'
        }`}
      >
        {item.copy}
      </p>
    </div>
  )
}

export default function Perspective({
  items = PERSPECTIVE,
}: {
  items?: readonly PerspectiveItem[]
}) {
  return (
    <section
      id="stories"
      className="dark-sec py-28 md:py-36 overflow-hidden relative"
    >
      <div className="px-5 md:px-10 max-w-[1500px] mx-auto mb-14 flex items-end justify-between relative z-10">
        <div>
          <span className="text-sm md:text-base font-mono font-semibold tracking-[0.2em] uppercase text-brand-600 mb-3 block">
            07 — Our perspective
          </span>
          <h2
            className="disp font-semibold text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95] text-paper"
            data-rv
          >
            Built with ambition,
            <br />
            <em className="serif-it font-normal text-brand-600">
              grounded in reality.
            </em>
          </h2>
        </div>
        <p
          className="text-sm text-paper/50 max-w-xs leading-relaxed hidden md:block"
          data-rv
        >
          We believe Africa should be more than a market for technology built
          elsewhere — we want to help build the products, ideas, and
          intelligent systems that shape what comes next.
        </p>
      </div>

      {/* Rendered three times so the CSS/GSAP marquee loops seamlessly */}
      <div className="mq relative z-10" id="tmMq">
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex gap-6 px-3" aria-hidden={copy > 0}>
            {items.map((item) => (
              <Card key={`${copy}-${item.title}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
