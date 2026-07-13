import type { CollectionConfig } from 'payload'

/**
 * Dedicated legal collection. Slugs are normalized so the frontend
 * can map "/privacy" -> "privacy-policy" and "/terms" -> "terms-of-service".
 */
export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: {
    singular: 'Legal Document',
    plural: 'Legal',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Legal',
    defaultColumns: ['title', 'type', 'slug', 'effectiveDate'],
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
            body: JSON.stringify({ tag: 'legal' }),
          })
        } catch (err) {
          console.error('Error revalidating legal pages:', err)
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
      name: 'label',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Small text shown above the title (e.g., "IP Protection", "Legal Ecosystem").',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Use "privacy-policy", "terms-of-service", or "copyright".',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Privacy Policy', value: 'privacy-policy' },
        { label: 'Terms of Service', value: 'terms-of-service' },
        { label: 'Copyright & IP', value: 'copyright' },
        { label: 'Cookie Policy', value: 'cookie-policy' },
        { label: 'Acceptable Use', value: 'acceptable-use' },
        { label: 'Data Processing', value: 'data-processing' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Optional short summary shown above the body.',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      admin: {
        description: 'Lead paragraphs shown at the top of the content area.',
      },
    },
    {
      name: 'tableOfContents',
      type: 'array',
      labels: {
        singular: 'TOC Item',
        plural: 'Table of Contents',
      },
      admin: {
        description: 'Sidebar navigation links. Anchor should match the section ID in the content.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Display text (e.g., "1. Ownership of Assets").',
          },
        },
        {
          name: 'anchor',
          type: 'text',
          required: true,
          admin: {
            description: 'URL anchor without the # (e.g., "ownership").',
          },
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      admin: {
        description: 'Structured content sections. Each section appears as a separate block with a heading.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Section heading (e.g., "1. Ownership of Assets").',
          },
        },
        {
          name: 'anchor',
          type: 'text',
          admin: {
            description: 'URL anchor without the #. Leave empty to auto-generate from title.',
          },
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Optional fallback content. Used if no sections are defined.',
      },
    },
    {
      name: 'effectiveDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When this version became effective.',
      },
      defaultValue: () => new Date(),
    },
  ],
}
