import { getPayload } from '@/lib/payload'
import Link from 'next/link'

const Hero = async () => {
  const payload = await getPayload()
  const heroData = await payload.findGlobal({
    slug: 'hero',
  })

  return (
    <section className="relative z-10 px-8 pt-48 pb-20 max-w-[1200px] mx-auto w-full flex flex-col justify-between h-full">
      <div className="max-w-2xl">
        <h1 className="text-[64px] leading-[1.05] font-extrabold tracking-tight text-white mb-8">
          {heroData.title}
        </h1>
        <p className="text-[18px] text-gray-400 mb-10 leading-relaxed max-w-[500px]">
          {heroData.subtitle}
        </p>

        <div className="flex items-center gap-4">
          <Link
            href={heroData.primaryButtonLink}
            className="flex items-center space-x-3 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform cursor-pointer"
          >
            <span>{heroData.primaryButtonLabel}</span>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <title>Arrow right</title>
              <path d="M8 5v14l11-7z" />
            </svg>
          </Link>
          <Link
            href={heroData.secondaryButtonLink}
            className="px-6 py-3 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {heroData.secondaryButtonLabel}
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <p className="text-[10px] font-semibold text-gray-500 mb-6 uppercase tracking-[0.2em]">
          Trusted by 1,000+ marketing companies worldwide
        </p>
        <div className="flex items-center gap-10 opacity-40 hover:opacity-60 transition-opacity flex-wrap">
          {['Google', 'Uber', 'Stanford', 'Google', 'Uber', 'Stanford'].map(
            (brand, i) => (
              <div key={i} className="flex items-center space-x-1.5 grayscale">
                {brand === 'Stanford' && (
                  <div className="w-3 h-3 border-2 border-current"></div>
                )}
                <span className="text-xl font-black tracking-tighter">
                  {brand}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
