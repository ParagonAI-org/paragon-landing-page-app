import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import PageHeader from '@/components/site/PageHeader'
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
      : (page.sections || []).map(
          (section: { title: string; anchor?: string | null }) => ({
            label: section.title,
            anchor: section.anchor || generateAnchor(section.title),
          }),
        )

  const hasSections = page.sections && page.sections.length > 0

  return (
    <div className="min-h-screen text-ink overflow-x-hidden">
      <PageHeader
        eyebrow={page.label || 'Legal'}
        title={page.title}
        lede={
          page.effectiveDate
            ? `Last updated ${new Date(page.effectiveDate).toLocaleDateString(
                'en-US',
                { month: 'long', year: 'numeric' },
              )}`
            : undefined
        }
      />

      {/* Main Legal Content Layout */}
      <section className="pb-20 md:pb-28 relative z-10">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start border-t border-ink/10 pt-10">
            {/* Left: Sticky Table of Contents (Hidden on mobile/tablet) */}
            {tocItems.length > 0 && (
              <div className="hidden lg:block lg:col-span-4 sticky top-32 border-l border-ink/10 pl-5">
                <h3 className="label text-brand-600 mb-4">On this page</h3>
                <nav className="flex flex-col gap-3">
                  {tocItems.map(
                    (
                      item: { label?: string | null; anchor?: string | null },
                      index: number,
                    ) => (
                      <a
                        key={item.anchor || index}
                        href={`#${item.anchor}`}
                        className="text-sm text-ink/55 hover:text-brand-600 transition-colors"
                      >
                        {item.label}
                      </a>
                    ),
                  )}
                </nav>
              </div>
            )}

            {/* Right: Legal Prose */}
            <div
              className={`min-w-0 w-full overflow-hidden reveal opacity-0 translate-y-[20px] transition-all duration-700 delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0 ${
                tocItems.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'
              }`}
            >
              {hasSections ? (
                <div className="space-y-12 md:space-y-16">
                  {/* Intro */}
                  {page.intro && (
                    <div className="prose prose-base md:prose-lg max-w-none">
                      <RichText
                        content={page.intro}
                        className="prose-p:text-ink/70 prose-p:leading-relaxed prose-strong:text-ink"
                      />
                    </div>
                  )}

                  {/* Sections */}
                  <div className="space-y-10 md:space-y-12">
                    {page.sections?.map(
                      (
                        section: {
                          title?: string | null
                          anchor?: string | null
                          content?: DefaultTypedEditorState | null
                        },
                        index: number,
                      ) => {
                        const anchor =
                          section.anchor || generateAnchor(section.title || '')
                        return (
                          <div
                            key={anchor || index}
                            id={anchor}
                            className="scroll-mt-24 md:scroll-mt-32 border-t border-ink/10 pt-8 md:pt-10 group"
                          >
                            <h2 className="font-display text-2xl md:text-3xl text-ink mb-4 md:mb-6 group-hover:text-brand-600 transition-colors">
                              {section.title}
                            </h2>
                            {section.content && (
                              <RichText
                                content={section.content}
                                className="prose prose-base md:prose-lg max-w-none prose-p:text-ink/70 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-li:text-ink/70 prose-strong:text-ink prose-a:text-brand-600 hover:prose-a:underline"
                              />
                            )}
                          </div>
                        )
                      },
                    )}
                  </div>
                </div>
              ) : (
                /* Fallback to legacy structure */
                <div className="prose prose-base md:prose-lg max-w-none">
                  {page.intro && (
                    <RichText
                      content={page.intro}
                      className="prose-p:text-ink/80 prose-p:mb-10"
                    />
                  )}
                  {page.content && (
                    <RichText
                      content={page.content}
                      className="prose-p:text-ink/70 prose-p:leading-relaxed prose-headings:font-display prose-headings:text-ink prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 prose-a:text-brand-600"
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
