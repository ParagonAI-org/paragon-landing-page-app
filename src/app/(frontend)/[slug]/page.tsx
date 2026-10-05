import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
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
      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-24">
        <div className="reveal opacity-0 translate-y-[20px] transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
          <p className="label text-brand-600 mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-brand-600 block" />
            Page
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight leading-[1.05] mb-12 text-ink">
            {baseTitle}{' '}
            {accentWord ? (
              <em className="serif-it font-normal text-brand-600">
                {accentWord}
              </em>
            ) : null}
          </h1>
        </div>
        <RichText
          content={page.content}
          className="prose prose-base md:prose-lg max-w-none prose-p:text-ink/70 prose-p:leading-relaxed prose-headings:font-display prose-headings:text-ink prose-strong:text-ink prose-li:text-ink/70 prose-a:text-brand-600 hover:prose-a:underline"
        />
      </main>
    </div>
  )
}

export default Page
