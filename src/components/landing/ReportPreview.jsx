export default function ReportPreview({ onScrollToTop }) {
  return (
    <section className="preview-section" style={{padding:'80px 24px'}}>
      <div className="container">
        <div className="section-label">SAMPLE REPORT</div>
        <h2 className="section-h2">See what you'll get</h2>
        <p className="section-sub">A full 8-section audit with scores, issues, fixes, and AI strategy.</p>
        <div className="preview-card">
          <div className="preview-header">
            <div className="preview-logo"><span className="w">ChatGPT</span><span className="o"> Rank</span></div>
            <div className="preview-label">SEO AUDIT REPORT</div>
          </div>
          <div className="preview-score-wrap">
            <div style={{flex:1,minWidth:0}}>
              <div className="preview-site">Apple Inc.</div>
              <div className="preview-url">apple.com · Technology · Global</div>
              <div className="preview-chips">
                <span className="p-chip" style={{color:'var(--green)'}}>TECH 9</span>
                <span className="p-chip" style={{color:'var(--green)'}}>CONTENT 8</span>
                <span className="p-chip" style={{color:'var(--green)'}}>ON-PAGE 9</span>
                <span className="p-chip" style={{color:'var(--green)'}}>AI 8</span>
                <span className="p-chip" style={{color:'var(--green)'}}>E-E-A-T 9</span>
                <span className="p-chip" style={{color:'var(--amber)'}}>SPEED 7</span>
              </div>
            </div>
            <div className="preview-ring" style={{marginLeft:'auto',flexShrink:0}}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="7"/>
                <circle cx="40" cy="40" r="32" fill="none" stroke="#22C55E" strokeWidth="7"
                  strokeLinecap="round" strokeDasharray="201.1" strokeDashoffset="20.1"/>
              </svg>
              <div className="preview-ring-num" style={{color:'#22C55E'}}>9</div>
            </div>
          </div>
          <div className="preview-blur">
            <div style={{height:'12px',background:'var(--border)',borderRadius:'4px',marginBottom:'10px',width:'80%'}}></div>
            <div style={{height:'12px',background:'var(--border)',borderRadius:'4px',marginBottom:'10px',width:'60%'}}></div>
            <div style={{height:'12px',background:'var(--border)',borderRadius:'4px',marginBottom:'10px',width:'70%'}}></div>
            <div style={{height:'12px',background:'var(--border)',borderRadius:'4px',width:'50%'}}></div>
          </div>
          <div className="preview-locked-overlay">
            <div className="preview-lock-text">🔒 Verify email to unlock full report</div>
            <button className="preview-lock-btn" onClick={onScrollToTop}>Audit Your Site Free →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
