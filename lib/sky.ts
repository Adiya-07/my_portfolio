import { SKY, smoothstep, lerp } from './journey'

type RGB = readonly [number, number, number]

function mix(a: RGB, b: RGB, t: number): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

export function sunsetMix(p: number) {
  return smoothstep(0.9, 0.97, p)
}

export function skyAt(p: number) {
  const t = sunsetMix(p)
  return {
    top: mix(SKY.day.top, SKY.dusk.top, t),
    mid: mix(SKY.day.mid, SKY.dusk.mid, t),
    horizon: mix(SKY.day.horizon, SKY.dusk.horizon, t),
    t,
  }
}

export function rgb(c: readonly number[], alpha = 1) {
  return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${alpha})`
}
