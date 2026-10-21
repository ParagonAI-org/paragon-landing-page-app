'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

/** Blend-mode difference cursor with enlarge + contextual label states. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return

    const txt = el.querySelector<HTMLElement>('.ctxt')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    window.addEventListener('mousemove', onMove)

    const textEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-cursor-text]'),
    )
    const onTextEnter = (e: Event) => {
      const t = (e.currentTarget as HTMLElement).dataset.cursorText
      if (t && txt) txt.textContent = t
      el.classList.add('txt')
    }
    const onTextLeave = () => el.classList.remove('txt')
    textEls.forEach((t) => {
      t.addEventListener('mouseenter', onTextEnter)
      t.addEventListener('mouseleave', onTextLeave)
    })

    const hoverEls = Array.from(
      document.querySelectorAll('a, button, [data-cursor]'),
    )
    const onEnter = () => el.classList.add('big')
    const onLeave = () => el.classList.remove('big')
    hoverEls.forEach((h) => {
      h.addEventListener('mouseenter', onEnter)
      h.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      textEls.forEach((t) => {
        t.removeEventListener('mouseenter', onTextEnter)
        t.removeEventListener('mouseleave', onTextLeave)
      })
      hoverEls.forEach((h) => {
        h.removeEventListener('mouseenter', onEnter)
        h.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="dot" />
      <div className="ctxt">View</div>
    </div>
  )
}
