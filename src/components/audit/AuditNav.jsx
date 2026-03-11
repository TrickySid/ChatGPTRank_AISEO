export default function AuditNav({ onGoHome }) {
  return (
    <div className="audit-nav">
      <a className="audit-nav-logo" href="#" onClick={e => { e.preventDefault(); onGoHome(); }}>
        <span className="w">ChatGPT</span><span className="o"> Rank</span>
      </a>
      <button className="back-btn" onClick={onGoHome}>← New Audit</button>
    </div>
  );
}
