import Hero from '@/components/home/Hero'
import LevelUp from '@/components/home/LevelUp'
import Manifesto from '@/components/home/Manifesto'
import Principles from '@/components/home/Principles'
import Process from '@/components/home/Process'
import ScrollFx from '@/components/home/ScrollFx'
import Services from '@/components/home/Services'
import Testimonials from '@/components/home/Testimonials'
import Updates from '@/components/home/Updates'
import Work from '@/components/home/Work'
import WorldTransition from '@/components/home/WorldTransition'
import { getCachedBlogPosts, getCachedHomepage } from '@/lib/data'
import {
  BIG_STATS,
  FALLBACK_UPDATES,
  HERO,
  type HeroDockCard,
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
  const heroEyebrow = cms?.heroEyebrow || HERO.masthead.eyebrow
  const heroPlace = cms?.heroPlace || HERO.masthead.place
  const heroCopy = cms?.heroCopy || HERO.masthead.copy
  const heroPrimary = cms?.heroPrimaryLabel
    ? {
        label: cms.heroPrimaryLabel,
        href: cms.heroPrimaryHref || HERO.masthead.primary.href,
      }
    : HERO.masthead.primary
  const heroSecondary = cms?.heroSecondaryLabel
    ? {
        label: cms.heroSecondaryLabel,
        href: cms.heroSecondaryHref || HERO.masthead.secondary.href,
      }
    : HERO.masthead.secondary
  const heroStatusPill = cms?.heroStatusPill || HERO.statusPill
  const heroStatusTag = cms?.heroStatusTag || HERO.statusTag
  const heroDock: HeroDockCard[] = cms?.heroDock?.length
    ? cms.heroDock.map((d) => {
        if (d.theme === 'ink') {
          return {
            theme: 'ink' as const,
            label: d.label ?? '',
            stat: d.stat ?? '',
            statSuffix: d.statSuffix ?? undefined,
            sub: d.sub ?? '',
            tag: d.tag ?? '',
          }
        }
        return {
          theme: d.theme === 'brand' ? ('brand' as const) : ('lime' as const),
          label: d.label ?? '',
          title: d.title ?? '',
          sub: d.sub ?? '',
          cta: { label: d.ctaLabel ?? '', href: d.ctaHref || '/#contact' },
        }
      })
    : HERO.dock
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
  const levelupImageStat = cms?.levelupImageStat || LEVELUP.imageStat
  const cmsChapterImages = cms?.levelupChapterImages
  const levelupChapterImages = cmsChapterImages?.length
    ? LEVELUP.chapters.map(
        (_, i) =>
          cmsChapterImages[i]?.image ||
          LEVELUP.chapterImages[i] ||
          LEVELUP.image,
      )
    : [...LEVELUP.chapterImages]
  const levelupChapters = cms?.levelupChapters?.length
    ? cms.levelupChapters.map((c) => ({
        eyebrow: c.eyebrow ?? undefined,
        title: c.title,
        copy: c.copy,
      }))
    : [...LEVELUP.chapters]
  const levelupCta = cms?.levelupCtaLabel || LEVELUP.cta
  const levelupCtaHref = cms?.levelupCtaHref || LEVELUP.ctaHref

  const processSub = cms?.processSub || PROCESS.sub
  const processSteps = cms?.processSteps?.length
    ? cms.processSteps.map((s) => ({
        num: s.num,
        title: s.title,
        copy: s.copy ?? '',
        phaseEyebrow: s.phaseEyebrow ?? undefined,
        tagBadge: s.tagBadge ?? undefined,
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
    ? cms.principles.map((p) => ({
        num: p.num,
        title: p.title,
        copy: p.copy,
        tag: p.tag ?? undefined,
      }))
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

  const wc1 = WORLD_TRANSITIONS.wc1
  const wc2 = WORLD_TRANSITIONS.wc2
  const wc3 = WORLD_TRANSITIONS.wc3
  const wc4 = WORLD_TRANSITIONS.wc4
  const wc1Rail = cms?.wc1Rail || wc1.rail
  const wc1Index = cms?.wc1Index || wc1.index
  const wc1Scramble = cms?.wc1Scramble || wc1.scramble
  const wc1Status = cms?.wc1Status || wc1.status
  const wc1FootLeft = cms?.wc1FootLeft || wc1.footLeft
  const wc1FootMid = cms?.wc1FootMid || wc1.footMid
  const wc1RightStat = cms?.wc1RightStat || wc1.rightStat
  const wc2Rail = cms?.wc2Rail || wc2.rail
  const wc2Index = cms?.wc2Index || wc2.index
  const wc2Scramble = cms?.wc2Scramble || wc2.scramble
  const wc2Status = cms?.wc2Status || wc2.status
  const wc2FootLeft = cms?.wc2FootLeft || wc2.footLeft
  const wc2FootMid = cms?.wc2FootMid || wc2.footMid
  const wc2RightStat = cms?.wc2RightStat || wc2.rightStat
  const wc3Rail = cms?.wc3Rail || wc3.rail
  const wc3Index = cms?.wc3Index || wc3.index
  const wc3Scramble = cms?.wc3Scramble || wc3.scramble
  const wc3Status = cms?.wc3Status || wc3.status
  const wc3FootLeft = cms?.wc3FootLeft || wc3.footLeft
  const wc3FootMid = cms?.wc3FootMid || wc3.footMid
  const wc3RightStat = cms?.wc3RightStat || wc3.rightStat
  const wc4Rail = cms?.wc4Rail || wc4.rail
  const wc4Index = cms?.wc4Index || wc4.index
  const wc4Scramble = cms?.wc4Scramble || wc4.scramble
  const wc4Status = cms?.wc4Status || wc4.status
  const wc4FootLeft = cms?.wc4FootLeft || wc4.footLeft
  const wc4FootMid = cms?.wc4FootMid || wc4.footMid
  const wc4RightStat = cms?.wc4RightStat || wc4.rightStat

  return (
    <>
      {/* ScrollFx mounts the GSAP/ScrollTrigger choreography */}
      <ScrollFx />

      {/* 1 · Hero (light world with bento dock & open 3D stage) */}
      <Hero
        eyebrow={heroEyebrow}
        place={heroPlace}
        copy={heroCopy}
        primary={heroPrimary}
        secondary={heroSecondary}
        statusPill={heroStatusPill}
        statusTag={heroStatusTag}
        dock={heroDock}
        marquee={marquee}
      />

      {/* 2 · Transition 1 — Studio aperture */}
      <WorldTransition
        id="wc1"
        theme="dark"
        navDark
        rail={wc1Rail}
        index={wc1Index}
        statementClass="text-[clamp(2.6rem,7vw,6rem)]"
        scramble={wc1Scramble}
        status={wc1Status}
        statusDot={wc1.statusDot}
        footLeft={wc1FootLeft}
        footMid={wc1FootMid}
        rightStat={wc1RightStat}
      >
        Technology is the new
        <br />
        <em className="serif-it font-normal text-lime">infrastructure</em> of
        the continent.
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

      {/* 5 · Transition 2 — Workshop aperture */}
      <WorldTransition
        id="wc2"
        theme="light"
        rail={wc2Rail}
        index={wc2Index}
        scramble={wc2Scramble}
        status={wc2Status}
        statusDot={wc2.statusDot}
        footLeft={wc2FootLeft}
        footMid={wc2FootMid}
        rightStat={wc2RightStat}
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
        imageStat={levelupImageStat}
        chapterImages={levelupChapterImages}
        chapters={levelupChapters}
        cta={levelupCta}
        ctaHref={levelupCtaHref}
      />

      {/* 8 · Transition 3 — Method aperture */}
      <WorldTransition
        id="wc3"
        theme="dark"
        navDark
        rail={wc3Rail}
        index={wc3Index}
        statementClass="text-[clamp(2.4rem,7vw,6.4rem)]"
        scramble={wc3Scramble}
        status={wc3Status}
        statusDot={wc3.statusDot}
        footLeft={wc3FootLeft}
        footMid={wc3FootMid}
        rightStat={wc3RightStat}
      >
        Four moves.
        <br />
        <em className="serif-it font-normal text-lime">Zero</em>&nbsp;hand-offs.
      </WorldTransition>

      {/* 9 + 10 · Process & stats (method world) */}
      <Process sub={processSub} steps={processSteps} bigStats={bigStats} />

      {/* 11 · Principles (method world) */}
      <Principles sub={principlesSub} items={principleItems} />

      {/* 12 · Transition 4 — Voices aperture */}
      <WorldTransition
        id="wc4"
        theme="dark"
        navDark
        rail={wc4Rail}
        index={wc4Index}
        scramble={wc4Scramble}
        status={wc4Status}
        statusDot={wc4.statusDot}
        footLeft={wc4FootLeft}
        footMid={wc4FootMid}
        rightStat={wc4RightStat}
      >
        Proof, not
        <br />
        <em className="serif-it font-normal text-lime">promises.</em>
      </WorldTransition>

      {/* 13 · Stories (voices world) */}
      <Testimonials testimonials={testimonialItems} />

      {/* 14 · Updates (voices world) */}
      <Updates updates={updates} />

      {/* 15 · CTA + footer (finale world) — rendered in the root layout */}
    </>
  )
}
