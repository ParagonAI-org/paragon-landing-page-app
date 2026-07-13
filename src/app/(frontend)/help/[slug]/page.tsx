import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RichText from '@/components/RichText'
import { getCachedHelpArticle, getCachedHelpArticles } from '@/lib/data'
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
  return {
    title: `${article.title} | ParagonAI Help`,
    description: article.summary,
  }
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
    <div className="min-h-screen text-white">
      <main className="relative max-w-[900px] mx-auto px-6 pt-32 pb-24">
        <Link
          href="/help"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
        >
          <svg
            className="mr-2 h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          Help center
        </Link>

        <article className="mt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
            {article.category}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            {article.summary}
          </p>

          <div className="mt-12 border-t border-white/10 pt-12">
            <RichText
              content={article.content}
              className="prose prose-invert prose-lg max-w-none prose-p:text-white/75 prose-p:leading-relaxed prose-headings:text-white prose-a:text-white prose-blockquote:border-white"
            />
          </div>
        </article>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-white/10 pt-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
              Related articles
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/help/${a.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20"
                >
                  <h3 className="text-sm font-bold leading-snug text-white">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{a.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default HelpArticlePage
