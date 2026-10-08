import { useEffect, useRef, useState } from 'react'
import { projects } from '../content'
import ProjectVisual from './ProjectVisual'
import Reveal from './Reveal'

export default function Work() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false })
  const pillRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  // Ease the "View case study" pill toward the cursor.
  useEffect(() => {
    if (!cursor.on) return
    let raf
    const loop = () => {
      const c = current.current
      const t = target.current
      c.x += (t.x - c.x) * 0.2
      c.y += (t.y - c.y) * 0.2
      if (pillRef.current) pillRef.current.style.transform = `translate(${c.x}px, ${c.y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [cursor.on])

  const onMove = (e) => {
    target.current = { x: e.clientX, y: e.clientY }
  }
  const onEnter = (e) => {
    target.current = { x: e.clientX, y: e.clientY }
    current.current = { x: e.clientX, y: e.clientY }
    setCursor({ on: true })
  }
  const onLeave = () => setCursor({ on: false })

  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal as="h2" className="eyebrow section__label">
          Selected work
        </Reveal>
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.title} as="article" className="project" delay={i * 60}>
              <a
                href={p.href}
                className="project__link"
                onPointerEnter={onEnter}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
              >
                <div className={`project__media accent-${p.accent}`}>
                  <ProjectVisual kind={p.visual} accent={p.accent} />
                </div>
                <ul className="tags" aria-label="Tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <h3 className="project__title">
                  {p.title}
                  <br />
                  <span className="project__outcome">{p.outcome}</span>
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <div ref={pillRef} className={`cursor-pill ${cursor.on ? 'is-on' : ''}`} aria-hidden="true">
        <span>View case study</span>
      </div>
    </section>
  )
}
