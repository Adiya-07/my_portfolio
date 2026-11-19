'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { journey, smoothstep, T } from '@/lib/journey'
import { skyAt } from '@/lib/sky'

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createPuffTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const rand = mulberry32(7)
  for (let i = 0; i < 26; i++) {
    const x = size / 2 + (rand() - 0.5) * size * 0.5
    const y = size / 2 + (rand() - 0.5) * size * 0.32
    const r = size * (0.12 + rand() * 0.2)
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(255,255,255,0.5)')
    g.addColorStop(0.45, 'rgba(255,255,255,0.28)')
    g.addColorStop(0.8, 'rgba(255,255,255,0.06)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

type Cluster = { x: number; y: number; z: number; spread: number; scale: number; count: number; opacity: number; speed: number }

const CLUSTERS: Cluster[] = [
  { x: -18, y: -4.4, z: -21, spread: 10, scale: 7, count: 6, opacity: 0.8, speed: 0.08 },
  { x: 0, y: -5, z: -22, spread: 12, scale: 8, count: 7, opacity: 0.85, speed: 0.07 },
  { x: 18, y: -4.4, z: -21, spread: 10, scale: 7, count: 6, opacity: 0.8, speed: 0.08 },
  { x: -10, y: -3.2, z: -29, spread: 10, scale: 6, count: 5, opacity: 0.6, speed: 0.06 },
  { x: 10, y: -3.4, z: -29.5, spread: 10, scale: 6, count: 5, opacity: 0.6, speed: 0.06 },
]

type Puff = { sprite: THREE.Sprite; baseX: number; opacity: number; speed: number; phase: number }

const tmp = new THREE.Color()

export function Clouds() {
  const group = useRef<THREE.Group>(null)
  const { puffs } = useMemo(() => {
    const texture = createPuffTexture()
    const rand = mulberry32(42)
    const puffs: Puff[] = []
    for (const c of CLUSTERS) {
      for (let i = 0; i < c.count; i++) {
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, opacity: 0 })
        const sprite = new THREE.Sprite(material)
        const s = c.scale * (0.7 + rand() * 0.6)
        sprite.scale.set(s * 1.8, s, 1)
        const baseX = c.x + (rand() - 0.5) * c.spread
        sprite.position.set(baseX, c.y + (rand() - 0.5) * c.spread * 0.18, c.z + (rand() - 0.5) * 2)
        material.rotation = (rand() - 0.5) * 0.3
        puffs.push({ sprite, baseX, opacity: c.opacity * (0.7 + rand() * 0.3), speed: c.speed, phase: rand() * 100 })
      }
    }
    return { puffs, texture }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = journey.progress
    const sky = skyAt(p)
    tmp.setRGB(
      (255 * (1 - sky.t) + 255 * sky.t) / 255,
      (255 * (1 - sky.t) + 196 * sky.t) / 255,
      (255 * (1 - sky.t) + 170 * sky.t) / 255,
      THREE.SRGBColorSpace,
    )
    const fadeOut = 1 - smoothstep(0.95, 0.99, p)
    const finalMix = smoothstep(T.pull[0], T.pull[1], p)
    const cz = state.camera.position.z
    for (const puff of puffs) {
      const s = puff.sprite
      s.position.x = puff.baseX + Math.sin(t * puff.speed + puff.phase) * 2.4
      const d = cz - s.position.z
      const near = smoothstep(2, 9, d)
      const mat = s.material as THREE.SpriteMaterial
      mat.opacity = puff.opacity * near * fadeOut * (1 - 0.45 * finalMix)
      mat.color.copy(tmp)
      s.visible = mat.opacity > 0.005
    }
  })

  return (
    <group ref={group}>
      {puffs.map((p, i) => (
        <primitive key={i} object={p.sprite} />
      ))}
    </group>
  )
}

const veilVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const veilFragment = /* glsl */ `
uniform vec3 color;
uniform float opacity;
uniform float time;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 p = vec2(vUv.x * 6.0 + time * 0.03, vUv.y * 2.0);
  float n = fbm(p + vec2(fbm(p + time * 0.02), 0.0));
  float vertical = smoothstep(1.0, 0.25, vUv.y) * smoothstep(0.0, 0.2, vUv.y);
  float side = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
  float a = vertical * side * (0.35 + 0.65 * n) * opacity;
  vec3 col = color + vec3(0.06) * (n - 0.5);
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}
`

const VEILS = [
  { z: -11, y: -2.5, w: 70, h: 10, o: 0.45 },
  { z: -21.5, y: -2, w: 90, h: 12, o: 0.55 },
  { z: -30, y: -1.2, w: 110, h: 14, o: 0.5 },
]

export function MistVeils() {
  const items = useMemo(
    () =>
      VEILS.map((v) => {
        const material = new THREE.ShaderMaterial({
          uniforms: { color: { value: new THREE.Color('#dbe7f3') }, opacity: { value: v.o }, time: { value: 0 } },
          vertexShader: veilVertex,
          fragmentShader: veilFragment,
          transparent: true,
          depthWrite: false,
        })
        return { ...v, material }
      }),
    [],
  )

  useFrame((state) => {
    const p = journey.progress
    const sky = skyAt(p)
    tmp.setRGB(sky.horizon[0] / 255, sky.horizon[1] / 255, sky.horizon[2] / 255, THREE.SRGBColorSpace)
    const cz = state.camera.position.z
    const fadeOut = 1 - smoothstep(0.94, 0.98, p)
    for (const item of items) {
      const d = cz - item.z
      item.material.uniforms.time.value = state.clock.elapsedTime
      item.material.uniforms.color.value.copy(tmp)
      const finalMix = smoothstep(T.pull[0], T.pull[1], p)
      item.material.uniforms.opacity.value = item.o * smoothstep(2, 9, d) * fadeOut * (0.32 * (1 - 0.75 * finalMix))
    }
  })

  return (
    <>
      {items.map((v, i) => (
        <mesh key={i} position={[0, v.y, v.z]} material={v.material}>
          <planeGeometry args={[v.w, v.h]} />
        </mesh>
      ))}
    </>
  )
}
