import { useEffect, useRef } from 'react';
import { STEPS } from '../../constants.js';

export default function LoadingScreen({ url, onCancel }) {
  const stepRef = useRef(null);
  const barRef  = useRef(null);
  const stepTimerRef = useRef(null);

  useEffect(() => {
    let idx = 0;
    if (stepRef.current) stepRef.current.textContent = STEPS[0];

    const bar = barRef.current;
    if (bar) {
      bar.style.animation = 'none';
      void bar.offsetHeight;
      bar.style.animation = 'progressAnim 28s linear forwards';
    }

    stepTimerRef.current = setInterval(() => {
      idx = (idx + 1) % STEPS.length;
      if (stepRef.current) stepRef.current.textContent = STEPS[idx];
    }, 4500);

    return () => clearInterval(stepTimerRef.current);
  }, [url]);

  return (
    <div id="loadingScreen" style={{display:'flex'}}>
      <div className="loading-glow"></div>
      <div className="loading-spinner-wrap">
        <div className="spin-outer"></div>
        <div className="spin-inner"></div>
        <div className="spin-emoji">🔍</div>
      </div>
      <div className="loading-tag">Deep Analyzing</div>
      <div className="loading-url" id="loadingUrl">{url}</div>
      <div className="loading-progress">
        <div className="loading-bar" id="loadingBar" ref={barRef}></div>
      </div>
      <div className="loading-step" id="loadingStep" ref={stepRef}>Crawling site structure...</div>
      <button className="loading-cancel" onClick={onCancel}>✕ Cancel</button>
    </div>
  );
}
