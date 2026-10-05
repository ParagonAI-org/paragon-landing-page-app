'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { BOOT_EVENT } from '@/components/site/Preloader'
import { glState, universe } from './gl-state'

gsap.registerPlugin(ScrollTrigger)

const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEF0123456789'

function scramble(el: HTMLElement, finalText: string, dur: number) {
  const start = performance.now()
  const frame = () => {
    const p = Math.min(1, (performance.now() - start) / dur)
    let out = ''
    for (let i = 0; i < finalText.length; i++) {
      out +=
        i / finalText.length < p
          ? finalText[i]
          : finalText[i] === ' '
            ? ' '
            : CHARS[Math.floor(Math.random() * CHARS.length)]
    }
    el.textContent = out
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

/** Wrap every word of the manifesto in .mword spans (keeps inline elements). */
function splitWords(el: HTMLElement) {
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment()
        ch.textContent
          ?.split(/\s+/)
          .filter(Boolean)
          .forEach((w) => {
            const s = document.createElement('span')
            s.className = 'mword'
            s.textContent = w
            frag.appendChild(s)
          })
        node.replaceChild(frag, ch)
      } else if (ch.nodeType === 1) {
        walk(ch)
      }
    })
  }
  walk(el)
}

/**
 * The full scroll choreography for the landing page: preloader hand-off and
 * hero intro, world transitions, horizontal work pin, LevelUP pinned story,
 * process stack, marquees, counters, 3D journey + theme shifts, magnetic
 * buttons, tilts and hover previews.
 */
