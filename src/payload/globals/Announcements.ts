import type { GlobalConfig } from 'payload'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
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
