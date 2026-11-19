'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Lenis from 'lenis'
import { clamp, journey } from '@/lib/journey'
import { Altimeter, Loader, MistLayer, SkyLayer } from './hud'
import { DepthTitleLayer } from './depth-title'
import { HeroStage } from './stages/hero-stage'
import { AstroGuyStage } from './stages/astroguy-stage'
import { VehicleNetStage } from './stages/vehiclenet-stage'
import { FableStage } from './stages/fable-stage'
import { LogbookStage, RoutesStage, VistaStage } from './stages/range-stages'
import { FinaleStage } from './stages/finale-stage'

const Scene = dynamic(() => import('./scene'), { ssr: false })

export function Experience() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ lerp: reduced ? 1 : 0.06, smoothWheel: !reduced, wheelMultiplier: 0.9 })
    let frame = 0

    const loop = (time: number) => {
      lenis.raf(time)
      const limit = lenis.limit
      journey.progress = limit > 0 ? clamp(lenis.animatedScroll / limit) : 0
      for (const l of journey.listeners) l(journey.progress)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    journey.scrollTo = (p: number) => lenis.scrollTo(p * lenis.limit, { duration: reduced ? 0 : 2.6 })

    const onPointer = (e: PointerEvent) => {
      journey.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      journey.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointer)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative">
      <SkyLayer />
      <DepthTitleLayer />
      <Scene />
      <MistLayer />

      <HeroStage />
      <AstroGuyStage />
      <VehicleNetStage />
      <FableStage />
      <VistaStage />
      <RoutesStage />
      <LogbookStage />
      <FinaleStage />

      <Altimeter />
      <Loader />

      <div aria-hidden style={{ height: '2000vh' }} />
    </main>
  )
}
