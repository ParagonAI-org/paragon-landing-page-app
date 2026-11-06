'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * The shipped artwork is named after its colour, not the browser theme:
 * `favicon-dark.*` is the ink mark (for light chrome), `favicon-light.*` is
 * the white mark (for dark chrome).
 */
const FAVICON_SETS = {
  light: {
    icon: '/favicon-dark.svg',
    png: '/favicon-dark-96x96.png',
    apple: '/apple-touch-icon-dark.png',
    manifest: '/site-light.webmanifest',
    themeColor: '#F4F3EF',
  },
  dark: {
    icon: '/favicon-light.svg',
    png: '/favicon-light-96x96.png',
    apple: '/apple-touch-icon-light.png',
    manifest: '/site-dark.webmanifest',
    themeColor: '#0A0A0F',
  },
} as const

type Theme = keyof typeof FAVICON_SETS

const getResolvedTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light'
  const root = document.documentElement
  if (root.classList.contains('dark')) return 'dark'
  if (root.classList.contains('light')) return 'light'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

const applyFaviconTheme = (theme: Theme) => {
  const set = FAVICON_SETS[theme]
  const head = document.head
  if (!head) return

  let iconLink = document.querySelector<HTMLLinkElement>(
    'link#dynamic-favicon-icon',
  )
  if (!iconLink) {
    iconLink = document.createElement('link')
    iconLink.id = 'dynamic-favicon-icon'
    iconLink.rel = 'icon'
    iconLink.type = 'image/svg+xml'
    head.appendChild(iconLink)
  }
  iconLink.href = set.icon

  let pngLink = document.querySelector<HTMLLinkElement>(
    'link#dynamic-favicon-png',
  )
  if (!pngLink) {
    pngLink = document.createElement('link')
    pngLink.id = 'dynamic-favicon-png'
    pngLink.rel = 'alternate icon'
    pngLink.type = 'image/png'
    pngLink.sizes = '96x96'
    head.appendChild(pngLink)
  }
  pngLink.href = set.png

  let appleLink = document.querySelector<HTMLLinkElement>(
    'link#dynamic-favicon-apple',
  )
  if (!appleLink) {
    appleLink = document.createElement('link')
    appleLink.id = 'dynamic-favicon-apple'
    appleLink.rel = 'apple-touch-icon'
    appleLink.sizes = '180x180'
    head.appendChild(appleLink)
  }
  appleLink.href = set.apple

  let themeMeta = document.querySelector<HTMLMetaElement>(
    'meta#dynamic-theme-color',
  )
  if (!themeMeta) {
    themeMeta = document.createElement('meta')
    themeMeta.id = 'dynamic-theme-color'
    themeMeta.name = 'theme-color'
    head.appendChild(themeMeta)
  }
  themeMeta.content = set.themeColor
}

/**
 * Theme-aware favicon swap + sub-page reveal animations.
 */
const LayoutScripts = () => {
  const pathname = usePathname()

  useEffect(() => {
    applyFaviconTheme(getResolvedTheme())

    const observer = new MutationObserver(() => {
      applyFaviconTheme(getResolvedTheme())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => applyFaviconTheme(getResolvedTheme())
    mql.addEventListener('change', onSystemChange)

    return () => {
      observer.disconnect()
      mql.removeEventListener('change', onSystemChange)
    }
  }, [])

  // Reveal-on-scroll for the sub-pages' `.reveal` elements. This must re-run
  // on every client-side navigation: the layout persists, so a mount-only
  // effect would leave the newly navigated page's content at opacity 0 until
  // a hard refresh. A MutationObserver also catches content that streams in
  // after the route commit.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger — the observer must be rebuilt for each route's new .reveal nodes
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01 },
    )

    const observe = (el: Element) => {
      if (
        el.classList.contains('reveal') &&
        !el.classList.contains('visible')
      ) {
        io.observe(el)
      }
    }

    document.querySelectorAll('.reveal').forEach(observe)

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observe(node)
            node.querySelectorAll('.reveal').forEach(observe)
          }
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [pathname])

  return null
}

export default LayoutScripts
