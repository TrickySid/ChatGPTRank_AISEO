import AuditNav        from './AuditNav.jsx';
import OverviewTab     from '../tabs/OverviewTab.jsx';
import TechnicalTab    from '../tabs/TechnicalTab.jsx';
import OnPageTab       from '../tabs/OnPageTab.jsx';
import KeywordsTab     from '../tabs/KeywordsTab.jsx';
import AIOverviewTab   from '../tabs/AIOverviewTab.jsx';
import EEATTab         from '../tabs/EEATTab.jsx';
import ArchitectureTab from '../tabs/ArchitectureTab.jsx';
import ContentTab      from '../tabs/ContentTab.jsx';

const TABS = [
  { key: 'overview',     label: '⚡ Overview',     Component: OverviewTab },
  { key: 'technical',    label: '🔧 Technical',    Component: TechnicalTab },
  { key: 'onpage',       label: '📋 On-Page',      Component: OnPageTab },
  { key: 'keywords',     label: '🔑 Keywords',     Component: KeywordsTab },
  { key: 'ai',           label: '🤖 AI Overview',  Component: AIOverviewTab },
  { key: 'eeat',         label: '🏆 E-E-A-T',      Component: EEATTab },
  { key: 'architecture', label: '🏗 Architecture', Component: ArchitectureTab },
  { key: 'content',      label: '✍ Content',       Component: ContentTab },
];

export default function FullReport({ reportData, userName, activeTab, setActiveTab, onGoHome, onPdfClick }) {
  return (
    <div id="fullReport">
      <AuditNav onGoHome={onGoHome} />

      <div className="welcome-banner">
        <span className="wb-emoji">🎉</span>
        <span>
          Report unlocked, <strong>{userName || 'there'}</strong>! Navigate all 8 sections below.
        </span>
      </div>

      <div className="tab-bar-wrap">
        <div className="tab-bar" id="tabBar">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
          <div className="tab-bar-right">
            <button className="pdf-btn" onClick={onPdfClick}>📥 Download PDF</button>
          </div>
        </div>
      </div>

      {TABS.map(({ key, Component }) => (
        <div
          key={key}
          className={`tab-panel${activeTab === key ? ' active' : ''}`}
          id={`tp-${key}`}
        >
          {activeTab === key && <Component d={reportData} />}
        </div>
      ))}

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div className="pdf-cta">
          <h4>📥 Download Full Report (PDF)</h4>
          <p>10-page professional report · Free for all users · Share with your team or client</p>
          <button className="pdf-cta-btn" onClick={onPdfClick}>Download PDF</button>
        </div>
        <button className="audit-another" onClick={onGoHome}>← Audit Another Site</button>
      </div>
    </div>
  );
}
