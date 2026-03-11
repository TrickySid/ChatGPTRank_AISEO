import { useState } from 'react';
import { FUNC_BASE } from '../../constants.js';

export default function GateSection({ onUnlock, reportData, auditUrl, onShowPrivacy }) {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [btnText, setBtnText] = useState('Send Verification Code →');
  const [btnDisabled, setBtnDisabled] = useState(false);

  async function sendOtp() {
    setErrMsg('');
    if (!name.trim())  { shakeErr('Please enter your name.'); return; }
    if (!email.trim() || !email.includes('@')) { shakeErr('Please enter a valid email.'); return; }

    setBtnDisabled(true);
    setBtnText('Unlocking…');

    try {
      fetch(FUNC_BASE + '/.netlify/functions/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), auditUrl })
      }).catch(() => {});
    } catch(e) {}

    try {
      localStorage.setItem('cr_lead', JSON.stringify({ name: name.trim(), email: email.trim(), ts: Date.now() }));
    } catch(e) {}

    await new Promise(r => setTimeout(r, 800));

    setBtnDisabled(false);
    setBtnText('Send Verification Code →');

    onUnlock(reportData, name.trim());
  }

  function shakeErr(msg) {
    setErrMsg(msg);
  }

  return (
    <div className="gate-section">
      <div className="gate-card" id="gateEmail">
        <div className="gate-icon-wrap gate-icon-orange">🔒</div>
        <div className="gate-tag">Your Free Report Is Ready</div>
        <h3 className="gate-h3">Unlock wins, issues, E-E-A-T &amp; AI strategy</h3>
        <p className="gate-sub">Verify your email — instant access, always free.</p>
        <input
          className="gate-input"
          id="gateName"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="gate-input"
          id="gateEmailInput"
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errMsg && (
          <div className="gate-error" id="gateEmailError" style={{display:'block',animation:'shake .4s ease'}}>
            {errMsg}
          </div>
        )}
        <button
          className="gate-btn"
          id="sendOtpBtn"
          onClick={sendOtp}
          disabled={btnDisabled}
        >{btnText}</button>
        <div className="gate-trust">🔒 No spam &nbsp;·&nbsp; ✓ Free forever &nbsp;·&nbsp; ✗ No credit card</div>
        <div className="gate-privacy">By submitting you agree to our <span onClick={onShowPrivacy} style={{cursor:'pointer'}}>Privacy Policy</span></div>
      </div>

      {/* OTP step — reserved for future Pro verification flow */}
    </div>
  );
}
