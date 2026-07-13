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
    <div className="min-h-screen text-white">
      <main className="relative max-w-[900px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
          Frequently Asked
        </div>

        <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
          Questions, answered.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
          Everything you need to know about ParagonAI. Can&apos;t find what
          you&apos;re looking for? Reach out to our support team.
        </p>

        {faqs.length === 0 ? (
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/60">
            <p className="text-lg font-semibold text-white">No FAQs yet</p>
            <p className="mt-2 text-sm">
              Add entries in the Payload admin to populate this page.
            </p>
          </div>
        ) : (
          <div className="mt-16 space-y-16">
            {orderedKeys.map((key) => (
              <section key={key}>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                  {categoryLabels[key] || key}
                </h2>

                <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
                  {grouped[key].map((faq) => (
                    <details
                      key={faq.id}
                      className="group p-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                        <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">
                          {faq.question}
                        </h3>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition-transform group-open:rotate-45">
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <title>Expand</title>
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      <div className="mt-4 text-sm leading-7 text-white/65">
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
    </div>
  )
}

// Lightweight renderer for FAQ answers inside a <details>.
// We avoid pulling the heavy <RichText> client component here since
// answers tend to be short and the FAQ list is server-rendered.
const RichTextLite = ({ answer }: { answer: unknown }) => {
  const nodes = extractText(answer)
  if (!nodes.length) return null
  return (
    <>
      {nodes.map((node) => (
        <p key={node} className="mt-2 first:mt-0">
          {node}
        </p>
      ))}
    </>
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
