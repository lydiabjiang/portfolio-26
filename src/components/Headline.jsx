import { useEffect, useState } from 'react'
import ParticleText from './ParticleText'

const STAGGER = 70

/**
 * Splits lines into words that slide up into view one by one.
 * A word wrapped in *asterisks* becomes a <ParticleText>.
 */
export default function Headline({ as: Tag = 'h1', lines, className = '', start = true }) {
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
          {line.split(' ').map((word, wi) => {
            const i = index++
            const particle = /^\*(.+)\*([.,!?]*)$/.exec(word)
            const space = wi > 0 ? ' ' : ''
            if (particle) {
              return (
                <span key={wi}>
                  {space}
                  {inView && <ParticleText delay={i * STAGGER + 150}>{particle[1]}</ParticleText>}
                  {!inView && <span className="particle-word__placeholder">{particle[1]}</span>}
                  {particle[2] && <Word i={i}>{particle[2]}</Word>}
                </span>
              )
            }
            return (
              <span key={wi}>
                {space}
                <Word i={i}>{word}</Word>
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
