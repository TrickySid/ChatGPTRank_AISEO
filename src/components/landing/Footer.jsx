export default function Footer({ onSmoothTo, onShowPrivacy }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-logo"><span className="w">ChatGPT</span><span className="o"> Rank</span></div>
          <div className="footer-copy">© 2026 ChatGPT Rank</div>
        </div>
        <div className="footer-links">
          <a className="footer-link" href="#pricing" onClick={e => { e.preventDefault(); onSmoothTo('pricing'); }}>Pricing</a>
          <a className="footer-link" href="https://forms.gle/H1AjodzzgSG6YjSV7" target="_blank" rel="noopener">Contact</a>
          <span className="footer-link" onClick={onShowPrivacy} style={{cursor:'pointer'}}>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
