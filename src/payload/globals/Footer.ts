import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [
      async () => {
        try {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
          const secret = process.env.REVALIDATE_SECRET
          
          if (!siteUrl) {
            console.error('Revalidation failed: NEXT_PUBLIC_SITE_URL is undefined')
            return
          }
          
          if (!secret) {
            console.error('Revalidation failed: REVALIDATE_SECRET is undefined')
            return
          }
          
          await fetch(
            `${siteUrl}/api/revalidate?secret=${secret}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tag: 'footer' }),
            }
          )
        } catch (err) {
          console.error('Error revalidating footer:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 ParagonAI PBC. Addis Ababa, Ethiopia.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
