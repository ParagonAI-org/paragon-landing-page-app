'use client'

import { usePathname } from 'next/navigation'
import Universe from './Universe'

/**
 * The Three.js orb belongs to the landing page only. Mounting it at the body
 * level keeps its fixed canvas under <main>'s stacking context; every other
 * route skips the WebGL scene entirely.
 */
export default function UniverseGate() {
  const pathname = usePathname()
  if (pathname !== '/') return null
  return <Universe />
}
