import Link from 'next/link'
import { HERO, MARQUEE_ITEMS } from '@/lib/home-content'

export type MarqueeItem = { text: string; serif?: boolean; dot?: string }

export default function Hero({
  meta = HERO.meta,
  place = HERO.place,
  copy = HERO.copy,
  image = HERO.image,
  imageAlt = HERO.imageAlt,
  imageCaption = HERO.imageCaption,
  imageTag = HERO.imageTag,
  marquee = MARQUEE_ITEMS,
}: {
  meta?: string
  place?: string
  copy?: string
  image?: string
  imageAlt?: string
  imageCaption?: string
  imageTag?: string
  marquee?: readonly MarqueeItem[]
}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 md:pt-36 pb-14 px-5 md:px-10 flex flex-col"
    >
      <div className="max-w-[1500px] mx-auto w-full">
        <div
          className="flex items-center justify-between mb-8 md:mb-12"
          id="heroMeta"
        >
          <p className="label text-ink/50">{meta}</p>
          <p className="label text-ink/50 hidden sm:block">{place}</p>
        </div>

        <h1 className="disp font-semibold leading-[.92] tracking-[-.04em] text-[clamp(3.2rem,11.5vw,11.5rem)]">
          <span className="hline">
            <span>We build the</span>
          </span>
          <span className="hline">
            <span>
              technology <em className="serif-it font-normal">Africa</em>
            </span>
          </span>
          <span className="hline">
            <span>
              <span className="text-brand-600">runs on</span>
              <span className="text-ink">.</span>
            </span>
          </span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 items-end mt-10 md:mt-16">
          <div className="md:col-span-5" id="heroCopy">
            <p className="text-ink/55 text-base md:text-lg leading-relaxed max-w-md">
              {copy}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/#work" className="btn btn-ink" data-cursor>
                Explore what we build <span className="fill" />
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
              <Link href="/#levelup" className="btn btn-ghost" data-cursor>
                Meet LevelUP <span className="fill" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-7 relative" id="heroImgWrap">
            <div
              className="hero-img relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/9] bg-ink"
              data-prlx
              data-tilt-3d
            >
              {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover scale-110"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 text-paper/90 text-sm font-medium">
                {imageCaption}
              </p>
              <p className="absolute top-5 right-6 label text-[10px]! text-paper/70">
                {imageTag}
              </p>
            </div>

            <div className="hero-badge hidden sm:flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="draw" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="rgba(10,10,15,.25)"
                  strokeWidth="1"
                  pathLength="100"
                />
                <g className="txt">
                  <defs>
                    <path
                      id="hero-badge-circ"
                      d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    fontSize="8.5"
                    letterSpacing="2.2"
                    fill="#0A0A0F"
                    fontWeight="600"
                    fontFamily="Inter"
                  >
                    <textPath href="#hero-badge-circ">
                      SCROLL TO EXPLORE • SCROLL TO EXPLORE •
                    </textPath>
                  </text>
                </g>
                <path
                  d="M45 40l10 10-10 10"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip — rendered twice for the seamless GSAP loop */}
      <div
        id="heroStrip"
        className="mt-14 pt-5 pb-5 overflow-hidden border-t border-ink/5"
      >
        <div className="mq" id="mq1">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center"
              aria-hidden={copy > 0}
            >
              {marquee.map((item) => (
                <span
                  key={`${copy}-${item.text}`}
                  className="flex items-center"
                >
                  <span
                    className={`mq-item disp font-semibold text-2xl md:text-4xl px-6 ${item.serif ? 'serif-it font-normal' : ''}`}
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
