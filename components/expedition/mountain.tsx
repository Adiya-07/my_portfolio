'use client'

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, useTexture } from '@react-three/drei'
import { band, clamp, journey, lerp, mountains, smoothstep, T, track } from '@/lib/journey'
import { skyAt } from '@/lib/sky'
import { createPhotoMaterial, prepareTexture } from './photo-material'

type MountainProps = {
  id: keyof typeof mountains
  url: string
  aspect: number
  height: number
  peak: { u: number; v: number }
  name: string
  altitude: string
  range: string
}

const tmpColor = new THREE.Color()
const titleData = {
  himalayas: { text: 'ASTROGUY', window: T.astro },
  k2: { text: 'NEXUS', window: T.vehicle },
  everest: { text: 'FABLE', window: T.fable },
}
function makeTitleTexture(text: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  ctx.font = '600 330px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const gradient = ctx.createLinearGradient(0, 80, 0, 445)
  gradient.addColorStop(0, 'rgba(230,244,255,0.53)')
  gradient.addColorStop(1, 'rgba(190,220,245,0.12)')
  ctx.fillStyle = gradient
  ctx.strokeStyle = 'rgba(230,244,255,0.50)'
  ctx.lineWidth = 2.5
  ctx.fillText(text, 1024, 262, 1960)
  ctx.strokeText(text, 1024, 262, 1960)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function Mountain({ id, url, aspect, height, peak, name, altitude, range }: MountainProps) {
  const gl = useThree((s) => s.gl)
  const texture = useTexture(url)
  const { material, uniforms } = useMemo(() => {
    prepareTexture(texture, gl)
    return createPhotoMaterial(texture, { sideFeather: 0.11, bottomFade: 0.26 })
  }, [texture, gl])

  const group = useRef<THREE.Group>(null)
  const marker = useRef<HTMLDivElement>(null)
  const width = height * aspect
  const titleTexture = useMemo(() => makeTitleTexture(titleData[id].text), [id])
  const titleMaterial = useRef<THREE.MeshBasicMaterial>(null)
  useEffect(() => () => titleTexture.dispose(), [titleTexture])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const p = journey.progress
    const t = mountains[id]
    const viewAspect = state.size.width / state.size.height
    const wideBoost = Math.max(1, viewAspect / 1.6)
    const compact = clamp(viewAspect / 1.7, 0.42, 1)
    const finalMix = smoothstep(T.pull[0], T.pull[1], p)

    const baseScale = track(p, t.s)
    const scale = baseScale * wideBoost * lerp(1, compact, finalMix)
    const topCompensation = ((wideBoost - 1) * height) / 2

    g.position.set(
      track(p, t.x) * lerp(1, compact, finalMix),
      track(p, t.y) - topCompensation * (1 - finalMix),
      track(p, t.z),
    )
    g.rotation.y = track(p, t.ry)
    g.scale.setScalar(scale)

    const distance = Math.max(0, state.camera.position.z - g.position.z)
    const sky = skyAt(p)
    tmpColor.setRGB(sky.horizon[0] / 255, sky.horizon[1] / 255, sky.horizon[2] / 255, THREE.SRGBColorSpace)
    uniforms.hazeColor.value.copy(tmpColor)
    uniforms.haze.value = 0.03 + 0.35 * smoothstep(11, 60, distance) * (1 - 0.75 * finalMix)
    uniforms.tintAmt.value = sky.t * 0.9
    uniforms.exposure.value = lerp(1, 0.55, sky.t)
    const opacity = track(p, t.o)
    uniforms.opacity.value = opacity
    if (titleMaterial.current) titleMaterial.current.opacity = band(p, titleData[id].window[0] - 0.018, titleData[id].window[1] + 0.018, 0.025) * opacity

    if (marker.current) {
      const m = track(p, t.marker) * opacity
      marker.current.style.opacity = m.toFixed(3)
      marker.current.style.visibility = m < 0.01 ? 'hidden' : 'visible'
    }
  })

  return (
    <group ref={group}>
      {/* Draw the translucent word before the cutout mountain, so the ridge actually occludes it. */}
      <mesh position={[(peak.u - 0.5) * width, (0.5 - peak.v) * height + height * 0.025, -0.08]} scale={[width * 0.90, width * 0.90 / 4, 1]} renderOrder={1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={titleMaterial} map={titleTexture} transparent opacity={0} depthWrite={false} depthTest={false} toneMapped={false} />
      </mesh>
      <mesh scale={[width, height, 1]} material={material} renderOrder={2}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <Html
        position={[(peak.u - 0.5) * width, (0.5 - peak.v) * height, 0.01]}
        zIndexRange={[5, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div ref={marker} className="summit-marker" style={{ opacity: 0 }}>
          <div className="flex flex-col items-center -translate-x-1/2 -translate-y-full">
            <div className="whitespace-nowrap rounded-full border border-white/25 bg-[#0b1b33]/50 px-3 py-1 text-center backdrop-blur-md">
              <span className="font-serif text-base text-white">{name}</span>
              <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-100/80 tabular-nums">
                {altitude}
              </span>
            </div>
            <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/70 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              {range}
            </span>
            <span className="h-10 w-px bg-gradient-to-b from-white/70 to-white/0" />
            <span className="relative -mt-1 size-2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}
