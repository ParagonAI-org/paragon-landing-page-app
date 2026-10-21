/**
 * Final content pass for the CMS.
 *
 *   npx tsx scripts/seed-content.ts
 *
 * Idempotent: it replaces placeholder/test entries and fills the gaps that
 * the frontend expects, so the shipped pages never show lorem-ipsum or an
 * empty state that should have real copy.
 */

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { config as dotenvConfig } from 'dotenv'
import type { Faq } from '../src/payload-types'

dotenvConfig({ path: path.resolve(process.cwd(), '.env.local') })

const dirname = path.dirname(fileURLToPath(import.meta.url))

/* -------------------------------------------------------------------------- */
/* lexical rich text helpers                                                   */
/* -------------------------------------------------------------------------- */

type LexicalNode = Record<string, unknown>

const text = (value: string): LexicalNode => ({
  mode: 'normal' as const,
  text: value,
  type: 'text' as const,
  style: '' as const,
  detail: 0 as const,
  format: 0 as const,
  version: 1 as const,
})

const paragraph = (value: string): LexicalNode => ({
  type: 'paragraph' as const,
  format: '' as const,
  indent: 0 as const,
  version: 1 as const,
  children: [text(value)],
  direction: null,
  textStyle: '' as const,
  textFormat: 0 as const,
})

const richText = (paragraphs: string[]): Faq['answer'] =>
  ({
    root: {
      type: 'root' as const,
      format: '' as const,
      indent: 0 as const,
      version: 1 as const,
      children: paragraphs.map(paragraph),
      direction: null,
    },
  }) as unknown as Faq['answer']

/** Flattens a lexical document to plain text (used to spot placeholder copy). */
const richTextToPlainText = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  const root = (value as { root?: { children?: unknown[] } }).root
  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') return n.text
    if (Array.isArray(n.children)) return n.children.map(walk).join(' ')
    return ''
  }
  return (root?.children || []).map(walk).join(' ')
}

/* -------------------------------------------------------------------------- */
/* content                                                                     */
/* -------------------------------------------------------------------------- */

type FaqCategory =
  | 'general'
  | 'account-billing'
  | 'products'
  | 'technical'
  | 'security'
  | 'support'

const FAQS: Array<{
  question: string
  answer: string[]
  category: FaqCategory
  order: number
}> = [
  {
    question: 'What is Paragon AI?',
    answer: [
      'Paragon AI is a product-first artificial intelligence company based in Addis Ababa, Ethiopia. We build high-performance AI systems for African markets — from learning platforms used in schools across the continent to the infrastructure that makes them possible.',
      'Our work is grounded in one idea: infrastructure that is built for the constraints of the markets it serves, not adapted to them after the fact.',
    ],
    category: 'general',
    order: 0,
  },
  {
    question: 'What is LevelUP?',
    answer: [
      'LevelUP is our production-grade AI test preparation platform for high-school students. It is a Socratic tutor rather than a question bank: the model asks, waits, and adjusts instead of revealing answers.',
      'It is curriculum-aligned, multilingual, and designed to run on low-bandwidth and low-memory devices so it works on the phones students already own.',
    ],
    category: 'products',
    order: 1,
  },
  {
    question: 'Which countries and curricula does LevelUP support?',
    answer: [
      'LevelUP is built around national exam curricula and is currently used in Ethiopia and Kenya, with further market launches planned across East Africa.',
      'Because the tutor reasons from the syllabus rather than from a fixed content library, it can be adapted to a new curriculum without rebuilding the product.',
    ],
    category: 'products',
    order: 2,
  },
  {
    question: 'Does LevelUP work on low-end devices and weak connections?',
    answer: [
      'Yes. Offline-first behaviour is a hard requirement, not an optimisation: the app is designed for $80 phones and 2G connections, and connection quality is treated as a feature that never blocks learning.',
      'Progress is synced opportunistically, so a session started on a weak connection continues when the network returns.',
    ],
    category: 'technical',
    order: 3,
  },
  {
    question: 'How does Paragon AI handle student data?',
    answer: [
      'We treat data privacy as a foundational human right. Paragon AI maintains a strict security posture to prevent user tracking, and we do not monetise student data — there is no ad model in our products.',
      'Our full policy, including data retention, deletion, and regional data residency, is published on our Privacy Policy page.',
    ],
    category: 'security',
    order: 4,
  },
  {
    question: 'Where is student data stored?',
    answer: [
      'Data is hosted regionally. We keep student information inside the jurisdictions our learners live in, and our systems are architected so that data residency is a deployment decision rather than a retrofit.',
      'Regional data residency is covered in detail in our Privacy Policy.',
    ],
    category: 'security',
    order: 5,
  },
  {
    question: 'How do I get support?',
    answer: [
      'Our support team handles product, technical, and account questions. The fastest route is the Contact Support form on our Help Center, or you can reach us directly through the contact page.',
      'For school and institutional deployments, please mention the institution and cohort so we can route you to the right person.',
    ],
    category: 'support',
    order: 6,
  },
  {
    question: 'How can my school or institution use LevelUP?',
    answer: [
      'LevelUP is licensed for schools and education authorities, with cohort dashboards, curriculum mapping, and teacher reporting.',
      'Tell us about your learners through the contact page and we will set up a pilot for your school.',
    ],
    category: 'account-billing',
    order: 7,
  },
]

