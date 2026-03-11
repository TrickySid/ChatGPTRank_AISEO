export default function HowItWorks() {
  return (
    <section style={{padding:'80px 24px',background:'rgba(13,17,23,.4)'}}>
      <div className="container">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-h2">Three steps to AI search dominance</h2>
        <p className="section-sub">From URL to actionable report in under 60 seconds.</p>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">STEP 01</div>
            <div className="step-icon">🔗</div>
            <div className="step-title">Enter Your URL</div>
            <div className="step-desc">Paste any URL. Claude AI analyzes 8 SEO dimensions across technical, content, and AI readiness signals.</div>
          </div>
          <div className="step-card">
            <div className="step-num">STEP 02</div>
            <div className="step-icon">🤖</div>
            <div className="step-title">AI Analyzes Everything</div>
            <div className="step-desc">Technical, content, E-E-A-T, schema, AI readiness — all scored with site-specific insights.</div>
          </div>
          <div className="step-card">
            <div className="step-num">STEP 03</div>
            <div className="step-icon">📊</div>
            <div className="step-title">Get Your Action Plan</div>
            <div className="step-desc">Ranked issues with exact fixes, quick wins for this week, and a premium PDF download.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
