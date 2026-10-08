import { principles } from '../content'
import Reveal from './Reveal'

export default function Principles() {
  return (
    <section className="section" id="approach">
      <div className="container">
        <Reveal as="h2" className="eyebrow section__label">
          How I work
        </Reveal>
        <ol className="principles">
          {principles.map((p, i) => (
            <li
              className="principle"
              key={p.title}
              style={{ '--i': i, zIndex: i + 1 }}
            >
              <span className={`principle__num ${i % 2 ? 'text-yellow' : 'text-purple'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="principle__title">{p.title}</h3>
                <p className="principle__body">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
