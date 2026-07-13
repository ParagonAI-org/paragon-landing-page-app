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

  // Pull a small list of other products for a "more from us" rail.
  const allResult = await getCachedProducts()
  const all = (allResult?.docs || []) as unknown as Product[]
  const others = all.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <div className="min-h-screen text-white">
      <main className="relative max-w-[1100px] mx-auto px-6 pt-32 pb-24">
        <Link
          href="/products"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
        >
          <svg
            className="mr-2 h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <title>Back arrow</title>
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          All products
        </Link>

        <header className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr]">
          {logo?.url ? (
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3">
              <PayloadImage
                media={logo}
                alt={logo.alt || product.name}
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-2xl border border-white/10 bg-white/5" />
          )}

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                {product.category}
              </span>
              {product.status === 'coming-soon' && (
                <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                  Coming soon
                </span>
              )}
            </div>
            <h1 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
              {product.tagline}
            </p>

            {product.link ? (
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
              >
                Visit product
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <title>Open external link</title>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ) : null}
          </div>
        </header>

        {cover?.url ? (
          <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-3xl border border-white/10">
            <PayloadImage
              media={cover}
              alt={cover.alt || product.name}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        ) : null}

        <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <RichText
              content={product.description}
              className="prose prose-invert prose-lg max-w-none prose-p:text-white/75 prose-p:leading-relaxed prose-headings:text-white prose-blockquote:border-white"
            />
          </div>

          {product.features && product.features.length > 0 ? (
            <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                Highlights
              </h2>
              <ul className="mt-4 space-y-4">
                {product.features.map((feature) => (
                  <li
                    key={feature.title}
                    className="border-t border-white/5 pt-4 first:border-t-0 first:pt-0"
                  >
                    <p className="text-sm font-bold text-white">
                      {feature.title}
                    </p>
                    {feature.description ? (
                      <p className="mt-1 text-sm leading-6 text-white/55">
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
          <section className="mt-24 border-t border-white/10 pt-16">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                More from ParagonAI
              </h2>
              <Link
                href="/products"
                className="text-sm font-semibold text-white/60 hover:text-white"
              >
                View all →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-white group-hover:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{p.tagline}</p>
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
