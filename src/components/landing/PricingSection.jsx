import { useState } from 'react';
import { FUNC_BASE } from '../../constants.js';

export default function PricingSection({ onScrollToTop }) {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  async function joinWaitlist() {
    const email = waitlistEmail.trim();
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
    try {
      fetch(FUNC_BASE + '/.netlify/functions/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Waitlist', email, auditUrl: 'pro-waitlist' })
      }).catch(() => {});
    } catch(e) {}
    setWaitlistEmail('');
    setWaitlistSuccess(true);
    setTimeout(() => setWaitlistSuccess(false), 4000);
  }

  return (
    <section id="pricing" style={{padding:'80px 24px'}}>
      <div className="container">
        <div className="section-label">PRICING</div>
        <h2 className="section-h2">Start free. Upgrade when ready.</h2>
        <p className="section-sub">No credit card needed for the free audit.</p>
        <div className="pricing-grid">

          {/* FREE */}
          <div className="pricing-card">
            <div className="pricing-plan">FREE</div>
            <div className="pricing-price">$0</div>
            <div className="pricing-per">forever</div>
            <ul className="pricing-features">
              <li><span className="tick">✓</span> Unlimited audits — no daily limit</li>
              <li><span className="tick">✓</span> 3 report generations per device</li>
              <li><span className="tick">✓</span> Overall SEO score (out of 10)</li>
              <li><span className="tick">✓</span> 7-category score breakdown</li>
              <li><span className="tick">✓</span> Full Overview: wins, issues + exact fixes</li>
              <li><span className="tick">✓</span> 4 quick wins for this week</li>
              <li><span className="tick">✓</span> Email OTP verification required</li>
              <li><span className="tick">✓</span> Technical Audit (14-point)</li>
              <li><span className="tick">✓</span> On-Page + Schema Analysis</li>
              <li><span className="tick">✓</span> Premium PDF Download</li>
              <li><span className="tick">✓</span> Keyword Opportunities</li>
              <li><span className="tick">✓</span> AI Overview Strategy</li>
              <li><span className="tick">✓</span> E-E-A-T Deep Analysis</li>
              <li><span className="tick">✓</span> Blog Content Strategy</li>
            </ul>
            <button className="pricing-btn" onClick={onScrollToTop}>Audit Free →</button>
          </div>

          {/* PRO */}
          <div className="pricing-card popular">
            <div className="pricing-badge">MOST POPULAR</div>
            <div className="pricing-plan">PRO</div>
            <div className="pricing-price">$19</div>
            <div className="pricing-per">/ month</div>
            <ul className="pricing-features">
              <li><span className="tick">✓</span> Everything in Free</li>
              <li><span className="tick">✓</span> All 8 sections fully unlocked</li>
              <li><span className="tick">✓</span> All issues with exact fix instructions</li>
              <li><span className="tick">✓</span> Premium 10-page PDF export</li>
              <li><span className="tick">✓</span> Competitor comparison tool</li>
              <li><span className="tick">✓</span> Keyword tracking (5 keywords)</li>
              <li><span className="tick">✓</span> Monthly re-audit email reminders</li>
              <li><span className="tick">✓</span> Priority AI processing (no queue)</li>
              <li><span className="tick">✓</span> Audit history &amp; saved reports</li>
            </ul>
            <button className="pricing-btn disabled-btn" disabled>Coming Soon</button>
            <div style={{marginTop:'10px',color:'var(--muted)',fontSize:'.78rem',textAlign:'center'}}>Get notified when Pro launches:</div>
            <div className="waitlist-wrap">
              <input
                className="waitlist-input"
                id="waitlistEmail"
                type="email"
                placeholder="your@email.com"
                value={waitlistEmail}
                onChange={e => setWaitlistEmail(e.target.value)}
              />
              <button className="waitlist-btn" onClick={joinWaitlist}>Notify Me →</button>
            </div>
            {waitlistSuccess && <div className="waitlist-success" id="waitlistSuccess">✓ You're on the list!</div>}
          </div>

          {/* CUSTOM */}
          <div className="pricing-card custom">
            <div className="pricing-badge custom-badge">FOR AGENCIES</div>
            <div className="pricing-plan">CUSTOM</div>
            <div className="pricing-price" style={{fontSize:'1.8rem',marginBottom:'8px'}}>Get a Quote</div>
            <div className="pricing-per" style={{marginBottom:'20px'}}>tailored for your agency</div>
            <ul className="pricing-features">
              <li><span className="tick">✓</span> Everything in Pro</li>
              <li><span className="tick">✓</span> White-label: your brand, your domain</li>
              <li><span className="tick">✓</span> Rank your business on ChatGPT & other AI platforms</li>
              <li><span className="tick">✓</span> Get discovered by AI-powered search</li>
              <li><span className="tick">✓</span> Increase your online visibility</li>
              <li><span className="tick">✓</span> Stay ahead of 99.99% of businesses</li>
              <li><span className="tick">✓</span> Everything done for you to get results</li>
              <li><span className="tick">✓</span> E-E-A-T authority building</li>
              <li><span className="tick">✓</span> Schema markup implementation</li>
              <li><span className="tick">✓</span> AI-optimized blog content</li>
              <li><span className="tick">✓</span> Personal AI SEO consultant</li>
              <li><span className="tick">✓</span> Monthly strategy calls</li>
            </ul>
            <button className="pricing-btn purple-btn" onClick={() => window.open('https://forms.gle/H1AjodzzgSG6YjSV7','_blank')}>Get Custom Help →</button>
          </div>

        </div>
      </div>
    </section>
  );
}
