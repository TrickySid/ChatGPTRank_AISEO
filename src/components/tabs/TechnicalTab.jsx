export default function TechnicalTab({ d }) {
  const checks = d.tech_audit || [];
  const pass   = checks.filter(c => c.status === 'pass').length;
  const warn   = checks.filter(c => c.status === 'warn').length;
  const fail   = checks.filter(c => c.status === 'fail').length;

  function icon(status) {
    return status === 'pass' ? '✓' : status === 'fail' ? '✗' : '!';
  }
  function cls(status) {
    return status === 'pass' ? 'tc-pass' : status === 'fail' ? 'tc-fail' : 'tc-warn';
  }

  return (
    <div className="r-card">
      <div className="r-card-title">🔧 14-Point Technical Audit</div>

      <div className="tech-summary">
        <div className="ts-box">
          <div className="ts-num" style={{ color: 'var(--green)' }}>{pass}</div>
          <div className="ts-lbl">Passed</div>
        </div>
        <div className="ts-box">
          <div className="ts-num" style={{ color: 'var(--amber)' }}>{warn}</div>
          <div className="ts-lbl">Warnings</div>
        </div>
        <div className="ts-box">
          <div className="ts-num" style={{ color: 'var(--red)' }}>{fail}</div>
          <div className="ts-lbl">Failed</div>
        </div>
      </div>

      <div className="tech-grid">
        {checks.map((c, i) => (
          <div className="tech-check" key={i}>
            <div className={`tc-icon ${cls(c.status)}`}>{icon(c.status)}</div>
            <div className="tc-body">
              <div className="tc-name">{c.check}</div>
              <div className="tc-note">{c.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
