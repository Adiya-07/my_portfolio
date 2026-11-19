import { Award } from 'lucide-react'
import { astroguy } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Chip, Eyebrow, Glass, Stage } from '../stage'

export function AstroGuyStage() {
  return (
    <Stage
      window={T.astro}
      drift={32}
      className="fixed inset-x-4 bottom-4 z-20 mx-auto max-w-4xl md:bottom-6"
      labelledBy="astroguy-title"
    >
      <Glass className="p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <Eyebrow>Stage I · Himalayas</Eyebrow>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-200">
              {astroguy.status}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-amber-200/25 bg-amber-100/10 px-2.5 py-1 text-xs text-amber-100">
            <Award className="size-3.5 shrink-0 text-amber-300" aria-hidden />
            <span>{astroguy.achievement}</span>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 id="astroguy-title" className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
                {astroguy.name}
              </h2>
              <span className="text-xs text-sky-200/80 md:text-sm font-light">· {astroguy.tagline}</span>
            </div>
            <p className="mt-1 text-xs text-white/70">
              <span className="font-semibold text-white/90">{astroguy.role}.</span> {astroguy.team}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/75">
              {astroguy.responsibilities.map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-sky-300/60" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-[10px] uppercase tracking-wider text-white/50">Tech Stack</span>
            <ul className="mt-1.5 flex flex-wrap gap-1.5 md:justify-end" aria-label="Technology">
              {astroguy.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>
            <a className="project-link mt-3" href="https://github.com/Adiya-07/PYEXPO-PY003" target="_blank" rel="noreferrer">View source on GitHub</a>
          </div>
        </div>
      </Glass>
    </Stage>
  )
}
