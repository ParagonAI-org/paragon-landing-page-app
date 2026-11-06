import Link from 'next/link'
import { FALLBACK_UPDATES, type UpdateRow } from '@/lib/home-content'

export default function Updates({
  updates = FALLBACK_UPDATES,
}: {
  updates?: UpdateRow[]
}) {
  return (
    <section
      id="insights"
      data-nav-dark
      className="pb-32 md:pb-44 px-5 md:px-10 relative bg-transparent"
    >
      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm md:text-base font-mono font-semibold tracking-[0.2em] text-lime uppercase mb-3 block">
              08 — DISPATCHES
            </span>
            <h2
              className="disp font-semibold text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95] text-white"
              data-rv
            >
              News &amp;{' '}
              <em className="serif-it font-normal text-lime">notes.</em>
            </h2>
          </div>
          <Link
            href="/#contact"
            className="btn btn-wghost hidden md:inline-flex"
            data-cursor
          >
            See more <span className="fill" />
          </Link>
        </div>

        <div id="upList">
          {updates.map((row) => (
            <Link
              key={row.title}
              href={row.href}
              className="up-row group"
              data-img={row.image}
              data-cursor-text="Read"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-semibold tracking-wider bg-white/10 text-white border border-white/15 rounded-full px-3 py-1">
                    {row.tag}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-wider text-white/60">
                    {row.date}
                  </span>
                </div>
                <h3 className="disp font-semibold text-xl md:text-3xl tracking-tight text-white group-hover:text-lime transition-colors">
                  {row.title}
                </h3>
              </div>
              <svg
                className="w-5 h-5 text-white/50 group-hover:text-lime transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
              <div className="thumb hidden md:block" aria-hidden="true">
                {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
                <img src={row.image} alt="" loading="lazy" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
