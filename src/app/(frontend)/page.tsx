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
import { getCachedBlogPosts } from '@/lib/data'
import {
  FALLBACK_UPDATES,
  type UpdateRow,
  WORLD_TRANSITIONS,
} from '@/lib/home-content'
import type { Media } from '@/payload-types'

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
  const updates = await getUpdates()

  return (
    <>
      {/* WebGL layers + boot experience */}
      <Nebula />
      <Universe />
      <Preloader />
      <ScrollFx />

      {/* 1 · Hero (light world) */}
      <Hero />

      {/* 2 · Transition — cover into the studio world */}
      <WorldTransition
        id="wc1"
        variant="cover"
        theme="ink"
        accent="lime"
        label={WORLD_TRANSITIONS.wc1.label}
        scramble={WORLD_TRANSITIONS.wc1.scramble}
        keepScrolling
      >
        Technology is the new
        <br />
        <em className="serif-it font-normal text-brand-400">infrastructure</em>{' '}
        of the continent.
      </WorldTransition>

      {/* 3 · Manifesto (studio world) */}
      <Manifesto />

      {/* 4 · Services (studio world) */}
      <Services />

      {/* 5 · Transition — circle portal into the workshop world */}
      <WorldTransition
        id="wc2"
        variant="circle"
        theme="paper"
        accent="brand"
        label={WORLD_TRANSITIONS.wc2.label}
        scramble={WORLD_TRANSITIONS.wc2.scramble}
      >
        From idea
        <br />
        to <em className="serif-it font-normal text-brand-600">impact.</em>
      </WorldTransition>

      {/* 6 · Work — horizontal (workshop world) */}
      <Work />

      {/* 7 · LevelUP — pinned product story (workshop world) */}
      <LevelUp />

      {/* 8 · Transition — cover into the method world */}
      <WorldTransition
        id="wc3"
        variant="cover"
        theme="coal"
        accent="lime"
        label={WORLD_TRANSITIONS.wc3.label}
        scramble={WORLD_TRANSITIONS.wc3.scramble}
        keepScrolling
      >
        Four moves.
        <br />
        <em className="serif-it font-normal text-lime">Zero</em> hand-offs.
      </WorldTransition>

      {/* 9 + 10 · Process & stats (method world) */}
      <Process />

      {/* 11 · Principles (method world) */}
      <Principles />

      {/* 12 · Transition — circle portal into the voices world */}
      <WorldTransition
        id="wc4"
        variant="circle"
        theme="paper"
        accent="brand"
        label={WORLD_TRANSITIONS.wc4.label}
        scramble={WORLD_TRANSITIONS.wc4.scramble}
      >
        Proof, not
        <br />
        <em className="serif-it font-normal text-brand-600">promises.</em>
      </WorldTransition>

      {/* 13 · Stories (voices world) */}
      <Testimonials />

      {/* 14 · Updates (voices world) */}
      <Updates updates={updates} />

      {/* 15 · CTA + footer (finale world) — rendered in the root layout */}
    </>
  )
}
