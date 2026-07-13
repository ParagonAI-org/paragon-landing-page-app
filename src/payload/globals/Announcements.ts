import type { GlobalConfig } from 'payload'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
  label: 'Announcements',
  admin: {
    group: 'Promotions',
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
          const secret = process.env.REVALIDATE_SECRET

          if (!siteUrl) {
            console.error(
              'Revalidation failed: NEXT_PUBLIC_SITE_URL is undefined',
            )
            return
          }

          if (!secret) {
            console.error('Revalidation failed: REVALIDATE_SECRET is undefined')
            return
          }

          await fetch(`${siteUrl}/api/revalidate?secret=${secret}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tag: 'announcements' }),
          })
        } catch (err) {
          console.error('Error revalidating announcements:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
