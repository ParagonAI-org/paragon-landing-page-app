import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'publishedDate'],
  },
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
              body: JSON.stringify({ tag: 'posts' }),
            }
          )
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
        { label: 'Research', value: 'research' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Safety', value: 'safety' },
        { label: 'Company', value: 'company' },
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
