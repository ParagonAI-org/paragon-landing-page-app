import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Site Config',
  },
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
      minRows: 1,
      maxRows: 4, // Enforce our 4-column UI
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'e.g., Company, Resources, Legal' }
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'linkType',
              type: 'radio',
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'External URL', value: 'external' }
              ],
              defaultValue: 'internal',
              admin: { layout: 'horizontal' }
            },
            // For External Links (e.g., https://levelup.et)
            {
              name: 'label',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' }
            },
            {
              name: 'url',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' }
            },
            // For Internal Links (Creates inline relationships)
            {
              name: 'reference',
              type: 'relationship',
              relationTo: ['pages', 'posts', 'products', 'legal-pages', 'help-articles'],
              hasMany: false,
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'internal',
                description: 'Select an existing page or click the "+" icon to create a new one right here.'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Paragon AI PLC. Addis Ababa, Ethiopia.',
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
  ]
}
