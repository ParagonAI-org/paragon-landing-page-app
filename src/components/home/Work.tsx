import Link from 'next/link'
import { WORK } from '@/lib/home-content'

export type WorkCard = {
  title: string
  tag?: string
  copy?: string
  image: string
  href: string
}

export default function Work({
  cards = WORK.cards,
}: {
  cards?: readonly WorkCard[]
}) {
  return (
    <section id="work" className="relative overflow-hidden">
      <div
        id="hWrap"
        className="h-wrap py-24 md:py-0 md:h-screen flex flex-col md:justify-center relative z-10"
      >
        <div className="px-5 md:px-10 max-w-[1500px] mx-auto w-full flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="label text-brand-600 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-600 block" />
              03 — Selected work
            </p>
            <h2 className="disp font-semibold text-[clamp(2.4rem,6vw,5.5rem)] leading-[.95]">
              {WORK.heading}
              <br />
              <em className="serif-it font-normal text-brand-600">
                {WORK.emphasis}
              </em>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 pb-2">
            <span id="hCount" className="disp text-sm text-ink/40 tnum">
              01 / 05
            </span>
            <div className="w-40 h-px bg-ink/15 overflow-hidden">
              <div id="hProg" className="h-full bg-brand-600 w-0" />
            </div>
          </div>
        </div>

        <div id="hTrack">
          {cards.map((card) => {
            // The design's "Shipped Ledger" full-index card wears the mono
            // chip and the larger lead copy (new-design.html:672-688).
            const isLedger = card.title === 'Shipped Ledger'
            return (
              <Link
                key={card.title}
                href={card.href}
                className="wcard group block text-inherit no-underline"
                data-cursor-text="View"
                data-tilt-3d
              >
                <div className="bento-card p-5 bg-bone/80 border border-ink/8 shadow-sm">
                  <div className="relative overflow-hidden rounded-[1.8rem] aspect-[4/3] bg-ink mb-5">
                    {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {card.tag && (
                      <span
                        className={`absolute top-4 left-4 ${
                          isLedger
                            ? 'text-xs font-mono font-semibold tracking-wider'
                            : 'label text-[10px]!'
                        } bg-ink text-paper rounded-full px-3.5 py-1.5`}
                      >
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="disp font-semibold text-2xl md:text-3xl">
                        {card.title}
                      </h3>
                      {card.copy && (
                        <p
                          className={
                            isLedger
                              ? 'text-ink/75 text-base sm:text-lg mt-2 leading-relaxed max-w-sm'
                              : 'text-ink/50 text-sm mt-1 max-w-[280px]'
                          }
                        >
                          {card.copy}
                        </p>
                      )}
                    </div>
                    <span className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-all">
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
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
