// Vercel Serverless Function: POST /api/audit
// Keeps Anthropic API key server-side (never expose in the browser)

const DEFAULT_MAX = 10;
const DEFAULT_WINDOW_MS = 60_000;

// Best-effort in-memory rate limit (resets when the function is recycled)
const rlStore = new Map();

function getClientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.length) return xf.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isAllowedOrigin(origin, allowed) {
  if (!origin) return true; // same-origin or non-browser
  if (!allowed || !allowed.length) return true;
  return allowed.includes(origin);
}

function normalizeAndValidateUrl(input) {
  if (typeof input !== 'string') throw new Error('Invalid URL');
  let raw = input.trim();
  if (!raw) throw new Error('URL is required');
  if (raw.length > 2048) throw new Error('URL is too long');
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;

  let u;
  try { u = new URL(raw); } catch { throw new Error('Invalid URL'); }

  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('URL must start with http or https');
  if (!u.hostname || !u.hostname.includes('.')) throw new Error('Invalid hostname');

  // Block obvious local targets (even though we do not fetch the site, this avoids abuse in logs/prompts)
  const h = u.hostname.toLowerCase();
  const blockedHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);
  if (blockedHosts.has(h)) throw new Error('Localhost URLs are not allowed');

  // Strip credentials if present
  u.username = '';
  u.password = '';

  return u.toString();
}

