import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: {
    singular: 'Career',
    plural: 'Careers',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Company',
    defaultColumns: ['title', 'department', 'location', 'type', 'active'],
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
            body: JSON.stringify({ tag: 'careers' }),
          })
        } catch (err) {
          console.error('Error revalidating careers:', err)
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
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Research', value: 'research' },
        { label: 'Product', value: 'product' },
        { label: 'Design', value: 'design' },
        { label: 'Operations', value: 'operations' },
        { label: 'Sales & Marketing', value: 'sales-marketing' },
        { label: 'People & Culture', value: 'people' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Addis Ababa, Ethiopia" or "Remote".',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'full-time',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'One-paragraph teaser shown in the job list.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'requirements',
      type: 'richText',
    },
    {
      name: 'applyLink',
      type: 'text',
      admin: {
        description: 'External ATS / form URL.',
      },
    },
    {
      name: 'salaryRange',
      type: 'text',
      admin: {
        description: 'Optional, e.g. "$120k - $160k".',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide this role from the public list.',
      },
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
