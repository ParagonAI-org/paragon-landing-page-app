import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const { tag } = await request.json()

  try {
    if (tag) {
      revalidateTag(tag, { expire: 0 })
    } else {
      revalidateTag('posts', { expire: 0 })
      revalidateTag('navigation', { expire: 0 })
      revalidateTag('footer', { expire: 0 })
      revalidateTag('announcements', { expire: 0 })
      revalidateTag('products', { expire: 0 })
      revalidateTag('help', { expire: 0 })
      revalidateTag('faq', { expire: 0 })
      revalidateTag('careers', { expire: 0 })
      revalidateTag('legal', { expire: 0 })
    }

    // Purge the client-side router cache and layout cache so the UI updates immediately
    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 },
    )
  }
}
