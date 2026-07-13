import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Site Config',
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
            body: JSON.stringify({ tag: 'navigation' }),
          })
        } catch (err) {
          console.error('Error revalidating navigation:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          defaultValue: 'link',
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
        {
          name: 'subItems',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
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
  ],
}
