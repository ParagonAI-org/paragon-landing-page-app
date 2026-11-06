import Hero from '@/components/home/Hero'
import HeroIntro from '@/components/home/HeroIntro'
import { getCachedHomepage } from '@/lib/data'
import { HERO, type HeroDockCard } from '@/lib/home-content'
import type { Homepage } from '@/payload-types'

async function getHomepage(): Promise<Homepage | null> {
  try {
    return await getCachedHomepage()
  } catch {
    // CMS unreachable — render with the built-in design content
    return null
  }
}

export default async function Home() {
  const cms = await getHomepage()

  // CMS-over-constants merge: every field falls back to the design content,
  // so an empty (or unreachable) global renders the page exactly as designed.
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
          cta: {
            label: d.ctaLabel ?? '',
            href:
              d.ctaHref ||
              (d.theme === 'brand' ? '/products/levelup' : '/contact-us'),
          },
        }
      })
    : HERO.dock

  return (
    <>
      {/* HeroIntro mounts the hero reveal + orb spawn */}
      <HeroIntro />

      {/*
        The landing page is deliberately a single screen: the bento stack and
        orb sit inside the hero, and the compact footer closes the same viewport.
        The full sections live in src/_archive/home/; the large footer used by
        the other routes is skipped on this page by <Footer/>.
      */}
      <Hero
        copy={heroCopy}
        primary={heroPrimary}
        secondary={heroSecondary}
        dock={heroDock}
      />
    </>
  )
}
