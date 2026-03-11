function scColor(v) { return v >= 7 ? 'var(--green)' : v >= 5 ? 'var(--amber)' : 'var(--red)'; }
function scLabel(v) { return v >= 7 ? 'Good' : v >= 5 ? 'Needs Work' : 'Critical'; }

export default function AIOverviewTab({ d }) {
  const ai   = d.ai_overview || {};
  const sc   = ai.score || 0;
  const c    = scColor(sc);
  const tips = ai.tips || [];
  const qs   = ai.query_types || [];

  return (
    <>
      <div className="r-card">
        <div className="r-card-title">
          🤖 AI Overview Score
          <span className="rc-score" style={{ background: `${c}22`, color: c }}>
            {sc}/10 — {scLabel(sc)}
          </span>
        </div>

        <div style={{ height: '6px', background: 'var(--border)', borderRadius: '999px', marginBottom: '16px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${sc * 10}%`, background: c, borderRadius: '999px', transition: 'width 1.2s ease' }} />
        </div>

        <div style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.7, marginBottom: '16px' }}>
          {ai.opportunity || ''}
        </div>

        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
          Optimisation Tips
        </div>

        {tips.map((t, i) => (
          <div className="ai-tip-card" key={i}>{t}</div>
        ))}
      </div>

      <div className="r-card">
        <div className="r-card-title">🔍 Target Query Types</div>
        <div className="ai-queries">
          {qs.map((q, i) => (
            <div className="ai-query" key={i}>"{q}"</div>
          ))}
        </div>
      </div>
    </>
  );
}
