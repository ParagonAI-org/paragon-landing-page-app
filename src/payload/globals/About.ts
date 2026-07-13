import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Text',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'richText',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'primaryButton',
          label: 'Primary Button',
          type: 'group',
          fields: [
            {
              name: 'text',
              label: 'Button Text',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              label: 'Button Link',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'secondaryButton',
          label: 'Secondary Button',
          type: 'group',
          fields: [
            {
              name: 'text',
              label: 'Button Text',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              label: 'Button Link',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'marquee',
          label: 'Marquee Items',
          type: 'array',
          fields: [
            {
              type: 'text',
              name: 'text',
              label: 'Item',
            },
          ],
        },
      ],
    },
    {
      name: 'mission',
      label: 'Mission Section',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Text',
          type: 'text',
        },
        {
          name: 'quote',
          label: 'Quote',
          type: 'richText',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'stats',
          label: 'Statistics',
          type: 'array',
          fields: [
            {
              type: 'group',
              name: 'stat',
              fields: [
                {
                  name: 'value',
                  label: 'Value',
                  type: 'text',
                },
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          name: 'hq',
          label: 'HQ Info',
          type: 'group',
          fields: [
            {
              name: 'flag',
              label: 'Flag Emoji',
              type: 'text',
            },
            {
              name: 'city',
              label: 'City',
              type: 'text',
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'values',
      label: 'Values Section',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Text',
          type: 'text',
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'items',
          label: 'Values',
          type: 'array',
          fields: [
            {
              type: 'group',
              name: 'value',
              fields: [
                {
                  name: 'icon',
                  label: 'Icon',
                  type: 'text',
                },
                {
                  name: 'number',
                  label: 'Number',
                  type: 'text',
                },
                {
                  name: 'category',
                  label: 'Category',
                  type: 'text',
                },
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'team',
      label: 'Team Section',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Text',
          type: 'text',
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
        },
        {
          name: 'link',
          label: 'CTA Link',
          type: 'group',
          fields: [
            {
              name: 'text',
              label: 'Link Text',
              type: 'text',
            },
            {
              name: 'url',
              label: 'Link URL',
              type: 'text',
            },
          ],
        },
        {
          name: 'members',
          label: 'Team Members',
          type: 'array',
          fields: [
            {
              type: 'group',
              name: 'member',
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'name',
                  label: 'Name',
                  type: 'text',
                },
                {
                  name: 'role',
                  label: 'Role',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      label: 'CTA Section',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Text',
          type: 'text',
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'richText',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'primaryButton',
          label: 'Primary Button',
          type: 'group',
          fields: [
            {
              name: 'text',
              label: 'Button Text',
              type: 'text',
            },
            {
              name: 'link',
              label: 'Button Link',
              type: 'text',
            },
          ],
        },
        {
          name: 'secondaryButton',
          label: 'Secondary Button',
          type: 'group',
          fields: [
            {
              name: 'text',
              label: 'Button Text',
              type: 'text',
            },
            {
              name: 'link',
              label: 'Button Link',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default About
