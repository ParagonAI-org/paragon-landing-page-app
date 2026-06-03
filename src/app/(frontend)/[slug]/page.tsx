import { getPayload } from '@/lib/payload'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'

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

  if (!pages.docs[0]) return {}

  const page = pages.docs[0]
  return {
    title: `${page.title} | ParagonAI`,
  }
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

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-8 pt-40 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">{page.title}</h1>
        <RichText 
          content={page.content}
          className="prose prose-invert prose-lg max-w-none"
        />
      </main>
      <Footer />
    </div>
  )
}

export default Page
