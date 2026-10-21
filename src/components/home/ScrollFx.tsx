'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { LEVELUP } from '@/lib/home-content'
import { glState, universe } from './gl-state'

gsap.registerPlugin(ScrollTrigger)

const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEF0123456789'

function scramble(el: HTMLElement, finalText: string, dur: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = finalText
    return
  }
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
 * The scroll choreography for the landing page (mirrors new-design.html
 * lines 1647-2072): hero intro on mount — no preloader — world transitions,
 * horizontal work pin, LevelUP pinned story with chapter image swap, process
 * stack, marquees, counters, 3D journey + theme shifts, tilts and hover
 * previews.
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

    const cleanupFns: Array<() => void> = []
    const mm = gsap.matchMedia()

    /* ---------- hero intro (new-design.html heroIntro, 1711-1720) ---------- */
    const heroIntro = () => {
      // StrictMode guard: never boot twice within one mount. Cleanup resets
      // the flag so a remount reverts and replays cleanly.
      if (bootedRef.current) return
      bootedRef.current = true
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.hline > span', { y: 0, rotate: 0, duration: 1.2, stagger: 0.12 })
        .fromTo(
          '#heroMasthead',
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0 },
          '-=1.0',
        )
        .fromTo(
          '#hero .bento-card',
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.08 },
          '-=.7',
        )
        .fromTo(
          '#nav',
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=.9',
        )
        .fromTo(
          '#heroStrip',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=.7',
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

    /* ---------- world transitions (new-design.html buildWorldChange, 1722-1760) ---------- */
    const buildWorldChange = (
      id: string,
      opts: { type: 'card-lift' | 'card-zoom'; warp: number },
    ) => {
      const panel = document.querySelector(`${id} .wc-panel`)
      // /*! new-design.html: */ the design animates the whole sticky
      // .wc-panel when the aperture contains no .bento-card, so the
      // statement + rails + hairline row + corner frame glide in as one unit.
      const card = panel?.querySelector('.bento-card') ?? panel
      if (!card) return

      if (opts.type === 'card-zoom') {
        gsap.fromTo(
          card,
          { scale: 0.86, opacity: 0, y: 60 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: id,
              start: 'top 75%',
              end: 'top 20%',
              scrub: 1.2,
            },
          },
        )
      } else {
        gsap.fromTo(
          card,
          { yPercent: 45, opacity: 0, scale: 0.92 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: id,
              start: 'top 80%',
              end: 'top 25%',
              scrub: 1.2,
            },
          },
        )
      }

      // Warp the universe as the section travels into view.
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

      const scr = document.querySelector<HTMLElement>(`${id} .wc-scr`)
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

    /* ---------- initAnims (new-design.html 1762-1962) ---------- */
    const initAnims = () => {
      /* progress bar */
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
      // NOTE: nav scrolled/hide state is owned by <Navbar/>'s own scroll
      // listener — no duplicate ScrollTrigger here.

      /* hero parallax out */
      gsap.fromTo(
        '#heroMasthead',
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -6,
          opacity: 0.35,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      /* hero marquee + scroll velocity */
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

      /* world shifts with distinct smooth card aperture transitions */
      buildWorldChange('#wc1', { type: 'card-lift', warp: 0.8 })
      buildWorldChange('#wc2', { type: 'card-zoom', warp: 1.0 })
      buildWorldChange('#wc3', { type: 'card-lift', warp: 0.8 })
      buildWorldChange('#wc4', { type: 'card-zoom', warp: 1.0 })

      /* manifesto word scrub */
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

      /* generic reveals */
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

      /* 3D world journey across all sections */
      const u = universe.current
      if (u) {
        const mobile = window.innerWidth < 768

        // manifesto: core centers + expands directly behind text
        gsap
          .timeline({
            defaults: { immediateRender: false },
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
            defaults: { immediateRender: false },
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

        /*
         * Theme worlds — each section's copy decides its world's backdrop, so
         * flip the whole backdrop (nebula shader + orb palette) at these
         * boundaries. Top-to-bottom the sequence is:
         *   hero light · wc1/manifesto/services dark · wc2/work light ·
         *   levelup dark · wc3/process/stats/principles/wc4/stories/insights/
         *   contact dark.
         * Every boundary is reversible, so scrolling back up restores the
         * exact world you came from. (new-design.html 1836-1840 only ships
         * wc1/wc2/wc3/wc4/contact triggers, which leaves levelup's white copy
         * on the light work world and flips wc4 to light against its own
         * paper copy; this is the corrected set its markup implies.)
         *
         * The footer run (stories → insights → contact) stays in one dark
         * world: a light phase there would blank the orb while it recedes and
         * then pop it back when the world flips again, which reads as a glitch
         * right before the finale. The stories copy is light to match.
         */
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
          trigger: '#levelup',
          start: 'top 60%',
          onEnter: () => u.set3DTheme(true),
          onLeaveBack: () => u.set3DTheme(false),
        })
        ScrollTrigger.create({
          // Above the finale sits the dark dispatches world, so this is a
          // one-way latch — the light reset belongs to #insights' leave-back.
          trigger: '#contact',
          start: 'top 75%',
          onEnter: () => u.set3DTheme(true),
          onLeaveBack: () => u.set3DTheme(true),
        })

        // workshop -> levelup: core right
        gsap
          .timeline({
            defaults: { immediateRender: false },
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
            defaults: { immediateRender: false },
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

      /* horizontal scroll in #work (no section-zoom on the section) */
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

      /* LevelUP pinned story with chapter image swap */
      mm.add('(min-width: 768px)', () => {
        const chapters = gsap.utils.toArray<HTMLElement>('.lvl-ch')
        const dots = gsap.utils.toArray<HTMLElement>('#lvlDots .lvl-dot')
        const lvlImg = document.getElementById('lvlImg')
        // Chapter imagery comes from the LEVELUP design constant.
        const chapterImages = LEVELUP.chapterImages
        let curImg = -1
        const swapImg = (idx: number) => {
          const next = chapterImages[idx]
          if (!lvlImg || idx === curImg || !next) return
          curImg = idx
          gsap.to(lvlImg, {
            opacity: 0,
            duration: 0.28,
            ease: 'power2.in',
            onComplete: () => {
              lvlImg.setAttribute('src', next)
              gsap.to(lvlImg, {
                opacity: 1,
                duration: 0.45,
                ease: 'power2.out',
              })
            },
          })
        }
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
                d.classList.toggle('bg-lime', i === idx)
                d.classList.toggle('bg-white/20', i !== idx)
              })
              swapImg(idx)
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

      /* process stack cards + gyro calibration */
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card')
      cards.forEach((c, i) => {
        gsap.set(c, { top: 100 + i * 28 })
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
          scale: 0.93,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top+=120',
            scrub: 1.2,
          },
        })
      })

      /* counters */
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

      /* testimonials marquee (card list is rendered three times in JSX) */
      const tm = document.getElementById('tmMq')
      if (tm)
        gsap.to(tm, {
          xPercent: -33.333,
          duration: 45,
          ease: 'none',
          repeat: -1,
        })

      /* giant typography drift in footer */
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

      /* service hover: preview + 3D pulse */
      const prev = document.getElementById('svcPreview')
      if (prev) {
        const img = prev.querySelector('img')
        const xTo = isDesktop
          ? gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3' })
          : null
        const yTo = isDesktop
          ? gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3' })
          : null

        document
          .querySelectorAll<HTMLElement>('#svcList .svc-row')
          .forEach((svc, index) => {
            const onEnter = () => {
              const src = svc.dataset.img
              if (isDesktop && img && src) {
                img.src = src
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
              xTo?.(e.clientX - 160)
              yTo?.(e.clientY - 105)
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

        // Keep the preview in step with the cursor across the whole window so
        // it never gets left behind / stuck when the cursor exits the list.
        if (isDesktop) {
          const onWinMove = (e: MouseEvent) => {
            const services = document.getElementById('services')
            if (!services || !xTo || !yTo) return
            const r = services.getBoundingClientRect()
            const inside =
              e.clientY >= Math.max(0, r.top) &&
              e.clientY <= Math.min(window.innerHeight, r.bottom)
            if (inside) {
              xTo(e.clientX - 160)
              yTo(e.clientY - 105)
            } else {
              gsap.to(prev, { opacity: 0, scale: 0.85, duration: 0.3 })
            }
          }
          window.addEventListener('mousemove', onWinMove)
          cleanupFns.push(() => {
            window.removeEventListener('mousemove', onWinMove)
          })
        }
      }

      /* 3d card tilts */
      if (isDesktop) {
        document
          .querySelectorAll<HTMLElement>('[data-tilt-3d]')
          .forEach((card) => {
            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width - 0.5
              const y = (e.clientY - rect.top) / rect.height - 0.5
              gsap.to(card, {
                rotateY: x * 10,
                rotateX: -y * 10,
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

      /* updates thumbs */
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
    }

    // ---------- initial hidden states (new-design.html 2062-2064) ----------
    // Applied immediately so hero elements keep their pre-animated state
    // while the choreography waits for the boot gate below.
    const preCtx = gsap.context(() => {
      gsap.set('.hline > span', { y: '112%', rotate: 2 })
      gsap.set('#heroMasthead', { opacity: 0, y: 30 })
      gsap.set('#nav', { opacity: 0 })
    })

    // Mirror the ref design's boot gating: its preloader only runs the whole
    // choreography after load and fonts settle, so every ScrollTrigger
    // measures the final document (pin spacers included). The app boots at
    // hydration, and GSAP does not re-anchor pre-pin triggers afterwards, so
    // the app defers initAnims to the same conditions.
    let ctx: gsap.Context | null = null
    let disposed = false

    // GSAP never re-anchors triggers created before a pinned section in a
    // global refresh(); only an instance-level refresh recomputes their
    // start/end against the current layout. The app boots immediately after
    // hydration (the ref design defers choreography to its preloader), so
    // late layout changes (pin spacers, fonts, load) leave triggers stale.
    // Re-anchor each instance after the boot and after every refresh cycle.
    const reAnchorAll = () => {
      ScrollTrigger.getAll().forEach((t) => {
        t.refresh?.()
      })
    }
    let pendingAnchor = false
    const reAnchorSoon = () => {
      if (pendingAnchor) {
        return
      }
      pendingAnchor = true
      setTimeout(() => {
        pendingAnchor = false
        reAnchorAll()
      }, 0)
    }
    ScrollTrigger.addEventListener('refresh', reAnchorSoon)

    const boot = () => {
      if (disposed) {
        return
      }
      ctx = gsap.context(() => {
        heroIntro()
        initAnims()
        reAnchorAll()
      })
    }

    const fonts = document.fonts?.ready ?? Promise.resolve()
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true })
          })
    Promise.all([fonts, loaded]).then(boot)

    return () => {
      disposed = true
      ScrollTrigger.removeEventListener('refresh', reAnchorSoon)
      cleanupFns.forEach((fn) => {
        fn()
      })
      // Reset the boot guard so a StrictMode remount replays the intro after
      // the reverts below restore the hidden initial states.
      bootedRef.current = false
      mm.revert()
      ctx?.revert()
      preCtx.revert()
    }
  }, [])

  return <div id="progress" className="scroll-progress" aria-hidden="true" />
}
