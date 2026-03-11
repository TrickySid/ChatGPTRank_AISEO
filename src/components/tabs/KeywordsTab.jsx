export default function KeywordsTab({ d }) {
  const kws = d.keywords || [];

  function priBadge(p) {
    return p === 'HIGH' ? 'pb-high' : p === 'MED' ? 'pb-med' : 'pb-low';
  }
  function intentColor(intent) {
    if (intent === 'Commercial')    return 'var(--amber)';
    if (intent === 'Informational') return '#38bdf8';
    if (intent === 'Local')         return 'var(--purple)';
    return 'var(--muted)';
  }

  return (
    <div className="r-card">
      <div className="r-card-title">🔑 Keyword Opportunities</div>
      {kws.map((k, i) => (
        <div className="row" key={i}>
          <div className="row-body" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div className="rt" style={{ margin: 0 }}>{k.keyword}</div>
              <span className={`priority-badge ${priBadge(k.priority)}`}>{k.priority}</span>
            </div>
            <div className="rd" style={{ marginTop: '4px' }}>
              <span style={{ color: intentColor(k.intent) }}>{k.intent}</span>
              &nbsp;·&nbsp; Vol: {k.volume}
              &nbsp;·&nbsp; Difficulty: {k.difficulty}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
