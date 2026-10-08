import { contact, site } from '../content'
import { useReveal } from '../useReveal'
import Arrow from './Arrow'
import BlobButton from './BlobButton'
import Headline from './Headline'

export default function Contact() {
  const [ref, inView] = useReveal()

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container">
        <p className={`eyebrow section__label reveal ${inView ? 'is-in' : ''}`}>{contact.eyebrow}</p>
        <Headline as="h2" lines={[contact.line]} className="contact__title" start={inView} />
        <p className={`contact__body reveal ${inView ? 'is-in' : ''}`} style={{ transitionDelay: '400ms' }}>
          {contact.body}
        </p>
        <div className={`contact__actions reveal ${inView ? 'is-in' : ''}`} style={{ transitionDelay: '500ms' }}>
          <BlobButton as="a" href={`mailto:${site.email}`} className="contact__email">
            {site.email} <Arrow size={16} />
          </BlobButton>
          <ul className="contact__socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
