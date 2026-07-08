import type { CollectionConfig } from 'payload'

/**
 * Dedicated legal collection. Slugs are normalized so the frontend
 * can map "/privacy" -> "privacy-policy" and "/terms" -> "terms-of-service".
 */
export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Use "privacy-policy" or "terms-of-service".',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Privacy Policy', value: 'privacy-policy' },
        { label: 'Terms of Service', value: 'terms-of-service' },
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
      name: 'content',
      type: 'richText',
      required: true,
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
