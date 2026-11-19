'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { journey, smoothstep, track } from '@/lib/journey'
import { skyAt } from '@/lib/sky'
import { createPhotoMaterial, prepareTexture } from './photo-material'

const FOV_TAN = Math.tan(THREE.MathUtils.degToRad(45) / 2)
const tmp = new THREE.Color()

const BASECAMP_Z = 4
const BASECAMP_DIST = 8

export function BaseCamp() {
  const gl = useThree((s) => s.gl)
  const texture = useTexture('/images/basecamp.webp')
  const { material, uniforms } = useMemo(() => {
    prepareTexture(texture, gl)
    return createPhotoMaterial(texture, { sideFeather: 0.0001, bottomFade: 0.0001, topFeather: 0.01 })
  }, [texture, gl])
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const m = mesh.current
    if (!m) return
    const p = journey.progress
    const viewH = 2 * BASECAMP_DIST * FOV_TAN
    const viewW = viewH * (state.size.width / state.size.height)
    const w = Math.max(viewW, viewH * 1.5) * 1.08
    const h = w / 1.5
    const topAlignedY = 0.25 + viewH / 2 - h / 2 + viewH * 0.015

    m.scale.set(w, h, 1)
    m.position.set(0, topAlignedY + track(p, [[0, 0], [0.05, 0], [0.17, -7.5]]), BASECAMP_Z)
    uniforms.opacity.value = track(p, [[0, 1], [0.1, 1], [0.165, 0]])
    m.visible = uniforms.opacity.value > 0.001

    const sky = skyAt(p)
    tmp.setRGB(sky.horizon[0] / 255, sky.horizon[1] / 255, sky.horizon[2] / 255, THREE.SRGBColorSpace)
    uniforms.hazeColor.value.copy(tmp)
    uniforms.haze.value = smoothstep(0.06, 0.16, p) * 0.5
  })

  return (
    <mesh ref={mesh} material={material} renderOrder={10}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

const SUNSET_Z = -110

export function SunsetBackdrop() {
  const gl = useThree((s) => s.gl)
  const texture = useTexture('/images/sunset.webp')
  const { material, uniforms } = useMemo(() => {
    prepareTexture(texture, gl)
    return createPhotoMaterial(texture, { sideFeather: 0.0001, bottomFade: 0.0001, topFeather: 0.0001 })
  }, [texture, gl])
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const m = mesh.current
    if (!m) return
    const p = journey.progress
    const opacity = smoothstep(0.91, 0.968, p)
    uniforms.opacity.value = opacity
    m.visible = opacity > 0.001
    if (!m.visible) return

    const cam = state.camera.position
    const d = cam.z - SUNSET_Z
    const viewH = 2 * d * FOV_TAN
    const viewW = viewH * (state.size.width / state.size.height)
    const w = Math.max(viewW, viewH * 1.5) * 1.12
    const drift = track(p, [[0.91, 1.06], [1, 1]])
    m.scale.set(w * drift, (w / 1.5) * drift, 1)
    m.position.set(cam.x * 0.6, cam.y - viewH * 0.02, SUNSET_Z)
  })

  return (
    <mesh ref={mesh} material={material} renderOrder={-10}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}
