import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Insight',
    plural: 'Insights',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'category', 'publishedDate'],
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
            body: JSON.stringify({ tag: 'posts' }),
          })
        } catch (err) {
          console.error('Error revalidating posts:', err)
        }
      },
    ],
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
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Insights', value: 'insights' },
        { label: 'Product Updates', value: 'product-updates' },
        { label: 'Engineering & Tech', value: 'engineering' },
        { label: 'Research', value: 'research' },
        { label: 'Company News', value: 'company' },
        { label: 'Student Success', value: 'student-success' },
        // Legacy categories kept for backward compatibility with existing posts.
        // Safe to remove once all posts are migrated to one of the above.
        { label: 'Safety', value: 'safety' },
        { label: 'Announcements', value: 'announcements' },
      ],
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
