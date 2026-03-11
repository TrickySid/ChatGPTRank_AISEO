export default function PDFModal({ show, onClose }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
  return (
    <div className={`modal-backdrop${show ? ' show' : ''}`} id="pdfModal" onClick={handleBackdropClick}>
      <div className="modal pdf-modal-content">
        <div className="modal-icon">📥</div>
        <div className="modal-title">Download PDF Report</div>
        <div className="modal-sub">Complete your audit first to generate your PDF report.</div>
        <div className="modal-btns">
          <button className="modal-btn-primary" onClick={() => { onClose(); window.scrollTo({top:0,behavior:'smooth'}); }}>Start Audit →</button>
          <button className="modal-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
