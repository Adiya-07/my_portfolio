'use client'

import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import { camera as cameraTrack, journey, lerp, track } from '@/lib/journey'
import { Mountain } from './mountain'
import { BaseCamp, SunsetBackdrop } from './backdrops'
import { Clouds, MistVeils } from './atmosphere'

function CameraRig() {
  useFrame((state, delta) => {
    const p = journey.progress
    const k = 1 - Math.exp(-delta * 3)
    journey.smoothMouseX = lerp(journey.smoothMouseX, journey.mouseX, k)
    journey.smoothMouseY = lerp(journey.smoothMouseY, journey.mouseY, k)
    const mx = journey.reducedMotion ? 0 : journey.smoothMouseX
    const my = journey.reducedMotion ? 0 : journey.smoothMouseY
    const t = state.clock.elapsedTime

    const z = track(p, cameraTrack.z)
    const y = track(p, cameraTrack.y)
    const breathe = journey.reducedMotion ? 0 : Math.sin(t * 0.28) * 0.025
    const lookX = track(p, cameraTrack.lookX)
    const roll = track(p, cameraTrack.roll)
    const targetFov = track(p, cameraTrack.fov)

    const cam = state.camera as THREE.PerspectiveCamera
    if (Math.abs(cam.fov - targetFov) > 0.005) {
      cam.fov = targetFov
      cam.updateProjectionMatrix()
    }

    cam.position.set(mx * 0.24, y + my * 0.14 + breathe, z)
    cam.lookAt(lookX + mx * 0.18, y + track(p, cameraTrack.lookY) + my * 0.1, z - 10)
    cam.rotateZ(journey.reducedMotion ? 0 : Math.sin(t * 0.18) * 0.0012 - mx * 0.003 + roll)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas
      className="!fixed inset-0 z-[2]"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      camera={{ fov: 45, near: 0.1, far: 400, position: [0, 0.25, 12] }}
      aria-hidden
    >
      <CameraRig />
      <Suspense fallback={null}>
        <SunsetBackdrop />
        <Mountain
          id="everest"
          url="/images/everest.webp"
          aspect={1.5}
          height={12.4}
          peak={{ u: 0.483, v: 0.194 }}
          name="Mt. Everest"
          altitude="8,849 m"
          range="Mahalangur Himal"
        />
        <Mountain
          id="k2"
          url="/images/k2.webp"
          aspect={4 / 3}
          height={10.2}
          peak={{ u: 0.524, v: 0.073 }}
          name="K2"
          altitude="8,611 m"
          range="Karakoram"
        />
        <Mountain
          id="himalayas"
          url="/images/himalayas.webp"
          aspect={1.5}
          height={11}
          peak={{ u: 0.503, v: 0.135 }}
          name="Ama Dablam"
          altitude="6,812 m"
          range="Himalayas · Khumbu"
        />
        <BaseCamp />
      </Suspense>
      <MistVeils />
      <Clouds />
    </Canvas>
  )
}
