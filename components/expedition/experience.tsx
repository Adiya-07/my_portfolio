'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Lenis from 'lenis'
import { clamp, journey } from '@/lib/journey'
import { Altimeter, Loader, MistLayer, SkyLayer } from './hud'
import { HeroStage } from './stages/hero-stage'
import { AstroGuyStage } from './stages/astroguy-stage'
import { NexusStage } from './stages/nexus-stage'
import { FableStage } from './stages/fable-stage'
import { LogbookStage, RoutesStage, VistaStage } from './stages/range-stages'
import { FinaleStage } from './stages/finale-stage'
import { QuickPortfolio } from './quick-portfolio'

const Scene = dynamic(() => import('./scene'), { ssr: false })

export function Experience() {
  const [quick, setQuick] = useState(true)
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px), (max-height: 620px)').matches
    let webgl = false
    try {
      const gl = document.createElement('canvas').getContext('webgl2')
      webgl = Boolean(gl)
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch {}
    setSupported(webgl && !reduced)
    setQuick(reduced || mobile || !webgl)
    setReady(true)
  }, [])
  useEffect(() => {
    if (!ready || quick) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    journey.reducedMotion = reduced
    journey.progress = 0
    const lenis = new Lenis({ lerp: reduced ? 1 : 0.085, smoothWheel: !reduced, wheelMultiplier: 0.95 })
    let frame = 0
    let previous = -1

    const loop = (time: number) => {
      lenis.raf(time)
      const limit = lenis.limit
      journey.progress = limit > 0 ? clamp(lenis.animatedScroll / limit) : 0
      if (Math.abs(previous - journey.progress) > 0.00001 || (previous !== journey.progress && (journey.progress === 0 || journey.progress === 1))) {
        previous = journey.progress
        for (const l of journey.listeners) l(journey.progress)
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    journey.scrollTo = (p: number) => lenis.scrollTo(p * lenis.limit, { duration: reduced ? 0 : 1.65 })

    const onPointer = (e: PointerEvent) => {
      journey.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      journey.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointer)
      lenis.destroy()
    }
  }, [quick, ready])

  function changeMode() {
    setQuick(v => !v)
    window.scrollTo(0, 0)
  }

  if (!ready || quick) return <QuickPortfolio onExplore={supported ? changeMode : undefined} />

  return (
    <main className="relative">
      <SkyLayer />
      <Scene />
      <MistLayer />

      <HeroStage />
      <AstroGuyStage />
      <NexusStage />
      <FableStage />
      <VistaStage />
      <RoutesStage />
      <LogbookStage />
      <FinaleStage />

      <Altimeter />
      <Loader />
      <button type="button" className="quick-toggle" onClick={changeMode}>Quick portfolio / Recruiter view</button>

      <div aria-hidden style={{ height: '1400vh' }} />
    </main>
  )
}
