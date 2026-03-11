export default function HeroSection({
  urlInput, setUrlInput,
  onStartAudit, onCancelAudit,
  inlineLoading, ilStep, ilProg, ilUrl,
  errorMsg
}) {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <div className="hero-badge">✦ Free AI SEO Audit</div>
        <h1>Rank on ChatGPT, Claude<br/>&amp; Google AI Overview</h1>
        <p className="hero-sub">See exactly why AI tools ignore your website.<br/>Deep 8-section audit — free, instant, no account.</p>

        <div className="search-wrap">
          <div className="search-box">
            <input
              type="url"
              id="urlInput"
              placeholder="https://yourwebsite.com"
              autoComplete="off"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onStartAudit(); }}
              disabled={inlineLoading}
            />
            <button
              className="hero-audit-btn"
              id="auditBtn"
              onClick={onStartAudit}
              disabled={inlineLoading}
            >Audit Free →</button>
          </div>
        </div>
        <p className="hero-hint">Try: apple.com · nike.com · yoursite.com</p>

        {errorMsg && (
          <div id="errorInline" style={{display:'block',color:'#EF4444',fontSize:'13px',marginTop:'12px',textAlign:'center',maxWidth:'500px',marginLeft:'auto',marginRight:'auto'}}>
            {errorMsg}
          </div>
        )}

        {inlineLoading && (
          <div id="inlineLoading" style={{display:'block',marginTop:'40px',animation:'fadeUp .4s ease'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
              <div style={{position:'relative',width:'56px',height:'56px'}}>
                <div style={{position:'absolute',inset:0,border:'3px solid rgba(255,107,43,.3)',borderTopColor:'#FF6B2B',borderRadius:'50%',animation:'spinL 1s linear infinite'}}></div>
                <div style={{position:'absolute',inset:'10px',border:'2px dashed rgba(255,107,43,.2)',borderTopColor:'rgba(255,107,43,.5)',borderRadius:'50%',animation:'spinR 1.5s linear infinite'}}></div>
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🔍</div>
              </div>
              <div>
                <div id="ilStep" style={{color:'#F1F5F9',fontSize:'14px',fontWeight:500,marginBottom:'6px',textAlign:'center'}}>{ilStep}</div>
                <div id="ilUrl" style={{color:'#64748B',fontSize:'12px',textAlign:'center'}}>{ilUrl}</div>
              </div>
              <div style={{width:'220px',height:'3px',background:'rgba(255,255,255,.07)',borderRadius:'999px',overflow:'hidden'}}>
                <div id="ilBar" style={{height:'100%',width:`${ilProg}%`,background:'#FF6B2B',borderRadius:'999px',transition:'width .4s ease'}}></div>
              </div>
              <div style={{color:'#64748B',fontSize:'11px'}}>This takes ~20 seconds</div>
              <button onClick={onCancelAudit} style={{background:'none',border:'none',color:'#64748B',fontSize:'12px',cursor:'pointer',fontFamily:'inherit'}}>✕ Cancel</button>
            </div>
          </div>
        )}

        <div className="recent-banner" style={{display:'none'}}>
          ↩ Recent audit: <span></span><span className="rb-link">View Report →</span>
        </div>
      </div>
    </section>
  );
}
