import Link from 'next/link'
import PageHeader from '@/components/site/PageHeader'
import { createPageMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'About',
    path: '/about',
  })
}

const VALUES = [
  {
    num: '01 / Rigor',
    title: 'Precision First',
    copy: 'We test against real curricula, real devices and real classrooms before calling something done.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    num: '02 / Edge AI',
    title: 'Low-Bandwidth First',
    copy: 'Products should work on the phones and connections people actually have — not just the best case.',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    num: '03 / Inclusion',
    title: 'Multilingual First',
    copy: 'Local languages are part of the product, not a translation layer added at the end.',
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
      <PageHeader
        eyebrow="Company & Vision"
        title={
          <>
            Engineering
            <br />
            Africa&apos;s Next
            <br />
            <span className="serif-it font-normal text-brand-600">
              AI Chapter.
            </span>
          </>
        }
        lede="Paragon AI is a small software and app studio in Addis Ababa, building AI products and digital experiences for the realities of the continent."
      >
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
      </PageHeader>

      {/* Mission & Origin */}
      <section
        id="mission"
        className="py-16 md:py-24 lg:py-32 relative z-10 border-t border-ink/10"
      >
        <div className="max-w-[1300px] mx-auto px-5 md:px-10">
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
                Most AI products are designed elsewhere, for other contexts. We
                build from Addis Ababa — starting with the schools, devices and
                languages people actually use here, and holding the work to a
                high standard.
              </p>
            </div>

            {/* Home base */}
            <div className="lg:col-span-6 mt-8 lg:mt-0">
              <div className="border-t border-ink/15 pt-6">
                <p className="label text-ink/35">Home base</p>
                <p className="disp font-semibold text-4xl sm:text-5xl md:text-6xl leading-[.95] tracking-[-.03em] mt-4">
                  Addis Ababa,
                  <br />
                  Ethiopia.
                </p>
                <p className="mt-5 max-w-sm text-sm md:text-base text-ink/55 leading-relaxed">
                  Building from here, for here — with global standards in mind
                  and a long-term view of what African software can be.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-14 md:py-20 relative z-10 border-t border-ink/10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10">
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {VALUES.map((value) => (
              <div
                key={value.num}
                className="border-t border-ink/15 pt-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-brand-600 mb-5">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      {value.icon}
                    </svg>
                  </div>
                  <span className="label text-ink/35 mb-2 block">
                    {value.num}
                  </span>
                  <h3 className="disp font-semibold text-xl md:text-2xl text-ink mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-ink/55 leading-relaxed">
                    {value.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 relative z-10 border-t border-ink/10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 text-center relative z-10">
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
