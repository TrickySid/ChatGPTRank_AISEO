export default function OnPageTab({ d }) {
  const m  = d.meta_tags || {};
  const mt = m.title || {};
  const md = m.meta_description || {};
  const schemas = m.schemas || [];

  function charCls(n, lo, hi) {
    return n >= lo && n <= hi ? 'cb-good' : n < lo ? 'cb-bad' : 'cb-warn';
  }
  function impCls(impact) {
    return impact === 'HIGH' ? 'pb-high' : impact === 'MED' ? 'pb-med' : 'pb-low';
  }

  return (
    <>
      <div className="r-card">
        <div className="r-card-title">📋 Meta Title</div>
        <div className="meta-box">
          <div className="mb-label">
            Current{' '}
            <span className={`char-badge ${charCls(mt.char_count || 0, 10, 60)}`}>
              {mt.char_count || 0} chars
            </span>
          </div>
          <div className="mb-current">{mt.current || '—'}</div>
          <div className="mb-label" style={{ color: 'var(--green)' }}>Suggested</div>
          <div className="mb-suggested">{mt.suggestion || '—'}</div>
        </div>
      </div>

      <div className="r-card">
        <div className="r-card-title">📝 Meta Description</div>
        <div className="meta-box">
          <div className="mb-label">
            Current{' '}
            <span className={`char-badge ${charCls(md.char_count || 0, 140, 160)}`}>
              {md.char_count || 0} chars
            </span>
          </div>
          <div className="mb-current">{md.current || '—'}</div>
          <div className="mb-label" style={{ color: 'var(--green)' }}>Suggested</div>
          <div className="mb-suggested">{md.suggestion || '—'}</div>
        </div>
      </div>

      <div className="r-card">
        <div className="r-card-title">🏷 Schema Markup (Structured Data)</div>
        {schemas.map((s, i) => {
          const present = s.status === 'present';
          return (
            <div className="schema-row" key={i}>
              <div className={`row-icon ${present ? 'ri-pass' : 'ri-fail'}`}>
                {present ? '✓' : '✗'}
              </div>
              <div className="row-body" style={{ flex: 1 }}>
                <div className="rt">
                  {s.type}{' '}
                  <span className={`priority-badge ${impCls(s.impact)}`} style={{ marginLeft: '6px' }}>
                    {s.impact}
                  </span>
                </div>
                <div className="rd">{s.hint}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
