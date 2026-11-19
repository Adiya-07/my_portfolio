'use client'

import { profile, astroguy, nexus, fable, otherProjects, competitions, skills, contact, photoCredits } from '@/lib/portfolio'

export function QuickPortfolio({ onExplore }: { onExplore?: () => void }) {
  const projects = [
    { name: astroguy.name, peak: 'Himalayas', detail: astroguy.tagline, status: astroguy.status, summary: astroguy.team + ' ' + astroguy.achievement, repo: 'https://github.com/Adiya-07/PYEXPO-PY003', image: '/images/himalayas.webp' },
    { name: nexus.name, peak: 'K2', detail: nexus.tagline, status: nexus.status, summary: nexus.description, repo: nexus.repo, image: '/images/k2.webp' },
    { name: fable.name, peak: 'Everest', detail: fable.tagline, status: fable.status, summary: fable.description, repo: null, image: '/images/everest.webp' },
  ]
  return (
    <main className="quick-view min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/15 bg-slate-950/95">
        <nav aria-label="Portfolio navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <a href="#top" className="font-serif text-2xl">{profile.name}</a>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
            {onExplore && <button className="project-link" onClick={onExplore}>Enter the expedition</button>}
          </div>
        </nav>
      </header>
      <section id="top" className="relative isolate overflow-hidden border-b border-white/15">
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-35" style={{backgroundImage: 'url(/images/basecamp.webp)'}} />
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-xs uppercase tracking-widest text-sky-200">Base Camp · Portfolio overview</p>
          <h1 className="mt-3 font-serif text-6xl md:text-8xl">{profile.name}</h1>
          <p className="mt-4 text-xl">{profile.degree}</p>
          <p className="mt-2 text-slate-300">{profile.college} · {profile.location}</p>
          <p className="mt-5 max-w-xl text-base text-slate-200">{profile.focus}</p>
          <p className="mt-3 text-sm text-slate-300">{profile.year} · Graduation {profile.graduation} · {profile.cgpa}</p>
          <div className="mt-6 flex flex-wrap gap-3"><a className="project-link" href="#projects">Explore projects</a><a className="project-link" href={'https://' + contact.github}>GitHub profile</a></div>
        </div>
      </section>
      <section id="projects" className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-widest text-sky-200">The three summits</p>
        <h2 className="mt-2 font-serif text-4xl">Selected projects</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {projects.map(p => <article key={p.name} className="overflow-hidden rounded-2xl border border-white/15 bg-slate-900">
            <div className="h-40 bg-cover bg-center" style={{backgroundImage: `url(${p.image})`}} />
            <div className="p-5"><p className="text-xs text-sky-200">{p.peak} · {p.status}</p><h3 className="mt-2 font-serif text-3xl">{p.name}</h3><p className="text-sm font-semibold text-slate-200">{p.detail}</p><p className="mt-3 leading-relaxed text-slate-300">{p.summary}</p>
            {p.repo ? <a className="project-link mt-4" href={p.repo} target="_blank" rel="noreferrer">View source</a> : <p className="mt-4 text-sm text-amber-200">In development · No public demo yet</p>}</div>
          </article>)}
        </div>
        <h2 className="mt-14 font-serif text-3xl">Other routes</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{otherProjects.map(p => <article key={p.name} className="rounded-xl border border-white/15 bg-slate-900 p-5"><h3 className="font-serif text-2xl">{p.name}</h3><p className="mt-2 text-slate-300">{p.note}</p><a href={p.repo} className="project-link mt-4" target="_blank" rel="noreferrer">View source</a></article>)}</div>
      </section>
      <section id="skills" className="mx-auto max-w-6xl border-t border-white/15 px-5 py-14">
        <h2 className="font-serif text-4xl">Skills &amp; achievements</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-slate-900 p-5">{skills.map(s => <div key={s.group} className="mb-4"><h3 className="font-semibold text-sky-100">{s.group}</h3><p className="text-slate-300">{s.items.join(' · ')}</p></div>)}</div>
          <div className="rounded-xl bg-slate-900 p-5">{competitions.map(c => <div key={c.name} className="mb-4"><h3 className="font-semibold">{c.name}</h3><p className="text-sky-200">{c.result}</p><p className="text-slate-300">{c.detail}</p></div>)}</div>
        </div>
      </section>
      <footer id="contact" className="mx-auto max-w-6xl border-t border-white/15 px-5 py-12"><h2 className="font-serif text-4xl">Get in touch</h2><div className="mt-5 flex flex-wrap gap-3"><a className="project-link" href={'mailto:' + contact.email}>Email</a><a className="project-link" href={'https://' + contact.github}>GitHub</a><a className="project-link" href={'https://' + contact.linkedin}>LinkedIn</a></div><p className="mt-6 text-xs leading-relaxed text-slate-400">Photography: {photoCredits.map((c,i) => <span key={c.file}><a href={'https://commons.wikimedia.org/wiki/File:' + c.file} className="underline">{c.subject}</a> by {c.author} ({c.license}){i < photoCredits.length - 1 ? ' · ' : ''}</span>)}</p></footer>
    </main>
  )
}
