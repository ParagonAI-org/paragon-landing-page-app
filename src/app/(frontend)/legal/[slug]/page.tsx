import { notFound } from 'next/navigation'

import RichText from '@/components/RichText'
import { getCachedLegalPage } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { LegalPage } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

// Helper to generate a URL-safe anchor from a title
function generateAnchor(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
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

  // Build the table of contents from the array, or auto-generate from sections
  const tocItems =
    page.tableOfContents && page.tableOfContents.length > 0
      ? page.tableOfContents
      : (page.sections || []).map((section: { title: string; anchor?: string | null }) => ({
          label: section.title,
          anchor: section.anchor || generateAnchor(section.title),
        }))

  // Determine which content to render
  const hasSections = page.sections && page.sections.length > 0

  return (
    <div className="min-h-screen text-white">
      {/* Page Title Header */}
      <section className="relative pt-40 pb-16 overflow-visible z-10 w-full">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-[80%] h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-30 mix-blend-screen rounded-full -rotate-[15deg] w-[600px] h-[250px] bg-accent-secondary -right-[100px] top-[10%]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            {page.label && (
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-6 block">
                {page.label}
              </span>
            )}
            <h1 className="text-5xl md:text-7xl font-display leading-[1.1] tracking-tight mb-6 text-white">
              {page.title}
            </h1>
            {page.effectiveDate && (
              <p className="text-sm font-mono text-dim">
                Last Updated:{' '}
                {new Date(page.effectiveDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Legal Content Layout */}
      <section className="pb-32 relative z-10 bg-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left: Sticky Table of Contents (Desktop Only) */}
            {tocItems.length > 0 && (
              <div className="hidden lg:block lg:col-span-4 sticky top-32 p-8 rounded-3xl bg-surface-2 border border-white/5 reveal opacity-0 transition-all duration-700 ease-out-expo delay-100 [&.visible]:opacity-100">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-6">
                  Document Index
                </h3>
                <nav className="space-y-4 text-sm">
                  {tocItems.map((item: { label?: string | null; anchor?: string | null }, index: number) => (
                    <a
                      key={item.anchor || index}
                      href={`#${item.anchor}`}
                      className={`block transition-colors ${
                        index === 0
                          ? 'text-white hover:text-accent font-medium'
                          : 'text-dim hover:text-accent'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Right: Legal Prose */}
            <div
              className={`space-y-12 text-dim leading-relaxed text-base md:text-lg reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out-expo delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0 ${
                tocItems.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'
              }`}
            >
              {hasSections ? (
                <>
                  {/* Intro */}
                  {page.intro && (
                    <div className="prose prose-invert max-w-none">
                      <RichText
                        content={page.intro}
                        className="prose prose-invert max-w-none prose-p:text-cream/90 prose-p:text-lg prose-p:leading-relaxed"
                      />
                    </div>
                  )}

                  {/* Sections */}
                  {page.sections?.map((section: { title?: string | null; anchor?: string | null; content?: any }, index: number) => {
                    const anchor = section.anchor || generateAnchor(section.title || '')
                    return (
                      <div
                        key={anchor || index}
                        id={anchor}
                        className="scroll-mt-32 border-t border-white/10 pt-8 space-y-4"
                      >
                        <h2 className="font-display text-2xl text-white">
                          {section.title}
                        </h2>
                        {section.content && (
                          <RichText
                            content={section.content}
                            className="prose prose-invert max-w-none prose-p:text-dim prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-li:text-dim prose-strong:text-cream/90 prose-strong:font-semibold"
                          />
                        )}
                      </div>
                    )
                  })}
                </>
              ) : (
                /* Fallback to old content field */
                <div className="prose prose-invert max-w-none">
                  {page.intro && (
                    <RichText
                      content={page.intro}
                      className="prose prose-invert max-w-none prose-p:text-cream/90 prose-p:text-lg"
                    />
                  )}
                  {page.content && (
                    <RichText
                      content={page.content}
                      className="prose prose-invert max-w-none prose-p:text-dim prose-p:leading-relaxed prose-headings:font-display prose-headings:text-white prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LegalPageView
