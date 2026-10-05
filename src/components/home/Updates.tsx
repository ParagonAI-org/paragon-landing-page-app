import Link from 'next/link'
import type { UpdateRow } from '@/lib/home-content'

export default function Updates({ updates }: { updates: UpdateRow[] }) {
  return (
    <section
      id="insights"
      className="pb-32 md:pb-44 px-5 md:px-10 relative section-zoom"
    >
      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex items-end justify-between mb-12">
          <h2
            className="disp font-semibold text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95]"
            data-rv
          >
            News &amp;{' '}
            <em className="serif-it font-normal text-brand-600">notes.</em>
          </h2>
          <Link
            href="/blog"
            className="btn btn-ghost hidden md:inline-flex"
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
              className="up-row"
              data-img={row.image}
              data-cursor-text="Read"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="label text-[10px]! bg-ink text-paper rounded-full px-3 py-1.5">
                    {row.tag}
                  </span>
                  <span className="label text-ink/35">{row.date}</span>
                </div>
                <h3 className="disp font-semibold text-xl md:text-3xl tracking-tight">
                  {row.title}
                </h3>
              </div>
              <svg
                className="w-5 h-5 text-ink/40"
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
