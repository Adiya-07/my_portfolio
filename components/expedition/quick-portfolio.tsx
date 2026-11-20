'use client'

import { Mountain, Compass, Code2, Award, Layers3, Terminal, ChartNoAxesCombined, Orbit, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { profile, astroguy, nexus, fable, otherProjects, competitions, skills, contact, photoCredits } from '@/lib/portfolio'

export function QuickPortfolio({ onExplore }: { onExplore?: () => void }) {
  const projects = [
    { name: astroguy.name, peak: 'Himalayas', detail: astroguy.tagline, status: astroguy.status, summary: astroguy.team + ' ' + astroguy.achievement, repo: 'https://github.com/Adiya-07/PYEXPO-PY003', image: '/images/himalayas.webp', Icon: Orbit, labels: astroguy.tech, highlights: ['Team leadership', 'Second prize · PyExpo'] },
    { name: nexus.name, peak: 'K2', detail: nexus.tagline, status: nexus.status, summary: nexus.description, repo: nexus.repo, image: '/images/k2.webp', Icon: Terminal, labels: nexus.tech, highlights: nexus.highlights },
    { name: fable.name, peak: 'Everest', detail: fable.tagline, status: fable.status, summary: fable.description, repo: null, image: '/images/everest.webp', Icon: ChartNoAxesCombined, labels: ['AI', 'Data analytics', 'Computer vision'], highlights: ['Media analysis', 'Multi-dimensional scoring', 'Visual insights'] },
  ]
  return (
    <main className="quick-view expedition-editorial min-h-screen text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/15 bg-slate-950/95">
        <nav aria-label="Portfolio navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-serif text-2xl"><Mountain size={22} className="text-cyan-200" />{profile.name}</a>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
            {onExplore && <button className="project-link" onClick={onExplore}>Enter the expedition</button>}
          </div>
        </nav>
      </header>
      <section id="top" className="relative isolate overflow-hidden border-b border-white/15">
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-60" style={{backgroundImage: 'url(/images/basecamp.webp)'}} />
        <div className="quick-hero mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-xs uppercase tracking-widest text-sky-200">Base Camp · Portfolio overview</p>
          <h1 className="mt-3 font-serif text-6xl md:text-8xl">{profile.name}</h1>
          <p className="mt-4 text-xl">{profile.degree}</p>
          <p className="mt-2 text-slate-300">{profile.college} · {profile.location}</p>
          <p className="mt-5 max-w-xl text-base text-slate-200">{profile.focus}</p>
          <div className="quick-stats mt-8"><div><span>Academic year</span><strong>{profile.year}</strong></div><div><span>Graduation</span><strong>{profile.graduation}</strong></div><div><span>Semester 1 CGPA</span><strong>{profile.cgpa.split(' — ')[0]}</strong></div></div>
          <div className="mt-6 flex flex-wrap gap-3"><a className="project-link" href="#projects">Explore projects</a><a className="project-link" href={'https://' + contact.github}>GitHub profile</a></div>
        </div>
      </section>
      <section id="projects" className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-widest text-sky-200">The three summits</p>
        <h2 className="mt-2 font-serif text-5xl">Selected projects</h2><div className="quick-route mt-6" aria-label="Expedition route"><span><Compass size={18}/> Base camp</span><i/><span>Himalayas</span><i/><span>K2</span><i/><span>Everest <Mountain size={18}/></span></div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {projects.map(p => <article key={p.name} className="quick-project overflow-hidden rounded-2xl border border-white/15">
            <div className="quick-project-image h-48 bg-cover bg-center" style={{backgroundImage: `url(${p.image})`}}><div className="quick-project-icon"><p.Icon size={27}/></div><span>{p.peak}</span></div>
            <div className="p-5"><p className="text-xs text-sky-200">{p.peak} · {p.status}</p><h3 className="mt-2 font-serif text-3xl">{p.name}</h3><p className="text-sm font-semibold text-slate-200">{p.detail}</p><p className="mt-3 leading-relaxed text-slate-300">{p.summary}</p><ul className="quick-highlights mt-4">{p.highlights.map(h => <li key={h}>{h}</li>)}</ul><div className="quick-chips mt-4">{p.labels.map(t => <span key={t}>{t}</span>)}</div>
            {p.repo ? <a className="project-link mt-4" href={p.repo} target="_blank" rel="noreferrer">View source</a> : <p className="mt-4 text-sm text-amber-200">In development · No public demo yet</p>}</div>
          </article>)}
        </div>
        <h2 className="mt-14 font-serif text-3xl">Other routes</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{otherProjects.map(p => <article key={p.name} className="quick-side-card rounded-xl border border-white/15 p-5"><Layers3 className="mb-4 text-cyan-200" size={24}/><h3 className="font-serif text-2xl">{p.name}</h3><p className="mt-2 text-slate-300">{p.note}</p><a href={p.repo} className="project-link mt-4" target="_blank" rel="noreferrer">View source</a></article>)}</div>
      </section>
      <section id="skills" className="mx-auto max-w-6xl border-t border-white/15 px-5 py-14">
        <h2 className="font-serif text-4xl">Skills &amp; achievements</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="quick-side-card rounded-xl p-6"><Code2 className="mb-5 text-cyan-200" size={28}/>{skills.map(s => <div key={s.group} className="mb-4"><h3 className="font-semibold text-sky-100">{s.group}</h3><div className="quick-chips mt-2">{s.items.map(i => <span key={i}>{i}</span>)}</div></div>)}</div>
          <div className="quick-side-card rounded-xl p-6"><Award className="mb-5 text-amber-200" size={28}/>{competitions.map(c => <div key={c.name} className="mb-4"><h3 className="font-semibold">{c.name}</h3><p className="text-sky-200">{c.result}</p><p className="text-slate-300">{c.detail}</p></div>)}</div>
        </div>
      </section>
      <footer id="contact" className="mx-auto max-w-6xl border-t border-white/15 px-5 py-12"><h2 className="font-serif text-4xl">Get in touch</h2><div className="mt-5 flex flex-wrap gap-3"><a className="project-link" href={'mailto:' + contact.email}><Mail size={17} className="mr-2"/>Email</a><a className="project-link" href={'https://' + contact.github}><GithubIcon className="mr-2 size-4" aria-hidden/>GitHub</a><a className="project-link" href={'https://' + contact.linkedin}><LinkedinIcon className="mr-2 size-4" aria-hidden/>LinkedIn</a></div><p className="mt-6 text-xs leading-relaxed text-slate-400">Photography: {photoCredits.map((c,i) => <span key={c.file}><a href={'https://commons.wikimedia.org/wiki/File:' + c.file} className="underline">{c.subject}</a> by {c.author} ({c.license}){i < photoCredits.length - 1 ? ' · ' : ''}</span>)}</p></footer>
    </main>
  )
}
