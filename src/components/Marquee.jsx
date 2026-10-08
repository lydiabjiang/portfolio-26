import { marquee } from '../content'

export default function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee fade-in" style={{ animationDelay: '800ms' }} aria-label="Highlights">
      <div className="marquee__track">
        {items.map((text, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= marquee.length}>
            <span className={`marquee__dot ${i % 2 ? 'bg-blue' : 'bg-purple'}`} />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