function buildPrompt(url) {
  // Kept same JSON schema as your original prompt.
  return `You are a senior SEO strategist and AI search expert. Analyze this website: ${url}

CRITICAL RULES:
- NEVER say ranking is impossible, difficult, challenging, or hard
- ALWAYS frame as opportunity with clear path forward
- Be 100% SPECIFIC to this URL — zero generic advice
- Return ONLY raw JSON — no markdown, no backticks, nothing else

{"site":{"url":"${url}","name":"real business name","type":"specific business type","location":"city/country or Global","tagline":"one sharp specific sentence about their SEO situation"},"overall_score":6,"scores":{"technical":6,"content":5,"onpage":4,"local":7,"performance":6,"ai_readiness":4,"eeat":5},"missed_traffic_estimate":"2,000–5,000 monthly visitors","wins":[{"title":"Specific Win","desc":"specific desc with data"},{"title":"Specific Win","desc":"specific desc"},{"title":"Specific Win","desc":"specific desc"}],"issues":[{"priority":"HIGH","title":"issue","desc":"specific what is wrong","fix":"exact actionable fix"},{"priority":"HIGH","title":"issue","desc":"specific what is wrong","fix":"exact actionable fix"},{"priority":"MED","title":"issue","desc":"specific what is wrong","fix":"exact actionable fix"},{"priority":"MED","title":"issue","desc":"specific what is wrong","fix":"exact actionable fix"},{"priority":"LOW","title":"issue","desc":"specific what is wrong","fix":"exact actionable fix"}],"tech_audit":[{"check":"HTTPS / SSL","status":"pass","note":"specific"},{"check":"Mobile Responsive","status":"pass","note":"specific"},{"check":"Page Speed","status":"warn","note":"specific"},{"check":"Core Web Vitals","status":"warn","note":"specific"},{"check":"XML Sitemap","status":"pass","note":"specific"},{"check":"Robots.txt","status":"pass","note":"specific"},{"check":"Canonical Tags","status":"warn","note":"specific"},{"check":"Structured Data","status":"fail","note":"specific"},{"check":"Broken Links","status":"warn","note":"specific"},{"check":"Image Alt Text","status":"warn","note":"specific"},{"check":"404 Error Page","status":"pass","note":"specific"},{"check":"HTTPS Redirects","status":"pass","note":"specific"},{"check":"Internal Linking","status":"warn","note":"specific"},{"check":"URL Structure","status":"pass","note":"specific"}],"meta_tags":{"title":{"current":"current title text","char_count":62,"status":"long","issue":"specific issue","suggestion":"optimized under 60 chars"},"meta_description":{"current":"current meta text","char_count":131,"status":"short","issue":"specific issue","suggestion":"optimized 150-160 chars with CTA"},"schemas":[{"type":"Organization","status":"missing","impact":"HIGH","hint":"Add JSON-LD Organization with name,logo,contact,sameAs"},{"type":"LocalBusiness","status":"missing","impact":"HIGH","hint":"Add LocalBusiness with address,phone,hours,geo"},{"type":"FAQPage","status":"missing","impact":"HIGH","hint":"Add 12-15 FAQ pairs for AI Overview eligibility"},{"type":"WebSite","status":"missing","impact":"MED","hint":"Add WebSite schema for sitelinks searchbox"},{"type":"BreadcrumbList","status":"missing","impact":"MED","hint":"Breadcrumbs on all inner pages"},{"type":"Article","status":"missing","impact":"HIGH","hint":"Add Article schema on blog posts with author,datePublished"}]} ,"keywords":[{"keyword":"specific kw","intent":"Commercial","difficulty":"High","volume":"High","priority":"HIGH"},{"keyword":"specific kw","intent":"Local","difficulty":"Med","volume":"Med","priority":"HIGH"},{"keyword":"specific kw","intent":"Informational","difficulty":"Low","volume":"Med","priority":"MED"},{"keyword":"specific kw","intent":"Commercial","difficulty":"High","volume":"High","priority":"MED"},{"keyword":"specific kw","intent":"Navigational","difficulty":"Low","volume":"Low","priority":"LOW"}],"ai_overview":{"score":3,"opportunity":"specific 2-3 sentence opportunity for this site","status":"Not optimized","tips":["specific tip 1","specific tip 2","specific tip 3","specific tip 4"],"query_types":["specific question query","specific comparison query","specific how-to query"]},"eeat":{"experience":{"score":5,"status":"Needs work","note":"specific observation"},"expertise":{"score":6,"status":"Moderate","note":"specific observation"},"authoritativeness":{"score":4,"status":"Weak","note":"specific observation"},"trustworthiness":{"score":5,"status":"Moderate","note":"specific observation"},"improvements":["specific action","specific action","specific action","specific action","specific action"]},"site_architecture":{"assessment":"2-3 specific sentences","depth_score":5,"issues":["specific issue","specific issue","specific issue"],"recommendations":["specific rec","specific rec","specific rec"]},"blog_content":[{"topic":"specific blog title for AI Overview","search_intent":"Informational","volume":"Med (1k-10k)","ai_angle":"why this wins AI Overview","outline":["H2: specific","H2: specific","H2: specific","H2: specific"]},{"topic":"specific comparison post","search_intent":"Commercial","volume":"High (10k+)","ai_angle":"comparison format wins AI Overview","outline":["H2: specific","H2: specific","H2: specific"]},{"topic":"specific how-to guide","search_intent":"Informational","volume":"Low (<1k)","ai_angle":"step-by-step gets cited by AI","outline":["H2: specific","H2: specific","H2: specific"]},{"topic":"specific location/niche guide","search_intent":"Informational","volume":"Med (1k-10k)","ai_angle":"location guides dominate AI Overviews","outline":["H2: specific","H2: specific","H2: specific"]}],"quick_wins":["specific this-week action","specific action","specific action","specific action"],"ai_tip":"one sharp AI search tip specific to this exact site and business"}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const origin = req.headers.origin;
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (!isAllowedOrigin(origin, allowedOrigins)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  // CORS headers (only when an Origin is present)
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  // Rate limit (best-effort)
  const ip = getClientIp(req);
  const max = Number(process.env.RATE_LIMIT_MAX || DEFAULT_MAX);
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || DEFAULT_WINDOW_MS);
  const now = Date.now();

  const bucket = rlStore.get(ip) || [];
  const fresh = bucket.filter(ts => now - ts < windowMs);
  if (fresh.length >= max) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again shortly.' });
  }
  fresh.push(now);
  rlStore.set(ip, fresh);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY' });
  }

  try {
    const { url } = req.body || {};
    const safeUrl = normalizeAndValidateUrl(url);
    const prompt = buildPrompt(safeUrl);

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Upstream error', details: text.slice(0, 2000) });
    }

    // Anthropic response is JSON
    const data = JSON.parse(text);
    const rawText = data.content?.find(b => b.type === 'text')?.text || '';
    const s = rawText.indexOf('{');
    const e = rawText.lastIndexOf('}');
    if (s === -1 || e === -1) {
      return res.status(502).json({ error: 'Invalid AI response format' });
    }

    let parsed;
    try { parsed = JSON.parse(rawText.slice(s, e + 1)); }
    catch { return res.status(502).json({ error: 'Bad Gateway, Please try again' }); }

    return res.status(200).json({ report: parsed });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Bad request' });
  }
}
