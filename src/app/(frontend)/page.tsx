import Hero from '@/components/home/Hero'
import LevelUp from '@/components/home/LevelUp'
import Manifesto from '@/components/home/Manifesto'

import Nebula from '@/components/home/Nebula'
import Principles from '@/components/home/Principles'
import Process from '@/components/home/Process'
import ScrollFx from '@/components/home/ScrollFx'
import Services from '@/components/home/Services'
import Testimonials from '@/components/home/Testimonials'
import Universe from '@/components/home/Universe'
import Updates from '@/components/home/Updates'
import Work from '@/components/home/Work'
import WorldTransition from '@/components/home/WorldTransition'
import Preloader from '@/components/site/Preloader'
import { getCachedBlogPosts, getCachedHomepage } from '@/lib/data'
import {
  BIG_STATS,
  FALLBACK_UPDATES,
  HERO,
  LEVELUP,
  MANIFESTO,
  MARQUEE_ITEMS,
  PRINCIPLES,
  PROCESS,
  SERVICES,
  TESTIMONIALS,
  type UpdateRow,
  WORK,
  WORLD_TRANSITIONS,
} from '@/lib/home-content'
import type { Homepage, Media } from '@/payload-types'

async function getHomepage(): Promise<Homepage | null> {
  try {
    return await getCachedHomepage()
  } catch {
    // CMS unreachable — render with the built-in design content
    return null
  }
}

async function getUpdates(): Promise<UpdateRow[]> {
  try {
    const posts = await getCachedBlogPosts(4)
    if (!posts.docs.length) return FALLBACK_UPDATES
    return posts.docs.map((post, i) => {
      const heroImage =
        typeof post.heroImage === 'object'
          ? (post.heroImage as Media | null)
          : null
      return {
        tag: post.category || 'Notes',
        date: post.publishedDate
          ? new Date(post.publishedDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })
          : '',
        title: post.title,
        href: `/blog/${post.slug}`,
        image:
          heroImage?.url || FALLBACK_UPDATES[i % FALLBACK_UPDATES.length].image,
      }
    })
  } catch {
    // CMS unreachable — the page still renders with design content
    return FALLBACK_UPDATES
  }
}

