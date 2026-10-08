import { useEffect, useRef } from 'react'
import { principles } from '../content'
import Reveal from './Reveal'

export default function Principles() {
  const listRef = useRef(null)

  // As each card slides over the one before it, blur the card underneath.
  // --cover goes from 0 (nothing on top) to 1 (the next card has fully stacked on it).
  useEffect(() => {
    const items = [...listRef.current.children]
    let raf = 0
    const update = () => {
      raf = 0
      items.forEach((el, i) => {
        const next = items[i + 1]
        let cover = 0
        if (next) {
          const stuckAt = parseFloat(getComputedStyle(next).top)
          const distance = next.getBoundingClientRect().top - stuckAt
          cover = Math.min(1, Math.max(0, 1 - distance / el.offsetHeight))
        }
        el.style.setProperty('--cover', cover.toFixed(3))
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <section className="section" id="approach">
      <div className="container">
        <Reveal as="h2" className="eyebrow section__label">
          How I work
        </Reveal>
        <ol className="principles" ref={listRef}>
          {principles.map((p, i) => (
            <li
              className="principle"
              key={p.title}
              style={{ '--i': i, zIndex: i + 1 }}
            >
              <span className={`principle__num ${i % 2 ? 'text-blue' : 'text-purple'}`}>
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
