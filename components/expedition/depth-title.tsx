'use client'

import { useEffect, useRef } from 'react'
import { band, journey, subscribe } from '@/lib/journey'

const TITLES = [
  {
    id: 'astroguy',
    text: 'ASTROGUY',
    window: [0.165, 0.315] as const,
    fontSize: 'clamp(3.4rem, 11.5vw, 11rem)',
    letterSpacing: '0.12em',
  },
  {
    id: 'vehiclenet',
    text: 'VEHICLENET',
    window: [0.405, 0.545] as const,
    fontSize: 'clamp(2.8rem, 9.6vw, 9.6rem)',
    letterSpacing: '0.1em',
  },
  {
    id: 'fable',
    text: 'FABLE',
    window: [0.625, 0.755] as const,
    fontSize: 'clamp(3.8rem, 13.5vw, 13rem)',
    letterSpacing: '0.16em',
  },
] as const

const glassTextStyle: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 248, 255, 0.88) 40%, rgba(190, 225, 255, 0.52) 80%, rgba(160, 205, 250, 0.25) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.65)',
  filter:
    'drop-shadow(0 14px 35px rgba(2, 10, 26, 0.8)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.35))',
}

export function DepthTitleLayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLHeadingElement | null)[]>([])

  useEffect(() => {
    return subscribe((p) => {
      if (containerRef.current) {
        const mx = journey.smoothMouseX
        const my = journey.smoothMouseY
        containerRef.current.style.transform = `translate3d(${(-mx * 16).toFixed(1)}px, ${(my * 10).toFixed(1)}px, 0)`
      }

      TITLES.forEach((t, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        const o = band(p, t.window[0], t.window[1], 0.025)
        el.style.opacity = o.toFixed(3)
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
        const mid = (t.window[0] + t.window[1]) / 2
        const yOffset = ((p - mid) / (t.window[1] - t.window[0])) * -20
        el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-x-0 top-[8vh] z-[1] flex justify-center px-4 will-change-transform md:top-[9vh] lg:top-[10vh]"
      aria-hidden
    >
      <div className="relative flex w-full items-center justify-center">
        {TITLES.map((t, i) => (
          <h1
            key={t.id}
            ref={(node) => {
              itemRefs.current[i] = node
            }}
            className="absolute select-none font-serif font-black leading-none text-center transition-opacity"
            style={{
              fontSize: t.fontSize,
              letterSpacing: t.letterSpacing,
              opacity: 0,
              visibility: 'hidden',
              ...glassTextStyle,
            }}
          >
            {t.text}
          </h1>
        ))}
      </div>
    </div>
  )
}
