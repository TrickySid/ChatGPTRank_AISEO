export default function FeaturesGrid() {
  return (
    <section style={{padding:'80px 24px'}}>
      <div className="container">
        <div className="section-label">FEATURES</div>
        <h2 className="section-h2">Everything you need to rank</h2>
        <p className="section-sub">The only audit that checks all 8 dimensions AI search engines care about.</p>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-icon">🛡</div>
            <div className="feat-title">Technical Audit</div>
            <div className="feat-desc">14-point checklist covering Core Web Vitals, speed, schema, canonicals, and site health.</div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🤖</div>
            <div className="feat-title">AI Overview Score</div>
            <div className="feat-desc">Only tool checking if ChatGPT, Claude &amp; Perplexity can actually cite and reference your site.</div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📊</div>
            <div className="feat-title">E-E-A-T Analysis</div>
            <div className="feat-desc">Experience, Expertise, Authority, Trust — each scored individually with actionable improvements.</div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🏷</div>
            <div className="feat-title">On-Page + Schema</div>
            <div className="feat-desc">Title, meta, 6 schema types with AI-optimized suggestions tailored to your business type.</div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">✍</div>
            <div className="feat-title">Content Strategy</div>
            <div className="feat-desc">Blog topics crafted specifically to appear in Google AI Overview answers for your niche.</div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📥</div>
            <div className="feat-title">Premium PDF Report</div>
            <div className="feat-desc">10-page professional white-label report. Share directly with your team or client.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