export default function ScrollFx() {
  const bootedRef = useRef(false)

  useEffect(() => {
    const REDUCED = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isDesktop = window.matchMedia(
      '(hover:hover) and (pointer:fine)',
    ).matches
    if (REDUCED) {
      document.documentElement.classList.add('reduced')
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        el.textContent = Number(el.dataset.count).toLocaleString()
      })
      return
    }

    // ---------- initial hidden states (under the preloader) ----------
    gsap.set('.hline > span', { y: '112%', rotate: 2 })
    gsap.set('#heroMeta, #heroCopy', { opacity: 0, y: 26 })
    gsap.set('#nav', { opacity: 0 })

    const mm = gsap.matchMedia()
    const cleanupFns: Array<() => void> = []
    const ctx = gsap.context(() => {
      /* ---------- progress ---------- */
      gsap.to('#progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      /* ---------- hero parallax out ---------- */
      gsap.to('#heroImgWrap', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('#hero h1', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* ---------- hero marquee + scroll velocity ---------- */
      const mq1 = document.getElementById('mq1')
      let mqTween: gsap.core.Tween | null = null
      if (mq1) {
        mqTween = gsap.to(mq1, {
          xPercent: -50,
          duration: 24,
          ease: 'none',
          repeat: -1,
        })
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(
              0,
              3.5,
              Math.abs(self.getVelocity()) / 280,
            )
            gsap.to(mqTween as gsap.core.Tween, {
              timeScale: 1 + v,
              duration: 0.5,
              overwrite: 'auto',
            })
          },
        })
      }

      /* ---------- world transitions ---------- */
      const buildWorldChange = (
        id: string,
        opts: { type: 'cover' | 'circle'; warp: number },
      ) => {
        const section = document.querySelector(id)
        const panel = document.querySelector(`${id} .wc-panel`)
        const inner = document.querySelector(`${id} .wc-inner`)
        if (!section || !panel || !inner) return

        if (opts.type === 'cover') {
          gsap.fromTo(
            panel,
            { yPercent: 100, scale: 1.05 },
            {
              yPercent: 0,
              scale: 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: id,
                start: 'top bottom',
                end: 'top top',
                scrub: 1.2,
              },
            },
          )
          const prev = section.previousElementSibling
          if (prev?.classList.contains('section-zoom')) {
            gsap.fromTo(
              prev,
              { scale: 1, opacity: 1 },
              {
                scale: 0.95,
                opacity: 0.7,
                ease: 'power2.in',
                scrollTrigger: {
                  trigger: id,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: 1.2,
                },
              },
            )
          }
          gsap.fromTo(
            inner,
            { y: 70, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: id,
                start: 'top 55%',
                end: 'top 5%',
                scrub: 1.2,
              },
            },
          )
        } else {
          gsap.fromTo(
            panel,
            { clipPath: 'circle(5.5% at 50% 55%)', scale: 0.9 },
            {
              clipPath: 'circle(142% at 50% 55%)',
              scale: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: id,
                start: 'top bottom',
                end: 'top -10%',
                scrub: 1.5,
              },
            },
          )
          gsap.fromTo(
            inner,
            { scale: 0.85, opacity: 0, y: 60 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: id,
                start: 'top 45%',
                end: 'top -5%',
                scrub: 1.2,
              },
            },
          )
          const next = section.nextElementSibling
          if (next?.classList.contains('section-zoom')) {
            gsap.fromTo(
              next,
              { scale: 1.05, opacity: 0.7 },
              {
                scale: 1,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: id,
                  start: 'top 20%',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              },
            )
          }
        }

        // warp boost through the portal
        ScrollTrigger.create({
          trigger: id,
          start: 'top bottom',
          end: 'top top',
          scrub: 1.5,
          onUpdate: (self) => {
            glState.STATE.warpTarget =
              Math.sin(self.progress * Math.PI) * opts.warp
          },
        })

        // scramble the status line
        const scr = section.querySelector<HTMLElement>('.wc-scr')
        if (scr) {
          const final = scr.textContent ?? ''
          ScrollTrigger.create({
            trigger: id,
            start: 'top 60%',
            once: true,
            onEnter: () => scramble(scr, final, 1400),
          })
        }
      }

      buildWorldChange('#wc1', { type: 'cover', warp: 0.8 })
      buildWorldChange('#wc2', { type: 'circle', warp: 1.0 })
      buildWorldChange('#wc3', { type: 'cover', warp: 0.8 })
      buildWorldChange('#wc4', { type: 'circle', warp: 1.0 })

      /* ---------- manifesto word scrub ---------- */
      const mtext = document.getElementById('mtext')
      if (mtext) {
        splitWords(mtext)
        gsap.to('#mtext .mword', {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '#manifesto',
            start: 'top 75%',
            end: 'center 45%',
            scrub: 0.5,
          },
        })
      }

      /* ---------- generic reveals ---------- */
      gsap.utils.toArray<HTMLElement>('[data-rv]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      /* ---------- parallax images ---------- */
      gsap.utils.toArray<HTMLElement>('[data-prlx]').forEach((el) => {
        const img = el.querySelector('img') ?? el
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      /* ---------- 3D world journey ---------- */
      const u = universe.current
      if (u) {
        const mobile = window.innerWidth < 768
        // studio world: core centers + expands
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '#manifesto',
              start: 'top bottom',
              end: 'center center',
              scrub: 1.5,
            },
          })
          .to(u.coreGroup.position, { x: 0, y: 0, z: 1.2 })
          .to(u.coreGroup.scale, { x: 1.4, y: 1.4, z: 1.4 }, '<')

        // studio -> services: core glides left
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '#services',
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1.5,
            },
          })
          .to(u.coreGroup.position, { x: mobile ? 0 : -2.4, y: -0.2, z: 0.1 })
          .to(u.coreGroup.scale, { x: 1.0, y: 1.0, z: 1.0 }, '<')
          .to(u.coreGroup.rotation, { z: 0.65 }, '<')

        // theme per world
        ScrollTrigger.create({
          trigger: '#wc1',
          start: 'top 40%',
          onEnter: () => u.set3DTheme(true),
          onLeaveBack: () => u.set3DTheme(false),
        })
        ScrollTrigger.create({
          trigger: '#wc2',
          start: 'top 40%',
          onEnter: () => u.set3DTheme(false),
          onLeaveBack: () => u.set3DTheme(true),
        })
        ScrollTrigger.create({
          trigger: '#wc3',
          start: 'top 40%',
          onEnter: () => u.set3DTheme(true),
          onLeaveBack: () => u.set3DTheme(false),
        })
        ScrollTrigger.create({
          trigger: '#wc4',
          start: 'top 40%',
          onEnter: () => u.set3DTheme(false),
          onLeaveBack: () => u.set3DTheme(true),
        })
        ScrollTrigger.create({
          trigger: '#contact',
          start: 'top 75%',
          onEnter: () => u.set3DTheme(true),
          onLeaveBack: () => u.set3DTheme(false),
        })

        // workshop -> levelup: core right
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '#levelup',
              start: 'top 75%',
              end: 'top 20%',
              scrub: 1.5,
            },
          })
          .to(u.coreGroup.position, { x: mobile ? 0 : 2.1, y: 0, z: 0.3 })
          .to(u.coreGroup.scale, { x: 1.15, y: 1.15, z: 1.15 }, '<')
          .to(u.coreGroup.rotation, { z: -0.3 }, '<')

        // method -> voices: core recedes high
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '#stories',
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1.5,
            },
          })
          .to(u.coreGroup.position, { x: 0, y: 1.6, z: -1.5 })
          .to(u.coreGroup.scale, { x: 0.85, y: 0.85, z: 0.85 }, '<')
          .to(u.coreGroup.rotation, { z: 0 }, '<')

        // finale: core rises as monumental portal
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 1.8,
            },
          })
          .to(u.coreGroup.position, { x: 0, y: -1.3, z: 1.1 })
          .to(u.coreGroup.scale, { x: 2.2, y: 2.2, z: 2.2 }, '<')
          .to(u.coreGroup.rotation, { x: 0.5, y: Math.PI }, '<')
      }

      /* ---------- horizontal work ---------- */
      mm.add('(min-width: 768px)', () => {
        const track = document.getElementById('hTrack')
        if (!track) return
        const amt = () =>
          Math.max(
            0,
            track.scrollWidth - window.innerWidth + window.innerWidth * 0.06,
          )
        const tween = gsap.to(track, {
          x: () => -amt(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#work',
            start: 'top top',
            end: () => `+=${amt()}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const prog = document.getElementById('hProg')
              const count = document.getElementById('hCount')
              if (prog) prog.style.width = `${self.progress * 100}%`
              if (count)
                count.textContent = `${String(
                  Math.min(5, Math.floor(self.progress * 4.999) + 1),
                ).padStart(2, '0')} / 05`
              const u2 = universe.current
              if (u2) {
                u2.coreGroup.rotation.y = self.progress * Math.PI * 4
                u2.particles.position.x = -self.progress * 3.5
              }
            },
          },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      /* ---------- LevelUP pinned story ---------- */
      mm.add('(min-width: 768px)', () => {
        const chapters = gsap.utils.toArray<HTMLElement>('.lvl-ch')
        const dots = gsap.utils.toArray<HTMLElement>('#lvlDots .lvl-dot')
        if (!chapters.length) return
        gsap.set(chapters[0], { autoAlpha: 1 })
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#levelup',
            start: 'top top',
            end: '+=260%',
            scrub: 1.2,
            pin: '#lvlPin',
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(2, Math.floor(self.progress * 2.999))
              dots.forEach((d, i) => {
                d.classList.toggle('bg-brand-600', i === idx)
                d.classList.toggle('bg-ink/15', i !== idx)
              })
            },
          },
        })
        tl.to('#lvlImg', { scale: 1.12, duration: 1, ease: 'none' }, 0)
          .to(
            '#lvlImgBox',
            { rotation: -1.5, y: -10, duration: 1, ease: 'none' },
            0,
          )
          .to(
            chapters[0],
            { autoAlpha: 0, y: -30, duration: 0.35, ease: 'power2.in' },
            0.8,
          )
          .fromTo(
            chapters[1],
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
            1.05,
          )
          .to(
            '#lvlImg',
            { scale: 1.2, xPercent: -3, duration: 1, ease: 'none' },
            0.8,
          )
          .to(
            chapters[1],
            { autoAlpha: 0, y: -30, duration: 0.35, ease: 'power2.in' },
            1.8,
          )
          .fromTo(
            chapters[2],
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
            2.05,
          )
          .to(
            '#lvlImg',
            { scale: 1.08, xPercent: 3, duration: 1, ease: 'none' },
            1.8,
          )
          .to(
            '#lvlImgBox',
            { rotation: 1.2, y: 0, duration: 1, ease: 'none' },
            1.8,
          )
        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
          gsap.set(chapters, { clearProps: 'all' })
        }
      })

      /* ---------- process stack cards + gyro calibration ---------- */
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card')
      cards.forEach((c, i) => {
        gsap.set(c, { top: 90 + i * 26 })
        ScrollTrigger.create({
          trigger: c,
          start: 'top 60%',
          onEnter: () => {
            const u2 = universe.current
            if (!u2) return
            gsap.to(u2.ringA.rotation, {
              z: (i + 1) * Math.PI * 0.5,
              duration: 1.4,
              ease: 'power2.out',
            })
            gsap.to(u2.ringB.rotation, {
              x: (i + 1) * Math.PI * 0.5,
              duration: 1.4,
              ease: 'power2.out',
            })
          },
        })
        if (i === cards.length - 1) return
        gsap.to(c, {
          scale: 0.94,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top+=120',
            scrub: 1.2,
          },
        })
      })

      /* ---------- counters ---------- */
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            const target = parseFloat(el.dataset.count ?? '0')
            const o = { v: 0 }
            gsap.to(o, {
              v: target,
              duration: 2.0,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(o.v).toLocaleString()
              },
            })
          },
        })
      })

      /* ---------- testimonial marquee ---------- */
      const tm = document.getElementById('tmMq')
      if (tm)
        gsap.to(tm, {
          xPercent: -33.333,
          duration: 45,
          ease: 'none',
          repeat: -1,
        })

      /* ---------- footer giant ---------- */
      gsap.fromTo(
        '.giant',
        { xPercent: 4, fontWeight: 300 },
        {
          xPercent: -4,
          fontWeight: 650,
          ease: 'none',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )

      /* ---------- updates rows entrance ---------- */
      gsap.fromTo(
        '#upList .up-row',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#upList', start: 'top 85%', once: true },
        },
      )

      /* ---------- service hover: preview + 3D pulse ---------- */
      const prev = document.getElementById('svcPreview')
      if (prev) {
        const img = prev.querySelector('img')
        const xTo = isDesktop
          ? gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3' })
          : null
        const yTo = isDesktop
          ? gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3' })
          : null

        document.querySelectorAll<HTMLElement>('.svc').forEach((svc, index) => {
          const onEnter = () => {
            if (isDesktop && img) {
              img.src = svc.dataset.img ?? ''
              gsap.to(prev, {
                opacity: 1,
                scale: 1,
                rotate: gsap.utils.random(-3, 3),
                duration: 0.5,
                ease: 'power3.out',
              })
            }
            const u2 = universe.current
            if (u2) {
              gsap.to(u2.coreGroup.scale, {
                x: 1.25,
                y: 1.25,
                z: 1.25,
                duration: 0.4,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out',
              })
              gsap.to(u2.innerCore.rotation, {
                x: `+=${0.7 + index * 0.2}`,
                y: `+=${0.5 + index * 0.2}`,
                duration: 0.9,
                ease: 'back.out(1.5)',
              })
              gsap.to(u2.pLight1, {
                intensity: 5.0,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
              })
            }
          }
          const onLeave = () => {
            if (isDesktop)
              gsap.to(prev, { opacity: 0, scale: 0.85, duration: 0.4 })
          }
          const onMove = (e: MouseEvent) => {
            xTo?.(e.clientX - 150)
            yTo?.(e.clientY - 100)
          }
          svc.addEventListener('mouseenter', onEnter)
          svc.addEventListener('mouseleave', onLeave)
          if (isDesktop) svc.addEventListener('mousemove', onMove)
          cleanupFns.push(() => {
            svc.removeEventListener('mouseenter', onEnter)
            svc.removeEventListener('mouseleave', onLeave)
            svc.removeEventListener('mousemove', onMove)
          })
        })
      }

      /* ---------- 3d card tilts ---------- */
      if (isDesktop) {
        document
          .querySelectorAll<HTMLElement>('[data-tilt-3d]')
          .forEach((card) => {
            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width - 0.5
              const y = (e.clientY - rect.top) / rect.height - 0.5
              gsap.to(card, {
                rotateY: x * 12,
                rotateX: -y * 12,
                transformPerspective: 1000,
                ease: 'power2.out',
                duration: 0.6,
              })
            }
            const onLeave = () =>
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: 'power3.out',
                duration: 0.9,
              })
            card.addEventListener('mousemove', onMove)
            card.addEventListener('mouseleave', onLeave)
            cleanupFns.push(() => {
              card.removeEventListener('mousemove', onMove)
              card.removeEventListener('mouseleave', onLeave)
            })
          })
      }

      /* ---------- magnetic buttons ---------- */
      if (isDesktop) {
        document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
          const xTo = gsap.quickTo(btn, 'x', {
            duration: 0.45,
            ease: 'power3',
          })
          const yTo = gsap.quickTo(btn, 'y', {
            duration: 0.45,
            ease: 'power3',
          })
          const onMove = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect()
            xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
            yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
          }
          const onLeave = () => {
            xTo(0)
            yTo(0)
          }
          btn.addEventListener('mousemove', onMove)
          btn.addEventListener('mouseleave', onLeave)
          cleanupFns.push(() => {
            btn.removeEventListener('mousemove', onMove)
            btn.removeEventListener('mouseleave', onLeave)
          })
        })
      }

      /* ---------- updates thumbs ---------- */
      document.querySelectorAll<HTMLElement>('.up-row').forEach((row) => {
        const th = row.querySelector<HTMLElement>('.thumb')
        if (!th) return
        const onEnter = () =>
          gsap.to(th, {
            opacity: 1,
            rotate: 2.5,
            scale: 1,
            duration: 0.55,
            ease: 'power3.out',
          })
        const onLeave = () =>
          gsap.to(th, { opacity: 0, rotate: -3, scale: 0.8, duration: 0.4 })
        row.addEventListener('mouseenter', onEnter)
        row.addEventListener('mouseleave', onLeave)
        cleanupFns.push(() => {
          row.removeEventListener('mouseenter', onEnter)
          row.removeEventListener('mouseleave', onLeave)
        })
      })
    })

    // ---------- hero intro on preloader hand-off ----------
    let heroTl: gsap.core.Timeline | null = null
    const onBoot = () => {
      if (bootedRef.current) return
      bootedRef.current = true
      heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      heroTl
        .to('.hline > span', { y: 0, rotate: 0, duration: 1.2, stagger: 0.12 })
        .to('#heroMeta', { opacity: 1, y: 0, duration: 0.8 }, '-=.8')
        .to('#heroCopy', { opacity: 1, y: 0, duration: 0.9 }, '-=.7')
        .to(
          '.hero-img',
          { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut' },
          '-=.9',
        )
        .fromTo(
          '.hero-img img',
          { scale: 1.35 },
          { scale: 1.1, duration: 1.6, ease: 'power3.out' },
          '<',
        )
        .fromTo(
          '#nav',
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=1.1',
        )
        .fromTo(
          '#heroStrip',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=.8',
        )

      const u = universe.current
      if (u) {
        gsap.from(u.coreGroup.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
          duration: 2.0,
          ease: 'elastic.out(1, 0.75)',
        })
      }
    }
    window.addEventListener(BOOT_EVENT, onBoot)
    // safety net if the preloader never mounts/fires
    const bootFallback = window.setTimeout(onBoot, 7000)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener(BOOT_EVENT, onBoot)
      window.clearTimeout(bootFallback)
      window.removeEventListener('load', onLoad)
      heroTl?.kill()
      cleanupFns.forEach((fn) => {
        fn()
      })
      mm.revert()
      ctx?.revert()
    }
  }, [])

  return <div id="progress" className="scroll-progress" aria-hidden="true" />
}
