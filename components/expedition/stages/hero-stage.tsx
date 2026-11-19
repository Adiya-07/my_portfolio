import { profile } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Eyebrow, Stage } from '../stage'

export function HeroStage() {
  return (
    <Stage window={[-0.1, T.heroOut]} fade={0.05} drift={60} className="inset-x-0 bottom-0 z-20" labelledBy="hero-title">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70vh] bg-gradient-to-t from-[#06121f]/75 via-[#06121f]/30 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-10 md:pb-16">
        <div className="max-w-2xl">
          <Eyebrow>Base Camp · Gokyo Lakes, Khumbu, Nepal</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 font-serif text-7xl leading-[0.9] text-white text-balance [text-shadow:0_4px_30px_rgba(0,0,0,0.35)] md:text-9xl"
          >
            {profile.name}
          </h1>
          <p className="mt-5 text-lg text-white/95 md:text-xl">{profile.degree}</p>
          <p className="text-base text-white/75 md:text-lg">{profile.college}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{profile.focus}</p>
        </div>

        <dl className="grid grid-cols-3 gap-6 text-white md:gap-10">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-white/60">Year</dt>
            <dd className="mt-1 font-serif text-2xl">{profile.year}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-white/60">Graduating</dt>
            <dd className="mt-1 font-serif text-2xl tabular-nums">{profile.graduation}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-white/60">CGPA · Sem 1</dt>
            <dd className="mt-1 font-serif text-2xl tabular-nums">{profile.cgpa.split(' — ')[0]}</dd>
          </div>
        </dl>
      </div>

      <div className="relative flex flex-col items-center gap-2 pb-6 text-white/80">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll to begin the ascent</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-4 animate-[descend_2.2s_ease-in-out_infinite] bg-white" />
        </span>
      </div>
    </Stage>
  )
}
