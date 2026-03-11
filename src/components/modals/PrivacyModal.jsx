export default function PrivacyModal({ show, onClose }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
  return (
    <div className={`modal-backdrop${show ? ' show' : ''}`} id="privacyModal" onClick={handleBackdropClick}>
      <div className="modal privacy-modal">
        <h3>Privacy Policy</h3>
        <p><strong>Last updated:</strong> March 2026</p>
        <h4>What we collect</h4>
        <p>We collect your name, email address, and the URL you submit for auditing. This data is stored securely in our database.</p>
        <h4>How we use it</h4>
        <p>Your email is used to deliver your one-time verification code and your SEO report. We may send occasional product updates if you join our waitlist. We never sell or share your data with third parties for marketing.</p>
        <h4>Data retention</h4>
        <p>Your audit URL is stored for internal quality monitoring. You may request deletion of your data at any time by contacting us.</p>
        <h4>Cookies</h4>
        <p>We use sessionStorage (not cookies) to temporarily cache your audit report for convenience. No tracking cookies are used.</p>
        <h4>Contact</h4>
        <p>For privacy requests, use our <a href="https://docs.google.com/forms/d/e/1FAIpQLSeGcvYYWkXVQQRLZnR5S42Qv-tB_zKdkU7_8E-hcvEi4SxfmA/viewform" target="_blank" rel="noopener" style={{color:'var(--orange)'}}>contact form</a>.</p>
        <button className="privacy-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
