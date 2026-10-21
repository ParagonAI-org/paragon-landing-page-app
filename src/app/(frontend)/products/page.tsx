import Image from 'next/image'
import Link from 'next/link'
import { PayloadImage } from '@/components/PayloadImage'
import { getCachedProducts } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Product } from '@/payload-types'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'LevelUP — AI Socratic Tutor for Africa',
    description:
      'LevelUP is a production-grade AI test prep platform designed for high school students across Africa. Curriculum-aligned, highly localized, and built for low-connectivity environments.',
    path: '/products',
  })
}

const categoryLabels: Record<string, string> = {
  'ai-systems': 'AI Systems',
  robotics: 'Robotics',
  infrastructure: 'Infrastructure',
  research: 'Research',
  'developer-tools': 'Developer Tools',
}

const ProductsPage = async () => {
  const result = await getCachedProducts()
  const products = (result?.docs || []) as unknown as Product[]

  // Find LevelUP product if it exists
  const levelupProduct = products.find(
    (p) => p.slug === 'levelup' || p.name.toLowerCase().includes('levelup'),
  )
  const otherProducts = products.filter((p) => p !== levelupProduct)

  return (
    <>
      {/* Product Hero */}
      <section className="relative w-full overflow-hidden z-10 flex flex-col justify-center pt-36 sm:pt-40 md:pt-48 pb-16 md:pb-24 lg:min-h-[85vh] lg:max-h-[950px]">
        {/* Soft brand glow */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-brand-400 -right-[100px] md:-right-[200px] top-[15%] md:top-[20%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-20 rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-brand-600 -right-[150px] md:-right-[300px] top-[35%] md:top-[40%] animate-drift-2" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Text Detail */}
            <div
              className="lg:col-span-6 max-w-xl reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0"
              suppressHydrationWarning
            >
              <p className="label text-brand-600 flex items-center gap-3 mb-6 md:mb-8">
                <span className="w-8 h-px bg-brand-600" />
                LevelUP v2.0
              </p>

              <h1 className="disp font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] md:leading-[0.95] tracking-tight mb-6 md:mb-8">
                Your Personal
                <br />
                <em className="serif-it font-normal text-brand-600">
                  Socratic
                </em>{' '}
                Tutor.
              </h1>

              <p className="text-lg sm:text-xl text-ink/60 mb-10 md:mb-12 leading-relaxed">
                LevelUP is a production-grade AI test prep platform designed for
                high school students across Africa. Curriculum-aligned, highly
                localized, and built for low-connectivity environments.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                <a
                  href="https://levelup.et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink w-full sm:w-auto !px-9 !py-4 !text-base"
                >
                  Try LevelUP <span className="fill" />
                </a>
              </div>
            </div>

            {/* Samsung Mobile Mockup */}
            <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div className="relative group">
                {/* Device Frame */}
                <div className="relative w-[260px] sm:w-[320px] aspect-[9/19] rounded-[2rem] sm:rounded-[2.5rem] border-[6px] sm:border-[8px] border-ink bg-ink shadow-2xl shadow-brand-600/25 overflow-visible transition-transform duration-700 group-hover:scale-[1.02]">
                  {/* Samsung Hardware Buttons (Power & Volume) */}
                  <div className="absolute -right-[9px] sm:-right-[11px] top-[80px] sm:top-[100px] w-[3px] h-[40px] sm:h-[50px] bg-ink/70 rounded-r-md" />
                  <div className="absolute -right-[9px] sm:-right-[11px] top-[140px] sm:top-[170px] w-[3px] h-[25px] sm:h-[30px] bg-ink/70 rounded-r-md" />

                  {/* Inner Screen Container */}
                  <div className="relative w-full h-full rounded-[1.6rem] sm:rounded-[2.1rem] overflow-hidden bg-ink border border-paper/10">
                    {/* Punch-Hole Camera */}
                    <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#050505] rounded-full z-20 flex items-center justify-center shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#0e0e11] rounded-full" />
                    </div>

                    {/* Screenshot */}
                    <Image
                      src="/assets/screenshot-1.png"
                      alt="LevelUP Mobile App Screenshot"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                      priority
                    />

                    {/* Screen Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
                  </div>
                </div>

                {/* Decorative Bottom Glow */}
                <div className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-3/4 sm:w-2/3 h-8 sm:h-10 bg-brand-600/25 blur-2xl sm:blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="mb-12 md:mb-20 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <p className="label text-brand-600 flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-600" />
              Core Architecture
            </p>
            <h2 className="disp font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-2xl">
              Engineered for <br className="hidden sm:block" />
              real-world{' '}
              <em className="serif-it font-normal text-brand-600">impact.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
            {/* Spec 1 */}
            <div className="group reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div className="text-brand-600 mb-6 md:mb-8">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  role="img"
                  aria-label="Feature icon"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span className="label text-ink/45 mb-3 block">
                01 / Grounding
              </span>
              <h3 className="disp font-semibold text-xl md:text-2xl tracking-tight mb-3 md:mb-4">
                Strict RAG Pipelines
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed">
                Our knowledge bases are rigorously grounded in specific Ministry
                of Education curriculums, virtually eliminating subject-matter
                hallucination during tutoring sessions.
              </p>
            </div>

            {/* Spec 2 */}
            <div className="group reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div className="text-brand-600 mb-6 md:mb-8">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  role="img"
                  aria-label="Feature icon"
                >
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="label text-ink/45 mb-3 block">
                02 / Adaptation
              </span>
              <h3 className="disp font-semibold text-xl md:text-2xl tracking-tight mb-3 md:mb-4">
                Multilingual Routing
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed">
                Seamless language support at the structural level. LevelUP
                processes queries and responds naturally in Amharic, Swahili,
                French, and English without losing technical fidelity.
              </p>
            </div>

            {/* Spec 3 */}
            <div className="group reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div className="text-brand-600 mb-6 md:mb-8">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  role="img"
                  aria-label="Feature icon"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="label text-ink/45 mb-3 block">
                03 / Infrastructure
              </span>
              <h3 className="disp font-semibold text-xl md:text-2xl tracking-tight mb-3 md:mb-4">
                Intermittent Data Engine
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed">
                Built for flaky 3G connections. The client application uses
                intelligent caching and asynchronous polling to ensure learning
                isn&apos;t interrupted by network drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products (if any) */}
      {otherProducts.length > 0 && (
        <section className="py-16 md:py-24 lg:py-32 relative z-10 border-t border-ink/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="mb-12 md:mb-20 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <p className="label text-brand-600 flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-brand-600" />
                Our Portfolio
              </p>
              <h2 className="disp font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-2xl">
                More products{' '}
                <em className="serif-it font-normal text-brand-600">
                  coming soon.
                </em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherProducts.map((product) => {
                const logo = product.logo as Media | undefined
                const cover = product.coverImage as Media | undefined
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-ink/10 bg-bone/70 hover:border-brand-400/50 hover:-translate-y-1 transition-all duration-500 reveal opacity-0 translate-y-[40px] [&.visible]:opacity-100 [&.visible]:translate-y-0"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-bone">
                      {cover?.url ? (
                        <PayloadImage
                          media={cover}
                          alt={cover.alt || product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {logo?.url ? (
                            <PayloadImage
                              media={logo}
                              alt={logo.alt || product.name}
                              width={64}
                              height={64}
                              className="h-14 w-14 md:h-16 md:w-16 opacity-80"
                            />
                          ) : (
                            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl border border-ink/10 bg-paper" />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="flex items-center justify-between">
                        <span className="label text-[10px]! text-ink/45">
                          {categoryLabels[product.category] || product.category}
                        </span>
                        {product.status === 'coming-soon' && (
                          <span className="bg-ink text-paper rounded-full px-2.5 py-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em]">
                            Soon
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 disp font-semibold text-xl md:text-2xl tracking-tight group-hover:text-brand-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-ink/60 line-clamp-3">
                        {product.tagline}
                      </p>
                      <div className="mt-5 md:mt-6 flex items-center text-sm font-semibold text-ink/70 transition-colors group-hover:text-brand-600">
                        Explore product
                        <svg
                          className="ml-2 h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          role="img"
                          aria-label="Open"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        data-nav-dark
        className="bg-ink text-paper relative z-10 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] py-20 md:py-32 lg:py-40"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-600/25 blur-[130px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center relative z-10">
          <p className="label text-lime flex items-center justify-center gap-3 mb-6 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <span className="w-8 h-px bg-lime" />
            Start Now
            <span className="w-8 h-px bg-lime" />
          </p>
          <h2 className="disp font-semibold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 md:mb-8 reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Unlock your{' '}
            <em className="serif-it font-normal text-lime">potential.</em>
          </h2>
          <p className="text-base sm:text-lg text-paper/50 leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Join thousands of students across Africa scoring higher and
            preparing smarter for their national university entrance
            examinations with LevelUP.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-300 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <a
              href="https://levelup.et"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lime !px-9 !py-4 !text-base"
            >
              Try LevelUP <span className="fill" />
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                role="img"
                aria-label="Partner logo"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsPage
