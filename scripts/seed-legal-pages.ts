import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Helper to create a Lexical text node
const text = (text: string, format: number = 0) => ({
  type: 'text' as const,
  text,
  format,
  style: '',
  mode: 'normal' as const,
  detail: 0,
  version: 1,
})

// Helper to create a Lexical paragraph
const p = (content: string | Array<{ type: string; text: string; format?: number }>) => ({
  type: 'paragraph' as const,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: Array.isArray(content)
    ? content.map((c) => text(c.text, c.format || 0))
    : [text(content)],
})

// Helper to create a Lexical list item
const listItem = (content: string | Array<{ type: string; text: string; format?: number }>) => ({
  type: 'listitem' as const,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  value: 1,
  children: [p(content)],
})

// Helper to create a Lexical list
const list = (items: Array<string | Array<{ type: string; text: string; format?: number }>>, ordered = false) => ({
  type: 'list' as const,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  listType: ordered ? ('number' as const) : ('bullet' as const),
  start: 1,
  tag: ordered ? ('ol' as const) : ('ul' as const),
  children: items.map((item) => listItem(item)),
})

const legalPages = [
  {
    title: 'Privacy Policy',
    label: 'Data Sovereignty',
    slug: 'privacy-policy',
    type: 'privacy-policy' as const,
    effectiveDate: '2026-07-01',
    summary:
      'Our commitment to data privacy, regional data residency, and the protection of student information across East Africa.',
    tableOfContents: [
      { label: '1. Information We Collect', anchor: 'collection' },
      { label: '2. How We Use Information', anchor: 'usage' },
      { label: '3. Data Retention & Deletion', anchor: 'retention' },
      { label: '4. No-Ad Monetization Policy', anchor: 'monetization' },
      { label: '5. System & Data Security', anchor: 'security' },
      { label: '6. Regional Data Residency', anchor: 'residency' },
      { label: '7. Your Sovereign Rights', anchor: 'rights' },
      { label: '8. Contact Information', anchor: 'contact' },
    ],
    intro: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          p(
            "At Paragon AI, we believe data privacy is a foundational human right. Because we build specialized AI systems for educational institutions and young students (such as LevelUP), we maintain a strict security posture to prevent user tracking.",
          ),
          p(
            'This Privacy Policy details the metrics we compile, how we interact with model caches, and how we implement absolute data residency within East Africa.',
          ),
        ],
      },
    },
    sections: [
      {
        title: '1. Information We Collect',
        anchor: 'collection',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'We collect only the minimal data necessary to deliver personalized Socratic learning experiences. This includes:',
              ),
              list([
                'Account Metrics: Phone numbers or emails provided during onboarding to track study statistics across sessions.',
                'Interaction Telemetry: Anonymized transcripts of conversational exchanges with the LevelUP Socratic tutor to evaluate pedagogical reasoning and optimize curriculum grounding.',
                'Performance Data: Aggregate records of successfully completed exam questions, subject progress, and conceptual errors to customize the learning curve.',
              ]),
            ],
          },
        },
      },
      {
        title: '2. How We Use Information',
        anchor: 'usage',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'Collected data is strictly used to run, maintain, and upgrade our educational AI systems. Specifically, user data helps us:',
              ),
              list([
                'Dynamically adapt the LevelUP tutoring flow to your knowledge gaps.',
                'Identify systemic curriculum issues to assist national ministries of education.',
                'Refine localized NLP tokenizers for Amharic, Swahili, and other regional scripts.',
              ]),
            ],
          },
        },
      },
      {
        title: '3. Data Retention & Deletion',
        anchor: 'retention',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'We retain student learning progress records for as long as your account remains active. Students, parents, or guardians may request immediate, permanent erasure of all personal data, conversational transcripts, and phone numbers from our active servers by emailing our support desk or initiating the account deletion button in-app.',
              ),
            ],
          },
        },
      },
      {
        title: '4. No-Ad Monetization Policy',
        anchor: 'monetization',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'Paragon AI enforces an absolute, zero-ad monetization policy. We do not participate in behavioral tracking networks.',
              ),
              p(
                'We never sell, rent, lease, or monetize your educational records, conversation histories, or account info to advertising brokers, third-party analytics networks, or data aggregators.',
              ),
            ],
          },
        },
      },
      {
        title: '5. System & Data Security',
        anchor: 'security',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'All data is encrypted in transit using TLS 1.3 and at rest utilizing AES-256. Access to our model evaluation environments is strictly compartmentalized under zero-trust paradigms, ensuring no third parties can intercept tutoring telemetry or database states.',
              ),
            ],
          },
        },
      },
      {
        title: '6. Regional Data Residency',
        anchor: 'residency',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'To comply with regional data sovereignty frameworks, all customer-facing databases and student records for East African users are hosted locally within secured datacenter infrastructure in Ethiopia and regional hubs. We do not route localized transcripts across international boundaries unnecessarily.',
              ),
            ],
          },
        },
      },
      {
        title: '7. Your Sovereign Rights',
        anchor: 'rights',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'You hold the absolute right to inspect, download, or transfer your entire interaction and score history from LevelUP in standard JSON format. If you believe any model assessment or account information is incorrect, you may request instant modification.',
              ),
            ],
          },
        },
      },
      {
        title: '8. Contact Information',
        anchor: 'contact',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'For inquiries concerning our privacy frameworks, data residency compliance, or to request deletion of student profiles, reach out to our team at:',
              ),
              p('privacy@paragon.ai'),
            ],
          },
        },
      },
    ],
  },
  {
    title: 'Terms of Service',
    label: 'Legal Ecosystem',
    slug: 'terms-of-service',
    type: 'terms-of-service' as const,
    effectiveDate: '2026-07-01',
    summary:
      'The legal terms governing your use of Paragon AI products, services, and the LevelUP platform.',
    tableOfContents: [
      { label: '1. Acceptance of Terms', anchor: 'acceptance' },
      { label: '2. Description of Services', anchor: 'services' },
      { label: '3. Eligibility & Accounts', anchor: 'eligibility' },
      { label: '4. Appropriate Use of AI', anchor: 'ai-conduct' },
      { label: '5. Intellectual Property', anchor: 'intellectual-property' },
      { label: '6. Limitation of Liability', anchor: 'liability' },
      { label: '7. Termination', anchor: 'termination' },
      { label: '8. Governing Law', anchor: 'governing-law' },
    ],
    intro: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          p(
            'Welcome to Paragon AI. These Terms of Service ("Terms") govern your access to and use of our website, platform, application program interfaces (APIs), and LevelUP product family (collectively, our "Services").',
          ),
          p(
            'Please read these Terms carefully before accessing or using our products. By creating an account or accessing any of our platforms, you agree to be bound by these legal rules.',
          ),
        ],
      },
    },
    sections: [
      {
        title: '1. Acceptance of Terms',
        anchor: 'acceptance',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'By accessing or using our Services, you represent that you are at least the age of majority in your jurisdiction, or that you have received parental/guardian consent to use these Services. If you do not agree to all of these Terms, you are prohibited from accessing our systems or utilizing LevelUP.',
              ),
            ],
          },
        },
      },
      {
        title: '2. Description of Services',
        anchor: 'services',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'Paragon AI PLC ("Paragon AI", "we", "us", or "our") designs and builds specialized artificial intelligence solutions, primarily focused on context-aligned educational tutoring (e.g., LevelUP). We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice.',
              ),
            ],
          },
        },
      },
      {
        title: '3. Eligibility & Accounts',
        anchor: 'eligibility',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'To access certain advanced features of LevelUP, you may be required to register for an account using a valid phone number or email address. You are solely responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized access.',
              ),
            ],
          },
        },
      },
      {
        title: '4. Appropriate Use of AI',
        anchor: 'ai-conduct',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'Our generative models and conversational Socratic tutors are built for pedagogical and educational purposes. You agree not to abuse or exploit our systems. Specifically, you agree not to:',
              ),
              list([
                'Decompile, reverse-engineer, or attempt to extract model weights from our platforms.',
                'Use scrapers, spiders, or automated agents to extract textbook and curriculum data.',
                'Bypass conversational guardrails to generate harmful, toxic, or non-educational content.',
                'Inject prompts designed to overwhelm, crash, or intentionally degrade our cloud infrastructure.',
              ]),
            ],
          },
        },
      },
      {
        title: '5. Intellectual Property',
        anchor: 'intellectual-property',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'All software, user interfaces, branding, custom Ge\'ez tokenizers, and proprietary training datasets developed by Paragon AI are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access our platform for personal, non-commercial use.',
              ),
            ],
          },
        },
      },
      {
        title: '6. Limitation of Liability',
        anchor: 'liability',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'While our LevelUP RAG systems are grounded in Ministry of Education standard curricula, generative artificial intelligence remains probabilistic.',
              ),
              p(
                'Our services are provided on an "as-is" basis. Paragon AI does not guarantee specific exam scores, grades, or university placement outcomes. We are not liable for accidental hallucinations, service interruptions, or network dropouts on low-bandwidth connections.',
              ),
            ],
          },
        },
      },
      {
        title: '7. Termination',
        anchor: 'termination',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'We reserve the right to suspend or terminate your access to our products immediately and without prior notice if we determine, in our sole discretion, that you have violated these terms, engaged in model extraction abuse, or presented a security risk to our cloud infrastructure.',
              ),
            ],
          },
        },
      },
      {
        title: '8. Governing Law',
        anchor: 'governing-law',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'These terms, and any legal actions arising from your use of LevelUP or other Paragon AI systems, shall be governed by and interpreted under the laws of the Federal Democratic Republic of Ethiopia, without regard to conflict of law principles. Any dispute shall be resolved exclusively in the competent courts of Addis Ababa, Ethiopia.',
              ),
            ],
          },
        },
      },
    ],
  },
  {
    title: 'Copyright & IP Policy',
    label: 'IP Protection',
    slug: 'copyright',
    type: 'copyright' as const,
    effectiveDate: '2026-07-01',
    summary:
      'Our intellectual property rights covering proprietary model pipelines, Ge\'ez tokenizers, and LevelUP branding assets.',
    tableOfContents: [
      { label: '1. Ownership of Assets', anchor: 'ownership' },
      { label: '2. Model & Weight Licenses', anchor: 'model-rights' },
      { label: '3. Trademark Guidelines', anchor: 'brand-usage' },
      { label: '4. Reporting Violations', anchor: 'infringement' },
      { label: '5. Counter-Notifications', anchor: 'counter-notice' },
      { label: '6. Legal IP Representative', anchor: 'ip-agent' },
    ],
    intro: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          p(
            'Paragon AI PLC ("Paragon AI") values original engineering, research methodologies, and content creation. We heavily invest in building specialized, localized data structures to solve major educational roadblocks across Africa.',
          ),
          p(
            'This Intellectual Property Policy details our proprietary rights over our model pipelines, Ge\'ez script tokenizers, LevelUP branding assets, and safe-harbor copyright safeguards.',
          ),
        ],
      },
    },
    sections: [
      {
        title: '1. Ownership of Assets',
        anchor: 'ownership',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'Except where expressly stated otherwise, all technologies, proprietary neural-network tuning code, Ge\'ez language tokenization engines, curriculum database structures, graphics, UI assets, and LevelUP features are the sole property of Paragon AI PLC and protected under intellectual property legislation.',
              ),
              p(
                'Our RAG pipelines use uniquely annotated, curriculum-aligned questions and academic guide-material which are strictly copyrighted. Any unauthorized attempts to copy, distribute, or host replicas of LevelUP content violate our copyrights.',
              ),
            ],
          },
        },
      },
      {
        title: '2. Model & Weight Licenses',
        anchor: 'model-rights',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'Unless we explicitly release certain open-weight models, adapters, or localized NLP libraries under open-source models (such as Apache 2.0 or MIT licenses):',
              ),
              list([
                'You are strictly prohibited from utilizing our APIs or model checkpoints to train clone tutoring models.',
                'You may not run adversarial inference pipelines to distill or steal model behaviors from LevelUP.',
                'Attempts to extract our Ge\'ez/Amharic vector embeddings or private textbook contextual indexes will result in immediate suspension of services and potential legal recourse.',
              ]),
            ],
          },
        },
      },
      {
        title: '3. Trademark Guidelines',
        anchor: 'brand-usage',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                '"Paragon AI", the Paragon triangular glyph, "LevelUP", and associated logos are registered trademarks of Paragon AI PLC.',
              ),
              p(
                'You may not use our brand names, trademarks, or visual designs to market any unaffiliated software products, tutoring applications, or physical textbooks without obtaining explicit prior written consent from our corporate team.',
              ),
            ],
          },
        },
      },
      {
        title: '4. Reporting Violations',
        anchor: 'infringement',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'We respect the rights of other content creators. If you believe your copyrighted materials (such as specific textbook sections or study problems) have been indexed or served by LevelUP in a manner that constitutes direct copyright infringement, you may submit a formal takedown request to our legal representative.',
              ),
              p('Your notice must include the following details:'),
              list([
                'A physical or electronic signature of the copyright owner or their authorized agent.',
                'Identification of the copyrighted work claimed to have been infringed.',
                'Detailed links or references showing where the infringing material is located on our platform.',
                'Contact details, including your email address and phone number.',
              ]),
            ],
          },
        },
      },
      {
        title: '5. Counter-Notifications',
        anchor: 'counter-notice',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'If you believe your content was mistakenly removed from our developer integrations or community forums as a result of a false copyright claim, you may submit a counter-notice. Your counter-notice must state your identity, the removed content\'s context, and a statement under penalty of perjury that you have a good-faith belief the material was mistakenly flagged.',
              ),
            ],
          },
        },
      },
      {
        title: '6. Legal IP Representative',
        anchor: 'ip-agent',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              p(
                'All formal copyright claims, trademark infringement notices, or legal DMCA correspondence must be routed directly to:',
              ),
              p('legal@paragon.ai'),
              p('Attn: Legal IP Counsel'),
              p('Paragon AI PLC'),
              p('Addis Ababa, Ethiopia'),
            ],
          },
        },
      },
    ],
  },
]

const main = async () => {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  for (const pageData of legalPages) {
    try {
      // Check if page already exists
      const existing = await payload.find({
        collection: 'legal-pages',
        where: {
          slug: {
            equals: pageData.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        // Update existing
        const id = existing.docs[0]?.id
        if (id !== undefined) {
          await payload.update({
            collection: 'legal-pages',
            id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: pageData as any,
            overrideAccess: true,
          })
          console.log(`✓ Updated: ${pageData.title} (${pageData.slug})`)
        }
      } else {
        // Create new
        await payload.create({
          collection: 'legal-pages',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: pageData as any,
          overrideAccess: true,
        })
        console.log(`✓ Created: ${pageData.title} (${pageData.slug})`)
      }
    } catch (err) {
      console.error(`✗ Failed to seed ${pageData.title}:`, err)
    }
  }

  console.log('\nDone! Legal pages seeded successfully.')
  await (payload as { db?: { destroy?: () => Promise<void> } }).db?.destroy?.()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})