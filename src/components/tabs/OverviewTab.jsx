export default function OverviewTab({ d }) {
  const wins   = d.wins   || [];
  const issues = d.issues || [];
  const qwins  = d.quick_wins || [];

  function priBadge(p) {
    return p === 'HIGH' ? 'pb-high' : p === 'MED' ? 'pb-med' : 'pb-low';
  }

  return (
    <>
      {d.ai_tip && (
        <div className="ai-tip">{d.ai_tip}</div>
      )}

      <div className="r-card">
        <div className="r-card-title">✅ What's Already Working</div>
        {wins.map((w, i) => (
          <div className="row" key={i}>
            <div className="row-icon ri-pass">✓</div>
            <div className="row-body">
              <div className="rt">{w.title}</div>
              <div className="rd">{w.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="r-card">
        <div className="r-card-title">🚨 Issues Found ({issues.length})</div>
        {issues.map((issue, i) => (
          <div className="row" key={i}>
            <div className="row-icon ri-fail">!</div>
            <div className="row-body">
              <div className="teaser-title-row">
                <span className={`priority-badge ${priBadge(issue.priority)}`}>{issue.priority}</span>
                <div className="rt">{issue.title}</div>
              </div>
              <div className="rd">{issue.desc}</div>
              <div className="rf">Fix: {issue.fix}</div>
            </div>
          </div>
        ))}
      </div>

      {qwins.length > 0 && (
        <div className="r-card">
          <div className="r-card-title">⚡ Quick Wins — Do This Week</div>
          {qwins.map((w, i) => (
            <div className="qw" key={i}>{w}</div>
          ))}
        </div>
      )}
    </>
  );
}
