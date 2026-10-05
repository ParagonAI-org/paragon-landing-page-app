import Link from 'next/link'
import { LEVELUP } from '@/lib/home-content'

export default function LevelUp() {
  return (
    <section id="levelup" className="pt-24 md:pt-0 section-zoom">
      <div
        id="lvlPin"
        className="md:h-screen md:overflow-hidden px-5 md:px-10 flex items-center"
      >
        <div className="max-w-[1500px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-0">
          <div className="relative order-2 md:order-1">
            <div
              id="lvlImgBox"
              className="rounded-[2rem] overflow-hidden aspect-[4/5] max-h-[70vh] w-full relative will-change-transform shadow-2xl"
            >
              {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
              <img
                id="lvlImg"
                src={LEVELUP.image}
                alt={LEVELUP.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <p className="absolute bottom-5 left-6 label text-[10px]! text-paper/80">
                {LEVELUP.imageTag}
              </p>
            </div>
          </div>

          <div className="relative order-1 md:order-2 md:h-[60vh]">
            <p className="label text-brand-600 mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-600" />
              {LEVELUP.label}
            </p>
            <h2 className="disp font-semibold text-[clamp(2.3rem,4.5vw,4.2rem)] leading-[.98] mb-8">
              LevelUP.
              <br />
              <em className="serif-it font-normal text-brand-600">
                The story.
              </em>
            </h2>

            <div className="relative md:h-[34vh]" id="lvlChapters">
              {LEVELUP.chapters.map((ch, i) => (
                <div key={ch.title} className="lvl-ch" data-ch={i}>
                  <h3 className="disp font-semibold text-2xl md:text-3xl mb-3">
                    {ch.title}
                  </h3>
                  <p className="text-ink/55 leading-relaxed max-w-md">
                    {ch.copy}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="hidden md:flex items-center gap-2 mt-6"
              id="lvlDots"
            >
              {LEVELUP.chapters.map((ch, i) => (
                <span
                  key={ch.title}
                  className={`lvl-dot w-8 h-1 rounded-full ${i === 0 ? 'bg-brand-600' : 'bg-ink/15'}`}
                />
              ))}
            </div>

            <Link
              href={LEVELUP.ctaHref}
              className="btn btn-ink mt-8 md:mt-10"
              data-cursor
            >
              {LEVELUP.cta} <span className="fill" />
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
          </div>
        </div>
      </div>
    </section>
  )
}
