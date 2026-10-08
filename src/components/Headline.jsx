import { useEffect, useState } from 'react'
import FocusText from './FocusText'

const STAGGER = 70

/**
 * Splits lines into words that slide up into view one by one.
 * A word or phrase wrapped in *asterisks* becomes a <FocusText>;
 * `gradient` gives those focus words the accent gradient.
 */
export default function Headline({ as: Tag = 'h1', lines, className = '', start = true, gradient = false }) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!start) return
    const id = requestAnimationFrame(() => setInView(true))
    return () => cancelAnimationFrame(id)
  }, [start])

  let index = 0
  return (
    <Tag className={`headline ${inView ? 'is-in' : ''} ${className}`}>
      {lines.map((line, li) => (
        <span className="headline__line" key={li}>
          {/* Tokens are plain words or *focus phrases*; punctuation right after a phrase stays attached */}
          {[...line.matchAll(/\*([^*]+)\*|[^\s*]+/g)].map((m, ti) => {
            const i = index++
            const space = m.index > 0 && line[m.index - 1] === ' ' ? ' ' : ''
            if (m[1]) {
              // Slides up like the other words, but its clip leaves room for the blur to spill.
              return (
                <span key={ti}>
                  {space}
                  <span className="focus-clip">
                    <span className="word-inner" style={{ transitionDelay: `${i * STAGGER}ms` }}>
                      <FocusText gradient={gradient}>{m[1]}</FocusText>
                    </span>
                  </span>
                </span>
              )
            }
            return (
              <span key={ti}>
                {space}
                <Word i={i}>{m[0]}</Word>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

function Word({ i, children }) {
  return (
    <span className="word-clip">
      <span className="word-inner" style={{ transitionDelay: `${i * STAGGER}ms` }}>
        {children}
      </span>
    </span>
  )
}
