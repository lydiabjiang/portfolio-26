import { hero } from '../content'
import Headline from './Headline'
import Marquee from './Marquee'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <p className="eyebrow hero__eyebrow fade-in" style={{ animationDelay: '0ms' }}>
          <span>{hero.eyebrow[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{hero.eyebrow[1]}</span>
        </p>
        <Headline lines={hero.lines} className="hero__title" gradient />
        <p className="hero__intro fade-in" style={{ animationDelay: '600ms' }}>
          {hero.intro}
        </p>
      </div>
      <Marquee />
    </section>
  )
}
