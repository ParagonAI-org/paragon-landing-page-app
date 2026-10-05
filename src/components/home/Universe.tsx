'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as THREE from 'three'
import { glState, universe } from './gl-state'

const SIMPLEX = `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}`

function createParticleTexture() {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 64
  const ctx = c.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(c)
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.7)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.18)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/**
 * The Three.js "universe": noise-displaced shader core, wire cage, gyro rings,
 * satellite and a particle galaxy — fixed behind the page, journeying through
 * the worlds as you scroll (choreographed from ScrollFx via gl-state).
 */
export default function Universe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)

  // Portal to <body> so the canvas sits *behind* <main> (z-10) and the footer
  useEffect(() => {
    setHost(document.body)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !host) return

    const REDUCED = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isDesktop = window.matchMedia(
      '(hover:hover) and (pointer:fine)',
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // ---------- universe ----------
    const universeGroup = new THREE.Group()
    scene.add(universeGroup)
    const coreGroup = new THREE.Group()
    universeGroup.add(coreGroup)
    const mobile = window.innerWidth < 768
    coreGroup.position.set(mobile ? 0 : 2.0, mobile ? -0.5 : 0.15, 0)
    coreGroup.scale.setScalar(mobile ? 0.8 : 1.15)

    // ---------- shader core ----------
    const coreUniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.18 },
      uColorA: { value: new THREE.Color(0x4f46e5) },
      uColorB: { value: new THREE.Color(0xa5b4fc) },
      uFresnelPow: { value: 2.2 },
    }
    const coreMat = new THREE.ShaderMaterial({
      uniforms: coreUniforms,
      vertexShader:
        SIMPLEX +
        `
        uniform float uTime; uniform float uAmp;
        varying vec3 vPos; varying float vDisp;
        void main(){
          float n = snoise(normal * 1.6 + uTime * 0.25);
          vDisp = n;
          vec3 displaced = position + normal * n * uAmp;
          vPos = (modelMatrix * vec4(displaced, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColorA; uniform vec3 uColorB; uniform float uFresnelPow;
        varying vec3 vPos; varying float vDisp;
        void main(){
          vec3 X = dFdx(vPos), Y = dFdy(vPos);
          vec3 n = normalize(cross(X, Y));
          vec3 v = normalize(cameraPosition - vPos);
          float fres = pow(1.0 - abs(dot(n, v)), uFresnelPow);
          vec3 col = mix(uColorA, uColorB, fres);
          col += uColorB * vDisp * 0.22;
          gl_FragColor = vec4(col, 1.0);
        }`,
    })
    const coreGeom = new THREE.IcosahedronGeometry(1.4, 5)
    const innerCore = new THREE.Mesh(coreGeom, coreMat)
    coreGroup.add(innerCore)

    // ---------- wire cage ----------
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
    const wireGeom = new THREE.IcosahedronGeometry(1.9, 1)
    const wireCage = new THREE.Mesh(wireGeom, wireMat)
    coreGroup.add(wireCage)

    const nodeGroup = new THREE.Group()
    const nodeGeom = new THREE.SphereGeometry(0.045, 8, 8)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x6366f1 })
    const posAttr = wireGeom.attributes.position
    for (let i = 0; i < posAttr.count; i += 3) {
      const node = new THREE.Mesh(nodeGeom, nodeMat)
      node.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i))
      nodeGroup.add(node)
    }
    coreGroup.add(nodeGroup)

    // ---------- gyro rings + satellite ----------
    const ringAMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.55,
    })
    const ringAGeom = new THREE.TorusGeometry(2.6, 0.016, 16, 120)
    const ringA = new THREE.Mesh(ringAGeom, ringAMat)
    ringA.rotation.x = Math.PI / 3
    ringA.rotation.y = Math.PI / 6
    coreGroup.add(ringA)

    const ringBMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4,
    })
    const ringBGeom = new THREE.TorusGeometry(3.1, 0.014, 16, 120)
    const ringB = new THREE.Mesh(ringBGeom, ringBMat)
    ringB.rotation.x = -Math.PI / 4
    ringB.rotation.z = Math.PI / 4
    coreGroup.add(ringB)

    const satelliteGeom = new THREE.SphereGeometry(0.075, 12, 12)
    const satellite = new THREE.Mesh(
      satelliteGeom,
      new THREE.MeshBasicMaterial({ color: 0xd8ff3e }),
    )
    coreGroup.add(satellite)

    // ---------- particle galaxy ----------
    const particleCount = window.innerWidth < 768 ? 600 : 1300
    const particleGeom = new THREE.BufferGeometry()
    const pPos = new Float32Array(particleCount * 3)
    const pSeed = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 2.5 + Math.random() * 8.5
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI
      pPos[i3] = radius * Math.cos(phi) * Math.cos(theta)
      pPos[i3 + 1] = radius * Math.sin(phi)
      pPos[i3 + 2] = radius * Math.cos(phi) * Math.sin(theta)
      pSeed[i] = Math.random() * 100
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    particleGeom.setAttribute('aSeed', new THREE.BufferAttribute(pSeed, 1))

    const particleTex = createParticleTexture()
    const particleUniforms = {
      uTime: { value: 0 },
      uWarp: { value: 0 },
      uSize: { value: 0.12 },
      uColor: { value: new THREE.Color(0x4f46e5) },
      uOpacity: { value: 0.5 },
      uTex: { value: particleTex },
    }
    const particleMat = new THREE.ShaderMaterial({
      uniforms: particleUniforms,
      vertexShader: `
        attribute float aSeed;
        uniform float uTime; uniform float uWarp; uniform float uSize;
        varying float vTwinkle;
        void main(){
          vec3 p = position;
          p.y += sin(uTime * (0.6 + fract(aSeed) * 0.8) + aSeed) * 0.22;
          p.x += uWarp * sin(aSeed) * 2.2;
          vTwinkle = 0.55 + 0.45 * sin(uTime * (1.5 + fract(aSeed * 7.0)) + aSeed * 3.0);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float size = uSize * (1.0 + uWarp * 1.6) * (0.7 + 0.6 * fract(aSeed * 13.0));
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform float uOpacity; uniform sampler2D uTex;
        varying float vTwinkle;
        void main(){
          float a = texture2D(uTex, gl_PointCoord).a * uOpacity * vTwinkle;
          gl_FragColor = vec4(uColor, a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeom, particleMat)
    universeGroup.add(particles)

    // ---------- lights ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const pLight1 = new THREE.PointLight(0x4f46e5, 3.2, 25)
    pLight1.position.set(4, 3, 3)
    scene.add(pLight1)
    const pLight2 = new THREE.PointLight(0xd8ff3e, 1.8, 25)
    pLight2.position.set(-4, -3, 2)
    scene.add(pLight2)

    // ---------- theme shift ----------
    const set3DTheme = (isDark: boolean) => {
      const d = 1.4
      glState.nebula.themeTarget = isDark ? 1 : 0
      if (isDark) {
        gsap.to(coreUniforms.uColorA.value, {
          r: 0x63 / 255,
          g: 0x66 / 255,
          b: 0xf1 / 255,
          duration: d,
        })
        gsap.to(coreUniforms.uColorB.value, {
          r: 0xd8 / 255,
          g: 0xff / 255,
          b: 0x3e / 255,
          duration: d,
        })
        gsap.to(wireMat.color, {
          r: 0xd8 / 255,
          g: 0xff / 255,
          b: 0x3e / 255,
          opacity: 0.32,
          duration: d,
        })
        gsap.to(ringBMat.color, {
          r: 0xd8 / 255,
          g: 0xff / 255,
          b: 0x3e / 255,
          duration: d,
        })
        gsap.to(particleUniforms.uColor.value, {
          r: 0xd8 / 255,
          g: 0xff / 255,
          b: 0x3e / 255,
          duration: d,
        })
        gsap.to(particleUniforms.uOpacity, { value: 0.7, duration: d })
        gsap.to(pLight2, { intensity: 3.8, duration: d })
      } else {
        gsap.to(coreUniforms.uColorA.value, {
          r: 0x4f / 255,
          g: 0x46 / 255,
          b: 0xe5 / 255,
          duration: d,
        })
        gsap.to(coreUniforms.uColorB.value, {
          r: 0xa5 / 255,
          g: 0xb4 / 255,
          b: 0xfc / 255,
          duration: d,
        })
        gsap.to(wireMat.color, {
          r: 0x4f / 255,
          g: 0x46 / 255,
          b: 0xe5 / 255,
          opacity: 0.28,
          duration: d,
        })
        gsap.to(ringBMat.color, {
          r: 0x81 / 255,
          g: 0x8c / 255,
          b: 0xf8 / 255,
          duration: d,
        })
        gsap.to(particleUniforms.uColor.value, {
          r: 0x4f / 255,
          g: 0x46 / 255,
          b: 0xe5 / 255,
          duration: d,
        })
        gsap.to(particleUniforms.uOpacity, { value: 0.5, duration: d })
        gsap.to(pLight2, { intensity: 1.8, duration: d })
      }
    }

    universe.current = {
      universeGroup,
      coreGroup,
      innerCore,
      wireCage,
      wireMat,
      ringA,
      ringAMat,
      ringB,
      ringBMat,
      satellite,
      coreUniforms: coreUniforms as unknown as Record<
        string,
        { value: unknown }
      >,
      particleUniforms: particleUniforms as unknown as Record<
        string,
        { value: unknown }
      >,
      particles,
      pLight1,
      pLight2,
      set3DTheme,
    }

    // ---------- mouse parallax ----------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    if (isDesktop) window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // ---------- render loop ----------
    const clock = new THREE.Clock()
    let raf = 0
    const animate3D = () => {
      raf = requestAnimationFrame(animate3D)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      const STATE = glState.STATE
      STATE.warp += (STATE.warpTarget - STATE.warp) * 0.04
      STATE.vel += (STATE.velTarget - STATE.vel) * 0.03
      STATE.velTarget *= 0.94
      glState.nebula.velTarget = STATE.vel
      glState.nebula.vel +=
        (glState.nebula.velTarget - glState.nebula.vel) * 0.02

      if (!REDUCED) {
        const speedBoost = 1 + STATE.warp * 4 + Math.abs(STATE.vel) * 0.01
        innerCore.rotation.x += 0.3 * delta * speedBoost
        innerCore.rotation.y += 0.4 * delta * speedBoost
        wireCage.rotation.x -= 0.12 * delta * speedBoost
        wireCage.rotation.y -= 0.18 * delta * speedBoost
        ringA.rotation.z += 0.35 * delta * speedBoost
        ringB.rotation.y += 0.25 * delta * speedBoost
        universeGroup.rotation.y += STATE.warp * delta * 0.8
        coreUniforms.uTime.value = time
        coreUniforms.uAmp.value =
          0.18 + STATE.warp * 0.25 + Math.min(0.1, Math.abs(STATE.vel) * 0.003)
        particleUniforms.uTime.value = time
        particleUniforms.uWarp.value = STATE.warp

        satellite.position.x = Math.cos(time * 1.8) * 3.1
        satellite.position.y =
          Math.sin(time * 1.8) * 3.1 * Math.sin(Math.PI / 4)
        satellite.position.z =
          Math.sin(time * 1.8) * 3.1 * Math.cos(Math.PI / 4)

        mouse.x += (mouse.targetX - mouse.x) * 0.03
        mouse.y += (mouse.targetY - mouse.y) * 0.03
        universeGroup.rotation.y +=
          (mouse.x * 0.2 - universeGroup.rotation.y) * 0.015
        universeGroup.rotation.x +=
          (-mouse.y * 0.15 - universeGroup.rotation.x) * 0.015
      }
      renderer.render(scene, camera)
    }
    animate3D()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      universe.current = null
      renderer.dispose()
      coreGeom.dispose()
      wireGeom.dispose()
      nodeGeom.dispose()
      nodeMat.dispose()
      wireMat.dispose()
      coreMat.dispose()
      ringAGeom.dispose()
      ringBGeom.dispose()
      ringAMat.dispose()
      ringBMat.dispose()
      satelliteGeom.dispose()
      particleGeom.dispose()
      particleMat.dispose()
      particleTex.dispose()
    }
  }, [host])

  if (!host) return null
  return createPortal(<canvas ref={canvasRef} className="webgl-canvas" />, host)
}
