import type { GlobalConfig } from 'payload'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
  hooks: {
    afterChange: [
      async () => {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tag: 'announcements' }),
            }
          )
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
