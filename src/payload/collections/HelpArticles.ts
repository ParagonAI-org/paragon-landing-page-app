import type { CollectionConfig } from 'payload'

export const HelpArticles: CollectionConfig = {
  slug: 'help-articles',
  labels: {
    singular: 'Help Center Article',
    plural: 'Help Center',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Support',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
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
            body: JSON.stringify({ tag: 'help' }),
          })
        } catch (err) {
          console.error('Error revalidating help articles:', err)
        }
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Getting Started', value: 'getting-started' },
        { label: 'Account & Profile', value: 'account' },
        { label: 'Billing & Plans', value: 'billing' },
        { label: 'Technical Support', value: 'technical' },
        { label: 'Security', value: 'security' },
        { label: 'Integrations', value: 'integrations' },
        { label: 'Troubleshooting', value: 'troubleshooting' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'text',
      required: true,
      admin: {
        description: 'Short summary shown in lists and search results.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
