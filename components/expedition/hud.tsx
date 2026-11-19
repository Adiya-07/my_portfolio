'use client'

import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { band, journey, STAGES, subscribe, T, track } from '@/lib/journey'
import { rgb, skyAt } from '@/lib/sky'
import { cn } from '@/lib/utils'

export function SkyLayer() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(
    () =>
      subscribe((p) => {
        const el = ref.current
        if (!el) return
        const s = skyAt(p)
        el.style.background = `linear-gradient(180deg, ${rgb(s.top)} 0%, ${rgb(s.mid)} 42%, ${rgb(s.horizon)} 78%, ${rgb(s.horizon)} 100%)`
      }),
    [],
  )
  return <div ref={ref} className="fixed inset-0" aria-hidden />
}

export function MistLayer() {
  const bottom = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const zoomRush = useRef<HTMLDivElement>(null)

  useEffect(
    () =>
      subscribe((p) => {
        const s = skyAt(p)
        if (bottom.current) {
          const o = track(p, [[0, 0], [0.12, 0.15], [0.2, 0.24], [0.75, 0.24], [0.83, 0.16], [0.93, 0.18], [0.97, 0.08]])
          bottom.current.style.opacity = o.toFixed(3)
          bottom.current.style.background = `linear-gradient(0deg, ${rgb(s.horizon, 0.95)} 0%, ${rgb(s.horizon, 0.55)} 22%, ${rgb(s.horizon, 0)} 48%)`
        }
        if (veil.current) {
          const rush1 = band(p, T.push1[0], T.push1[1], 0.045)
          const rush2 = band(p, T.push2[0], T.push2[1], 0.045)
          const rushPull = band(p, T.pull[0], T.pull[1], 0.04)
          const rush = Math.max(
            band(p, 0.09, 0.2, 0.05) * 0.85,
            rush1 * 0.38,
            rush2 * 0.38,
            rushPull * 0.26,
            band(p, 0.905, 0.955, 0.025) * 0.35,
          )
          const mistScale = 1 + (rush1 + rush2) * 0.15
          veil.current.style.opacity = rush.toFixed(3)
          veil.current.style.transform = `scale(${mistScale.toFixed(3)})`
          veil.current.style.background = `radial-gradient(ellipse at 50% 60%, ${rgb(s.horizon, 0.9)} 0%, ${rgb(s.horizon, 0.6)} 45%, ${rgb(s.horizon, 0.25)} 100%)`
        }
        if (zoomRush.current) {
          const zIntensity = Math.max(
            band(p, T.push1[0], T.push1[1], 0.035),
            band(p, T.push2[0], T.push2[1], 0.035),
            band(p, 0.09, 0.17, 0.03) * 0.6,
          )
          zoomRush.current.style.opacity = (zIntensity * 0.55).toFixed(3)
          const zScale = 1 + zIntensity * 0.06
          zoomRush.current.style.transform = `scale(${zScale.toFixed(3)})`
        }
      }),
    [],
  )
  return (
    <>
      <div ref={bottom} className="pointer-events-none fixed inset-0 z-[1]" aria-hidden />
      <div ref={veil} className="pointer-events-none fixed inset-0 z-[2] transition-transform duration-75 ease-out" aria-hidden />
      <div
        ref={zoomRush}
        className="pointer-events-none fixed inset-0 z-[3] transition-transform duration-75 ease-out"
        style={{
          opacity: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 38%, rgba(185,220,250,0.14) 75%, rgba(110,170,230,0.3) 100%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden
      />
    </>
  )
}

export function Altimeter() {
  const marker = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  useEffect(
    () =>
      subscribe((p) => {
        if (marker.current) marker.current.style.top = `${(p * 100).toFixed(2)}%`
        if (readout.current) readout.current.textContent = `${Math.round(p * 100)}%`
        let idx = 0
        STAGES.forEach((s, i) => {
          if (p >= s.at - 0.07) idx = i
        })
        setActive((prev) => (prev === idx ? prev : idx))
      }),
    [],
  )

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between px-5 py-5 text-white md:px-8">
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => journey.scrollTo(0)}
            className="text-left [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]"
          >
            <span className="block font-serif text-xl leading-none">Adiya R</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Expedition Portfolio</span>
          </button>
        </div>
        <div className="text-right [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]" aria-live="polite">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-white/70">
            Ascent <span ref={readout} className="tabular-nums">0%</span>
          </span>
          <span className="block font-serif text-xl leading-tight">{STAGES[active].label}</span>
        </div>
      </header>

      <nav
        aria-label="Expedition stages"
        className="fixed right-4 top-1/2 z-30 h-[46vh] -translate-y-1/2 md:right-8"
      >
        <div className="relative h-full w-px bg-white/25">
          <div ref={marker} className="absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.15)]" />
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => journey.scrollTo(s.at)}
              className="group absolute right-0 flex -translate-y-1/2 translate-x-[5px] items-center gap-3"
              style={{ top: `${s.at * 100}%` }}
              aria-current={i === active ? 'step' : undefined}
            >
              <span
                className={cn(
                  'hidden text-right transition-opacity md:block [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]',
                  i === active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
              >
                <span className="block font-serif text-sm leading-none text-white">{s.label}</span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/70">{s.sub}</span>
              </span>
              <span
                className={cn(
                  'block h-px transition-all',
                  i === active ? 'w-4 bg-white' : 'w-2.5 bg-white/60 group-hover:w-4 group-hover:bg-white',
                )}
              />
              <span className="sr-only">{`Go to ${s.label} — ${s.sub}`}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

export function Loader() {
  const { progress, active } = useProgress()
  const done = !active && progress >= 100
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c2244] text-white transition-opacity duration-1000',
        done ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
      aria-hidden={done}
    >
      <p className="text-[10px] uppercase tracking-[0.4em] text-sky-100/70">Acclimatizing</p>
      <p className="mt-3 font-serif text-5xl tabular-nums">{Math.round(progress)}%</p>
      <div className="mt-6 h-px w-48 overflow-hidden bg-white/15">
        <div className="h-full bg-white transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
