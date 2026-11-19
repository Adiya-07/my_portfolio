import { vehiclenet } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Eyebrow, Glass, Stage } from '../stage'

export function VehicleNetStage() {
  return (
    <Stage
      window={T.vehicle}
      drift={32}
      className="fixed inset-x-4 bottom-4 z-20 mx-auto max-w-4xl md:bottom-6"
      labelledBy="vehiclenet-title"
    >
      <Glass className="p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <Eyebrow>Stage II · K2 · Karakoram</Eyebrow>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cyan-200">
              Telemetry HUD
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 id="vehiclenet-title" className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
              {vehiclenet.name}
            </h2>
            <span className="text-xs text-cyan-200/80 md:text-sm font-light">· {vehiclenet.tagline}</span>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-white/75 md:text-[13px]">{vehiclenet.description}</p>
          <ul className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {vehiclenet.focus.map((f, i) => (
              <li
                key={f}
                className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-center"
              >
                <span className="font-mono text-[9px] tracking-widest text-cyan-200/70">
                  CH-{String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-1 text-[11px] leading-tight text-white/90">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Glass>
    </Stage>
  )
}
