import { Medal, Flag } from 'lucide-react'
import { competitions, exploring, otherProjects, profile, skills } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Chip, Eyebrow, Glass, Stage } from '../stage'

const stageFrame = 'inset-x-4 bottom-[5vh] z-20 md:inset-x-0 md:bottom-[6vh]'

const PEAKS = [
  { name: 'Himalayas', detail: 'Ama Dablam · 6,812 m', project: 'AstroGuy' },
  { name: 'K2', detail: 'Karakoram · 8,611 m', project: 'VehicleNet' },
  { name: 'Everest', detail: 'Mahalangur · 8,849 m', project: 'Fable' },
]

export function VistaStage() {
  return (
    <Stage window={T.vista} fade={0.015} drift={24} className="inset-x-0 top-[12vh] z-20" labelledBy="vista-title">
      <h2 id="vista-title" className="sr-only">
        The full range: Himalayas, K2 and Everest
      </h2>
      <Eyebrow className="text-center">Three summits · One expedition</Eyebrow>
      <ul className="mx-auto mt-4 grid max-w-5xl grid-cols-3 px-4 text-center text-white">
        {PEAKS.map((p) => (
          <li key={p.name} className="[text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
            <p className="font-serif text-3xl md:text-5xl">{p.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/75 md:text-[11px]">{p.detail}</p>
            <p className="mt-2 text-xs text-white/85 md:text-sm">{p.project}</p>
          </li>
        ))}
      </ul>
    </Stage>
  )
}

export function RoutesStage() {
  return (
    <Stage window={T.routes} fade={0.012} drift={36} className={stageFrame} labelledBy="routes-title">
      <div className="mx-auto max-w-6xl md:px-10">
        <div className="mb-4 flex flex-col items-center text-center">
          <Eyebrow>The Range · Himalayas — K2 — Everest</Eyebrow>
          <h2 id="routes-title" className="mt-2 font-serif text-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.3)] md:text-5xl">
            Other routes explored
          </h2>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {otherProjects.map((p) => (
            <li key={p.name}>
              <Glass className="h-full p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl">{p.name}</h3>
                  {p.status && (
                    <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/70">
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[12px] uppercase tracking-wider text-sky-100/75">{p.tagline}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/75">{p.note}</p>
              </Glass>
            </li>
          ))}
        </ul>
        <div className="mt-3 hidden md:block">
          <Glass className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4 md:p-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Interested in</span>
            <ul className="flex flex-wrap gap-1.5">
              {profile.interests.map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </ul>
          </Glass>
        </div>
      </div>
    </Stage>
  )
}

export function LogbookStage() {
  return (
    <Stage window={T.logbook} fade={0.012} drift={36} className={stageFrame} labelledBy="logbook-title">
      <div className="mx-auto max-w-6xl md:px-10">
        <div className="mb-4 flex flex-col items-center text-center">
          <Eyebrow>Expedition logbook</Eyebrow>
          <h2 id="logbook-title" className="mt-2 font-serif text-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.3)] md:text-5xl">
            Competitions &amp; gear
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_1.4fr]">
          <Glass className="p-4 md:p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Hackathons &amp; competitions</p>
            <ul className="mt-3 space-y-3">
              {competitions.map((c) => (
                <li key={c.name} className="flex gap-3">
                  {c.result === 'Second Prize' ? (
                    <Medal className="mt-0.5 size-5 shrink-0 text-amber-200" aria-hidden />
                  ) : (
                    <Flag className="mt-0.5 size-5 shrink-0 text-sky-100/80" aria-hidden />
                  )}
                  <div>
                    <p className="text-sm text-white">{c.name}</p>
                    <p className="text-[12px] text-white/70">
                      {c.result}
                      {c.detail && ` · ${c.detail}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Glass>
          <Glass className="p-4 md:p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group}>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">{s.group}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <Chip key={i}>{i}</Chip>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/60">Currently exploring</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {exploring.map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </ul>
          </Glass>
        </div>
      </div>
    </Stage>
  )
}
