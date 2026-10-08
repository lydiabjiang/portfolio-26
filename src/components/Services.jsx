import { services } from '../content'
import BlobButton from './BlobButton'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal as="h2" className="eyebrow section__label">
          What I do
        </Reveal>
        <div className="services">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ tone, eyebrow, title, body, cta, href }) {
  // Feed the cursor position into CSS for the soft glow.
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <a href={href} className={`service-card service-card--${tone}`} onPointerMove={onMove}>
      <span className="service-card__eyebrow eyebrow">{eyebrow}</span>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__body">{body}</p>
      <BlobButton className="service-card__btn">{cta}</BlobButton>
    </a>
  )
}
