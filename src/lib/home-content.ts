/**
 * Homepage content — single source of truth for the landing page copy.
 * Deliberately plain data so any of these can later be moved into
 * Payload globals/collections without touching the section components.
 *
 * Positioning: ParagonAI is a small software and app studio building from
 * Addis Ababa — starting with LevelUP — open to selected collaborations. Only
 * verifiable facts; no invented scale, clients, or testimonials.
 */

export const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'LevelUP', href: '/products/levelup' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
] as const

export type HeroDockCard =
  | {
      /** Lime booking card */
      theme: 'lime'
      label: string
      title: string
      sub: string
      cta: { label: string; href: string }
    }
  | {
      /** Ink scale card (big stat) */
      theme: 'ink'
      label: string
      stat: string
      statSuffix?: string
      sub: string
      tag: string
    }
  | {
      /** Brand flagship card */
      theme: 'brand'
      label: string
      title: string
      sub: string
      cta: { label: string; href: string }
    }

export const HERO = {
  masthead: {
    copy: 'Paragon AI is a small software and app studio in Addis Ababa, building AI products and digital experiences — starting with LevelUP.',
    primary: { label: 'Explore our work', href: '/products' },
    secondary: { label: 'Meet LevelUP', href: '/products/levelup' },
  },
  dock: [
    {
      theme: 'lime',
      label: 'OPEN TO COLLABORATION',
      title: 'Have a problem worth solving?',
      sub: 'We work on ambitious ideas, useful AI applications and products built to matter.',
      cta: { label: 'Get in touch', href: '/contact-us' },
    },
    {
      theme: 'ink',
      label: 'OUR MISSION',
      stat: '1',
      sub: 'Built for African learners — starting in Ethiopia.',
      tag: 'FLAGSHIP · LEVELUP',
    },
    {
      theme: 'brand',
      label: 'OUR FLAGSHIP PRODUCT',
      title: 'LevelUP',
      sub: 'AI-powered learning, built for local curricula.',
      cta: { label: 'Meet LevelUP', href: '/products/levelup' },
    },
  ] as HeroDockCard[],
} as const

export const WORLD_TRANSITIONS = {
  wc1: {
    id: 'wc1',
    rail: 'Studio',
    index: '01',
    theme: 'dark' as const,
    statement: [
      { text: 'Technology should be built for' },
      {
        html: '<em class="serif-it font-normal text-lime">the realities we live in</em> — and the future we imagine.',
      },
    ],
    scramble: 'Building useful, ambitious technology from Africa.',
    status: 'Building from Addis Ababa',
    statusDot: 'lime' as const,
    footLeft: '//\u00a0Useful\u00a0Ambitious\u00a0Ours',
    footMid: 'Technology from Africa',
    rightStat: 'ADDIS\u00a0ABABA',
  },
  wc2: {
    id: 'wc2',
    rail: 'Work',
    index: '02',
    theme: 'light' as const,
    statement: [
      { text: 'From idea' },
      {
        html: 'to <em class="serif-it font-normal text-brand-600">product.</em>',
      },
    ],
    scramble: 'Our work starts with products we believe should exist.',
    status: 'A product-first company',
    statusDot: 'brand' as const,
    footLeft: '//\u00a0Build\u00a0Learn\u00a0Iterate',
    footMid: 'Products we believe in',
    rightStat: 'PRODUCT\u00a0FIRST',
  },
  wc3: {
    id: 'wc3',
    rail: 'Approach',
    index: '03',
    theme: 'dark' as const,
    statement: [
      { text: 'A practical way' },
      {
        html: 'of <em class="serif-it font-normal text-lime">building.</em>',
      },
    ],
    scramble:
      'Understand the problem, validate the idea, engineer the solution — and keep improving it.',
    status: 'Four phases, one loop',
    statusDot: 'lime' as const,
    footLeft: '//\u00a0Discover\u00a0Design\u00a0Build\u00a0Improve',
    footMid: 'From problem to product',
    rightStat: 'ONE\u00a0LOOP',
  },
  wc4: {
    id: 'wc4',
    rail: 'Perspective',
    index: '04',
    theme: 'dark' as const,
    statement: [
      { text: 'Ambition,' },
      {
        html: '<em class="serif-it font-normal text-lime">grounded in reality.</em>',
      },
    ],
    scramble:
      'What we believe about building technology from Ethiopia — for the people who live here.',
    status: 'Our perspective',
    statusDot: 'lime' as const,
    footLeft: '//\u00a0Ethiopia\u00a0Purpose\u00a0Vision',
    footMid: 'Built with ambition',
    rightStat: 'LONG\u00a0TERM',
  },
} as const

