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
            <p className="label text-brand-600 mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-600 block" />
              02 — Selected work
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

        <div id="hTrack" className="h-track">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="wcard group"
              data-cursor-text="View"
              data-tilt-3d
            >
              <div className="imgbox">
                {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="flex items-start justify-between mt-5">
                <div>
                  <span className="wtag label text-[10px]! bg-ink text-paper rounded-full px-3 py-1.5 inline-block mb-3">
                    {card.tag}
                  </span>
                  <h3 className="disp font-semibold text-2xl md:text-4xl">
                    {card.title}
                  </h3>
                </div>
                <p className="text-ink/45 text-sm max-w-[240px] hidden md:block">
                  {card.copy}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
