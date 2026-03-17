# ChatGPT Rank (AI SEO Audit)

Live: https://chatgpt-rank.com

ChatGPT Rank is an AI-powered SEO + AI-search readiness audit tool. Users enter a website URL and instantly receive a structured, actionable report designed to improve visibility in modern AI-driven search surfaces like ChatGPT, Claude, and Google AI Overviews.

---

## What it does

### 1) Instant AI SEO audit (URL → report)
- Generates an 8-section audit with a clear overall score (out of 10)
- Breaks down scores across:
  - Technical SEO
  - Content quality
  - On-page SEO + schema
  - Performance
  - E-E-A-T (Experience, Expertise, Authority, Trust)
  - AI readiness (AI Overviews / LLM citation readiness)
  - Site architecture + content strategy

### 2) Action plan output (not generic tips)
The report includes:
- Specific wins (what’s already good)
- Prioritized issues (HIGH / MED / LOW)
- Exact fixes for each issue
- Schema recommendations and on-page improvements
- Blog topics and outlines crafted to help appear in AI answers

### 3) Lead gate + usage limits
After generating the audit, users unlock the full report by entering:
- Name
- Email

Leads are stored in a database (one row per email). Report unlocks are limited to 3 per email to reduce abuse while keeping the experience frictionless.

---

## Tech stack

### Frontend
- React (Vite)
- Responsive, modern landing + report UI
- Client calls serverless endpoints only (no secrets in the browser)

### Backend
- Vercel Serverless Functions

`POST /api/audit`
- Validates and normalizes the input URL
- Calls Anthropic (Claude) securely using a server-side API key
- Returns a structured JSON report

`POST /api/lead`
- Saves name/email/audit URL to Supabase Postgres
- Enforces max 3 report unlocks per email

### Database
- Supabase Postgres
- `public.leads` stores:
  - `name`
  - `email` (unique)
  - `audit_url`
  - `audit_count`
  - `last_audit_at`
  - `created_at`

---

## Security and reliability notes
- No API keys are exposed to the client.
- All AI provider calls happen server-side via Vercel functions.
- Basic validation for URL/email and abuse-resistant rules (blocks localhost targets).
- CORS allowlist controlled by `ALLOWED_ORIGINS`.
- Database writes use UPSERT against a unique email constraint.

---

## API endpoints

### `POST /api/audit`
Request:
```json
{ "url": "https://example.com" }
```

Response:
```json
{ "report": { "...": "structured audit json" } }
```

### `POST /api/lead`
Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "auditUrl": "https://example.com"
}
```

Response:
```json
{ "ok": true, "auditCount": 1 }
```

If limit exceeded:
```json
{ "ok": false, "error": "Limit reached. You can generate up to 3 reports per email." }
```

---

## Environment variables

Set these in Vercel (Project Settings → Environment Variables).

### Required
- `ANTHROPIC_API_KEY`
- `ALLOWED_ORIGINS` (comma-separated)

Example:
```bash
ALLOWED_ORIGINS=https://chatgpt-rank.com,https://www.chatgpt-rank.com
```

### Supabase (via Vercel integration)
- `SUPABASE_POSTGRES_URL` (used server-side in `/api/lead`)

---

## Local development

1) Install dependencies
```bash
npm install
```

2) Run locally
```bash
npm run dev
```

Note: Serverless functions run in production on Vercel. For local function testing, you can use the Vercel CLI:
```bash
npm i -g vercel
vercel dev
```

---

## Roadmap
- User authentication (Supabase Auth)
- Pricing plans (Free / Pro) with usage tracking
- Audit history per user account
- Stripe billing and webhooks
- Admin dashboard for leads and report analytics

---

## Built by
Siddhesh Bakre

Live project: https://chatgpt-rank.com
