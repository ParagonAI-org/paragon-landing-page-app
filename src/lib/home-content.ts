/**
 * Homepage content — single source of truth for the landing page copy.
 * Deliberately plain data so any of these can later be moved into
 * Payload globals/collections without touching the section components.
 */

export const NAV_LINKS = [
  { label: 'Studio', href: '/#manifesto' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'LevelUP', href: '/#levelup' },
  { label: 'Method', href: '/#process' },
  { label: 'Stories', href: '/#stories' },
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
    eyebrow: 'PARAGON AI STUDIO',
    place: 'EST. ADDIS ABABA, ET',
    lines: [
      { text: 'We build the' },
      {
        html: 'technology <em class="serif-it font-normal text-brand-600">Africa</em>',
      },
      {
        html: '<span class="text-ink">runs on</span><span class="text-brand-600">.</span>',
      },
    ],
    copy: "Paragon AI is a technology studio partnering with the continent's boldest teams — from startups to ministries — to design, engineer and scale what comes next.",
    primary: { label: 'Explore what we build', href: '/#work' },
    secondary: { label: 'Meet LevelUP', href: '/#levelup' },
  },
  statusPill: "ADDIS ABABA (09°01'N 38°44'E)",
  statusTag: 'SOVEREIGN ARCHITECTURE // 2026',
  dock: [
    {
      theme: 'lime',
      label: 'BOOKING Q3 2026',
      title: 'Start your build with us.',
      sub: 'One senior squad. No junior hand-offs.',
      cta: { label: 'Start a project', href: '/#contact' },
    },
    {
      theme: 'ink',
      label: 'SCALE & IMPACT',
      stat: '50',
      statSuffix: 'K+',
      sub: 'Learners on LevelUP across 12 African countries.',
      tag: 'LEVELUP 2.0 LIVE',
    },
    {
      theme: 'brand',
      label: 'EDTECH FLAGSHIP',
      title: 'LevelUP Adaptive AI',
      sub: 'Offline-first test prep engineered for $80 phones and 2G connectivity.',
      cta: { label: 'Meet LevelUP', href: '/#levelup' },
    },
  ] as HeroDockCard[],
} as const

export const MARQUEE_ITEMS = [
  { text: 'AI SYSTEMS', serif: false, dot: 'bg-brand-600' },
  { text: 'web platforms', serif: true, dot: 'bg-lime' },
  { text: 'MOBILE PRODUCTS', serif: false, dot: 'bg-brand-600' },
  { text: 'data & analytics', serif: true, dot: 'bg-lime' },
  { text: 'CLOUD & DEVOPS', serif: false, dot: 'bg-brand-600' },
  { text: 'product strategy', serif: true, dot: 'bg-lime' },
] as const

export const WORLD_TRANSITIONS = {
  wc1: {
    id: 'wc1',
    rail: 'Studio',
    index: '01',
    theme: 'dark' as const,
    statement: [
      { text: 'Technology is the new' },
      {
        html: '<em class="serif-it font-normal text-lime">infrastructure</em> of the continent.',
      },
    ],
    scramble: "Rendering the machines that will define Africa's next decade.",
    status: 'Now accepting missions',
    statusDot: 'lime' as const,
    footLeft: '//\u00a0Design\u00a0Engineering\u00a0AI',
    footMid: 'Infrastructure of the continent',
    rightStat: 'EST.\u00a02020',
  },
  wc2: {
    id: 'wc2',
    rail: 'Workshop',
    index: '02',
    theme: 'light' as const,
    statement: [
      { text: 'From idea' },
      {
        html: 'to <em class="serif-it font-normal text-brand-600">impact.</em>',
      },
    ],
    scramble: 'Prototyping the paths that turn concepts into shipped products.',
    status: 'From prototype to production',
    statusDot: 'brand' as const,
    footLeft: '//\u00a0Ideate\u00a0Prototype\u00a0Launch',
    footMid: 'Ideas, engineered',
    rightStat: 'SHIP\u00a0\u00a0FAST',
  },
  wc3: {
    id: 'wc3',
    rail: 'Method',
    index: '03',
    theme: 'dark' as const,
    statement: [
      { text: 'Four moves.' },
      {
        html: '<em class="serif-it font-normal text-lime">Zero</em>&nbsp;hand-offs.',
      },
    ],
    scramble:
      'One senior team carrying the work start to finish — no translation loss between hand-offs.',
    status: 'Full-ownership delivery',
    statusDot: 'lime' as const,
    footLeft: '//\u00a0Discover\u00a0Design\u00a0Build\u00a0Scale',
    footMid: 'Four moves, one team',
    rightStat: 'ONE\u00a0TEAM',
  },
  wc4: {
    id: 'wc4',
    rail: 'Voices',
    index: '04',
    theme: 'dark' as const,
    statement: [
      { text: 'Proof, not' },
      { html: '<em class="serif-it font-normal text-lime">promises.</em>' },
    ],
    scramble:
      'Testimonials and field reports from the people who ship and learn with us.',
    status: 'Field-proven outcomes',
    statusDot: 'lime' as const,
    footLeft: '//\u00a0Partners\u00a0Educators\u00a0Learners',
    footMid: 'Proven, on the record',
    rightStat: 'REAL\u00a0STORIES',
  },
} as const

