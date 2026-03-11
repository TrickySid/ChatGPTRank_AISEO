# ChatGPT Rank - AI SEO Audit Tool

A full-featured AI SEO audit tool that analyzes any website and provides actionable recommendations for ranking on ChatGPT, Claude, Google AI Overview, and traditional search engines.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your Anthropic API key**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your key from https://console.anthropic.com/

3. **Run the dev server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## How it works

- Enter any website URL in the hero section
- The app calls the Claude API (claude-sonnet-4) to analyze the site
- Returns a full 8-section SEO audit specific to that URL:
  - Overview (wins, issues, quick wins)
  - Technical Audit (14-point checklist)
  - On-Page & Schema
  - Keyword Opportunities
  - AI Overview Strategy
  - E-E-A-T Analysis
  - Site Architecture
  - Blog Content Strategy

## Tech Stack

- React 18 + Vite
- Anthropic Claude API (claude-sonnet-4)
- Vanilla CSS (no Tailwind)

## Deploying to Netlify

1. Push to GitHub
2. Connect repo in Netlify
3. Set `ANTHROPIC_API_KEY` in Netlify environment variables
4. Build command: `npm run build`
5. Publish directory: `dist`

## Security Notes
- Do not put API keys in `VITE_*` variables. Vite exposes those to the browser bundle.
- This project uses a serverless endpoint (`/api/audit`) to call Anthropic with `ANTHROPIC_API_KEY` stored server-side.
- Optional: set `ALLOWED_ORIGINS` (comma-separated) and rate limit env vars.
