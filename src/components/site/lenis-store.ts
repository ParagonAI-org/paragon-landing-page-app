'use client'

import type Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function getLenis() {
  return lenisInstance
}

export function scrollToTarget(
  target: string | HTMLElement | number,
  offset = -20,
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target as never, {
      offset,
      duration: 1.5,
      easing: (t: number) => 1 - (1 - t) ** 4,
    })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
