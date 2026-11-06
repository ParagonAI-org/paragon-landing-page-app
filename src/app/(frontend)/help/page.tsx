import Link from 'next/link'
import PageHeader from '@/components/site/PageHeader'
import { getCachedHelpArticles } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { HelpArticle } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'Help Center',
  description:
    'Guides, documentation, and answers for Paragon AI products including LevelUP and our AI learning tools.',
  path: '/help',
})

const categoryLabels: Record<string, string> = {
  'getting-started': 'Getting Started',
  account: 'Account & Profile',
  billing: 'Billing & Plans',
  technical: 'Technical Support',
  security: 'Security',
  integrations: 'Integrations',
  troubleshooting: 'Troubleshooting',
}

const HelpCenterPage = async () => {
  const result = await getCachedHelpArticles()
  const articles = (result?.docs || []) as unknown as HelpArticle[]

  // Group articles by category for sectioned rendering.
  const grouped = articles.reduce<Record<string, HelpArticle[]>>(
    (acc, article) => {
      const key = article.category || 'other'
      if (!acc[key]) acc[key] = []
      acc[key].push(article)
      return acc
    },
    {},
  )

  return (
    <div className="min-h-screen overflow-hidden">
      <PageHeader
        eyebrow="Help Center"
        title={
          <>
            How can we{' '}
            <span className="serif-it font-normal text-brand-600">help?</span>
          </>
        }
        lede="Browse guides and answers for the most common questions across every Paragon AI product."
      />

      <main className="max-w-[1300px] mx-auto px-5 md:px-10 pb-16 md:pb-24">
        {articles.length === 0 ? (
          <div className="border-t border-ink/10 py-10 text-sm text-ink/50">
            <p className="font-semibold text-ink">Guides are on the way.</p>
            <p className="mt-1">
              In the meantime, contact us and we&apos;ll help directly.
            </p>
            <Link
              href="/contact-us"
              className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
            >
              Contact support →
            </Link>
          </div>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category} className="w-full">
                <h2 className="label text-brand-600 mb-3">
                  {categoryLabels[category] || category}
                </h2>

                <div className="border-t border-ink/10">
                  {items.map((article) => (
                    <Link
                      key={article.id}
                      href={`/help/${article.slug}`}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/10 py-5"
                    >
                      <div className="min-w-0">
                        <h3 className="disp font-semibold text-lg md:text-xl leading-tight text-ink group-hover:text-brand-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-ink/50 line-clamp-2">
                          {article.summary}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-ink/30 group-hover:text-brand-600 transition-colors"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer Support CTA */}
      <section className="border-t border-ink/10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 py-10 md:py-14 text-center">
          <h2 className="text-2xl md:text-3xl disp font-semibold text-ink mb-3">
            Still need assistance?
          </h2>
          <p className="text-ink/55 mb-7 max-w-lg mx-auto">
            If you can&apos;t find the answer you&apos;re looking for, our team
            is available to help with technical or account issues.
          </p>
          <Link href="/contact-us" className="btn btn-ghost">
            Contact support <span className="fill" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HelpCenterPage
