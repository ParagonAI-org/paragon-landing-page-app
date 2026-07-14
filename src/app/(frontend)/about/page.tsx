import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'About Paragon AI — Engineering Africa\'s AI Future',
    path: '/about',
  })
}

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden z-10 flex flex-col justify-center pt-36 sm:pt-40 md:pt-48 pb-16 md:pb-24 lg:min-h-[85vh] lg:max-h-[950px]">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-50 mix-blend-screen rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-[#2563EB] -right-[100px] md:-right-[200px] top-[15%] md:top-[20%] animate-drift-1"></div>
          <div className="absolute blur-[80px] md:blur-[120px] opacity-40 mix-blend-screen rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-[#4F46E5] -right-[150px] md:-right-[300px] top-[35%] md:top-[40%] animate-drift-2"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[9px] md:text-[10px] uppercase tracking-widest text-white font-semibold mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full"></span>
              Company & Vision
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] md:leading-[1] tracking-tight mb-6 md:mb-8 text-white">
              Engineering<br />
              Africa&apos;s Next<br />
              <span className="text-[#818CF8] italic">AI Chapter</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-xl mb-8 md:mb-10 leading-relaxed">
              Paragon AI is a product-first intelligence company based in Addis Ababa. We build high-performance AI systems tailored for high-stakes African challenges.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/#products" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#4F46E5] hover:text-white transition-all text-center">
                View Products
              </Link>
              <a href="#mission" className="w-full sm:w-auto px-8 py-4 border border-white/10 rounded-full font-semibold text-white hover:bg-white/5 transition-all text-center">
                Our Mission
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="relative z-10 w-full mt-16 md:mt-auto pt-8 md:pt-12 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#94A3B8] font-bold mb-6 md:mb-8 text-center opacity-50">
            Working with...
          </p>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <div className="flex w-max animate-scroll">
              <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 opacity-40">
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian AIE</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian Ministry of Education</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">UN unipod</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">GOOGLE</span>
              </div>
              <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 opacity-40">
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian AIE</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian Ministry of Education</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">UN unipod</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">GOOGLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Origin Section */}
      <section id="mission" className="py-16 md:py-24 lg:py-32 bg-[#0B0F1A] text-white relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-6 transition-all duration-900 ease-out-expo" suppressHydrationWarning>
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 md:mb-6 block">Our Mission</span>
              <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight mb-6 md:mb-8">
                <span className="italic text-[#94A3B8]/80">&quot;Building AI that </span>
                <span className="text-[#818CF8] italic">understands</span>
                <span className="italic text-[#94A3B8]/80"> the context it operates in.&quot;</span>
              </blockquote>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8 max-w-xl">
                Global AI models are rarely built with African infrastructures or local nuances in mind. We build production-ready systems from the ground up—optimized for local languages, offline accessibility, and curriculum alignment.
              </p>
              <div className="flex gap-8 md:gap-12 pt-6 border-t border-white/10">
                <div>
                  <span className="font-display text-2xl md:text-3xl text-white block mb-1">54</span>
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#94A3B8]">Nations Targeted</span>
                </div>
                <div>
                  <span className="font-display text-2xl md:text-3xl text-[#818CF8] block mb-1">10M+</span>
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#94A3B8]">Target Students</span>
                </div>
              </div>
            </div>

            {/* HQ Display Card */}
            <div className="lg:col-span-6 transition-all duration-900 ease-out-expo mt-8 lg:mt-0">
              <div className="relative overflow-hidden transition-all duration-500 ease-out-expo bg-[#161B29] border border-white/5 hover:-translate-y-[6px] hover:border-[#818CF8]/30 rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-12">
                <div className="aspect-square bg-gradient-to-br from-[#4F46E5]/20 via-[#0B0F1A] to-[#02040a] rounded-xl md:rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#2563EB]/20 blur-3xl"></div>
                  </div>
                  {/* Subtle Grid Overlay */}
                  <svg className="absolute inset-0 w-full h-full text-white/[0.03]" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="about-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#about-grid)" />
                  </svg>
                  <div className="relative z-10 text-center px-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#4F46E5]/20 border border-[#818CF8]/30 flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl">
                      🇪🇹
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-white mb-2">Addis Ababa, Ethiopia</h3>
                    <p className="font-mono text-[9.5px] md:text-[11px] uppercase tracking-[0.2em] text-[#818CF8]">Global Engineering HQ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy */}
      <section className="py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-12 md:mb-20 transition-all duration-900 ease-out-expo">
            <div>
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-3 md:mb-4 block">Philosophy</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-white">Engineered with intent</h2>
            </div>
            <p className="text-[#94A3B8] text-sm md:text-base max-w-md">Our core principles guide how we train models, construct architectures, and deliver user-facing apps.</p>
          </div>

          {/* 3 Column Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Value 1 */}
            <div className="group transition-all duration-900 ease-out-expo">
              <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-[#161B29] border border-white/5 transition-all duration-500 md:group-hover:border-[#818CF8]/30 md:group-hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#4F46E5]/20 border border-[#4F46E5]/30 flex items-center justify-center text-[#818CF8] mb-6 md:mb-8">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-wider text-[#818CF8] mb-2 block">01 / Rigor</span>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">Precision First</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    In critical domains like education and public systems, accuracy is non-negotiable. We stress-test our models against local benchmarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Value 2 */}
            <div className="group transition-all duration-900 ease-out-expo">
              <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-[#161B29] border border-white/5 transition-all duration-500 md:group-hover:border-[#818CF8]/30 md:group-hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#4F46E5]/20 border border-[#4F46E5]/30 flex items-center justify-center text-[#818CF8] mb-6 md:mb-8">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-wider text-[#818CF8] mb-2 block">02 / Edge AI</span>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">Low-Bandwidth First</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Powerful intelligence must work in environments with sparse internet connectivity. Our apps utilize quantization and local caching.
                  </p>
                </div>
              </div>
            </div>

            {/* Value 3 */}
            <div className="group transition-all duration-900 ease-out-expo">
              <div className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-[#161B29] border border-white/5 transition-all duration-500 md:group-hover:border-[#818CF8]/30 md:group-hover:-translate-y-1 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#4F46E5]/20 border border-[#4F46E5]/30 flex items-center justify-center text-[#818CF8] mb-6 md:mb-8">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>
                      <path d="M3.6 9h16.8M3.6 15h16.8"/>
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-wider text-[#818CF8] mb-2 block">03 / Inclusion</span>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">Multilingual First</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Language shouldn&apos;t be a gatekeeper to intelligence. We build LLM adapters for Amharic, Swahili, French, and local dialects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 lg:py-40 bg-[#0B0F1A] text-white relative z-10 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-[#4F46E5]/20 blur-[80px] md:blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#2563EB]/15 blur-[60px] md:blur-[100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center relative z-10">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#94A3B8] mb-4 md:mb-6 block transition-all duration-900 ease-out-expo">Careers & Partnering</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6 md:mb-8 transition-all duration-900 ease-out-expo">
            Want to build the <span className="italic text-[#818CF8]">future</span> with us?
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto transition-all duration-900 ease-out-expo">
            We are always searching for world-class engineers, researchers, and product designers who want to build transformational technology for Africa.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 transition-all duration-900 ease-out-expo">
            <Link href="/careers" className="bg-[#4F46E5] text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all duration-400 ease-out-expo hover:bg-[#4338CA] hover:-translate-y-[2px] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] px-8 py-4 rounded-full text-sm font-semibold inline-flex justify-center items-center gap-2">
              View open roles
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
            <Link href="/contact-us" className="px-8 py-4 border border-white/15 text-white rounded-full text-sm font-semibold hover:bg-white/5 transition-colors text-center">
              Contact founders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage