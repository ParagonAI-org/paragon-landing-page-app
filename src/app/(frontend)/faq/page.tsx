import Link from 'next/link'
import PageHeader from '@/components/site/PageHeader'
import { getCachedFaqs } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Faq } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Find answers to frequently asked questions about Paragon AI, LevelUP, and our AI products for African education.',
  path: '/faq',
})

const categoryLabels: Record<string, string> = {
  general: 'General',
  'account-billing': 'Account & Billing',
  products: 'Products & Features',
  technical: 'Technical',
  security: 'Security & Privacy',
  support: 'Support',
}

const FAQPage = async () => {
  const result = await getCachedFaqs()
  const faqs = (result?.docs || []) as unknown as Faq[]

  // Group by category while preserving order.
  const grouped = faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    const key = faq.category || 'general'
    if (!acc[key]) acc[key] = []
    acc[key].push(faq)
    return acc
  }, {})

  const orderedKeys = Object.keys(grouped).sort((a, b) => {
    const idxA = Object.keys(categoryLabels).indexOf(a)
    const idxB = Object.keys(categoryLabels).indexOf(b)
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB)
  })

  return (
    <div className="min-h-screen overflow-hidden">
      <PageHeader
        eyebrow="Frequently Asked"
        title={
          <>
            Questions,{' '}
            <span className="serif-it font-normal text-brand-600">
              answered.
            </span>
          </>
        }
        lede="Everything you need to know about Paragon AI. Can't find what you're looking for? Reach out to our team."
      />

      <main className="max-w-[1300px] mx-auto px-5 md:px-10 pb-16 md:pb-24">
        {faqs.length === 0 ? (
          <div className="border-t border-ink/10 py-10 text-sm text-ink/50">
            <p className="font-semibold text-ink">
              We&apos;re updating the FAQ.
            </p>
            <p className="mt-1">
              In the meantime, contact us and we&apos;ll answer directly.
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
            {orderedKeys.map((key) => (
              <section key={key} className="w-full">
                <h2 className="label text-brand-600 mb-3">
                  {categoryLabels[key] || key}
                </h2>

                <div className="border-t border-ink/10">
                  {grouped[key].map((faq) => (
                    <details
                      key={faq.id}
                      className="group border-b border-ink/10 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 transition-colors">
                        <h3 className="text-base md:text-lg font-semibold leading-snug text-ink group-hover:text-brand-600 transition-colors pr-2">
                          {faq.question}
                        </h3>
                        <span className="shrink-0 text-ink/40 transition-transform group-open:rotate-45 group-open:text-brand-600">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <title>Expand</title>
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      <div className="pb-6 text-sm md:text-base leading-relaxed text-ink/60 break-words">
                        <RichTextLite answer={faq.answer} />
                      </div>
                    </details>
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
            Still need help?
          </h2>
          <p className="text-ink/55 mb-7 max-w-lg mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our team is
            happy to help with product, technical or account questions.
          </p>
          <Link href="/contact-us" className="btn btn-ink" data-cursor>
            Contact support
            <span className="fill" />
          </Link>
        </div>
      </section>
    </div>
  )
}

// Lightweight renderer for FAQ answers inside a <details>.
const RichTextLite = ({ answer }: { answer: unknown }) => {
  const nodes = extractText(answer)
  if (!nodes.length) return null
  return (
    <div className="space-y-4">
      {nodes.map((node, i) => (
        <p
          /* biome-ignore lint/suspicious/noArrayIndexKey: static extracted
          paragraphs whose order never changes, so the index is the stable key */
          key={i}
        >
          {node}
        </p>
      ))}
    </div>
  )
}

function extractText(input: unknown): string[] {
  if (!input) return []
  const root = input as { root?: { children?: unknown[] } }
  const children = root?.root?.children || []
  const lines: string[] = []

  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') return n.text
    if (Array.isArray(n.children)) return n.children.map(walk).join('')
    return ''
  }

  for (const child of children) {
    const line = walk(child).trim()
    if (line) lines.push(line)
  }
  return lines
}

export default FAQPage
