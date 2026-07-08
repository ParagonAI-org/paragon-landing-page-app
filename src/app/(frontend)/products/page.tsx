import Link from 'next/link'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { PayloadImage } from '@/components/PayloadImage'
import { getCachedProducts } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Product } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'Products',
  description:
    'Explore the practical AI products and platforms built by Paragon AI for African students, educators, and institutions.',
  path: '/products',
})

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

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="relative max-w-[1200px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
          Products
        </div>

        <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
          Built for the next decade of intelligent systems.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
          Production-grade AI products and research platforms — each engineered
          to move from prototype to deployment without compromise.
        </p>

        {products.length === 0 ? (
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/60">
            <p className="text-lg font-semibold text-white">No products yet</p>
            <p className="mt-2 text-sm">
              Add products in the Payload admin to populate this page.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const logo = product.logo as Media | undefined
              const cover = product.coverImage as Media | undefined
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.05]"
                >
                  {cover?.url ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <PayloadImage
                        media={cover}
                        alt={cover.alt || product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/5 to-white/0">
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
                    </div>
                  )}

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

                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-white group-hover:text-white">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {product.tagline}
                    </p>

                    <div className="mt-6 flex items-center text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                      Explore product
                      <svg
                        className="ml-2 h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <title>Arrow right</title>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ProductsPage
