import { useRef } from 'react'

/**
 * Pill button whose fill grows out from wherever the cursor enters,
 * and shrinks back toward wherever it leaves.
 */
export default function BlobButton({ as: Tag = 'span', className = '', children, ...rest }) {
  const blobRef = useRef(null)

  const place = (e, on) => {
    const blob = blobRef.current
    const r = e.currentTarget.getBoundingClientRect()
    blob.style.left = `${e.clientX - r.left}px`
    blob.style.top = `${e.clientY - r.top}px`
    blob.style.setProperty('--size', `${Math.hypot(r.width, r.height) * 2.2}px`)
    blob.classList.toggle('is-on', on)
  }

  return (
    <Tag
      className={`blob-btn ${className}`}
      onPointerEnter={(e) => place(e, true)}
      onPointerLeave={(e) => place(e, false)}
      {...rest}
    >
      <span ref={blobRef} className="blob-btn__blob" aria-hidden="true" />
      <span className="blob-btn__label">{children}</span>
    </Tag>
  )
}
