export type Key = readonly [progress: number, value: number]

type Listener = (progress: number) => void

export const journey = {
  progress: 0,
  mouseX: 0,
  mouseY: 0,
  reducedMotion: false,
  smoothMouseX: 0,
  smoothMouseY: 0,
  listeners: new Set<Listener>(),
  scrollTo: (_progress: number) => {},
}

export function subscribe(listener: Listener) {
  journey.listeners.add(listener)
  listener(journey.progress)
  return () => {
    journey.listeners.delete(listener)
  }
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v))
}

export function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0))
  return t * t * (3 - 2 * t)
}

export function track(p: number, keys: readonly Key[]) {
  if (p <= keys[0][0]) return keys[0][1]
  for (let i = 0; i < keys.length - 1; i++) {
    const [p0, v0] = keys[i]
    const [p1, v1] = keys[i + 1]
    if (p <= p1) {
      const t = clamp((p - p0) / (p1 - p0 || 1))
      const e = t * t * t * (t * (t * 6 - 15) + 10)
      return v0 + (v1 - v0) * e
    }
  }
  return keys[keys.length - 1][1]
}

export function band(p: number, start: number, end: number, fade = 0.02) {
  return smoothstep(start, start + fade, p) * (1 - smoothstep(end - fade, end, p))
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export const T = {
  heroOut: 0.075,
  basecampGone: 0.17,
  astro: [0.18, 0.305] as const,
  push1: [0.31, 0.41] as const,
  vehicle: [0.42, 0.535] as const,
  push2: [0.54, 0.63] as const,
  fable: [0.64, 0.745] as const,
  pull: [0.75, 0.83] as const,
  vista: [0.805, 0.852] as const,
  routes: [0.85, 0.888] as const,
  logbook: [0.89, 0.928] as const,
  sunset: [0.925, 0.975] as const,
  finale: 0.955,
}

export const STAGES = [
  { id: 'basecamp', label: 'Base Camp', sub: 'Gokyo, Khumbu', at: 0 },
  { id: 'himalayas', label: 'Himalayas', sub: 'AstroGuy', at: 0.24 },
  { id: 'k2', label: 'K2', sub: 'NEXUS', at: 0.48 },
  { id: 'everest', label: 'Everest', sub: 'Fable', at: 0.695 },
  { id: 'range', label: 'The Range', sub: 'Other projects', at: 0.869 },
  { id: 'logbook', label: 'Logbook', sub: 'Skills & achievements', at: 0.909 },
  { id: 'sunset', label: 'Sunset', sub: 'Contact', at: 1 },
] as const

export const camera = {
  z: [
    [0, 12],
    [0.17, 6.4],
    [0.21, 4.3],
    [0.305, 4.0],
    [0.41, -3.8],
    [0.535, -4.0],
    [0.63, -13.8],
    [0.745, -14.0],
    [0.83, 11],
    [0.925, 13],
    [1, 20],
  ] as const satisfies readonly Key[],
  y: [
    [0, 0.25],
    [0.17, 1],
    [0.745, 1.1],
    [0.83, 2],
    [1, 2.4],
  ] as const satisfies readonly Key[],
  lookY: [
    [0, 0],
    [0.745, 0],
    [0.83, -1.1],
    [0.925, -1.1],
    [1, 0.4],
  ] as const satisfies readonly Key[],
  lookX: [
    [0, 0],
    [0.305, 0],
    [0.36, 0.45],
    [0.41, 0],
    [0.535, 0],
    [0.585, -0.45],
    [0.63, 0],
    [1, 0],
  ] as const satisfies readonly Key[],
  roll: [
    [0, 0],
    [0.305, 0],
    [0.36, -0.014],
    [0.41, 0],
    [0.535, 0],
    [0.585, 0.014],
    [0.63, 0],
    [1, 0],
  ] as const satisfies readonly Key[],
  fov: [
    [0, 45],
    [0.08, 45],
    [0.13, 38.5],
    [0.18, 45],
    [0.305, 45],
    [0.36, 36.0],
    [0.415, 45],
    [0.535, 45],
    [0.585, 35.5],
    [0.64, 45],
    [0.745, 45],
    [0.79, 49.5],
    [0.83, 45],
    [1, 45],
  ] as const satisfies readonly Key[],
}

export type MountainTrack = {
  x: readonly Key[]
  y: readonly Key[]
  z: readonly Key[]
  s: readonly Key[]
  ry: readonly Key[]
  o: readonly Key[]
  marker: readonly Key[]
}

export const mountains: Record<'himalayas' | 'k2' | 'everest', MountainTrack> = {
  himalayas: {
    x: [
      [0, 0],
      [0.31, 0],
      [0.37, -9],
      [0.41, -25],
      [0.75, -25],
      [0.83, -17],
    ],
    y: [
      [0, -0.2],
      [0.31, 0],
      [0.75, 0],
      [0.83, 0.9],
      [0.925, 0.9],
      [0.98, -7],
    ],
    z: [
      [0, -6],
      [0.31, -6],
      [0.41, -5],
      [0.75, -5],
      [0.83, -26],
    ],
    s: [
      [0, 1],
      [0.305, 1],
      [0.38, 1.18],
      [0.41, 1.2],
      [0.75, 1],
      [0.83, 1.45],
    ],
    ry: [
      [0, 0],
      [0.31, 0],
      [0.37, 0.32],
      [0.41, 0.4],
      [0.75, 0.4],
      [0.83, 0.06],
    ],
    o: [
      [0, 1],
      [0.94, 1],
      [0.975, 0],
    ],
    marker: [
      [0.17, 0],
      [0.2, 1],
      [0.3, 1],
      [0.32, 0],
    ],
  },
  k2: {
    x: [
      [0, 4.2],
      [0.31, 4.2],
      [0.41, 0],
      [0.54, 0],
      [0.6, 10],
      [0.63, 27],
      [0.75, 27],
      [0.83, 0],
    ],
    y: [
      [0, -0.8],
      [0.41, -1],
      [0.75, -1],
      [0.83, 2.2],
      [0.925, 2.2],
      [0.98, -6],
    ],
    z: [
      [0, -14],
      [0.54, -14],
      [0.63, -13],
      [0.75, -13],
      [0.83, -33],
    ],
    s: [
      [0, 0.88],
      [0.305, 0.88],
      [0.41, 1],
      [0.535, 1],
      [0.6, 1.18],
      [0.63, 1.2],
      [0.75, 1],
      [0.83, 1.55],
    ],
    ry: [
      [0, 0],
      [0.54, 0],
      [0.6, -0.34],
      [0.63, -0.42],
      [0.75, -0.42],
      [0.83, 0],
    ],
    o: [
      [0, 1],
      [0.94, 1],
      [0.975, 0],
    ],
    marker: [
      [0.4, 0],
      [0.43, 1],
      [0.53, 1],
      [0.55, 0],
    ],
  },
  everest: {
    x: [
      [0, -3.8],
      [0.54, -3.8],
      [0.63, 0],
      [0.75, 0],
      [0.83, 17],
    ],
    y: [
      [0, -0.2],
      [0.63, -0.2],
      [0.75, -0.2],
      [0.83, 0.6],
      [0.925, 0.6],
      [0.98, -7],
    ],
    z: [
      [0, -26],
      [0.75, -26],
      [0.83, -27],
    ],
    s: [
      [0, 0.86],
      [0.535, 0.86],
      [0.63, 1],
      [0.75, 1],
      [0.83, 1.4],
    ],
    ry: [
      [0, 0],
      [0.75, 0],
      [0.83, -0.06],
    ],
    o: [
      [0, 1],
      [0.94, 1],
      [0.975, 0],
    ],
    marker: [
      [0.62, 0],
      [0.65, 1],
      [0.74, 1],
      [0.76, 0],
    ],
  },
}

export const SKY = {
  day: { top: [13, 52, 112], mid: [52, 108, 176], horizon: [190, 212, 234] },
  dusk: { top: [22, 24, 58], mid: [104, 72, 118], horizon: [240, 166, 112] },
} as const
