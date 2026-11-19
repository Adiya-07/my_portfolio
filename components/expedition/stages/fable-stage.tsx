import { fable } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Chip, Eyebrow, Glass, Stage } from '../stage'

export function FableStage() {
  return (
    <Stage
      window={T.fable}
      drift={32}
      className="fixed inset-x-4 bottom-4 z-20 mx-auto max-w-4xl md:bottom-6"
      labelledBy="fable-title"
    >
      <Glass className="p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <Eyebrow>Stage III · Everest · Summit Project</Eyebrow>
            <span className="flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-200">
              <span className="size-1.5 animate-pulse rounded-full bg-amber-300" aria-hidden />
              {fable.status}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 id="fable-title" className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
              {fable.name}
            </h2>
            <span className="text-xs text-amber-200/80 md:text-sm font-light">· {fable.tagline}</span>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <p className="text-xs leading-relaxed text-white/80 md:text-[13px]">{fable.description}</p>
            <p className="mt-2 border-l border-white/20 pl-2 text-[11px] leading-relaxed text-white/60">
              {fable.analytics}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/50">Core Workflow</span>
            <ol className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-white/90">
              {fable.workflow.map((step, i) => (
                <li key={step} className="flex items-center">
                  <span className="rounded border border-white/15 bg-white/5 px-2 py-0.5">{step}</span>
                  {i < fable.workflow.length - 1 && <span className="mx-1 text-white/40">→</span>}
                </li>
              ))}
            </ol>

            <span className="mt-2.5 block text-[10px] uppercase tracking-wider text-white/50">Evaluation Dimensions</span>
            <ul className="mt-1 flex flex-wrap gap-1">
              {fable.dimensions.map((d) => (
                <Chip key={d}>{d}</Chip>
              ))}
            </ul>
          </div>
        </div>
      </Glass>
    </Stage>
  )
}
