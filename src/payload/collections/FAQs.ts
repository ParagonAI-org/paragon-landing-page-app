import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    group: 'Support',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
          const secret = process.env.REVALIDATE_SECRET
          if (!siteUrl || !secret) return
          await fetch(`${siteUrl}/api/revalidate?secret=${secret}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: 'faq' }),
          })
        } catch (err) {
          console.error('Error revalidating faqs:', err)
        }
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Account & Billing', value: 'account-billing' },
        { label: 'Products & Features', value: 'products' },
        { label: 'Technical', value: 'technical' },
        { label: 'Security & Privacy', value: 'security' },
        { label: 'Support', value: 'support' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first within a category.',
      },
    },
  ],
}
