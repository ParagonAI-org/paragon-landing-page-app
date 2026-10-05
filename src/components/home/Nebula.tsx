'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { glState } from './gl-state'

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

const FRAG = `
  precision mediump float;
  uniform vec2 uRes; uniform float uTime; uniform float uTheme; uniform float uVel;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.,0.)), f.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p = p*2.03 + vec2(1.7,4.1); a *= 0.5; }
    return v;
  }
  void main(){
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 q = uv * vec2(uRes.x/uRes.y, 1.0);
    float t = uTime * 0.025;
    float vel = uVel * 0.03;
    float n1 = fbm(q*2.0 + vec2(t + vel, -t*0.5 + vel*0.5));
    float n2 = fbm(q*3.0 - vec2(t*0.6, t*0.8) + n1*0.5);
    vec3 lightA = vec3(0.957,0.953,0.937);
    vec3 lightB = vec3(0.72,0.71,0.96) * 0.45;
    vec3 darkA  = vec3(0.035,0.035,0.055);
    vec3 darkB  = vec3(0.31,0.27,0.90) * 0.35;
    vec3 darkC  = vec3(0.62,0.86,0.22) * 0.08;
    vec3 base = mix(lightA, darkA, uTheme);
    vec3 neb  = mix(lightB, darkB, uTheme);
    float mask = smoothstep(0.4, 0.9, n2);
    vec3 col = base + neb * mask * 0.8;
    col += mix(vec3(0.0), darkC, uTheme) * smoothstep(0.8, 1.0, n1) * mask * 0.5;
    gl_FragColor = vec4(col, 1.0);
  }`

/**
 * Full-viewport FBM shader mist that sits behind everything and cross-fades
 * between the light (paper) and dark (ink) worlds.
 */
export default function Nebula() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)

  // Portal to <body> so the canvas sits *behind* <main> (z-10) and the footer
  useEffect(() => {
    setHost(document.body)
  }, [])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv || !host) return
    const gl = cv.getContext('webgl', { alpha: true, antialias: false })
    if (!gl) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    const resize = () => {
      cv.width = window.innerWidth * dpr
      cv.height = window.innerHeight * dpr
      gl.viewport(0, 0, cv.width, cv.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const vs = sh(gl.VERTEX_SHADER, VERT)
    const fs = sh(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL API call, not a React hook
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uTheme = gl.getUniformLocation(prog, 'uTheme')
    const uVel = gl.getUniformLocation(prog, 'uVel')

    const start = performance.now()
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const n = glState.nebula
      n.theme += (n.themeTarget - n.theme) * 0.03
      n.vel += (n.velTarget - n.vel) * 0.02
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform1f(uTheme, n.theme)
      gl.uniform1f(uVel, n.vel)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [host])

  if (!host) return null
  return createPortal(
    <canvas ref={canvasRef} className="nebula-canvas" />,
    host,
  )
}
