import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return createPageMetadata({
    title: "About Paragon AI — Engineering Africa's AI Future",
    path: '/about',
  })
}

const PARTNERS = [
  'Ethiopian AIE',
  'Ethiopian Ministry of Education',
  'UN unipod',
  'GOOGLE',
]

const VALUES = [
  {
    num: '01 / Rigor',
    title: 'Precision First',
    copy: 'In critical domains like education and public systems, accuracy is non-negotiable. We stress-test our models against local benchmarks.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    num: '02 / Edge AI',
    title: 'Low-Bandwidth First',
    copy: 'Powerful intelligence must work in environments with sparse internet connectivity. Our apps utilize quantization and local caching.',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    num: '03 / Inclusion',
    title: 'Multilingual First',
    copy: "Language shouldn't be a gatekeeper to intelligence. We build LLM adapters for Amharic, Swahili, French, and local dialects.",
    icon: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
      </>
    ),
  },
]

const AboutPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden z-10 flex flex-col justify-center pt-36 sm:pt-40 md:pt-44 pb-14 md:pb-20 lg:min-h-[85vh] lg:max-h-[950px]">
        {/* Aurora */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-30 rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-brand-400 -right-[100px] md:-right-[200px] top-[15%] md:top-[20%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-brand-600 -right-[150px] md:-right-[300px] top-[35%] md:top-[40%] animate-drift-2" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-ink/15 text-[10px] uppercase tracking-[0.18em] text-ink/60 font-semibold mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
              Company &amp; Vision
            </div>

            <h1 className="disp font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[.98] md:leading-[.95] tracking-[-.03em] mb-6 md:mb-8 text-ink">
              Engineering
              <br />
              Africa&apos;s Next
              <br />
              <em className="serif-it font-normal text-brand-600">
                AI Chapter
              </em>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-ink/60 max-w-xl mb-8 md:mb-10 leading-relaxed">
              Paragon AI is a product-first intelligence company based in Addis
              Ababa. We build high-performance AI systems tailored for
              high-stakes African challenges.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/products" className="btn btn-ink" data-cursor>
                View Products <span className="fill" />
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
              </Link>
              <a href="#mission" className="btn btn-ghost" data-cursor>
                Our Mission <span className="fill" />
              </a>
            </div>
          </div>
        </div>

        {/* Partner marquee */}
        <div className="relative z-10 w-full mt-14 md:mt-auto pt-8 md:pt-12 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <p className="label text-ink/40 mb-6 md:mb-8 text-center">
            Working with...
          </p>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy > 0}
                  className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 opacity-40"
                >
                  {PARTNERS.map((partner) => (
                    <span
                      key={partner}
                      className="disp font-semibold text-2xl sm:text-3xl md:text-4xl text-ink whitespace-nowrap"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Origin */}
      <section
        id="mission"
        className="py-16 md:py-24 lg:py-32 relative z-10 border-t border-ink/10"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="label text-brand-600 flex items-center gap-3 mb-6 md:mb-8">
                <span className="w-8 h-px bg-brand-600" />
                Our Mission
              </p>
              <blockquote className="disp font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-[-.02em] mb-6 md:mb-8 text-ink">
                <span className="text-ink/45">&ldquo;Building AI that </span>
                <em className="serif-it font-normal text-brand-600">
                  understands
                </em>
                <span className="text-ink/45">
                  {' '}
                  the context it operates in.&rdquo;
                </span>
              </blockquote>
              <p className="text-base sm:text-lg text-ink/60 leading-relaxed mb-8 max-w-xl">
                Global AI models are rarely built with African infrastructures
                or local nuances in mind. We build production-ready systems from
                the ground up—optimized for local languages, offline
                accessibility, and curriculum alignment.
              </p>
              <div className="flex gap-8 md:gap-12 pt-6 border-t border-ink/10">
                <div>
                  <span className="disp font-semibold text-3xl md:text-4xl tnum text-ink block mb-1">
                    54
                  </span>
                  <span className="label text-ink/45">Nations Targeted</span>
                </div>
                <div>
                  <span className="disp font-semibold text-3xl md:text-4xl tnum text-brand-600 block mb-1">
                    10M+
                  </span>
                  <span className="label text-ink/45">Target Students</span>
                </div>
              </div>
            </div>

            {/* HQ card */}
            <div className="lg:col-span-6 mt-8 lg:mt-0">
              <div className="relative overflow-hidden bg-ink text-paper rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl shadow-ink/20 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="aspect-square bg-gradient-to-br from-brand-600/25 via-ink to-ink rounded-xl md:rounded-2xl border border-paper/10 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-brand-500/25 blur-3xl" />
                  </div>
                  <svg
                    className="absolute inset-0 w-full h-full text-paper/[0.04]"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="about-grid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 10 0 L 0 0 0 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#about-grid)" />
                  </svg>
                  <div className="relative z-10 text-center px-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-600/25 border border-brand-400/40 flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl">
                      🇪🇹
                    </div>
                    <h3 className="disp font-semibold text-xl md:text-2xl text-paper mb-2">
                      Addis Ababa, Ethiopia
                    </h3>
                    <p className="label text-[10px]! text-lime">
                      Global Engineering HQ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-12 md:mb-20">
            <div>
              <p className="label text-brand-600 flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-600" />
                Philosophy
              </p>
              <h2 className="disp font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1] tracking-[-.02em] text-ink">
                Engineered with{' '}
                <em className="serif-it font-normal text-brand-600">intent</em>
              </h2>
            </div>
            <p className="text-ink/55 text-sm md:text-base max-w-md">
              Our core principles guide how we train models, construct
              architectures, and deliver user-facing apps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map((value) => (
              <div
                key={value.num}
                className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-bone/70 border border-ink/10 transition-all duration-500 hover:border-brand-400/50 hover:-translate-y-1 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-600/10 border border-brand-400/30 flex items-center justify-center text-brand-600 mb-6 md:mb-8">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      {value.icon}
                    </svg>
                  </div>
                  <span className="label text-brand-600 mb-2 block">
                    {value.num}
                  </span>
                  <h3 className="disp font-semibold text-xl md:text-2xl text-ink mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-ink/60 leading-relaxed">
                    {value.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 lg:py-36 relative z-10 border-t border-ink/10 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-brand-400/20 blur-[80px] md:blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center relative z-10">
          <p className="label text-brand-600 mb-5">Careers &amp; Partnering</p>
          <h2 className="disp font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1] tracking-[-.02em] mb-6 md:mb-8 text-ink">
            Want to build the{' '}
            <em className="serif-it font-normal text-brand-600">future</em> with
            us?
          </h2>
          <p className="text-base sm:text-lg text-ink/60 leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
            We are always searching for world-class engineers, researchers, and
            product designers who want to build transformational technology for
            Africa.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link href="/careers" className="btn btn-ink" data-cursor>
              View open roles <span className="fill" />
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
            </Link>
            <Link href="/contact-us" className="btn btn-ghost" data-cursor>
              Contact founders <span className="fill" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
