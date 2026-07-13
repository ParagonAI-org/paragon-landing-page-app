import Link from 'next/link'
import Image from 'next/image'
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
  const levelupProduct = products.find(p => p.slug === 'levelup' || p.name.toLowerCase().includes('levelup'))
  const otherProducts = products.filter(p => p !== levelupProduct)

  return (
    <>
      {/* Product Hero */}
      <section className="h-[90vh] min-h-[700px] max-h-[950px] relative flex flex-col justify-center pt-40 pb-20 overflow-visible z-10 w-full">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-50 mix-blend-screen rounded-full -rotate-[15deg] w-[800px] h-[250px] bg-[#2563EB] -right-[200px] top-[20%] animate-drift-1" />
          <div className="absolute blur-[120px] opacity-40 mix-blend-screen rounded-full -rotate-[15deg] w-[900px] h-[300px] bg-[#4F46E5] -right-[300px] top-[40%] animate-drift-2" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Text Detail */}
            <div className="lg:col-span-6 max-w-xl transition-all duration-900 ease-out-expo" suppressHydrationWarning>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-[#818CF8] font-bold mb-8">
                <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full animate-pulse"></span>
                LevelUP v2.0
              </div>

              <h1 className="text-6xl md:text-8xl font-medium leading-[0.95] tracking-tight mb-8 text-white">
                Your Personal<br />
                <span className="text-[#818CF8] italic font-normal">Socratic</span> Tutor.
              </h1>

              <p className="text-xl text-[#94A3B8] mb-12 leading-relaxed font-light">
                LevelUP is a production-grade AI test prep platform designed for high school students across Africa. Curriculum-aligned, highly localized, and built for low-connectivity environments.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <a href="https://levelup.et" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-[#818CF8] hover:text-white transition-all text-center">
                  Try LevelUP
                </a>
              </div>
            </div>

            {/* Samsung Mobile Mockup */}
            <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end transition-all duration-900 ease-out-expo">
              <div className="relative group">
                {/* Device Frame */}
                <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-[#1a1a1f] bg-[#1a1a1f] shadow-2xl shadow-[#4F46E5]/20 overflow-visible transition-transform duration-700 group-hover:scale-[1.02]">
                  
                  {/* Samsung Hardware Buttons (Power & Volume) */}
                  <div className="absolute -right-[11px] top-[100px] w-[3px] h-[50px] bg-[#2a2a35] rounded-r-md border-r border-white/10" />
                  <div className="absolute -right-[11px] top-[170px] w-[3px] h-[30px] bg-[#2a2a35] rounded-r-md border-r border-white/10" />
                  
                  {/* Inner Screen Container */}
                  <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-[#0B0F1A] border border-white/5">
                    
                    {/* Punch-Hole Camera */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050505] rounded-full z-20 flex items-center justify-center shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 bg-[#0e0e11] rounded-full" />
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
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-[#4F46E5]/20 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Technical Specifications */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-20 transition-all duration-900 ease-out-expo">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 block">Core Architecture</span>
            <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-white max-w-2xl">
              Engineered for <br />real-world impact.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
            {/* Spec 1 */}
            <div className="group transition-all duration-900 ease-out-expo">
              <div className="text-[#818CF8] mb-8">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3 block">01 / Grounding</span>
              <h3 className="font-display text-2xl text-white mb-4">Strict RAG Pipelines</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                Our knowledge bases are rigorously grounded in specific Ministry of Education curriculums, virtually eliminating subject-matter hallucination during tutoring sessions.
              </p>
            </div>

            {/* Spec 2 */}
            <div className="group transition-all duration-900 ease-out-expo">
              <div className="text-[#818CF8] mb-8">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3 block">02 / Adaptation</span>
              <h3 className="font-display text-2xl text-white mb-4">Multilingual Routing</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                Seamless language support at the structural level. LevelUP processes queries and responds naturally in Amharic, Swahili, French, and English without losing technical fidelity.
              </p>
            </div>

            {/* Spec 3 */}
            <div className="group transition-all duration-900 ease-out-expo">
              <div className="text-[#818CF8] mb-8">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] mb-3 block">03 / Infrastructure</span>
              <h3 className="font-display text-2xl text-white mb-4">Intermittent Data Engine</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                Built for flaky 3G connections. The client application uses intelligent caching and asynchronous polling to ensure learning isn&apos;t interrupted by network drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Traction / Numerical Milestones
      <section className="py-32 bg-[#0B0F1A]/40 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center divide-x divide-transparent">
            <div className="transition-all duration-900 ease-out-expo">
              <h4 className="text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-4">25k<span className="text-[#818CF8]">+</span></h4>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">Active Students</p>
            </div>
            <div className="transition-all duration-900 ease-out-expo">
              <h4 className="text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-4">1.2M<span className="text-[#818CF8]">+</span></h4>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">Problems Solved</p>
            </div>
            <div className="transition-all duration-900 ease-out-expo">
              <h4 className="text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-4">94<span className="text-[#818CF8]">%</span></h4>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">Socratic Accuracy</p>
            </div>
            <div className="transition-all duration-900 ease-out-expo">
              <h4 className="text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-4">22<span className="text-[#818CF8]">%</span></h4>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8]">Avg. Score Increase</p>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Other Products (if any) */}
      {otherProducts.length > 0 && (
        <section className="py-32 relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-20 transition-all duration-900 ease-out-expo">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 block">Our Portfolio</span>
              <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-white max-w-2xl">
                More products coming soon.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProducts.map((product) => {
                const logo = product.logo as Media | undefined
                const cover = product.coverImage as Media | undefined
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.05] transition-all duration-900 ease-out-expo"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/5 to-white/0">
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
                              className="h-16 w-16 opacity-80"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-2xl border border-white/15 bg-white/5" />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                          {categoryLabels[product.category] || product.category}
                        </span>
                        {product.status === 'coming-soon' && (
                          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                            Soon
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-white group-hover:text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {product.tagline}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                        Explore product
                        <svg className="ml-2 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
      <section className="py-32 lg:py-40 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#94A3B8] mb-6 block transition-all duration-900 ease-out-expo">Start Now</span>
          <h2 className="font-display text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-8 text-white transition-all duration-900 ease-out-expo">
            Unlock your <span className="italic text-[#818CF8] font-normal">potential.</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed font-light mb-12 max-w-2xl mx-auto transition-all duration-900 ease-out-expo">
            Join thousands of students across Africa scoring higher and preparing smarter for their national university entrance examinations with LevelUP.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-900 ease-out-expo">
            <a href="https://levelup.et" target="_blank" rel="noopener noreferrer" className="bg-white text-black transition-all duration-400 ease-out-expo hover:bg-[#818CF8] hover:text-white px-10 py-4 rounded-full font-bold inline-flex items-center gap-3">
              Try LevelUP
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
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