export function scColor(v) { return v >= 7 ? 'var(--green)' : v >= 5 ? 'var(--amber)' : 'var(--red)'; }
export function scLabel(v) { return v >= 7 ? 'Good' : v >= 5 ? 'Needs Work' : 'Critical'; }

export function buildOverview(d) {
  const wins = (d.wins || []).map(w => `
    <div class="row">
      <div class="row-icon ri-pass">✓</div>
      <div class="row-body"><div class="rt">${w.title}</div><div class="rd">${w.desc}</div></div>
    </div>`).join('');

  const issues = (d.issues || []).map(i => {
    const cls = i.priority === 'HIGH' ? 'pb-high' : i.priority === 'MED' ? 'pb-med' : 'pb-low';
    return `<div class="row">
      <div class="row-icon ri-fail">!</div>
      <div class="row-body">
        <div class="teaser-title-row"><span class="priority-badge ${cls}">${i.priority}</span><div class="rt">${i.title}</div></div>
        <div class="rd">${i.desc}</div>
        <div class="rf">Fix: ${i.fix}</div>
      </div>
    </div>`;
  }).join('');

  const qw = (d.quick_wins || []).map(w => `<div class="qw">${w}</div>`).join('');
  const tip = d.ai_tip ? `<div class="ai-tip">${d.ai_tip}</div>` : '';

  return `
    ${tip}
    <div class="r-card"><div class="r-card-title">✅ What's Already Working</div>${wins}</div>
    <div class="r-card"><div class="r-card-title">🚨 Issues Found (${(d.issues||[]).length})</div>${issues}</div>
    ${qw ? `<div class="r-card"><div class="r-card-title">⚡ Quick Wins — Do This Week</div>${qw}</div>` : ''}`;
}

export function buildTechnical(d) {
  const checks = d.tech_audit || [];
  const pass   = checks.filter(c => c.status === 'pass').length;
  const warn   = checks.filter(c => c.status === 'warn').length;
  const fail   = checks.filter(c => c.status === 'fail').length;

  const summary = `<div class="tech-summary">
    <div class="ts-box"><div class="ts-num" style="color:var(--green)">${pass}</div><div class="ts-lbl">Passed</div></div>
    <div class="ts-box"><div class="ts-num" style="color:var(--amber)">${warn}</div><div class="ts-lbl">Warnings</div></div>
    <div class="ts-box"><div class="ts-num" style="color:var(--red)">${fail}</div><div class="ts-lbl">Failed</div></div>
  </div>`;

  const grid = checks.map(c => {
    const cls  = c.status === 'pass' ? 'tc-pass' : c.status === 'fail' ? 'tc-fail' : 'tc-warn';
    const icon = c.status === 'pass' ? '✓' : c.status === 'fail' ? '✗' : '!';
    return `<div class="tech-check">
      <div class="tc-icon ${cls}">${icon}</div>
      <div class="tc-body"><div class="tc-name">${c.check}</div><div class="tc-note">${c.note}</div></div>
    </div>`;
  }).join('');

  return `<div class="r-card">
    <div class="r-card-title">🔧 14-Point Technical Audit</div>
    ${summary}
    <div class="tech-grid">${grid}</div>
  </div>`;
}

export function buildOnPage(d) {
  const m  = d.meta_tags || {};
  const mt = m.title || {};
  const md = m.meta_description || {};

  const charCls = (n, lo, hi) => n >= lo && n <= hi ? 'cb-good' : n < lo ? 'cb-bad' : 'cb-warn';

  const schemas = (m.schemas || []).map(s => {
    const present = s.status === 'present';
    const ic = present ? 'ri-pass' : 'ri-fail';
    const sym = present ? '✓' : '✗';
    const impCls = s.impact === 'HIGH' ? 'pb-high' : s.impact === 'MED' ? 'pb-med' : 'pb-low';
    return `<div class="schema-row">
      <div class="row-icon ${ic}">${sym}</div>
      <div class="row-body" style="flex:1">
        <div class="rt">${s.type} <span class="priority-badge ${impCls}" style="margin-left:6px">${s.impact}</span></div>
        <div class="rd">${s.hint}</div>
      </div>
    </div>`;
  }).join('');

  return `
    <div class="r-card">
      <div class="r-card-title">📋 Meta Title</div>
      <div class="meta-box">
        <div class="mb-label">Current <span class="char-badge ${charCls(mt.char_count,10,60)}">${mt.char_count||0} chars</span></div>
        <div class="mb-current">${mt.current || '—'}</div>
        <div class="mb-label" style="color:var(--green)">Suggested</div>
        <div class="mb-suggested">${mt.suggestion || '—'}</div>
      </div>
    </div>
    <div class="r-card">
      <div class="r-card-title">📝 Meta Description</div>
      <div class="meta-box">
        <div class="mb-label">Current <span class="char-badge ${charCls(md.char_count,140,160)}">${md.char_count||0} chars</span></div>
        <div class="mb-current">${md.current || '—'}</div>
        <div class="mb-label" style="color:var(--green)">Suggested</div>
        <div class="mb-suggested">${md.suggestion || '—'}</div>
      </div>
    </div>
    <div class="r-card">
      <div class="r-card-title">🏷 Schema Markup (Structured Data)</div>
      ${schemas}
    </div>`;
}

