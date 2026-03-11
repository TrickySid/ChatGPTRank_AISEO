export default function RateLimitModal({ show, onClose, onCloseAndPricing }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
  return (
    <div className={`modal-backdrop${show ? ' show' : ''}`} id="rateLimitModal" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-icon">🔒</div>
        <div className="modal-title">Daily Limit Reached</div>
        <div className="modal-sub">You've used your 1 free audit today.<br/>Come back tomorrow for another free audit.</div>
        <div className="modal-btns">
          <button className="modal-btn-primary" onClick={onCloseAndPricing}>View Pricing Plans</button>
          <button className="modal-btn-ghost" onClick={onClose}>← Go Back</button>
        </div>
      </div>
    </div>
  );
}
