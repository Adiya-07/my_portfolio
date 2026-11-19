import { Mail, MapPin } from 'lucide-react'
import { contact, photoCredits, profile } from '@/lib/portfolio'
import { T } from '@/lib/journey'
import { Eyebrow, Stage } from '../stage'
import { GithubIcon, LinkedinIcon } from '../brand-icons'

const links = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
  { label: 'GitHub', value: contact.github, href: `https://${contact.github}`, Icon: GithubIcon },
  { label: 'LinkedIn', value: contact.linkedin, href: `https://${contact.linkedin}`, Icon: LinkedinIcon },
]

export function FinaleStage() {
  return (
    <Stage window={[T.finale, 1.2]} fade={0.03} drift={40} className="inset-0 z-20" labelledBy="contact-title">
      <div className="flex h-full flex-col items-center px-6 pt-[14vh] text-center text-white">
        <Eyebrow className="text-amber-100/85">Expedition complete · Sunset over the Khumbu</Eyebrow>
        <h2 id="contact-title" className="mt-5 font-serif text-7xl leading-none [text-shadow:0_4px_40px_rgba(40,10,30,0.5)] md:text-9xl">
          {profile.name}
        </h2>
        <p className="mt-5 text-lg text-white/95 md:text-xl">{profile.degree}</p>
        <p className="text-white/75">{profile.college}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/65">
          <MapPin className="size-3.5" aria-hidden />
          {profile.location}
        </p>

        <ul className="mt-10 flex flex-col gap-3 sm:flex-row">
          {links.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full border border-white/25 bg-[#1a0f22]/35 px-5 py-3 text-left backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <Icon className="size-4 text-amber-100" aria-hidden />
                <span className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">{label}</span>
                  <span className="text-sm text-white">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-auto pb-6 text-[10px] leading-relaxed text-white/50">
          <p>
            Photographs via Wikimedia Commons —{' '}
            {photoCredits.map((c, i) => (
              <span key={c.file}>
                <a
                  className="underline decoration-white/30 underline-offset-2 hover:text-white/80"
                  href={`https://commons.wikimedia.org/wiki/File:${c.file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.subject}
                </a>{' '}
                by {c.author} ({c.license}){i < photoCredits.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </footer>
      </div>
    </Stage>
  )
}
