import type { GlobalConfig } from 'payload'

const revalidateHomepage = async () => {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const secret = process.env.REVALIDATE_SECRET
    if (!siteUrl || !secret) {
      console.error(
        'Revalidation failed: missing NEXT_PUBLIC_SITE_URL or REVALIDATE_SECRET',
      )
      return
    }
    await fetch(`${siteUrl}/api/revalidate?secret=${secret}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: 'homepage' }),
    })
  } catch (err) {
    console.error('Error revalidating homepage:', err)
  }
}

/**
 * Everything rendered on the landing page, editable from the admin.
 * Field shape mirrors src/lib/home-content.ts; the frontend falls back to
 * those constants whenever this global is empty, so the site renders even
 * before this global is filled in.
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Site Config',
    description:
      'Landing page content. Leave a field empty to keep the built-in default.',
  },
  hooks: {
    afterChange: [revalidateHomepage],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------- HERO
        {
          label: 'Hero',
          fields: [
            { name: 'heroMeta', type: 'text', label: 'Meta line (top-left)' },
            {
              name: 'heroPlace',
              type: 'text',
              label: 'Place line (top-right)',
            },
            {
              name: 'heroCopy',
              type: 'textarea',
              label: 'Intro paragraph',
            },
            {
              name: 'heroImage',
              type: 'text',
              label: 'Hero image URL',
              admin: { description: 'Full https:// image URL.' },
            },
            {
              name: 'heroImageAlt',
              type: 'text',
              label: 'Hero image alt text',
            },
            {
              name: 'heroImageCaption',
              type: 'text',
              label: 'Caption on the hero image',
            },
            {
              name: 'heroImageTag',
              type: 'text',
              label: 'Small tag (top-right of image)',
            },
            {
              name: 'marquee',
              type: 'array',
              label: 'Marquee items',
              fields: [
                { name: 'text', type: 'text', required: true },
                {
                  name: 'style',
                  type: 'select',
                  options: [
                    { label: 'Display (uppercase)', value: 'display' },
                    { label: 'Serif italic', value: 'serif' },
                  ],
                  defaultValue: 'display',
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------ MANIFESTO
        {
          label: 'Manifesto',
          fields: [
            { name: 'manifestoLabel', type: 'text', label: 'Eyebrow label' },
            {
              name: 'manifestoText',
              type: 'textarea',
              label: 'Manifesto text',
              admin: {
                description: 'Shown with the word-by-word scroll reveal.',
              },
            },
            {
              name: 'manifestoEmphasis',
              type: 'text',
              label: 'Emphasized ending (lime italic)',
            },
            {
              name: 'manifestoStats',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'suffix', type: 'text' },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        // ------------------------------------------------------- SERVICES
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea' },
                {
                  name: 'image',
                  type: 'text',
                  label: 'Hover preview image URL',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Link',
                  admin: { description: 'Defaults to /#contact.' },
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------ WORK
        {
          label: 'Work',
          fields: [
            {
              name: 'workCards',
              type: 'array',
              label: 'Horizontal work cards',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'tag', type: 'text' },
                { name: 'copy', type: 'textarea' },
                { name: 'image', type: 'text', label: 'Image URL' },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
        // --------------------------------------------------------- LEVELUP
        {
          label: 'LevelUP story',
          fields: [
            { name: 'levelupLabel', type: 'text', label: 'Eyebrow label' },
            { name: 'levelupImage', type: 'text', label: 'Story image URL' },
            { name: 'levelupImageAlt', type: 'text' },
            {
              name: 'levelupImageTag',
              type: 'text',
              label: 'Caption tag on image',
            },
            {
              name: 'levelupChapters',
              type: 'array',
              label: 'Pinned chapters (3)',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea', required: true },
              ],
            },
            { name: 'levelupCtaLabel', type: 'text', label: 'CTA label' },
            { name: 'levelupCtaHref', type: 'text', label: 'CTA link' },
          ],
        },
        // --------------------------------------------------------- PROCESS
        {
          label: 'Process & stats',
          fields: [
            { name: 'processSub', type: 'textarea', label: 'Section intro' },
            {
              name: 'processSteps',
              type: 'array',
              fields: [
                { name: 'num', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea' },
                { name: 'image', type: 'text', label: 'Image URL' },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Brand-highlighted card',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'bigStats',
              type: 'array',
              label: 'Count-up stats',
              fields: [
                { name: 'value', type: 'number', required: true },
                { name: 'suffix', type: 'text' },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        // ------------------------------------------------------ PRINCIPLES
        {
          label: 'Principles',
          fields: [
            { name: 'principlesSub', type: 'textarea', label: 'Section intro' },
            {
              name: 'principles',
              type: 'array',
              fields: [
                { name: 'num', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea', required: true },
              ],
            },
          ],
        },
        // ---------------------------------------------------- TESTIMONIALS
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                {
                  name: 'stat',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "99.9" or "3×"' },
                },
                {
                  name: 'statSuffix',
                  type: 'text',
                  admin: { description: 'e.g. "%"' },
                },
                { name: 'label', type: 'text', required: true },
                { name: 'quote', type: 'textarea', required: true },
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text' },
                { name: 'avatar', type: 'text', label: 'Avatar image URL' },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Ink (dark)', value: 'ink' },
                    { label: 'Brand (indigo)', value: 'brand' },
                    { label: 'Bone (light)', value: 'bone' },
                  ],
                  defaultValue: 'ink',
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------ WORLD COPY
        {
          label: 'World transitions',
          fields: [
            { name: 'wc1Label', type: 'text', label: 'Studio — eyebrow' },
            {
              name: 'wc1Scramble',
              type: 'text',
              label: 'Studio — scramble line',
            },
            { name: 'wc2Label', type: 'text', label: 'Workshop — eyebrow' },
            {
              name: 'wc2Scramble',
              type: 'text',
              label: 'Workshop — scramble line',
            },
            { name: 'wc3Label', type: 'text', label: 'Method — eyebrow' },
            {
              name: 'wc3Scramble',
              type: 'text',
              label: 'Method — scramble line',
            },
            { name: 'wc4Label', type: 'text', label: 'Voices — eyebrow' },
            {
              name: 'wc4Scramble',
              type: 'text',
              label: 'Voices — scramble line',
            },
          ],
        },
      ],
    },
  ],
}
