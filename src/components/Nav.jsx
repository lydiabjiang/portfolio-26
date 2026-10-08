import { useEffect, useState } from 'react'
import { nav, site } from '../content'
import Arrow from './Arrow'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label={`${site.name} — home`}>
          <span className="nav__name">{site.name}</span>
          <span className="nav__initials" aria-hidden="true">
            {site.initials.split('').join(' ')}
          </span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--light btn--sm">
          Contact <Arrow />
        </a>
      </div>
    </header>
  )
}
