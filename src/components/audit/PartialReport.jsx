import { useEffect, useRef } from 'react';
import AuditNav from './AuditNav.jsx';
import GateSection from './GateSection.jsx';

export default function PartialReport({ reportData, auditUrl, onGoHome, onUnlock, onShowPrivacy }) {
  const arcRef  = useRef(null);
  const sbBarsRef = useRef(null);

  const site   = reportData?.site || {};
  const score  = reportData?.overall_score || 0;
  const sc     = reportData?.scores || {};
  const scoreColor = score >= 7 ? '#22C55E' : score >= 5 ? '#F59E0B' : '#EF4444';

  const barMap = {
    Technical: sc.technical, Content: sc.content, 'On-Page': sc.onpage,
    Local: sc.local, Speed: sc.performance, 'AI Ready': sc.ai_readiness, 'E-E-A-T': sc.eeat
  };

  const topIssue = (reportData?.issues || []).find(i => i.priority === 'HIGH') || reportData?.issues?.[0];

  useEffect(() => {
    if (!reportData) return;
    const circ = 2 * Math.PI * 50;
    const timer1 = setTimeout(() => {
      if (arcRef.current) {
        arcRef.current.style.strokeDashoffset = circ - (circ * score / 10);
      }
    }, 200);

    const timer2 = setTimeout(() => {
      if (sbBarsRef.current) {
        sbBarsRef.current.querySelectorAll('.sb-fill').forEach(el => {
          el.style.width = el.dataset.w + '%';
        });
      }
    }, 300);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [reportData]);

  return (
    <div id="partialReport">
      <AuditNav onGoHome={onGoHome} />

      <div className="disclaimer-bar"><span>⚡ AI-estimated analysis.</span> Verify technical scores with Google Search Console.</div>

      <div className="report-hero">
        <div className="rh-card">
          <div className="rh-info">
            <div className="rh-label">SEO AUDIT REPORT</div>
            <div className="rh-site" id="rhSite">{site.name || auditUrl}</div>
            <div className="rh-url" id="rhUrl">{site.url || auditUrl}</div>
            <div><span className="rh-type" id="rhType">{site.type || ''}</span></div>
            <div className="rh-tagline" id="rhTagline">{site.tagline || ''}</div>
          </div>
          <div className="rh-ring-wrap">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="9"/>
              <circle
                ref={arcRef}
                id="rhArc"
                cx="60" cy="60" r="50"
                fill="none"
                stroke={scoreColor}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray="314.2"
                strokeDashoffset="314.2"
                style={{transition:'stroke-dashoffset 1.5s cubic-bezier(.22,1,.36,1),stroke .5s'}}
              />
            </svg>
            <div className="rh-score-num">
              <div className="rh-score-big" id="rhScoreNum" style={{color: scoreColor}}>{score}</div>
              <div className="rh-score-denom">/10</div>
            </div>
          </div>
        </div>
      </div>

      {reportData?.missed_traffic_estimate && (
        <div className="missed-traffic" id="missedTraffic" style={{display:'flex'}}>
          <div className="mt-icon">📉</div>
          <div>
            <div className="mt-label">Estimated Monthly Traffic Being Lost</div>
            <div className="mt-value" id="mtValue">{reportData.missed_traffic_estimate}</div>
            <div className="mt-note">due to current SEO gaps — addressable with targeted fixes</div>
          </div>
        </div>
      )}

      <div className="score-breakdown">
        <div className="sb-card">
          <div className="sb-title">Score Breakdown</div>
          <div className="sb-bars" id="sbBars" ref={sbBarsRef}>
            {Object.entries(barMap).map(([k, v]) => {
              const val = v || 0;
              const c = val >= 7 ? 'var(--green)' : val >= 5 ? 'var(--amber)' : 'var(--red)';
              return (
                <div className="sb-bar" key={k}>
                  <div className="sb-label">{k}</div>
                  <div className="sb-track">
                    <div className="sb-fill" style={{background:c,width:'0%'}} data-w={val * 10}></div>
                  </div>
                  <div className="sb-num" style={{color:c}}>{val}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="teaser-section">
        <div className="r-card">
          <div className="r-card-title">🚨 Issues Found — Preview</div>
          <div id="teaserIssue">
            {topIssue && (
              <div className="row">
                <div className="row-icon ri-fail">!</div>
                <div className="row-body">
                  <div className="teaser-title-row">
                    <span className="priority-badge pb-high">HIGH</span>
                    <div className="rt">{topIssue.title}</div>
                  </div>
                  <div className="rd">{topIssue.desc}</div>
                  <div className="rf">🔒 Exact fix in free report — enter details below</div>
                </div>
              </div>
            )}
          </div>
          <div className="teaser-blur-wrap">
            <div className="teaser-blurred">
              <div style={{height:'50px',background:'var(--border)',borderRadius:'8px',marginBottom:'10px'}}></div>
              <div style={{height:'50px',background:'var(--border)',borderRadius:'8px',marginBottom:'10px',opacity:.6}}></div>
              <div style={{height:'50px',background:'var(--border)',borderRadius:'8px',opacity:.3}}></div>
            </div>
            <div style={{marginTop:'10px'}} className="teaser-lock-label">🔒 Full details + fixes in free report — verify email to unlock</div>
          </div>
        </div>
      </div>

      <GateSection onUnlock={onUnlock} reportData={reportData} auditUrl={auditUrl} onShowPrivacy={onShowPrivacy || (() => {})} />
    </div>
  );
}
