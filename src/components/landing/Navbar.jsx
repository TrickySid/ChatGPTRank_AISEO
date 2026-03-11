export default function Navbar({ scrolled, onSmoothTo }) {
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="mainNav">
      <a className="nav-logo" href="#">
        <span className="nav-logo-text"><span className="w">ChatGPT</span><span className="o"> Rank</span></span>
        <span className="nav-badge">AI SEO</span>
      </a>
      <div className="nav-btns">
        <a className="nav-btn-ghost" href="#pricing" onClick={e => { e.preventDefault(); onSmoothTo('pricing'); }}>Pricing</a>
        <a className="nav-btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSeGcvYYWkXVQQRLZnR5S42Qv-tB_zKdkU7_8E-hcvEi4SxfmA/viewform" target="_blank" rel="noopener">Contact →</a>
      </div>
    </nav>
  );
}
