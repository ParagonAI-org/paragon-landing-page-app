'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'
import { Vector2 } from 'three'

import { AsciiEffect } from './ascii-effect'

// Earth's axial tilt is ~23.4° (0.408 rad) — use a noticeable forward lean.
const TILT_X = 0.4

const HeroObject = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) {
      return
    }

    // Octahedron stands upright, tilted forward like Earth, spinning on Y.
    meshRef.current.rotation.x = TILT_X
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.35
    meshRef.current.rotation.z = 0
  })

  return (
    <mesh
      ref={meshRef}
      scale={1.6}
      rotation={[TILT_X, 0, 0]}
      position={[0, 0, 0]}
    >
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color="#917aff"
        roughness={0.3}
        metalness={0.1}
        flatShading
      />
    </mesh>
  )
}

export function EffectScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState(new Vector2(0, 0))
  const [resolution, setResolution] = useState(new Vector2(1920, 1080))

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const updateBounds = () => {
      const rect = container.getBoundingClientRect()
      setResolution(new Vector2(rect.width, rect.height))
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = rect.height - (event.clientY - rect.top)
      setMousePos(new Vector2(x, y))
    }

    updateBounds()
    container.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', updateBounds)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateBounds)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', overflow: 'visible' }}
      >
        {/* Front key light coming from the top-left, like the doc. */}
        <hemisphereLight intensity={0.45} />
        <directionalLight position={[-4, 4, 5]} intensity={2.4} />
        <directionalLight position={[3, 1, 4]} intensity={0.8} />

        <HeroObject />

        <EffectComposer>
          <AsciiEffect
            style="standard"
            cellSize={9}
            invert={false}
            color={true}
            resolution={resolution}
            mousePos={mousePos}
            postfx={{
              scanlineIntensity: 0,
              scanlineCount: 200,
              targetFPS: 0,
              jitterIntensity: 0,
              jitterSpeed: 1,
              mouseGlowEnabled: false,
              mouseGlowRadius: 200,
              mouseGlowIntensity: 1.5,
              vignetteIntensity: 0,
              vignetteRadius: 0.8,
              colorPalette: 0,
              curvature: 0,
              aberrationStrength: 0,
              noiseIntensity: 0,
              noiseScale: 1,
              noiseSpeed: 1,
              waveAmplitude: 0,
              waveFrequency: 10,
              waveSpeed: 1,
              glitchIntensity: 0,
              glitchFrequency: 0,
              brightnessAdjust: 0,
              contrastAdjust: 1,
            }}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