const PRODUCT = {
  tagline: 'An AI-powered test prep app for high school students.',
  description: [
    'LevelUP is a production-grade AI test prep platform for high school students across Africa. Curriculum-aligned, highly localized, and built for low-connectivity environments.',
    'Instead of handing over answers, LevelUP acts as a Socratic tutor: it asks, waits, and adjusts, so students build the reasoning behind an answer rather than memorising the answer itself.',
    'The platform runs on the devices students already own — including $80 phones on 2G networks — and adapts to each learner, each syllabus, and each language.',
  ],
  features: [
    {
      title: 'Socratic by design',
      description:
        'The tutor asks guiding questions instead of revealing answers, so every session builds durable reasoning instead of recall.',
    },
    {
      title: 'Curriculum-aligned',
      description:
        'Content is mapped to national exam syllabi, so what a student practises is what they will be examined on.',
    },
    {
      title: 'Built for low bandwidth',
      description:
        'Offline-first architecture keeps sessions running on 2G connections and low-end Android devices, and syncs when the network returns.',
    },
    {
      title: 'Local by default',
      description:
        'Multilingual, regionally hosted, and free of advertising — student data stays in the jurisdictions our learners live in.',
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* runner                                                                      */
/* -------------------------------------------------------------------------- */

async function main() {
  const { getPayload } = await import('payload')
  const { default: payloadConfig } = await import(
    pathToFileURL(path.resolve(dirname, '../payload.config.ts')).href
  )
  const payload = await getPayload({ config: payloadConfig })

  /* ---- FAQs: drop placeholder rows, seed the real set ---- */
  const existingFaqs = await payload.find({
    collection: 'faqs',
    limit: 200,
    depth: 0,
  })
  // Strict: only obvious keyboard-mash / lorem-ipsum placeholders.
  const junkPattern =
    /asdf|fasfasdf|somesfaffd|lorem ipsum|placeholder text|qwerty/i
  const junk = existingFaqs.docs.filter((doc) => {
    const faq = doc as unknown as { question: string; answer?: unknown }
    const haystack = `${faq.question} ${richTextToPlainText(faq.answer)}`
    return junkPattern.test(haystack)
  })
  for (const doc of junk) {
    await payload.delete({ collection: 'faqs', id: doc.id })
    console.log(
      `deleted placeholder FAQ #${doc.id} (${(doc as { question: string }).question})`,
    )
  }

  const remaining = await payload.find({
    collection: 'faqs',
    limit: 200,
    depth: 0,
  })
  for (const faq of FAQS) {
    const match = remaining.docs.find(
      (doc) =>
        (doc as unknown as { question: string }).question === faq.question,
    )
    const data = {
      question: faq.question,
      answer: richText(faq.answer),
      category: faq.category,
      order: faq.order,
    }
    if (match) {
      await payload.update({ collection: 'faqs', id: match.id, data })
      console.log(`updated FAQ: ${faq.question}`)
    } else {
      await payload.create({ collection: 'faqs', data })
      console.log(`created FAQ: ${faq.question}`)
    }
  }

  /* ---- Products: real copy for the product pages ---- */
  const products = await payload.find({
    collection: 'products',
    limit: 50,
    depth: 0,
  })
  for (const doc of products.docs) {
    const product = doc as unknown as {
      id: number
      name: string
      slug: string
      tagline: string
      description?: unknown
      features?: Array<{ title: string; description?: string }>
    }
    const features = product.features || []
    const isLevelUp = product.slug === 'levelup' || product.name === 'LevelUP'
    const tagline = isLevelUp
      ? PRODUCT.tagline
      : product.tagline.replace(/\bai\b/gi, 'AI')
    const description = isLevelUp
      ? richText(PRODUCT.description)
      : product.description
    const nextFeatures = isLevelUp ? PRODUCT.features : features
    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        tagline,
        description: description as never,
        features: nextFeatures as never,
      },
    })
    console.log(`updated product: ${product.name}`)
  }

  /* ---- Navigation: no dead links ---- */
  const nav = await payload.findGlobal({ slug: 'navigation', depth: 0 })
  const navItems = (
    nav as unknown as { items?: Array<Record<string, unknown>> }
  ).items
  if (navItems?.length) {
    const items = navItems.map((item) => {
      const next = { ...item }
      if (next.label === 'Research' && next.link === '/research') {
        next.label = 'Insights'
        next.link = '/blog'
      }
      if (next.label === 'Products' && next.link === '/about') {
        next.link = '/products'
      }
      return next
    })
    await payload.updateGlobal({
      slug: 'navigation',
      data: { items } as never,
    })
    console.log('updated navigation global')
  }

  /* ---- Footer: fix typos in link labels ---- */
  const footer = await payload.findGlobal({ slug: 'footer', depth: 0 })
  const footerData = footer as unknown as {
    columns?: Array<{ title?: string; links?: Array<{ label?: string }> }>
  }
  if (footerData.columns?.length) {
    let changed = false
    const columns = footerData.columns.map((column) => {
      const links = (column.links || []).map((link) => {
        const next = { ...link }
        if (next.label === 'Contatct') {
          next.label = 'Contact'
          changed = true
        }
        if (next.label === 'Research') {
          next.label = 'Insights'
          changed = true
        }
        return next
      })
      return { ...column, links }
    })
    if (changed) {
      await payload.updateGlobal({
        slug: 'footer',
        data: { columns } as never,
      })
      console.log('updated footer global')
    }
  }

  console.log('\nContent pass complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
