import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Product',
    defaultColumns: ['name', 'slug', 'category', 'featured', 'updatedAt'],
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
            body: JSON.stringify({ tag: 'products' }),
          })
        } catch (err) {
          console.error('Error revalidating products:', err)
        }
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
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
        description: 'URL segment, e.g. "levelup" => /products/levelup',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'Short one-liner shown on cards.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AI Systems', value: 'ai-systems' },
        { label: 'Robotics', value: 'robotics' },
        { label: 'Infrastructure', value: 'infrastructure' },
        { label: 'Research', value: 'research' },
        { label: 'Developer Tools', value: 'developer-tools' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Square logo or icon for the product.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'External URL (e.g. product website).',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
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
        description: 'Lower numbers appear first.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
