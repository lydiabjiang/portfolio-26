import { projects } from '../content'
import ProjectVisual from './ProjectVisual'
import Reveal from './Reveal'

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal as="h2" className="eyebrow section__label">
          Selected work
        </Reveal>
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.title} as="article" className="project" delay={(i % 2) * 100}>
              <a href={p.href} className="project__link">
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
    </section>
  )
}
