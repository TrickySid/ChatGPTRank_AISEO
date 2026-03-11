import { useState } from 'react';

const FAQS = [
  {
    q: 'Is this actually free?',
    a: 'Yes. 1 free audit per day — no credit card, no account. Just enter a URL and verify your email with a 6-digit code.'
  },
  {
    q: 'Why do you verify my email?',
    a: "Email verification ensures report quality and prevents abuse. You'll also get a copy of your report by email. We never spam."
  },
  {
    q: 'What is AI search readiness?',
    a: "ChatGPT, Perplexity, Claude, and Google AI Overview now drive significant traffic. If your site isn't optimized for AI citation — wrong content structure, missing schemas, weak E-E-A-T — AI tools skip you entirely."
  },
  {
    q: 'What is white-label (Custom plan)?',
    a: "Agencies on Custom get the entire tool under their own brand and domain. Your clients see your logo and colors — powered by our AI engine behind the scenes."
  },
  {
    q: 'When does Pro launch?',
    a: 'Very soon. Enter your email in the Pro card above to get notified first.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggleFaq(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="faq-section" style={{padding:'80px 24px'}}>
      <div className="container">
        <div className="section-label">FAQ</div>
        <h2 className="section-h2">Common questions</h2>
        <div className="faq-list" style={{marginTop:'40px'}}>
          {FAQS.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button className={`faq-q${openIndex === i ? ' open' : ''}`} onClick={() => toggleFaq(i)}>
                {faq.q} <span className="faq-arrow">▼</span>
              </button>
              <div className={`faq-a${openIndex === i ? ' open' : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
