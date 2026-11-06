import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import PageHeader from '@/components/site/PageHeader'
import { createPageMetadata } from '@/lib/metadata'
import { getPayload } from '@/lib/payload'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload()
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = pages.docs[0]
  if (!page) return {}

  return createPageMetadata({
    title: page.title,
    path: `/${slug}`,
  })
}

const Page = async ({ params }: Args) => {
  const { slug } = await params

  // Exclude some routes if needed, or handle home differently
  if (slug === 'admin' || slug === 'api' || slug === 'graphql') {
    return notFound()
  }

  const payload = await getPayload()
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!pages.docs[0]) {
    return notFound()
  }

  const page = pages.docs[0]

  // Italicize the last word of the title as a serif accent when multi-word
  const titleWords = page.title.trim().split(/\s+/)
  const accentWord = titleWords.length > 1 ? titleWords.pop() : undefined
  const baseTitle = titleWords.join(' ')

  return (
    <div className="min-h-screen text-ink overflow-x-hidden">
      <PageHeader
        eyebrow="Page"
        title={
          <>
            {baseTitle}{' '}
            {accentWord ? (
              <span className="serif-it font-normal text-brand-600">
                {accentWord}
              </span>
            ) : null}
          </>
        }
      />
      <main className="max-w-[1300px] mx-auto px-5 md:px-10 pb-20 md:pb-28">
        <div className="border-t border-ink/10 pt-10">
          <RichText
            content={page.content}
            className="prose prose-base md:prose-lg max-w-none prose-p:text-ink/70 prose-p:leading-relaxed prose-headings:font-display prose-headings:text-ink prose-strong:text-ink prose-li:text-ink/70 prose-a:text-brand-600 hover:prose-a:underline"
          />
        </div>
      </main>
    </div>
  )
}

export default Page
