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
            {
              name: 'heroEyebrow',
              type: 'text',
              label: 'Masthead eyebrow',
            },
            {
              name: 'heroPlace',
              type: 'text',
              label: 'Place line (top-right of masthead)',
            },
            {
              name: 'heroCopy',
              type: 'textarea',
              label: 'Intro paragraph',
            },
            {
              name: 'heroPrimaryLabel',
              type: 'text',
              label: 'Primary button label',
            },
            {
              name: 'heroPrimaryHref',
              type: 'text',
              label: 'Primary button link',
            },
            {
              name: 'heroSecondaryLabel',
              type: 'text',
              label: 'Secondary button label',
            },
            {
              name: 'heroSecondaryHref',
              type: 'text',
              label: 'Secondary button link',
            },
            {
              name: 'heroStatusPill',
              type: 'text',
              label: 'Status pill (globe stage, top)',
            },
            {
              name: 'heroStatusTag',
              type: 'text',
              label: 'Status tag (globe stage, bottom)',
            },
            {
              name: 'heroDock',
              type: 'array',
              label: 'Bento dock cards',
              maxRows: 3,
              fields: [
                {
                  name: 'theme',
                  type: 'select',
                  required: true,
                  defaultValue: 'lime',
                  options: [
                    { label: 'Lime (booking)', value: 'lime' },
                    { label: 'Ink (scale stat)', value: 'ink' },
                    { label: 'Brand (flagship)', value: 'brand' },
                  ],
                },
                { name: 'label', type: 'text', required: true },
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description:
                      'Lime & brand cards: card headline. Ignored on ink.',
                  },
                },
                { name: 'sub', type: 'textarea' },
                {
                  name: 'stat',
                  type: 'text',
                  admin: {
                    description: 'Ink card only: big stat, e.g. "50".',
                  },
                },
                {
                  name: 'statSuffix',
                  type: 'text',
                  admin: { description: 'Ink card only: e.g. "K+".' },
                },
                {
                  name: 'tag',
                  type: 'text',
                  admin: { description: 'Ink card only: bottom tag.' },
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  admin: {
                    description:
                      'Lime & brand cards: button label. Ignored on ink.',
                  },
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  admin: { description: 'Lime & brand cards: button link.' },
                },
              ],
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
              name: 'levelupImageStat',
              type: 'text',
              label: 'Caption stat on image',
            },
            {
              name: 'levelupChapters',
              type: 'array',
              label: 'Pinned chapters (3)',
              maxRows: 3,
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Chapter eyebrow' },
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea', required: true },
              ],
            },
            {
              name: 'levelupChapterImages',
              type: 'array',
              label: 'Chapter images (swapped per chapter)',
              maxRows: 3,
              fields: [{ name: 'image', type: 'text', label: 'Image URL' }],
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
              maxRows: 4,
              fields: [
                { name: 'num', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea' },
                {
                  name: 'phaseEyebrow',
                  type: 'text',
                  label: 'Phase label',
                  admin: { description: 'e.g. "PHASE 01 // IMMERSION".' },
                },
                {
                  name: 'tagBadge',
                  type: 'text',
                  label: 'Image caption',
                  admin: {
                    description: 'e.g. "USER JOURNEYS & FIELD AUDITS".',
                  },
                },
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
              maxRows: 4,
              fields: [
                { name: 'num', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'copy', type: 'textarea', required: true },
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Footer label',
                  admin: { description: 'e.g. "CO-CREATION".' },
                },
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
              maxRows: 4,
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
            { name: 'wc1Rail', type: 'text', label: 'Studio — rail label' },
            { name: 'wc1Index', type: 'text', label: 'Studio — index' },
            {
              name: 'wc1Scramble',
              type: 'text',
              label: 'Studio — scramble line',
            },
            { name: 'wc1Status', type: 'text', label: 'Studio — status label' },
            { name: 'wc1FootLeft', type: 'text', label: 'Studio — foot left' },
            { name: 'wc1FootMid', type: 'text', label: 'Studio — foot middle' },
            {
              name: 'wc1RightStat',
              type: 'text',
              label: 'Studio — right rail stat',
            },
            { name: 'wc2Rail', type: 'text', label: 'Workshop — rail label' },
            { name: 'wc2Index', type: 'text', label: 'Workshop — index' },
            {
              name: 'wc2Scramble',
              type: 'text',
              label: 'Workshop — scramble line',
            },
            {
              name: 'wc2Status',
              type: 'text',
              label: 'Workshop — status label',
            },
            {
              name: 'wc2FootLeft',
              type: 'text',
              label: 'Workshop — foot left',
            },
            {
              name: 'wc2FootMid',
              type: 'text',
              label: 'Workshop — foot middle',
            },
            {
              name: 'wc2RightStat',
              type: 'text',
              label: 'Workshop — right rail stat',
            },
            { name: 'wc3Rail', type: 'text', label: 'Method — rail label' },
            { name: 'wc3Index', type: 'text', label: 'Method — index' },
            {
              name: 'wc3Scramble',
              type: 'text',
              label: 'Method — scramble line',
            },
            { name: 'wc3Status', type: 'text', label: 'Method — status label' },
            { name: 'wc3FootLeft', type: 'text', label: 'Method — foot left' },
            { name: 'wc3FootMid', type: 'text', label: 'Method — foot middle' },
            {
              name: 'wc3RightStat',
              type: 'text',
              label: 'Method — right rail stat',
            },
            { name: 'wc4Rail', type: 'text', label: 'Voices — rail label' },
            { name: 'wc4Index', type: 'text', label: 'Voices — index' },
            {
              name: 'wc4Scramble',
              type: 'text',
              label: 'Voices — scramble line',
            },
            { name: 'wc4Status', type: 'text', label: 'Voices — status label' },
            { name: 'wc4FootLeft', type: 'text', label: 'Voices — foot left' },
            { name: 'wc4FootMid', type: 'text', label: 'Voices — foot middle' },
            {
              name: 'wc4RightStat',
              type: 'text',
              label: 'Voices — right rail stat',
            },
          ],
        },
      ],
    },
  ],
}
