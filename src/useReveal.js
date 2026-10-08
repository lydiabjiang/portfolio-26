import { useEffect, useRef, useState } from 'react'

/** Returns [ref, inView] — inView flips to true once the element scrolls into view. */
export function useReveal(options = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}
