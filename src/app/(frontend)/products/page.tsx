import Image from 'next/image'
import Link from 'next/link'
import { PayloadImage } from '@/components/PayloadImage'
import PageHeader from '@/components/site/PageHeader'
import { getCachedProducts } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Product } from '@/payload-types'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'Products',
    description:
      'AI products and software built from Addis Ababa — starting with LevelUP, a learning companion for Ethiopian students.',
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

const PRINCIPLES = [
  {
    num: '01',
    title: 'Grounded',
    copy: 'Knowledge bases are tied to real curricula and real workflows — not generic model output.',
  },
  {
    num: '02',
    title: 'Local by default',
    copy: 'Built for local languages, low-end devices, intermittent connectivity and how people actually live.',
  },
  {
    num: '03',
    title: 'Useful first',
    copy: 'Every product starts from a concrete problem, ships small, and improves with real use.',
  },
]

const ProductsPage = async () => {
  const result = await getCachedProducts().catch(() => null)
  const products = (result?.docs || []) as unknown as Product[]

  const levelupProduct = products.find(
    (p) => p.slug === 'levelup' || p.name.toLowerCase().includes('levelup'),
  )
  const otherProducts = products.filter((p) => p !== levelupProduct)
  const levelupStatus =
    levelupProduct?.status === 'coming-soon'
      ? 'Coming soon'
      : levelupProduct?.status === 'archived'
        ? 'Archived'
        : 'Active'
  const levelupHref = levelupProduct
    ? `/products/${levelupProduct.slug}`
    : '/products/levelup'

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={
          <>
            Software and AI products
            <br />
            <span className="serif-it font-normal text-brand-600">
              built from Addis Ababa.
            </span>
          </>
        }
        lede="We build focused products for real problems. LevelUP is our flagship — an AI learning companion for Ethiopian students."
      >
        <div className="flex flex-wrap gap-3">
          <Link href={levelupHref} className="btn btn-ink" data-cursor>
            Explore LevelUP <span className="fill" />
          </Link>
          <Link href="/contact-us" className="btn btn-ghost" data-cursor>
            Get in touch <span className="fill" />
          </Link>
        </div>
      </PageHeader>

      {/* Flagship product */}
      <section className="border-t border-ink/10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <p className="label text-brand-600">Flagship product</p>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/assets/levelup-icon.png"
                alt=""
                width={44}
                height={44}
                className="rounded-[10px] ring-1 ring-ink/10"
              />
              <h2 className="disp font-semibold text-4xl md:text-6xl leading-[.95] tracking-[-.03em]">
                LevelUP
              </h2>
            </div>
            <p className="mt-5 max-w-xl text-base md:text-lg text-ink/60 leading-relaxed">
              An AI-powered test-prep and learning companion built around
              Ethiopian curricula, past exam questions and personalised
              explanations — designed for the devices and connections students
              actually have.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={levelupHref} className="btn btn-ink" data-cursor>
                Explore LevelUP <span className="fill" />
              </Link>
              <Link href="/contact-us" className="btn btn-ghost" data-cursor>
                Talk to us <span className="fill" />
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-5 mt-10 pt-6 border-t border-ink/10">
              <div>
                <dt className="label text-ink/40">Focus</dt>
                <dd className="disp font-semibold text-sm mt-2">Education</dd>
              </div>
              <div>
                <dt className="label text-ink/40">Market</dt>
                <dd className="disp font-semibold text-sm mt-2">Ethiopia</dd>
              </div>
              <div>
                <dt className="label text-ink/40">Status</dt>
                <dd className="disp font-semibold text-sm mt-2">
                  {levelupStatus}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-[260px] sm:w-[320px] overflow-hidden rounded-[2rem] border border-ink/10 bg-ink shadow-sm">
              <Image
                src="/assets/screenshot-1.png"
                alt="LevelUP app screenshot"
                width={320}
                height={676}
                sizes="(max-width: 640px) 260px, 320px"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other products */}
      {otherProducts.length > 0 ? (
        <section className="border-t border-ink/10">
          <div className="max-w-[1300px] mx-auto px-5 md:px-10 py-14 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div>
                <p className="label text-brand-600">Portfolio</p>
                <h2 className="disp font-semibold text-3xl md:text-5xl leading-[.95] tracking-[-.03em] mt-4">
                  More products.
                </h2>
              </div>
              <p className="text-sm text-ink/50 max-w-sm">
                We ship when something is genuinely useful — not on a launch
                calendar.
              </p>
            </div>

            <div className="mt-10">
              {otherProducts.map((product) => {
                const logo = product.logo as Media | undefined
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group grid grid-cols-1 sm:grid-cols-[64px_1fr_auto] items-center gap-4 border-t border-ink/10 py-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.03]">
                      {logo?.url ? (
                        <PayloadImage
                          media={logo}
                          alt={logo.alt || product.name}
                          width={40}
                          height={40}
                          className="h-9 w-9 object-contain"
                        />
                      ) : (
                        <span className="disp font-semibold text-brand-600">
                          {product.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="label text-[10px] text-ink/40">
                        {categoryLabels[product.category] || product.category}
                      </p>
                      <h3 className="disp font-semibold text-lg md:text-xl mt-1 group-hover:text-brand-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-ink/50 mt-1 line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>
                    <span
                      className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/50 group-hover:border-brand-600 group-hover:text-brand-600 transition-colors"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* How we build */}
      <section className="border-t border-ink/10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 py-14 md:py-20">
          <p className="label text-brand-600">How we build</p>
          <h2 className="disp font-semibold text-3xl md:text-5xl leading-[.95] tracking-[-.03em] mt-4">
            Small studio.
            <br />
            <span className="serif-it font-normal text-brand-600">
              Serious software.
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-12">
            {PRINCIPLES.map((principle) => (
              <div key={principle.num} className="border-t border-ink/15 pt-4">
                <span className="label text-ink/35">{principle.num}</span>
                <h3 className="disp font-semibold text-lg md:text-xl mt-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-ink/55 leading-relaxed mt-2">
                  {principle.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-t border-ink/10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 py-10 md:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="disp font-semibold text-2xl md:text-3xl">
            Have a problem worth solving?
          </p>
          <Link href="/contact-us" className="btn btn-ink" data-cursor>
            Get in touch <span className="fill" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default ProductsPage
