// Placeholder artwork for case-study cards. Swap for real screenshots:
// <img src="/work/project.png" alt="" /> inside .project__media.

export default function ProjectVisual({ kind }) {
  if (kind === 'mobile') return <Mobile />
  if (kind === 'system') return <System />
  return <Dashboard />
}

function Dashboard() {
  const bars = [38, 55, 47, 72, 64, 88, 70, 94, 80, 60, 76, 98]
  return (
    <div className="pv pv-window">
      <div className="pv-window__bar">
        <i /> <i /> <i />
      </div>
      <div className="pv-dash">
        <aside className="pv-dash__side">
          <b className="pv-pill pv-pill--accent" />
          {[70, 55, 62, 48, 58].map((w, i) => (
            <b key={i} className="pv-line" style={{ width: `${w}%` }} />
          ))}
        </aside>
        <div className="pv-dash__main">
          <div className="pv-stats">
            {['$24.8k', '1,204', '68%', '4.9'].map((v) => (
              <div className="pv-stat" key={v}>
                <b className="pv-line" style={{ width: '50%' }} />
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="pv-chart">
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} className={i === 11 ? 'is-hi' : ''} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Mobile() {
  return (
    <div className="pv pv-phones">
      <div className="pv-phone">
        <b className="pv-line" style={{ width: '40%' }} />
        <div className="pv-phone__hero">
          <span>Welcome</span>
          <b className="pv-line" style={{ width: '80%' }} />
          <b className="pv-line" style={{ width: '60%' }} />
        </div>
        <div className="pv-steps">
          <i className="is-on" /> <i /> <i />
        </div>
        <b className="pv-cta" />
      </div>
      <div className="pv-phone pv-phone--offset">
        <b className="pv-line" style={{ width: '50%' }} />
        <div className="pv-ring">
          <span>72%</span>
        </div>
        {[85, 70, 90].map((w, i) => (
          <div className="pv-row" key={i}>
            <i />
            <b className="pv-line" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function System() {
  return (
    <div className="pv pv-system">
      <div className="pv-swatches">
        {['#c2a8ff', '#ffef93', '#dedede', '#8a8a8a', '#2a2a2a'].map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </div>
      <div className="pv-type">
        <span className="pv-type__aa">Aa</span>
        <div>
          <b className="pv-line" style={{ width: '90%' }} />
          <b className="pv-line" style={{ width: '70%' }} />
          <b className="pv-line" style={{ width: '45%' }} />
        </div>
      </div>
      <div className="pv-components">
        <span className="pv-btn pv-btn--purple">Primary</span>
        <span className="pv-btn pv-btn--ghost">Secondary</span>
        <span className="pv-toggle"><i /></span>
        <span className="pv-chip">Chip</span>
        <span className="pv-chip pv-chip--yellow">Beta</span>
        <span className="pv-check">✓</span>
      </div>
    </div>
  )
}
