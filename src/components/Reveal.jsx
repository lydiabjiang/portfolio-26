import { useReveal } from '../useReveal'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, inView] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