export function buildKeywords(d) {
  const kws = d.keywords || [];
  const rows = kws.map(k => {
    const cls = k.priority === 'HIGH' ? 'pb-high' : k.priority === 'MED' ? 'pb-med' : 'pb-low';
    const ic  = k.intent === 'Commercial' ? 'var(--amber)' : k.intent === 'Informational' ? '#38bdf8' : 'var(--muted)';
    return `<div class="row">
      <div class="row-body" style="flex:1">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div class="rt" style="margin:0">${k.keyword}</div>
          <span class="priority-badge ${cls}">${k.priority}</span>
        </div>
        <div class="rd" style="margin-top:4px">
          <span style="color:${ic}">${k.intent}</span>
          &nbsp;·&nbsp; Vol: ${k.volume}
          &nbsp;·&nbsp; Difficulty: ${k.difficulty}
        </div>
      </div>
    </div>`;
  }).join('');

  return `<div class="r-card"><div class="r-card-title">🔑 Keyword Opportunities</div>${rows}</div>`;
}

export function buildAI(d) {
  const ai   = d.ai_overview || {};
  const sc   = ai.score || 0;
  const c    = scColor(sc);
  const tips = (ai.tips || []).map(t => `<div class="ai-tip-card">${t}</div>`).join('');
  const qs   = (ai.query_types || []).map(q => `<div class="ai-query">"${q}"</div>`).join('');

  return `
    <div class="r-card">
      <div class="r-card-title">🤖 AI Overview Score
        <span class="rc-score" style="background:${c}22;color:${c}">${sc}/10 — ${scLabel(sc)}</span>
      </div>
      <div class="ai-score-bar" style="height:6px;background:var(--border);border-radius:999px;margin-bottom:16px;overflow:hidden">
        <div style="height:100%;width:${sc*10}%;background:${c};border-radius:999px;transition:width 1.2s ease"></div>
      </div>
      <div style="font-size:.88rem;color:var(--text);line-height:1.7;margin-bottom:16px">${ai.opportunity || ''}</div>
      <div style="font-size:.72rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:10px">Optimisation Tips</div>
      ${tips}
    </div>
    <div class="r-card">
      <div class="r-card-title">🔍 Target Query Types</div>
      <div class="ai-queries">${qs}</div>
    </div>`;
}

export function buildEEAT(d) {
  const ee   = d.eeat || {};
  const keys = ['experience','expertise','authoritativeness','trustworthiness'];
  const cards = keys.map(k => {
    const item = ee[k] || {};
    const val  = item.score || 0;
    const c    = scColor(val);
    return `<div class="eeat-card">
      <div class="eeat-head">
        <div class="eeat-label">${k.charAt(0).toUpperCase()+k.slice(1)}</div>
        <div class="eeat-score" style="color:${c}">${val}/10</div>
      </div>
      <div class="eeat-bar-bg"><div class="eeat-bar-fill" style="width:${val*10}%;background:${c}"></div></div>
      <div class="eeat-note">${item.status || ''} — ${item.note || ''}</div>
    </div>`;
  }).join('');

  const actions = (ee.improvements || []).map(a =>
    `<div class="eeat-action">${a}</div>`).join('');

  return `
    <div class="r-card">
      <div class="r-card-title">🏆 E-E-A-T Scores</div>
      <div class="eeat-grid">${cards}</div>
    </div>
    <div class="r-card">
      <div class="r-card-title">📋 Improvement Actions</div>
      <div class="eeat-actions">${actions}</div>
    </div>`;
}

export function buildArch(d) {
  const a    = d.site_architecture || {};
  const dep  = a.depth_score || 0;
  const issues = (a.issues || []).map(i =>
    `<div class="arch-item issue">${i}</div>`).join('');
  const recs = (a.recommendations || []).map(r =>
    `<div class="arch-item rec">${r}</div>`).join('');

  return `
    <div class="r-card">
      <div class="r-card-title">🏗 Site Architecture</div>
      <div class="arch-stats">
        <div class="arch-stat"><div class="asv" style="color:${scColor(dep)}">${dep}</div><div class="asl">Depth Score</div></div>
      </div>
      <p style="font-size:.88rem;color:var(--muted);line-height:1.7;margin-bottom:16px">${a.assessment || ''}</p>
      <div style="font-size:.72rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Issues</div>
      ${issues}
      <div style="font-size:.72px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin:16px 0 8px">Recommendations</div>
      ${recs}
    </div>`;
}

export function buildContent(d) {
  const posts = (d.blog_content || []).map((p, i) => {
    const ic  = p.search_intent === 'Commercial' ? 'bi-comm' : p.search_intent === 'Transactional' ? 'bi-trans' : 'bi-info';
    const out = (p.outline || []).map(o => `<span class="bo-chip">${o}</span>`).join('');
    return `<div class="blog-card">
      <span class="blog-intent-badge ${ic}">${p.search_intent}</span>
      <div class="blog-title">Post ${i+1}: "${p.topic}"</div>
      <div class="blog-angle">${p.ai_angle}</div>
      <div class="blog-outline">${out}</div>
      <div class="blog-meta"><span class="blog-vol">📊 ${p.volume}</span></div>
    </div>`;
  }).join('');

  return `<div class="r-card"><div class="r-card-title">✍ Blog Content Strategy for AI Overviews</div>${posts}</div>`;
}
