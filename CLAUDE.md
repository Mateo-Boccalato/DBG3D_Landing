# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DBG3D (Designing Blueprints Group) — a business website for a 3D scanning and reverse-engineering CAD service. The current source is a single monolithic HTML file (`dbg3d_website_v6.html`) being converted to a React webapp.

## Commands

Once the React project is scaffolded (e.g., with Vite + React):

```bash
npm install        # install dependencies
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # lint (if configured)
```

### SPA Deploy Note

For production hosting (Vercel/Netlify/static hosts), configure an SPA rewrite so deep links route back to the React entrypoint. Example `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Architecture

### Current Static Source

Everything lives in `dbg3d_website_v6.html`:
- **CSS**: All styles are inline `<style>` blocks using CSS custom properties
- **JS**: All logic is in a single `<script>` block at the bottom
- **Routing**: Fake SPA via `showPage(id)` — toggles `display:none/block` on `.page` divs, no real URL routing

### Pages (map to React routes)

| Page ID | Route | Description |
|---|---|---|
| `page-home` | `/` | Hero, services overview, equipment cards, about preview |
| `page-services` | `/services` | Full services detail with anchor IDs per service |
| `page-youtube` | `/youtube` | Tutorial series guide (20 episodes across 5 tiers) + video request form |
| `page-portfolio` | `/portfolio` | CAD model portfolio with 3D viewer + download modal |
| `page-about` | `/about` | Team and mission |
| `page-contact` | `/contact` | Contact form |
| `page-privacy` | `/privacy` | Privacy policy |
| `page-terms` | `/terms` | Terms of service |
| `page-iplicense` | `/ip-license` | IP license terms |

### Design System

All colors and typography are CSS custom properties — preserve these exactly when moving to React (e.g., in a global CSS file or CSS Modules):

```css
--bg: #0a0c0f;       --bg2: #0f1318;      --bg3: #141920;
--accent: #00b4d8;   --accent2: #0077a8;
--font-display: 'Barlow Condensed', sans-serif;
--font-body: 'Barlow', sans-serif;
--font-mono: 'DM Mono', monospace;
```

Google Fonts: Barlow Condensed (300–800), Barlow (300–600), DM Mono (300–500).

### Key Interactive Features

**3D Model Viewer** (Portfolio page — `initRailingViewer` IIFE):
- Uses Three.js (`THREE` global) — no `<script src>` tag exists in the static file; this needs to be added as an npm dependency (`three`) in React
- Mesh geometry is embedded as base64-compressed binary in the HTML; in React this should be extracted to a separate asset file
- Supports solid/wireframe/xray display modes, auto-spin, and mouse orbit controls (implemented from scratch without OrbitControls)
- The viewer only initializes when `typeof THREE !== 'undefined'`

**Download Modal** (Portfolio page):
- License gate: user must enter name + email and check a license agreement before a download is unlocked
- Currently UI-only (no backend submission) — forms show a success state client-side

**Contact & YouTube Request Forms**:
- Both are UI-only stubs — `submitContactForm()` and `submitYTForm()` just swap `display:none` to show a success message
- Need real backend integration (e.g., EmailJS, Formspree, or a serverless function)

**Portfolio Filter**:
- `filterPortfolio(cat)` shows/hides sections by category (`all`, `available`, `household`, `corvette`, `foxbody`)
- In React, convert to state-driven filtering

**Navigation**:
- Fixed top nav with hover-activated dropdown for Services sub-pages
- Mobile hamburger menu (`toggleMobileMenu`) toggles a stacked `flex` menu
- Active link highlighted with `::after` underline

### Data

All content (tutorial list, portfolio items, equipment specs, service descriptions) is hardcoded in HTML. During the React migration, extract this into data files (e.g., `src/data/tutorials.js`, `src/data/portfolio.js`) so components can map over them.

### Business Context

- The YouTube channel covers Einstar Rockit scanner + QuickSurface Pro software tutorials only — explicitly does NOT cover reverse engineering methodology (important for legal/IP reasons reflected in copy)
- All CAD files are IP-licensed: personal/educational use only; commercial use requires written DBG authorization
- 20 tutorial series planned; currently 1 of 20 portfolio models is available