export const MANIFESTO = {
  label: '01 — Who we are',
  textPre:
    'Paragon AI exists to prove that world-class technology can be built in Africa, for Africa — and for everyone. We design AI systems, web platforms and digital products that move entire industries. Education is where we started. It is ',
  textEm: 'not where we stop.',
  stats: [
    { value: '30', suffix: '+', label: 'Platforms shipped' },
    { value: '12', suffix: '+', label: 'Countries served' },
    { value: '50', suffix: 'K+', label: 'Learners on LevelUP' },
  ],
} as const

export const SERVICES = [
  {
    index: '01',
    title: 'AI Systems',
    copy: 'LLM products, computer vision, forecasting and automation — from prototype to production.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '02',
    title: 'Web Platforms',
    copy: 'Scalable web apps, dashboards and marketplaces engineered for real-world traffic.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '03',
    title: 'Mobile Products',
    copy: 'Offline-first Android & iOS apps built for low-bandwidth, low-spec realities.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '04',
    title: 'Data & Analytics',
    copy: 'Pipelines, warehousing and decision dashboards that turn noise into strategy.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '05',
    title: 'Cloud & DevOps',
    copy: "Resilient infrastructure, CI/CD and observability across the continent's edge.",
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
  {
    index: '06',
    title: 'Design & Strategy',
    copy: 'Research, prototyping and product strategy that de-risk the build before it begins.',
    image:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    href: '/#contact',
  },
] as const

export const WORK = {
  heading: 'Flagships we own.',
  emphasis: 'Platforms we build.',
  cards: [
    {
      title: 'LevelUP',
      tag: 'EdTech · Flagship',
      copy: 'AI-powered gamified test prep — offline-first, localized, free for learners.',
      image:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1200',
      href: '/products/levelup',
    },
    {
      title: 'Paragon Engine',
      tag: 'AI Infrastructure',
      copy: 'Production-grade model serving, RAG and evaluation APIs.',
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      href: '/products',
    },
    {
      title: 'Paragon Studios',
      tag: 'Client Builds',
      copy: 'Senior product squads for fintech, health, agro and public sector.',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
      href: '/products',
    },
    {
      title: 'Paragon Labs',
      tag: 'Applied Research',
      copy: 'Adaptive systems, low-resource languages, offline inference.',
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
      href: '/blog',
    },
    {
      title: 'Shipped Ledger',
      tag: 'Full Index',
      copy: 'Every product, platform and case study — in one place.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      href: '/products',
    },
  ],
} as const

export const LEVELUP = {
  label: '04 — Flagship · EdTech',
  image:
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
  imageAlt: 'LevelUP in the classroom',
  imageTag: 'LEVELUP 2.0 // NATIONAL DEPLOYMENT',
  imageStat: '50,000+ USERS',
  chapterImages: [
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
  ],
  chapters: [
    {
      eyebrow: '01 / DYNAMIC LEARNING',
      title: 'Adapts in real time',
      copy: 'Every answer reshapes the next question. No two learning paths are alike — the tutor knows what you know before you do.',
    },
    {
      eyebrow: '02 / HARDWARE INDEPENDENCE',
      title: 'Works anywhere',
      copy: 'Offline-first architecture built for low-connectivity regions and $80 phones. Download a subject, climb a mountain, keep learning.',
    },
    {
      eyebrow: '03 / NATIVE VERNACULAR',
      title: 'Speaks your language',
      copy: 'Localized across Amharic, Swahili, French, English and more — because understanding beats translation, every time.',
    },
  ],
  cta: 'Explore LevelUP',
  ctaHref: '/#work',
} as const

export const PROCESS = {
  heading: 'How we',
  emphasis: 'work.',
  sub: 'One senior team owns your product from first workshop to national scale.',
  steps: [
    {
      num: '01',
      title: 'Discover',
      copy: 'Workshops, field research and data audits. We fall in love with the problem before we touch a keyboard.',
      phaseEyebrow: 'PHASE 01 // IMMERSION',
      tagBadge: 'USER JOURNEYS & FIELD AUDITS',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      highlight: false,
    },
    {
      num: '02',
      title: 'Design',
      copy: 'Prototypes tested with real users on real devices — in Addis, Lagos, Nairobi and Kigali — before a line of prod code.',
      phaseEyebrow: 'PHASE 02 // VALIDATION',
      tagBadge: 'HIGH-FIDELITY TESTING',
      image:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
      highlight: false,
    },
    {
      num: '03',
      title: 'Build',
      copy: 'Senior engineers ship in two-week cycles with CI/CD, observability and security baked in from day one.',
      phaseEyebrow: 'PHASE 03 // EXECUTION',
      tagBadge: 'CI/CD & ZERO OUTSOURCING',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
      highlight: false,
    },
    {
      num: '04',
      title: 'Scale',
      copy: 'We stay for the growth: load testing, localization, training and handover — or run it with you, forever.',
      phaseEyebrow: 'PHASE 04 // EXPANSION',
      tagBadge: 'SLA & RUNTIME SUPPORT',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
      highlight: true,
    },
  ],
} as const

export const BIG_STATS = [
  { value: 30, suffix: '+', label: 'Platforms shipped' },
  { value: 50, suffix: 'K+', label: 'Learners on LevelUP' },
  { value: 12, suffix: '+', label: 'Countries served' },
  { value: 400, suffix: '+', label: 'Partner engineers' },
] as const

export const PRINCIPLES = {
  heading: 'How we',
  emphasis: 'think.',
  sub: 'Four principles that decide what we build and how we build it.',
  items: [
    {
      num: '01',
      title: 'Build with, not for',
      copy: 'We embed with ministries, teachers and founders before we write a line of code.',
      tag: 'CO-CREATION',
    },
    {
      num: '02',
      title: 'Offline-first, always',
      copy: 'Designed for $80 phones and 2G connectivity. Connectivity is a feature, not a given.',
      tag: 'LOW-RESILIENT INFRA',
    },
    {
      num: '03',
      title: 'Craft is strategy',
      copy: 'Polish is not vanity. In markets where trust is earned slowly, craft is the fastest growth lever.',
      tag: 'RIGOROUS FINISH',
    },
    {
      num: '04',
      title: 'Talent is everywhere',
      copy: 'Senior African engineers and designers, held to a global bar — and paid one.',
      tag: 'GLOBAL BENCHMARK',
    },
  ],
} as const

export type Testimonial = {
  stat: string
  statSuffix?: string
  label: string
  quote: string
  name: string
  role: string
  avatar: string
  variant: 'ink' | 'brand' | 'bone'
}

export const TESTIMONIALS: Testimonial[] = [
  {
    stat: '99.9',
    statSuffix: '%',
    label: 'Uptime since launch',
    quote:
      '"Paragon rebuilt our core ledger and shipped in 14 weeks. Zero downtime since — our investors noticed."',
    name: 'Chidi O.',
    role: 'CTO, Lagos fintech',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    variant: 'ink',
  },
  {
    stat: '+210',
    label: 'Points · national exam',
    quote:
      '"LevelUP found the exact topics I was weak in. Three months later I scored in the top 1% nationally."',
    name: 'Hanna W.',
    role: 'Grade 12 student, Addis Ababa',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    variant: 'brand',
  },
  {
    stat: '12',
    label: 'Districts in 6 months',
    quote:
      '"Their team understood our constraints — bandwidth, devices, language — better than vendors ten times their size."',
    name: 'Selam G.',
    role: 'Education officer, MoE',
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=100',
    variant: 'bone',
  },
  {
    stat: '3×',
    label: 'Faster diagnosis triage',
    quote:
      '"The vision model Paragon built reads crop-disease photos as well as our best agronomists."',
    name: 'Wanjiru M.',
    role: 'Founder, agritech startup',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100',
    variant: 'ink',
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
    tag: 'Company',
    date: 'Jul 2026',
    title: 'Paragon AI expands to Kenya & Rwanda with new regional hubs',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400',
  },
  {
    tag: 'Product',
    date: 'Jun 2026',
    title: 'LevelUP 2.0: personalized AI tutoring now live nationwide',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
  },
  {
    tag: 'Studios',
    date: 'May 2026',
    title: 'Studios ships real-time payments dashboard for Lagos fintech',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  },
  {
    tag: 'Labs',
    date: 'Apr 2026',
    title: 'Offline inference: running tutors on $80 phones',
    href: '/blog',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
  },
]

export const CTA = {
  label: 'Entering — The Finale',
  heading: "Let's build what",
  emphasis: 'needs next.',
  headingEnd: 'Africa',
  copy: "Whether you're launching a product, automating operations or reimagining a classroom — we'll build it with you.",
  primary: { label: 'Start a project', href: 'mailto:hello@paragon.ai' },
  secondary: { label: 'Talk to our team', href: '/contact-us' },
  badge: 'Booking Q3 2026 projects',
} as const
