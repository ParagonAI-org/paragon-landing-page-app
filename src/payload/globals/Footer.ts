import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [
      async ({ req }) => {
        try {
          const host = req?.headers?.get('host')
          const siteUrl = host
            ? `${host.includes('localhost') ? 'http' : 'https'}://${host}`
            : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
          const secret = process.env.REVALIDATE_SECRET

          if (!secret) {
            console.error('Revalidation failed: REVALIDATE_SECRET is undefined')
            return
          }

          const res = await fetch(
            `${siteUrl}/api/revalidate?secret=${secret}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tag: 'footer' }),
            },
          )

          if (!res.ok) {
            console.error(
              `Revalidation failed with status ${res.status}: ${await res.text()}`,
            )
          }
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