export const MANIFESTO = {
  label: '01 — Who we are',
  focusLabel: 'OUR CURRENT FOCUS',
  focusHeading: 'AI products. Real problems. Long-term ambition.',
  textPre:
    'ParagonAI exists to build useful, ambitious technology from Africa — AI-powered products and digital experiences that solve real problems. We start with education, expand into applied AI, and stay open to collaborations that share our ambition. This is ',
  textEm: 'day one.',
  stats: [
    { value: '01', suffix: '', label: 'Flagship product — LevelUP' },
    { value: '01', suffix: '', label: 'Core focus — Applied AI' },
    { value: '01', suffix: '', label: 'Home base — Addis Ababa' },
  ],
} as const

export const SERVICES = [
  {
    index: '01',
    title: 'AI Products & Agents',
    copy: 'AI-powered applications, intelligent agents, and workflow automation designed around practical use cases.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '02',
    title: 'Web Platforms',
    copy: 'Modern web applications, business tools, dashboards, and digital platforms built around real user needs.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '03',
    title: 'Mobile Applications',
    copy: 'Mobile experiences designed for accessibility, performance, and the realities of everyday device use.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '04',
    title: 'Data & Intelligent Systems',
    copy: 'Retrieval-augmented generation, knowledge systems, data processing, and AI-assisted decision tools.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '05',
    title: 'Infrastructure & Deployment',
    copy: 'Reliable application architecture, cloud deployment, integrations, and the systems that keep products running.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '06',
    title: 'Product Development',
    copy: 'From defining the problem to prototyping, engineering, and iterating toward a product people can use.',
    image:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
] as const

export const WORK = {
  heading: "Products we're",
  emphasis: 'building.',
  cards: [
    {
      title: 'LevelUP',
      tag: 'FLAGSHIP PRODUCT · EDUCATION',
      copy: 'An AI-powered exam preparation companion built around Ethiopian curricula, past exam questions, personalized explanations, and engaging learning experiences — built for Ethiopian high school students, with broader ambitions for African education.',
      image:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200',
      href: '/products/levelup',
    },
    {
      title: 'Applied AI',
      tag: 'RESEARCH & DEVELOPMENT',
      copy: 'Exploring practical applications of AI, agent-based workflows, knowledge retrieval, and intelligent software systems — an evolving area of research and product development.',
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      href: '/blog',
    },
    {
      title: 'Digital Products',
      tag: 'SELECTED COLLABORATIONS',
      copy: 'We are open to selected collaborations involving software development, AI integration, and new digital product ideas. Interested in building something together?',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
      href: '/contact-us',
    },
  ],
} as const

export const LEVELUP = {
  label: '04 — Flagship product · Education',
  image:
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
  imageAlt: 'Students learning with LevelUP',
  imageTag: 'LEVELUP // AI LEARNING COMPANION',
  imageStat: 'BUILT FOR ETHIOPIAN SCHOOLS',
  chapterImages: [
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
  ],
  chapters: [
    {
      eyebrow: '01 / CURRICULUM-ALIGNED',
      title: 'Matches the syllabus',
      copy: 'Learning experiences grounded in Ethiopian school subjects, curriculum content, and past exam questions.',
    },
    {
      eyebrow: '02 / PERSONALIZED EXPLANATIONS',
      title: 'Understands, not just answers',
      copy: 'An AI learning companion that helps students understand questions, not just see answers.',
    },
    {
      eyebrow: '03 / BUILT FOR LOCAL NEEDS',
      title: 'Designed for local realities',
      copy: 'Built with local curricula, accessible mobile experiences, and multilingual learning in mind.',
    },
  ],
  cta: 'Explore LevelUP',
  ctaHref: '/products/levelup',
} as const

export const PROCESS = {
  heading: 'From problem',
  emphasis: 'to product.',
  sub: 'A practical approach to building technology: understand the problem, validate the idea, engineer the solution, and keep improving it.',
  steps: [
    {
      num: '01',
      title: 'Discover',
      copy: 'Understand the people, constraints, and problem before deciding what to build.',
      phaseEyebrow: 'PHASE 01 // DISCOVER',
      tagBadge: 'RESEARCH & PROBLEM DEFINITION',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      highlight: false,
    },
    {
      num: '02',
      title: 'Design',
      copy: 'Shape the experience, test assumptions, and turn the idea into a clear product direction.',
      phaseEyebrow: 'PHASE 02 // DESIGN',
      tagBadge: 'PROTOTYPES & PRODUCT THINKING',
      image:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
      highlight: false,
    },
    {
      num: '03',
      title: 'Build',
      copy: 'Engineer the product with a focus on usability, maintainability, and reliable delivery.',
      phaseEyebrow: 'PHASE 03 // BUILD',
      tagBadge: 'ENGINEERING & ITERATION',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
      highlight: false,
    },
    {
      num: '04',
      title: 'Improve',
      copy: "Learn from real-world use, fix what's not working, and evolve the product over time.",
      phaseEyebrow: 'PHASE 04 // IMPROVE',
      tagBadge: 'FEEDBACK & CONTINUOUS IMPROVEMENT',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
      highlight: true,
    },
  ],
} as const

export const PRINCIPLES = {
  heading: 'What',
  emphasis: 'guides us.',
  sub: 'The principles behind the products we choose to build and the way we approach technology.',
  items: [
    {
      num: '01',
      title: 'Solve real problems',
      copy: 'Technology matters when it makes something meaningfully better for the people using it.',
      tag: 'PURPOSE FIRST',
    },
    {
      num: '02',
      title: 'Design for our reality',
      copy: 'Products should account for local languages, device limitations, connectivity, affordability, and how people actually live.',
      tag: 'CONTEXT MATTERS',
    },
    {
      num: '03',
      title: 'Make AI useful',
      copy: 'We focus on practical applications that help people learn, work, create, and make better decisions.',
      tag: 'INTELLIGENCE WITH PURPOSE',
    },
    {
      num: '04',
      title: 'Build for the long term',
      copy: 'We value thoughtful engineering, continuous learning, and products that can grow beyond their first use case.',
      tag: 'SUSTAINABLE INNOVATION',
    },
  ],
} as const

export type PerspectiveItem = {
  num: string
  title: string
  copy: string
  variant: 'ink' | 'brand' | 'bone'
}

/**
 * The former testimonials section, rebuilt as a company-perspective strip:
 * real beliefs instead of invented quotes. When genuine LevelUP user
 * feedback exists, replace these with real words used with permission.
 */
export const PERSPECTIVE: PerspectiveItem[] = [
  {
    num: '01',
    title: 'From Ethiopia',
    copy: 'We believe Africa should be more than a market for technology built elsewhere — building from local experience, with global standards in mind.',
    variant: 'ink',
  },
  {
    num: '02',
    title: 'AI with purpose',
    copy: 'We apply emerging technology to meaningful, everyday problems — intelligence in service of people.',
    variant: 'brand',
  },
  {
    num: '03',
    title: 'A long-term vision',
    copy: 'Starting with focused products and growing into new opportunities across industries, one real problem at a time.',
    variant: 'bone',
  },
]

export type UpdateRow = {
  tag: string
  date: string
  title: string
  href: string
  image: string
}

export const FALLBACK_UPDATES: UpdateRow[] = [
  {
    tag: 'Product',
    date: '2026',
    title: 'Building LevelUP: an AI exam-prep companion for Ethiopian students',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400',
  },
  {
    tag: 'AI',
    date: '2026',
    title:
      'AI, beyond the hype: where intelligent systems create practical value',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
  },
  {
    tag: 'Company',
    date: '2026',
    title: 'Building from Ethiopia: lessons, challenges, and opportunities',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  },
]

export const CTA = {
  label: "LET'S BUILD",
  heading: "The future isn't built",
  emphasis: 'by waiting.',
  copy: "We're building AI-powered products from Ethiopia, starting with education and looking toward what's next. If you're working on a meaningful problem or exploring an idea worth building, let's talk.",
  primary: { label: 'Explore LevelUP', href: '/products/levelup' },
  secondary: { label: 'Contact ParagonAI', href: '/contact-us' },
  badge: 'Open to selected collaborations',
} as const
