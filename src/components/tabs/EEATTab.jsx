function scColor(v) { return v >= 7 ? 'var(--green)' : v >= 5 ? 'var(--amber)' : 'var(--red)'; }

const EEAT_KEYS = ['experience', 'expertise', 'authoritativeness', 'trustworthiness'];

export default function EEATTab({ d }) {
  const ee          = d.eeat || {};
  const improvements = ee.improvements || [];

  return (
    <>
      <div className="r-card">
        <div className="r-card-title">🏆 E-E-A-T Scores</div>
        <div className="eeat-grid">
          {EEAT_KEYS.map(k => {
            const item = ee[k] || {};
            const val  = item.score || 0;
            const c    = scColor(val);
            return (
              <div className="eeat-card" key={k}>
                <div className="eeat-head">
                  <div className="eeat-label">{k.charAt(0).toUpperCase() + k.slice(1)}</div>
                  <div className="eeat-score" style={{ color: c }}>{val}/10</div>
                </div>
                <div className="eeat-bar-bg">
                  <div className="eeat-bar-fill" style={{ width: `${val * 10}%`, background: c }} />
                </div>
                <div className="eeat-note">{item.status || ''} — {item.note || ''}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="r-card">
        <div className="r-card-title">📋 Improvement Actions</div>
        <div className="eeat-actions">
          {improvements.map((a, i) => (
            <div className="eeat-action" key={i}>{a}</div>
          ))}
        </div>
      </div>
    </>
  );
}
