import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RichText from '@/components/RichText'
import { getCachedHelpArticle, getCachedHelpArticles } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { HelpArticle } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const article = (await getCachedHelpArticle(slug)) as HelpArticle | null
  if (!article) return { title: 'Article not found | ParagonAI' }
  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/help/${slug}`,
  })
}

const HelpArticlePage = async ({ params }: Args) => {
  const { slug } = await params
  const article = (await getCachedHelpArticle(slug)) as HelpArticle | null

  if (!article) return notFound()

  const allResult = await getCachedHelpArticles()
  const all = (allResult?.docs || []) as unknown as HelpArticle[]
  const related = all
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 4)

  return (
    <div className="min-h-screen text-ink">
      <main className="relative max-w-[900px] mx-auto px-6 pt-32 pb-24">
        <Link
          href="/help"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-ink"
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
          Help center
        </Link>

        <article className="mt-8">
          <p className="label text-brand-600">{article.category}</p>
          <h1 className="disp mt-3 font-semibold text-4xl sm:text-5xl tracking-tight text-ink">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
            {article.summary}
          </p>

          <div className="mt-12 border-t border-ink/10 pt-12">
            <RichText
              content={article.content}
              className="prose prose-lg max-w-none prose-p:text-ink/70 prose-p:leading-relaxed prose-headings:text-ink prose-a:text-brand-600 prose-blockquote:border-brand-400"
            />
          </div>
        </article>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-ink/10 pt-12">
            <h2 className="label text-ink/45">Related articles</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/help/${a.slug}`}
                  className="group rounded-2xl border border-ink/10 bg-bone/70 p-5 transition-all hover:border-brand-400/50 hover:-translate-y-1"
                >
                  <h3 className="text-sm font-bold leading-snug text-ink transition-colors group-hover:text-brand-600">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{a.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-20 border-t border-ink/10 pt-12 text-center">
          <h2 className="disp font-semibold text-2xl md:text-3xl text-ink">
            Still stuck?
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/60">
            If you can&apos;t find the answer you&apos;re looking for, our
            support team is ready to help.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact-us" className="btn btn-ink">
              Contact Support <span className="fill" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HelpArticlePage
