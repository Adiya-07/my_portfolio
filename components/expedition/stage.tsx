'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { band, subscribe } from '@/lib/journey'
import { cn } from '@/lib/utils'

type StageProps = {
  window: readonly [number, number]
  fade?: number
  drift?: number
  className?: string
  children: ReactNode
  labelledBy?: string
}

export function Stage({ window: [start, end], fade = 0.02, drift = 28, className, children, labelledBy }: StageProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    return subscribe((p) => {
      const el = ref.current
      if (!el) return
      const o = band(p, start, end, fade)
      const mid = (start + end) / 2
      const offset = ((p - mid) / (end - start)) * -drift
      el.style.opacity = o.toFixed(3)
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
      el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
      el.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
    })
  }, [start, end, fade, drift])

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      className={cn('fixed will-change-transform', className)}
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      {children}
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[10px] font-medium uppercase tracking-[0.32em] text-sky-100/75', className)}>{children}</p>
  )
}

export function Glass({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 bg-[#06172e]/60 p-4 text-white shadow-[0_20px_50px_-15px_rgba(2,10,22,0.7),inset_0_1px_0_0_rgba(255,255,255,0.22)] backdrop-blur-2xl md:p-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/85">{children}</li>
  )
}
