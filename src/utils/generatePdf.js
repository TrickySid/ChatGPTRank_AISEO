export function generatePdf(reportData, auditUrl) {
  const d        = reportData || {};
  const site     = d.site || {};
  const score    = d.overall_score || 0;
  const sc       = d.scores || {};
  const today    = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
  const month    = new Date().toLocaleString('en-US', { month:'short' }).toLowerCase();
  const year     = new Date().getFullYear();
  const siteName = site.name || auditUrl;
  const filename = `${(siteName||'site').replace(/[^a-z0-9]/gi,'-').toLowerCase()}-seo-audit-${month}-${year}.pdf`;
  const sColor   = score >= 7 ? '#22C55E' : score >= 5 ? '#F59E0B' : '#EF4444';

  function sC(v){ return (v||0)>=7?'#22C55E':(v||0)>=5?'#F59E0B':'#EF4444'; }
  function bar(v,max=10){ const p=Math.round((v||0)/max*100); return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px"><div style="flex:1;height:5px;background:#1E293B;border-radius:3px;overflow:hidden"><div style="width:${p}%;height:100%;background:${sC(v)};border-radius:3px"></div></div><span style="color:${sC(v)};font-weight:700;font-size:11px;width:30px">${v||0}/10</span></div>`; }
  function badge(p){ const c=p==='HIGH'?'#EF4444':p==='MED'?'#F59E0B':'#22C55E'; return `<span style="background:${c}22;color:${c};border:1px solid ${c}44;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700">${p}</span>`; }
  function statusIcon(s){ return s==='pass'?'<span style="color:#22C55E;font-weight:700">✓</span>':s==='fail'?'<span style="color:#EF4444;font-weight:700">✗</span>':'<span style="color:#F59E0B;font-weight:700">!</span>'; }
  function footer(pg){ return `<div style="position:absolute;bottom:14mm;left:18mm;right:18mm;border-top:1px solid #1E293B;padding-top:4px;display:flex;justify-content:space-between;font-size:8px;color:#475569"><span>ChatGPT Rank · ${siteName}</span><span>Page ${pg} of 10</span><span>${today}</span></div>`; }
  function hdr(label){ return `<div style="border-bottom:2px solid #FF6B2B;padding-bottom:6px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-end"><span style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FF6B2B">${label}</span><span style="font-size:9px;color:#64748B">${today}</span></div>`; }
  function page(content,pg){ return `<div style="width:210mm;min-height:297mm;padding:18mm;background:#080C14;page-break-after:always;position:relative;font-family:Arial,sans-serif;color:#F1F5F9">${content}${footer(pg)}</div>`; }

  const wins  = (d.wins||[]).map(w=>`<div style="display:flex;gap:8px;margin-bottom:8px"><span style="color:#22C55E;flex-shrink:0;font-weight:700">✓</span><div><div style="font-weight:600;font-size:12px">${w.title}</div><div style="color:#64748B;font-size:11px;margin-top:2px">${w.desc}</div></div></div>`).join('');
  const issues=(d.issues||[]).map(i=>`<div style="background:#0D1117;border:1px solid #1E293B;border-radius:6px;padding:10px;margin-bottom:6px">${badge(i.priority)} <span style="font-weight:700;font-size:12px;margin-left:4px">${i.title}</span><div style="color:#94A3B8;font-size:11px;margin-top:4px">${i.desc}</div><div style="color:#FF6B2B;font-size:11px;margin-top:3px"><b>Fix:</b> ${i.fix}</div></div>`).join('');
  const techRows=(d.tech_audit||[]).map(t=>`<tr style="border-bottom:1px solid #1E293B"><td style="padding:6px 8px;font-size:11px">${t.check}</td><td style="padding:6px 8px;text-align:center">${statusIcon(t.status)}</td><td style="padding:6px 8px;font-size:10px;color:#64748B">${t.note}</td></tr>`).join('');
  const meta=d.meta_tags||{};
  const schemas=(meta.schemas||[]).map(s=>{const c=s.status==='present'?'#22C55E':'#EF4444';return `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1E293B;font-size:11px"><div><span style="font-weight:700;color:${c}">${s.type}</span><span style="color:#64748B;margin-left:8px">${s.hint}</span></div><span style="color:#F59E0B;font-weight:700;flex-shrink:0;margin-left:8px">${s.impact}</span></div>`}).join('');
  const kws=(d.keywords||[]).map(k=>`<tr style="border-bottom:1px solid #1E293B"><td style="padding:6px 8px;font-size:11px;font-weight:600">${k.keyword}</td><td style="padding:6px 8px;font-size:10px;color:#64748B">${k.intent}</td><td style="padding:6px 8px;font-size:10px;color:#64748B">${k.volume}</td><td style="padding:6px 8px;font-size:10px;color:#64748B">${k.difficulty}</td><td style="padding:6px 8px;text-align:center">${badge(k.priority||'MED')}</td></tr>`).join('');
  const ai=d.ai_overview||{};
  const aiTips=(ai.tips||[]).map(t=>`<li style="color:#94A3B8;font-size:11px;margin-bottom:3px">${t}</li>`).join('');
  const aiQs=(ai.query_types||[]).map(q=>`<div style="background:#131B2E;border-radius:4px;padding:5px 10px;margin-bottom:4px;font-size:11px">"${q}"</div>`).join('');
  const ee=d.eeat||{};
  const eeItems=['experience','expertise','authoritativeness','trustworthiness'].map(k=>{const it=ee[k]||{};return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="font-size:12px;font-weight:600;text-transform:capitalize">${k}</span><span style="font-size:11px;color:#64748B">${it.status||''}</span></div>${bar(it.score||0)}<div style="font-size:10px;color:#64748B">${it.note||''}</div></div>`}).join('');
  const arch=d.site_architecture||{};
  const archIss=(arch.issues||[]).map(i=>`<div style="display:flex;gap:6px;margin-bottom:5px"><span style="color:#F59E0B">⚠</span><span style="font-size:11px">${i}</span></div>`).join('');
  const archRecs=(arch.recommendations||[]).map(r=>`<div style="display:flex;gap:6px;margin-bottom:5px"><span style="color:#FF6B2B">→</span><span style="font-size:11px">${r}</span></div>`).join('');
  const posts=(d.blog_content||[]).map((p,i)=>`<div style="background:#0D1117;border:1px solid #1E293B;border-radius:6px;padding:10px;margin-bottom:8px"><div style="color:#FF6B2B;font-size:9px;font-weight:700;margin-bottom:3px">POST ${i+1} · ${p.search_intent||''} · ${p.volume||''}</div><div style="font-weight:700;font-size:12px;margin-bottom:3px">${p.topic||''}</div><div style="color:#94A3B8;font-size:10px;margin-bottom:5px">${p.ai_angle||''}</div><div>${(p.outline||[]).map(o=>`<span style="background:#1E293B;color:#FF6B2B;padding:2px 7px;border-radius:3px;font-size:9px;margin-right:3px;margin-bottom:2px;display:inline-block">${o}</span>`).join('')}</div></div>`).join('');
  const qw=(d.quick_wins||[]).map((w,i)=>`<div style="display:flex;gap:8px;margin-bottom:7px"><span style="background:#FF6B2B;color:#000;width:18px;height:18px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0">${i+1}</span><span style="font-size:11px;line-height:1.5">${w}</span></div>`).join('');
  const fixList=(d.issues||[]).sort((a,b)=>['HIGH','MED','LOW'].indexOf(a.priority)-['HIGH','MED','LOW'].indexOf(b.priority)).map((iss,i)=>`<div style="display:flex;gap:8px;margin-bottom:9px">${badge(iss.priority)}<div><div style="font-weight:600;font-size:12px;margin-left:4px">${iss.title}</div><div style="color:#FF6B2B;font-size:11px;margin-top:2px;margin-left:4px">Fix: ${iss.fix}</div></div></div>`).join('');

  const card=(content)=>`<div style="background:#0D1117;border:1px solid #1E293B;border-radius:8px;padding:14px;margin-bottom:12px">${content}</div>`;
  const h2=(t)=>`<div style="font-weight:700;font-size:14px;margin-bottom:10px;color:#F1F5F9">${t}</div>`;
  const tableWrap=(rows,heads)=>`<table style="width:100%;border-collapse:collapse"><thead><tr style="background:#0D1117">${heads.map(h=>`<th style="text-align:left;padding:7px 8px;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#64748B;border-bottom:1px solid #1E293B">${h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;

  const scoreBreak=Object.entries({Technical:sc.technical,'Content':sc.content,'On-Page':sc.onpage,Local:sc.local,Speed:sc.performance,'AI Ready':sc.ai_readiness,'E-E-A-T':sc.eeat}).map(([k,v])=>`<div style="margin-bottom:8px"><div style="font-size:11px;color:#F1F5F9;margin-bottom:3px">${k}</div>${bar(v||0)}</div>`).join('');

  const pages = [
    // 1 COVER
    page(`<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-top:30mm">
      <div style="font-size:20px;font-weight:800;margin-bottom:6px"><span>ChatGPT</span><span style="color:#FF6B2B"> Rank</span></div>
      <div style="font-size:8px;letter-spacing:3px;color:#64748B;text-transform:uppercase;margin-bottom:40px">AI SEO AUDIT REPORT</div>
      <div style="width:110px;height:110px;border-radius:50%;background:#0D1117;border:3px solid ${sColor};display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:24px">
        <div style="font-size:36px;font-weight:800;color:${sColor}">${score}</div>
        <div style="font-size:11px;color:#64748B">/10</div>
      </div>
      <div style="font-size:24px;font-weight:800;margin-bottom:6px">${siteName}</div>
      <div style="color:#64748B;font-size:11px;margin-bottom:4px">${site.url||auditUrl}</div>
      <div style="color:#94A3B8;font-size:11px;margin-bottom:32px">${site.type||''} · ${site.location||''}</div>
      <div style="background:#131B2E;border:1px solid #FF6B2B33;border-radius:6px;padding:10px 18px;max-width:300px;font-size:12px;color:#F1F5F9;line-height:1.5">${site.tagline||''}</div>
      <div style="position:absolute;bottom:28mm;left:0;right:0;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;padding:0 18mm">
        ${Object.entries({Tech:sc.technical,Content:sc.content,'On-Page':sc.onpage,'AI':sc.ai_readiness,'E-E-A-T':sc.eeat,Speed:sc.performance}).map(([k,v])=>`<div style="text-align:center"><div style="font-size:15px;font-weight:800;color:${sC(v||0)}">${v||0}</div><div style="font-size:8px;color:#64748B">${k}</div></div>`).join('')}
      </div>
    </div>`, 1),

    // 2 OVERVIEW
    page(`${hdr('SECTION 01 — OVERVIEW & SCORE BREAKDOWN')}
      ${d.missed_traffic_estimate?`<div style="background:#FF6B2B11;border:1px solid #FF6B2B33;border-radius:6px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px"><span style="font-size:20px">📉</span><div><div style="font-size:8px;color:#64748B;text-transform:uppercase;letter-spacing:1px">Est. Monthly Traffic Lost</div><div style="font-size:18px;font-weight:800;color:#FF6B2B">${d.missed_traffic_estimate}</div></div></div>`:''}
      ${card(h2('Score Breakdown')+scoreBreak)}`, 2),

    // 3 WINS & ISSUES
    page(`${hdr('SECTION 01 — WINS & ISSUES')}
      ${card(h2("✅ What's Already Working")+wins)}
      ${card(h2('🚨 Issues Found')+issues)}`, 3),

    // 4 TECHNICAL
    page(`${hdr('SECTION 02 — TECHNICAL AUDIT (14-POINT)')}
      ${tableWrap(techRows,['Check','Status','Notes'])}`, 4),

    // 5 ON-PAGE
    page(`${hdr('SECTION 03 — ON-PAGE + SCHEMA ANALYSIS')}
      ${card(`${h2('Meta Title')} <div style="font-size:10px;color:#64748B;margin-bottom:3px">Current (${meta.title?.char_count||0} chars)</div><div style="background:#131B2E;border-radius:4px;padding:7px;font-size:12px;margin-bottom:6px">${meta.title?.current||'—'}</div><div style="font-size:10px;color:#22C55E;margin-bottom:3px">Suggested</div><div style="font-size:12px;color:#22C55E">${meta.title?.suggestion||'—'}</div>`)}
      ${card(`${h2('Meta Description')} <div style="font-size:10px;color:#64748B;margin-bottom:3px">Current (${meta.meta_description?.char_count||0} chars)</div><div style="background:#131B2E;border-radius:4px;padding:7px;font-size:12px;margin-bottom:6px">${meta.meta_description?.current||'—'}</div><div style="font-size:10px;color:#22C55E;margin-bottom:3px">Suggested</div><div style="font-size:12px;color:#22C55E">${meta.meta_description?.suggestion||'—'}</div>`)}
      ${card(h2('Schema Markup')+schemas)}`, 5),

    // 6 KEYWORDS
    page(`${hdr('SECTION 04 — KEYWORD OPPORTUNITIES')}
      ${tableWrap(kws,['Keyword','Intent','Volume','Difficulty','Priority'])}`, 6),

    // 7 AI OVERVIEW
    page(`${hdr('SECTION 05 — AI OVERVIEW STRATEGY')}
      ${card(`<div style="display:flex;align-items:center;gap:14px;margin-bottom:12px"><div style="width:60px;height:60px;border-radius:50%;background:#131B2E;border:3px solid ${sC(ai.score||0)};display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0"><div style="font-size:20px;font-weight:800;color:${sC(ai.score||0)}">${ai.score||0}</div><div style="font-size:9px;color:#64748B">/10</div></div><div><div style="font-size:10px;color:#EF4444;margin-bottom:3px">${ai.status||''}</div><div style="font-size:12px;color:#F1F5F9;line-height:1.5">${ai.opportunity||''}</div></div></div>${h2('Tips')}<ul style="padding-left:14px">${aiTips}</ul>`)}
      ${card(h2('Target Queries')+aiQs)}`, 7),

    // 8 E-E-A-T
    page(`${hdr('SECTION 06 — E-E-A-T ANALYSIS')}
      ${card(h2('E-E-A-T Scores')+eeItems)}
      ${card(h2('Improvement Actions')+(ee.improvements||[]).map((imp,i)=>`<div style="display:flex;gap:8px;margin-bottom:6px"><span style="color:#FF6B2B;font-weight:700">${i+1}.</span><span style="font-size:11px">${imp}</span></div>`).join(''))}`, 8),

    // 9 ARCHITECTURE + BLOG
    page(`${hdr('SECTION 07 — SITE ARCHITECTURE')}
      ${card(`<div style="font-size:11px;color:#F1F5F9;line-height:1.5;margin-bottom:10px">${arch.assessment||''}</div>${archIss}${archRecs}`)}
      ${hdr('SECTION 08 — BLOG CONTENT STRATEGY')}
      ${posts}`, 9),

    // 10 ACTION PLAN
    page(`${hdr('ACTION PLAN — YOUR NEXT STEPS')}
      ${card(h2('⚡ Quick Wins (This Week)')+qw)}
      ${card(h2('🔧 Full Fix List (Priority Order)')+fixList)}
      <div style="background:#FF6B2B;border-radius:6px;padding:12px 16px;text-align:center;margin-top:8px"><div style="font-size:12px;font-weight:800;color:#000;margin-bottom:3px">🚀 Upgrade to Pro at chatgpt-rank.com</div><div style="font-size:9px;color:#00000099">Unlimited audits · Competitor comparison · Keyword tracking</div></div>`, 10)
  ];

  const css = `@page{margin:0;size:A4}*{box-sizing:border-box;margin:0;padding:0}body{background:#080C14;-webkit-print-color-adjust:exact;print-color-adjust:exact}`;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${pages.join('')}</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, '_blank');
  if (win) {
    win.addEventListener('load', () => setTimeout(() => win.print(), 600));
  } else {
    const a = document.createElement('a');
    a.href = url; a.download = filename.replace('.pdf', '.html'); a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
