import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// How long the blur takes to catch up with the cursor (higher = lazier).
const LAG_MS = 220

/**
 * Starts out blurred in a blue-to-purple haze, then comes into focus letter by
 * letter from left to right. After that, the word stays sharp except under
 * the cursor: a blurred copy is revealed through a soft circular mask that
 * trails behind the pointer, while the sharp text fades out beneath it.
 *
 * Each letter's blur tint is taken from its position along the accent
 * gradient (--t from 0 to 1), so the haze matches the gradient.
 * With `gradient`, the sharp letters also paint their slice of that gradient.
 */
export default function FocusText({ children, gradient = false }) {
  const ref = useRef(null)
  const sharpRef = useRef(null)
  const ended = useRef(0)
  const [interactive, setInteractive] = useState(false)
  // Non-breaking spaces so spaces inside a phrase keep their width as inline-blocks.
  const letters = [...children].map((c) => (c === ' ' ? ' ' : c))
  const tint = (i) => ({ '--t': letters.length > 1 ? i / (letters.length - 1) : 0 })

  // Record the phrase width and each letter's offset in em, so they scale with the font.
  useLayoutEffect(() => {
    if (!gradient) return
    const sharp = sharpRef.current
    let cancelled = false
    const measure = () => {
      if (cancelled) return
      const fs = parseFloat(getComputedStyle(sharp).fontSize)
      sharp.style.setProperty('--phrase-w', `${sharp.offsetWidth / fs}em`)
      for (const el of sharp.children) el.style.setProperty('--x', `${el.offsetLeft / fs}em`)
    }
    measure()
    document.fonts.ready.then(measure)
    return () => {
      cancelled = true
    }
  }, [gradient, children])

  // The blur eases toward the cursor each frame, so it lags behind the mouse.
  const pointer = useRef({ target: null, pos: null, raf: 0, last: 0 })
  useEffect(() => () => cancelAnimationFrame(pointer.current.raf), [])

  const follow = (now) => {
    const p = pointer.current
    const dt = p.last ? now - p.last : 16
    p.last = now
    const k = 1 - Math.exp(-dt / LAG_MS)
    p.pos.x += (p.target.x - p.pos.x) * k
    p.pos.y += (p.target.y - p.pos.y) * k
    ref.current.style.setProperty('--mx', `${p.pos.x}px`)
    ref.current.style.setProperty('--my', `${p.pos.y}px`)
    const settled = Math.abs(p.target.x - p.pos.x) < 0.2 && Math.abs(p.target.y - p.pos.y) < 0.2
    p.raf = settled ? 0 : requestAnimationFrame(follow)
  }

  const onPointer = (e) => {
    const r = ref.current.getBoundingClientRect()
    const p = pointer.current
    p.target = { x: e.clientX - r.left, y: e.clientY - r.top }
    // Entering: start the blur where the cursor came in.
    if (e.type === 'pointerenter' || !p.pos) p.pos = { ...p.target }
    if (!p.raf) {
      p.last = 0
      p.raf = requestAnimationFrame(follow)
    }
  }

  const onAnimationEnd = (e) => {
    if (e.animationName !== 'focus-reveal') return
    ended.current += 1
    if (ended.current === letters.length) setInteractive(true)
  }

  return (
    <span
      ref={ref}
      className={`focus-word ${gradient ? 'focus-word--gradient' : ''} ${interactive ? 'is-interactive' : ''}`}
      onAnimationEnd={onAnimationEnd}
      onPointerEnter={onPointer}
      onPointerMove={onPointer}
    >
      <span className="sr-only">{children}</span>
      <span ref={sharpRef} className="focus-word__sharp" aria-hidden="true">
        {letters.map((letter, i) => (
          <span key={i} className="focus-word__letter" style={{ '--i': i, ...tint(i) }}>
            {letter}
          </span>
        ))}
      </span>
      {/* Split the same way as the sharp layer so the two line up exactly */}
      <span className="focus-word__blur" aria-hidden="true">
        {letters.map((letter, i) => (
          <span key={i} className="focus-word__letter" style={tint(i)}>
            {letter}
          </span>
        ))}
      </span>
    </span>
  )
}
