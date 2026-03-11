function scColor(v) { return v >= 7 ? 'var(--green)' : v >= 5 ? 'var(--amber)' : 'var(--red)'; }

export default function ArchitectureTab({ d }) {
  const a    = d.site_architecture || {};
  const dep  = a.depth_score || 0;
  const issues = a.issues || [];
  const recs   = a.recommendations || [];

  return (
    <div className="r-card">
      <div className="r-card-title">🏗 Site Architecture</div>

      <div className="arch-stats">
        <div className="arch-stat">
          <div className="asv" style={{ color: scColor(dep) }}>{dep}</div>
          <div className="asl">Depth Score</div>
        </div>
      </div>

      <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
        {a.assessment || ''}
      </p>

      <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
        Issues
      </div>
      {issues.map((item, i) => (
        <div className="arch-item issue" key={i}>{item}</div>
      ))}

      <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', margin: '16px 0 8px' }}>
        Recommendations
      </div>
      {recs.map((r, i) => (
        <div className="arch-item rec" key={i}>{r}</div>
      ))}
    </div>
  );
}