export default async function Home() {
  const [cms, updates] = await Promise.all([getHomepage(), getUpdates()])

  // CMS-over-constants merge: every field falls back to the design content,
  // so an empty (or unreachable) global renders the page exactly as designed.
  const heroMeta = cms?.heroMeta || HERO.meta
  const heroPlace = cms?.heroPlace || HERO.place
  const heroCopy = cms?.heroCopy || HERO.copy
  const heroImage = cms?.heroImage || HERO.image
  const heroImageAlt = cms?.heroImageAlt || HERO.imageAlt
  const heroImageCaption = cms?.heroImageCaption || HERO.imageCaption
  const heroImageTag = cms?.heroImageTag || HERO.imageTag
  const marquee = cms?.marquee?.length
    ? cms.marquee.map((m, i) => ({
        text: m.text,
        serif: m.style === 'serif',
        dot: i % 2 === 0 ? 'bg-brand-600' : 'bg-lime',
      }))
    : [...MARQUEE_ITEMS]

  const manifestoLabel = cms?.manifestoLabel || MANIFESTO.label
  const manifestoTextPre = cms?.manifestoText || MANIFESTO.textPre
  const manifestoTextEm = cms?.manifestoEmphasis || MANIFESTO.textEm
  const manifestoStats = cms?.manifestoStats?.length
    ? cms.manifestoStats.map((s) => ({
        value: s.value,
        suffix: s.suffix ?? '',
        label: s.label,
      }))
    : [...MANIFESTO.stats]

  const services = cms?.services?.length
    ? cms.services.map((s, i) => ({
        index: String(i + 1).padStart(2, '0'),
        title: s.title,
        copy: s.copy ?? '',
        image: s.image ?? '',
        href: s.href || '/#contact',
      }))
    : [...SERVICES]

  const workCards = cms?.workCards?.length
    ? cms.workCards.map((c) => ({
        title: c.title,
        tag: c.tag ?? '',
        copy: c.copy ?? '',
        image: c.image ?? '',
        href: c.href || '/products',
      }))
    : [...WORK.cards]

  const levelupLabel = cms?.levelupLabel || LEVELUP.label
  const levelupImage = cms?.levelupImage || LEVELUP.image
  const levelupImageAlt = cms?.levelupImageAlt || LEVELUP.imageAlt
  const levelupImageTag = cms?.levelupImageTag || LEVELUP.imageTag
  const levelupChapters = cms?.levelupChapters?.length
    ? cms.levelupChapters.map((c) => ({ title: c.title, copy: c.copy }))
    : [...LEVELUP.chapters]
  const levelupCta = cms?.levelupCtaLabel || LEVELUP.cta
  const levelupCtaHref = cms?.levelupCtaHref || LEVELUP.ctaHref

  const processSub = cms?.processSub || PROCESS.sub
  const processSteps = cms?.processSteps?.length
    ? cms.processSteps.map((s) => ({
        num: s.num,
        title: s.title,
        copy: s.copy ?? '',
        image: s.image ?? '',
        highlight: s.highlight ?? false,
      }))
    : [...PROCESS.steps]
  const bigStats = cms?.bigStats?.length
    ? cms.bigStats.map((s) => ({
        value: s.value,
        suffix: s.suffix ?? '',
        label: s.label,
      }))
    : [...BIG_STATS]

  const principlesSub = cms?.principlesSub || PRINCIPLES.sub
  const principleItems = cms?.principles?.length
    ? cms.principles.map((p) => ({ num: p.num, title: p.title, copy: p.copy }))
    : [...PRINCIPLES.items]

  const testimonialItems = cms?.testimonials?.length
    ? cms.testimonials.map((t) => ({
        stat: t.stat,
        statSuffix: t.statSuffix ?? undefined,
        label: t.label,
        quote: t.quote,
        name: t.name,
        role: t.role ?? '',
        avatar: t.avatar ?? '',
        variant: (t.variant ?? 'ink') as 'ink' | 'brand' | 'bone',
      }))
    : [...TESTIMONIALS]

  const wc1Label = cms?.wc1Label || WORLD_TRANSITIONS.wc1.label
  const wc1Scramble = cms?.wc1Scramble || WORLD_TRANSITIONS.wc1.scramble
  const wc2Label = cms?.wc2Label || WORLD_TRANSITIONS.wc2.label
  const wc2Scramble = cms?.wc2Scramble || WORLD_TRANSITIONS.wc2.scramble
  const wc3Label = cms?.wc3Label || WORLD_TRANSITIONS.wc3.label
  const wc3Scramble = cms?.wc3Scramble || WORLD_TRANSITIONS.wc3.scramble
  const wc4Label = cms?.wc4Label || WORLD_TRANSITIONS.wc4.label
  const wc4Scramble = cms?.wc4Scramble || WORLD_TRANSITIONS.wc4.scramble

  return (
    <>
      {/* WebGL layers + boot experience */}
      <Nebula />
      <Universe />
      <Preloader />
      <ScrollFx />

      {/* 1 · Hero (light world) */}
      <Hero
        meta={heroMeta}
        place={heroPlace}
        copy={heroCopy}
        image={heroImage}
        imageAlt={heroImageAlt}
        imageCaption={heroImageCaption}
        imageTag={heroImageTag}
        marquee={marquee}
      />

      {/* 2 · Transition — cover into the studio world */}
      <WorldTransition
        id="wc1"
        variant="cover"
        theme="ink"
        accent="lime"
        label={wc1Label}
        scramble={wc1Scramble}
        keepScrolling
      >
        Technology is the new
        <br />
        <em className="serif-it font-normal text-brand-400">infrastructure</em>{' '}
        of the continent.
      </WorldTransition>

      {/* 3 · Manifesto (studio world) */}
      <Manifesto
        label={manifestoLabel}
        textPre={manifestoTextPre}
        textEm={manifestoTextEm}
        stats={manifestoStats}
      />

      {/* 4 · Services (studio world) */}
      <Services services={services} />

      {/* 5 · Transition — circle portal into the workshop world */}
      <WorldTransition
        id="wc2"
        variant="circle"
        theme="paper"
        accent="brand"
        label={wc2Label}
        scramble={wc2Scramble}
      >
        From idea
        <br />
        to <em className="serif-it font-normal text-brand-600">impact.</em>
      </WorldTransition>

      {/* 6 · Work — horizontal (workshop world) */}
      <Work cards={workCards} />

      {/* 7 · LevelUP — pinned product story (workshop world) */}
      <LevelUp
        label={levelupLabel}
        image={levelupImage}
        imageAlt={levelupImageAlt}
        imageTag={levelupImageTag}
        chapters={levelupChapters}
        cta={levelupCta}
        ctaHref={levelupCtaHref}
      />

      {/* 8 · Transition — cover into the method world */}
      <WorldTransition
        id="wc3"
        variant="cover"
        theme="coal"
        accent="lime"
        label={wc3Label}
        scramble={wc3Scramble}
        keepScrolling
      >
        Four moves.
        <br />
        <em className="serif-it font-normal text-lime">Zero</em> hand-offs.
      </WorldTransition>

      {/* 9 + 10 · Process & stats (method world) */}
      <Process sub={processSub} steps={processSteps} bigStats={bigStats} />

      {/* 11 · Principles (method world) */}
      <Principles sub={principlesSub} items={principleItems} />

      {/* 12 · Transition — circle portal into the voices world */}
      <WorldTransition
        id="wc4"
        variant="circle"
        theme="paper"
        accent="brand"
        label={wc4Label}
        scramble={wc4Scramble}
      >
        Proof, not
        <br />
        <em className="serif-it font-normal text-brand-600">promises.</em>
      </WorldTransition>

      {/* 13 · Stories (voices world) */}
      <Testimonials testimonials={testimonialItems} />

      {/* 14 · Updates (voices world) */}
      <Updates updates={updates} />

      {/* 15 · CTA + footer (finale world) — rendered in the root layout */}
    </>
  )
}
