import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PayloadImage } from '@/components/PayloadImage'
import RichText from '@/components/RichText'
import { getCachedProduct, getCachedProducts } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Product } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const product = (await getCachedProduct(slug)) as Product | null
  if (!product) {
    return createPageMetadata({
      title: 'Product not found',
      path: `/products/${slug}`,
    })
  }

  return createPageMetadata({
    title: product.name,
    description: product.tagline,
    path: `/products/${slug}`,
  })
}

const ProductDetailPage = async ({ params }: Args) => {
  const { slug } = await params
  const product = (await getCachedProduct(slug)) as Product | null

  if (!product) {
    return notFound()
  }

  const logo = product.logo as Media | undefined
  const cover = product.coverImage as Media | undefined
  const isLevelup =
    product.slug === 'levelup' ||
    product.name.trim().toLowerCase() === 'levelup'

  const allResult = await getCachedProducts().catch(() => null)
  const all = (allResult?.docs || []) as unknown as Product[]
  const others = all.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <div className="pb-16 md:pb-24">
      <main className="relative w-full max-w-[1100px] mx-auto px-5 md:px-10 pt-28 md:pt-36">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-ink"
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          All products
        </Link>

        <header className="mt-8 flex flex-col sm:flex-row items-start gap-6 md:gap-8">
          {logo?.url ? (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.03] p-2.5">
              <PayloadImage
                media={logo}
                alt={logo.alt || product.name}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
          ) : isLevelup ? (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink/10 bg-white p-1.5">
              <Image
                src="/assets/levelup-icon.png"
                alt="LevelUP app icon"
                width={64}
                height={64}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-paper">
              <span className="disp text-2xl font-semibold leading-none">
                {product.name.trim().charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <span className="label text-ink/40">{product.category}</span>
              {product.status === 'coming-soon' ? (
                <span className="label text-brand-600">Coming soon</span>
              ) : null}
            </div>
            <h1 className="disp font-semibold text-[clamp(2.4rem,5vw,4.2rem)] leading-[.95] tracking-[-.03em] mt-3 break-words">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-ink/60">
              {product.tagline}
            </p>

            {product.link ? (
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ink mt-6 w-full sm:w-auto justify-center"
              >
                Visit product
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                <span className="fill" />
              </a>
            ) : null}
          </div>
        </header>

        {cover?.url ? (
          <div className="relative mt-10 md:mt-14 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl bg-ink/[0.03]">
            <PayloadImage
              media={cover}
              alt={cover.alt || product.name}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        ) : null}

        <section className="mt-12 md:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px] items-start border-t border-ink/10 pt-10 md:pt-12">
          <div className="min-w-0 w-full overflow-hidden">
            <RichText
              content={product.description}
              className="prose prose-base md:prose-lg max-w-none break-words prose-p:text-ink/70 prose-p:leading-relaxed prose-headings:text-ink prose-blockquote:border-brand-400 prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-video:max-w-full prose-video:rounded-lg prose-iframe:w-full prose-iframe:aspect-video"
            />
          </div>

          {product.features && product.features.length > 0 ? (
            <aside className="lg:sticky lg:top-28">
              <h2 className="label text-brand-600">Highlights</h2>
              <ul className="mt-4">
                {product.features.map((feature) => (
                  <li
                    key={feature.title}
                    className="border-t border-ink/10 py-4 first:border-t-0 first:pt-0"
                  >
                    <p className="text-sm md:text-base font-semibold text-ink">
                      {feature.title}
                    </p>
                    {feature.description ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                        {feature.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </section>

        {others.length > 0 ? (
          <section className="mt-16 md:mt-24 border-t border-ink/10 pt-8 md:pt-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="disp font-semibold text-xl md:text-2xl">
                More from Paragon AI
              </h2>
              <Link
                href="/products"
                className="text-xs md:text-sm font-semibold text-ink/60 hover:text-ink whitespace-nowrap transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group border-t border-ink/10 pt-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="label text-[10px] text-ink/35">
                      {p.category}
                    </p>
                    <h3 className="mt-2 text-base md:text-lg font-semibold text-ink group-hover:text-brand-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink/50 line-clamp-2">
                      {p.tagline}
                    </p>
                  </div>
                  <span
                    className="mt-1 text-ink/35 group-hover:text-brand-600 transition-colors"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default ProductDetailPage
