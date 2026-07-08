import Link from 'next/link'
import { EffectScene } from '@/components/effect-scene'
import PixelBlast from '@/components/PixelBlast'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { getPayload } from '@/lib/payload'

const LEVELUP_URL = 'https://levelup.et'

const Hero = async () => {
  const payload = await getPayload()
  const heroData = await payload.findGlobal({
    slug: 'hero',
  })

  // If the CMS-configured primary button mentions LevelUP, force the link
  // to the external levelup.et site. The label itself is still rendered
  // from the CMS so the wording stays editable.
  const primaryHref = /levelup/i.test(heroData.primaryButtonLabel || '')
    ? LEVELUP_URL
    : heroData.primaryButtonLink

  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Wrapper owns the positioning so Tailwind's `absolute inset-0` isn't
          fighting the component's own `position: relative` from
          .pixel-blast-container. The PixelBlast inside fills the wrapper
          via its own 100%×100% sizing. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#783ed1"
          patternScale={3}
          patternDensity={1.25}
          pixelSizeJitter={0.5}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={true}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0}
          transparent={false}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-stretch lg:gap-14 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <AnimatedShinyText className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Building AI Products for Africa
            </AnimatedShinyText>
          </div>

          <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[78px]">
            {heroData.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
            {heroData.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
            >
              <span>{heroData.primaryButtonLabel}</span>
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <title>Arrow right</title>
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
            <Link
              href={heroData.secondaryButtonLink}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              {heroData.secondaryButtonLabel}
            </Link>
          </div>

          <div className="mt-12 grid gap-4 text-sm text-white/60 sm:grid-cols-3">
            {/* Product Metric */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Product
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  1
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                AI product launched
              </p>
            </div>

            {/* Focus Metric */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Focus
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Africa
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Designed for African learners and businesses
              </p>
            </div>

            {/* Vision Metric */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Vision
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Long-term
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Building AI infrastructure for the continent
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Trusted by teams building what&apos;s next
            </p>
            <div className="flex flex-wrap items-center gap-8 opacity-45 transition-opacity hover:opacity-65">
              {['Google', 'Uber', 'Stanford', 'Google', 'Uber', 'Stanford'].map(
                (brand, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-1.5 grayscale"
                  >
                    {brand === 'Stanford' && (
                      <div className="h-3 w-3 border-2 border-current" />
                    )}
                    <span className="text-xl font-black tracking-tighter">
                      {brand}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Right column stretches to match the text column on lg via items-stretch.
            min-h on mobile keeps the EffectScene from collapsing. */}
        <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-visible sm:min-h-[420px] lg:min-h-0">
          <div className="relative h-full w-full">
            <EffectScene />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
