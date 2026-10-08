import { useEffect, useRef } from 'react'

// Space around the word that particles can scatter into.
const PAD = 56

/**
 * Renders a word as a field of dots that flee the cursor and spring back.
 * The real text stays in the DOM (transparent) for layout, selection and
 * screen readers; the canvas is drawn on top of it.
 */
export default function ParticleText({ children, delay = 0 }) {
  const srcRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const src = srcRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      src.classList.add('is-static')
      return
    }

    let particles = []
    let dpr = 1
    let w = 0
    let h = 0
    let reach = 60
    let color = '#dedede'
    let lastSize = ''
    let built = false
    let visible = true
    let running = false
    let raf = 0
    const pointer = { x: -1e4, y: -1e4 }

    const build = (intro) => {
      const cs = getComputedStyle(src)
      const rect = src.getBoundingClientRect()
      lastSize = `${rect.width}x${rect.height}`
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.ceil(rect.width + PAD * 2)
      h = Math.ceil(rect.height + PAD * 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      // The source text itself is transparent, so take the visible color from the wrapper.
      color = getComputedStyle(src.parentElement).color

      // Draw the word off-screen exactly where the DOM text sits, then sample it.
      const off = document.createElement('canvas')
      off.width = canvas.width
      off.height = canvas.height
      const o = off.getContext('2d', { willReadFrequently: true })
      o.scale(dpr, dpr)
      o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      if ('letterSpacing' in o) o.letterSpacing = cs.letterSpacing
      o.textBaseline = 'alphabetic'
      o.fillStyle = '#fff'
      const text = src.textContent
      const m = o.measureText(text)
      const ascent = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent
      const descent = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent
      const baseline = PAD + (rect.height - (ascent + descent)) / 2 + ascent
      o.fillText(text, PAD, baseline)

      const fontSize = parseFloat(cs.fontSize)
      const gap = Math.max(2, Math.round(fontSize / 26))
      const baseR = gap * 0.58
      reach = fontSize * 0.8

      const data = o.getImageData(0, 0, off.width, off.height).data
      const next = []
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const i = (Math.round(y * dpr) * off.width + Math.round(x * dpr)) * 4 + 3
          if (data[i] < 130) continue
          const ox = x + (Math.random() - 0.5) * gap * 0.35
          const oy = y + (Math.random() - 0.5) * gap * 0.35
          const p = { ox, oy, x: ox, y: oy, vx: 0, vy: 0, r: baseR * (0.65 + Math.random() * 0.55) }
          if (intro) {
            const a = Math.random() * Math.PI * 2
            const d = fontSize * (0.6 + Math.random() * 1.4)
            p.x = ox + Math.cos(a) * d
            p.y = oy + Math.sin(a) * d * 0.6
          }
          next.push(p)
        }
      }
      particles = next
      built = true
    }

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      ctx.beginPath()
      for (const p of particles) {
        ctx.moveTo(p.x + p.r, p.y)
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    const pointerNear = () =>
      pointer.x > -reach && pointer.y > -reach && pointer.x < w + reach && pointer.y < h + reach

    // Fixed 60Hz physics steps so the motion feels the same on any refresh rate.
    const STEP = 1000 / 60
    let last = 0
    let acc = 0

    const step = () => {
      let moving = false
      const r2 = reach * reach
      for (const p of particles) {
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1
          const f = (1 - d / reach) * 2.4
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx = (p.vx + (p.ox - p.x) * 0.05) * 0.84
        p.vy = (p.vy + (p.oy - p.y) * 0.05) * 0.84
        p.x += p.vx
        p.y += p.vy
        if (!moving && (Math.abs(p.vx) > 0.02 || Math.abs(p.ox - p.x) > 0.05)) moving = true
      }
      return moving
    }

    const tick = (now) => {
      acc = Math.min(acc + (last ? now - last : STEP), STEP * 6)
      last = now
      let moving = true
      while (acc >= STEP) {
        moving = step()
        acc -= STEP
      }
      draw()
      if (moving || pointerNear()) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const wake = () => {
      if (running || !visible || !built) return
      running = true
      last = 0
      raf = requestAnimationFrame(tick)
    }

    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      if (pointerNear()) wake()
    }
    const onPointerLeave = () => {
      pointer.x = -1e4
      pointer.y = -1e4
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    io.observe(canvas)

    const ro = new ResizeObserver(() => {
      if (!built) return
      const r = src.getBoundingClientRect()
      if (`${r.width}x${r.height}` === lastSize) return
      build(false)
      draw()
    })

    let introTimer = 0
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      introTimer = setTimeout(() => {
        build(true)
        src.classList.add('is-ready')
        ro.observe(src)
        wake()
      }, delay)
    })

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelled = true
      clearTimeout(introTimer)
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [children, delay])

  return (
    <span className="particle-word">
      <span ref={srcRef} className="particle-word__src">
        {children}
      </span>
      <canvas
        ref={canvasRef}
        className="particle-word__canvas"
        style={{ left: -PAD, top: -PAD }}
        aria-hidden="true"
      />
    </span>
  )
}
