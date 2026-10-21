import Link from 'next/link'
import { LEVELUP } from '@/lib/home-content'

export type LevelUpChapter = { title: string; copy: string; eyebrow?: string }

export default function LevelUp({
  label = LEVELUP.label,
  image = LEVELUP.image,
  imageAlt = LEVELUP.imageAlt,
  imageTag = LEVELUP.imageTag,
  imageStat = LEVELUP.imageStat,
  chapterImages = LEVELUP.chapterImages,
  chapters = LEVELUP.chapters,
  cta = LEVELUP.cta,
  ctaHref = LEVELUP.ctaHref,
}: {
  label?: string
  image?: string
  imageAlt?: string
  imageTag?: string
  imageStat?: string
  chapterImages?: readonly string[]
  chapters?: readonly LevelUpChapter[]
  cta?: string
  ctaHref?: string
}) {
  return (
    <section
      id="levelup"
      data-nav-dark
      className="pt-24 md:pt-0 bg-transparent"
    >
      <div
        id="lvlPin"
        className="md:h-screen md:overflow-hidden px-5 md:px-10 flex items-center"
      >
        <div className="max-w-[1500px] mx-auto w-full grid md:grid-cols-12 gap-8 md:gap-14 items-center py-16 md:py-0">
          {/* Left: Image Chamber (6 cols) */}
          <div className="md:col-span-6 relative order-2 md:order-1">
            <div
              id="lvlImgBox"
              className="bento-card overflow-hidden aspect-[4/5] max-h-[72vh] w-full relative bg-ink border border-white/15"
            >
              {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
              <img
                id="lvlImg"
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-paper">
                <span className="label text-[10px]! text-lime">{imageTag}</span>
                <span className="text-xs font-mono text-white/80">
                  {imageStat}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Story Deck (6 cols) */}
          <div className="md:col-span-6 relative order-1 md:order-2 flex flex-col justify-center">
            <p className="label text-lime mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-lime" />
              {label}
            </p>
            <h2 className="disp font-semibold text-[clamp(2.3rem,4.5vw,4.2rem)] leading-[.98] mb-8 text-white">
              LevelUP.
              <br />
              <em className="serif-it font-normal text-lime">The story.</em>
            </h2>

            <div className="relative md:h-[32vh]" id="lvlChapters">
              {chapters.map((ch, i) => (
                <div
                  key={ch.title}
                  className="lvl-ch"
                  data-ch={i}
                  data-ch-img={chapterImages[i]}
                >
                  <span className="label text-lime/80 mb-2 block font-mono">
                    {ch.eyebrow ?? `0${i + 1} / CHAPTER`}
                  </span>
                  <h3 className="disp font-semibold text-2xl md:text-3xl mb-3 text-white">
                    {ch.title}
                  </h3>
                  <p className="text-white/75 text-base leading-relaxed max-w-md">
                    {ch.copy}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6" id="lvlDots">
              {chapters.map((ch, i) => (
                <span
                  key={ch.title}
                  className={`lvl-dot w-8 h-1.5 rounded-full ${
                    i === 0 ? 'bg-lime' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <Link
              href={ctaHref}
              className="btn btn-lime mt-8 self-start"
              data-cursor
            >
              {cta} <span className="fill" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
