import { nexus } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Chip, Eyebrow, Glass, Stage } from '../stage'

export function NexusStage() {
  return (
    <Stage window={T.vehicle} drift={22} className="inset-x-4 bottom-4 z-20 mx-auto max-w-4xl md:bottom-6" labelledBy="nexus-title">
      <Glass>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <Eyebrow>Stage II · K2 · Karakoram</Eyebrow>
          <span className="rounded-full border border-amber-200/30 px-3 py-1 text-xs text-amber-100">{nexus.status}</span>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 id="nexus-title" className="font-serif text-3xl text-white">{nexus.name}</h2>
            <p className="text-sm text-cyan-100">{nexus.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{nexus.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">{nexus.tech.map(t => <Chip key={t}>{t}</Chip>)}</ul>
            <a className="project-link mt-3" href={nexus.repo} target="_blank" rel="noreferrer">View source on GitHub</a>
          </div>
          <div className="rounded-xl border border-white/15 bg-slate-950/45 p-3">
            <p className="mb-2 text-xs uppercase tracking-widest text-sky-100/75">Architecture highlights</p>
            <ul className="grid grid-cols-2 gap-2">{nexus.highlights.map(h => <li key={h} className="rounded-lg border border-white/15 p-2 text-sm text-white/90">{h}</li>)}</ul>
          </div>
        </div>
      </Glass>
    </Stage>
  )
}
