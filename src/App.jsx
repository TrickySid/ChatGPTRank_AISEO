import { useState, useEffect, useRef } from 'react';
import { STEPS } from './constants.js';
import { generatePdf } from './utils/generatePdf.js';

import Navbar        from './components/landing/Navbar.jsx';
import HeroSection   from './components/landing/HeroSection.jsx';
import HowItWorks    from './components/landing/HowItWorks.jsx';
import FeaturesGrid  from './components/landing/FeaturesGrid.jsx';
import ReportPreview from './components/landing/ReportPreview.jsx';
import PricingSection from './components/landing/PricingSection.jsx';
import FAQSection    from './components/landing/FAQSection.jsx';
import Footer        from './components/landing/Footer.jsx';

import PartialReport from './components/audit/PartialReport.jsx';
import FullReport    from './components/audit/FullReport.jsx';

import RateLimitModal from './components/modals/RateLimitModal.jsx';
import PDFModal       from './components/modals/PDFModal.jsx';
import PrivacyModal   from './components/modals/PrivacyModal.jsx';

function smoothTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

async function fetchAuditFromClaude(url) {
  const res = await fetch("/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Audit failed. Please try again.");
  }
  return data.report;
}

export default function App() {
  const [view, setView]           = useState('landing');
  const [reportData, setReportData] = useState(null);
  const [auditUrl, setAuditUrl]   = useState('');
  const [userName, setUserName]   = useState('');
  const [urlInput, setUrlInput]   = useState('');

  const [inlineLoading, setInlineLoading] = useState(false);
  const [ilStep, setIlStep]         = useState(STEPS[0]);
  const [ilProg, setIlProg]         = useState(0);
  const [ilUrl, setIlUrl]           = useState('');
  const [errorMsg, setErrorMsg]     = useState('');

  const [navScrolled, setNavScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [modals, setModals] = useState({ rateLimit: false, pdf: false, privacy: false });

  const ilTimerRef    = useRef(null);
  const ilProgTimerRef = useRef(null);
  const auditAbortedRef = useRef(false);
  const ilProgRef     = useRef(0);
  const ilStepIdxRef  = useRef(0);

  useEffect(() => {
    function onScroll() { setNavScrolled(window.scrollY > 40); }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setModals({ rateLimit: false, pdf: false, privacy: false });
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function openModal(name) { setModals(m => ({ ...m, [name]: true })); }
  function closeModal(name) { setModals(m => ({ ...m, [name]: false })); }

  function showInlineLoading(url) {
    setIlUrl(url);
    setIlStep(STEPS[0]);
    setIlProg(0);
    ilProgRef.current = 0;
    ilStepIdxRef.current = 0;
    setInlineLoading(true);
    clearInterval(ilTimerRef.current);
    clearInterval(ilProgTimerRef.current);
    ilTimerRef.current = setInterval(() => {
      ilStepIdxRef.current = (ilStepIdxRef.current + 1) % STEPS.length;
      setIlStep(STEPS[ilStepIdxRef.current]);
    }, 4000);
    ilProgTimerRef.current = setInterval(() => {
      ilProgRef.current = Math.min(ilProgRef.current + (88 - ilProgRef.current) * 0.04, 88);
      setIlProg(ilProgRef.current);
    }, 400);
  }

  function hideInlineLoading() {
    clearInterval(ilTimerRef.current);
    clearInterval(ilProgTimerRef.current);
    setInlineLoading(false);
    setIlProg(0);
    ilProgRef.current = 0;
  }

  async function startAudit() {
    let url = urlInput.trim();
    if (!url) { alert('Please enter a website URL'); return; }
    if (!url.startsWith('http')) url = 'https://' + url;
    try {
      const u = new URL(url);
      if (!u.hostname.includes('.')) throw new Error();
    } catch {
      alert('Please enter a valid website URL (e.g. yoursite.com)');
      return;
    }

    setAuditUrl(url);
    setReportData(null);
    setErrorMsg('');
    auditAbortedRef.current = false;
    showInlineLoading(url);

    try {
      const data = await fetchAuditFromClaude(url);
      if (auditAbortedRef.current) return;
      hideInlineLoading();
      setReportData(data);
      setView('partial');
      window.scrollTo(0, 0);
    } catch (err) {
      if (auditAbortedRef.current) return;
      hideInlineLoading();
      setErrorMsg('❌ ' + (err.message || 'Audit failed. Please try again.'));
    }
  }

  function cancelAudit() {
    auditAbortedRef.current = true;
    hideInlineLoading();
    goHome();
  }

  function goHome() {
    setView('landing');
    hideInlineLoading();
    window.scrollTo(0, 0);
  }

  function unlockFullReport(data, name) {
    setUserName(name || 'there');
    setActiveTab('overview');
    setView('full');
    window.scrollTo(0, 0);
  }

  function handlePdfClick() {
    if (!reportData) { openModal('pdf'); return; }
    generatePdf(reportData, auditUrl);
  }

  function closeAndPricing() {
    setModals({ rateLimit: false, pdf: false, privacy: false });
    goHome();
    setTimeout(() => smoothTo('pricing'), 100);
  }

  function scrollToTop() {
    document.getElementById('urlInput')?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {view === 'landing' && (
        <div id="landingPage">
          <Navbar scrolled={navScrolled} onSmoothTo={smoothTo} />
          <HeroSection
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            onStartAudit={startAudit}
            onCancelAudit={cancelAudit}
            inlineLoading={inlineLoading}
            ilStep={ilStep}
            ilProg={ilProg}
            ilUrl={ilUrl}
            errorMsg={errorMsg}
          />
          <HowItWorks />
          <FeaturesGrid />
          <ReportPreview onScrollToTop={scrollToTop} />
          <PricingSection onScrollToTop={scrollToTop} />
          <FAQSection />
          <Footer onSmoothTo={smoothTo} onShowPrivacy={() => openModal('privacy')} />
        </div>
      )}

      {(view === 'partial' || view === 'full') && (
        <div id="auditApp">
          {view === 'partial' && reportData && (
            <PartialReport
              reportData={reportData}
              auditUrl={auditUrl}
              onGoHome={goHome}
              onUnlock={unlockFullReport}
              onShowPrivacy={() => openModal('privacy')}
            />
          )}
          {view === 'full' && reportData && (
            <FullReport
              reportData={reportData}
              userName={userName}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onGoHome={goHome}
              onPdfClick={handlePdfClick}
            />
          )}
        </div>
      )}

      <RateLimitModal
        show={modals.rateLimit}
        onClose={() => closeModal('rateLimit')}
        onCloseAndPricing={closeAndPricing}
      />
      <PDFModal show={modals.pdf} onClose={() => closeModal('pdf')} />
      <PrivacyModal show={modals.privacy} onClose={() => closeModal('privacy')} />
    </>
  );
}
