import { notFound } from 'next/navigation'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import RichText from '@/components/RichText'
import { getCachedLegalPage } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { LegalPage } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const page = (await getCachedLegalPage(slug)) as LegalPage | null
  if (!page) {
    return createPageMetadata({
      title: 'Not found',
      path: `/legal/${slug}`,
    })
  }

  return createPageMetadata({
    title: page.title,
    description:
      page.summary ||
      `Read the ${page.title} for Paragon AI products and services.`,
    path: `/legal/${slug}`,
  })
}

const LegalPageView = async ({ params }: Args) => {
  const { slug } = await params
  const page = (await getCachedLegalPage(slug)) as LegalPage | null
  if (!page) return notFound()

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="relative max-w-[860px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
          Legal
        </div>

        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
          {page.title}
        </h1>

        {page.summary ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            {page.summary}
          </p>
        ) : null}

        {page.effectiveDate ? (
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            Effective{' '}
            {new Date(page.effectiveDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        ) : null}

        <div className="mt-12 border-t border-white/10 pt-12">
          <RichText
            content={page.content}
            className="prose prose-invert prose-lg max-w-none prose-p:text-white/75 prose-p:leading-relaxed prose-headings:text-white prose-a:text-white prose-blockquote:border-white"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LegalPageView
