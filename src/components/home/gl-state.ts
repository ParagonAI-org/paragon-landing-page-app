/**
 * Shared mutable state bridging the WebGL layers (nebula backdrop + Three.js
 * universe) with the scroll choreography — mirrors the design's module-level
 * `STATE` / `window.__nebula` globals.
 */

export const glState = {
  /** scroll-reactive warp/velocity, damped in the universe render loop */
  STATE: { warp: 0, warpTarget: 0, vel: 0, velTarget: 0 },
  /** nebula shader uniforms state */
  nebula: { theme: 0, themeTarget: 0, vel: 0, velTarget: 0 },
  /**
   * Universe placement scale for the current viewport (0.75 mobile / 1.2
   * desktop), set by <Universe/> at init. HeroIntro spawns the core from ~0 up
   * to this value, so the orb never paints at full size before the spawn
   * begins.
   */
  universe: { homeScale: 1.2 },
}

export type OrbPalette = 'indigo' | 'lime' | 'emerald'

export type UniverseRefs = {
  universeGroup: import('three').Group
  coreGroup: import('three').Group
  innerCore: import('three').Mesh
  wireCage: import('three').Mesh
  wireMat: import('three').MeshBasicMaterial
  ringA: import('three').Mesh
  ringAMat: import('three').MeshBasicMaterial
  ringB: import('three').Mesh
  ringBMat: import('three').MeshBasicMaterial
  satellite: import('three').Mesh
  coreUniforms: Record<string, { value: unknown }>
  particleUniforms: Record<string, { value: unknown }>
  particles: import('three').Points
  pLight1: import('three').PointLight
  pLight2: import('three').PointLight
  set3DTheme: (isDark: boolean, backdrop?: boolean) => void
  setOrbPalette: (palette: OrbPalette, backdrop?: boolean) => void
}

/** Populated by <Universe/> while it is mounted (home page only). */
export const universe: { current: UniverseRefs | null } = { current: null }
