# MinSp — Gemini Pro 3 Analysis Package

## Project Overview
**MinSp** is a free electronic product comparison platform (mice, keyboards, PC components) with AI-powered recommendations.  
Deployed on **Render** at: `https://minsp.onrender.com`  
Stack: **Static HTML/CSS/JS** (no framework), Google Fonts (Inter), vanilla JavaScript.

## Files Included (10)

| # | File | Role | Why it matters |
|---|------|------|----------------|
| 1 | `index.html` | Homepage — catalog hub, all categories | Main entry point, highest SEO weight, CLS/skeleton loading |
| 2 | `styles.css` | Global stylesheet (~3000 lines) | All UI, responsive breakpoints, skeleton CSS, touch targets |
| 3 | `app.js` | Main application logic | Product rendering, filtering, favorites, detail panel, SPA navigation |
| 4 | `ai-recommend.html` | AI recommendation page (~2595 lines) | Self-contained page with inline CSS/JS, algorithm, expert tips, affiliate disclosure |
| 5 | `mice.html` | Mice catalog page | Category-specific page, SEO meta, skeleton loading |
| 6 | `keyboards.html` | Keyboards catalog page | Same structure as mice.html |
| 7 | `pc-components.html` | PC components catalog page | Same structure as mice.html |
| 8 | `about.html` | About / E-E-A-T trust page | Transparency, team, mission |
| 9 | `methodology.html` | Algorithm methodology page | E-E-A-T compliance, scoring criteria, affiliate transparency |
| 10 | `robots.txt` | Search engine directives | Crawling rules |

## Analysis Goals

### 1. SEO Improvements
- Meta tags optimization (title, description, OpenGraph, Twitter cards)
- Structured data (JSON-LD) completeness and correctness
- Heading hierarchy (H1 → H2 → H3) across all pages
- Internal linking structure
- Canonical URLs consistency
- Semantic HTML improvements
- Sitemap and robots.txt optimization

### 2. Performance (Core Web Vitals)
- **CLS** (Cumulative Layout Shift): Are skeleton screens effective? Any remaining layout shifts?
- **LCP** (Largest Contentful Paint): Font loading strategy, image optimization, render-blocking resources
- **FID/INP** (Interaction to Next Paint): JavaScript execution bottlenecks, event handler optimization
- **TTFB**: Keep-alive script effectiveness, preconnect/preload strategy
- CSS file size (~3000 lines) — opportunities for reduction/splitting
- JavaScript bundle size and execution order
- Image loading strategy (lazy loading, srcset, WebP)

### 3. UI/UX Improvements
- Visual consistency across pages
- Mobile responsiveness and touch target sizes (48x48px minimum)
- Dark/light theme implementation quality
- Accessibility (ARIA labels, focus management, keyboard navigation)
- Animation performance (GPU-accelerated vs layout-triggering)
- Component design patterns (cards, modals, filters)
- Loading states and error states
- Typography scale and spacing system

### 4. Code Quality
- HTML validation issues
- CSS specificity and redundancy
- JavaScript patterns (var vs let/const, DOM manipulation efficiency)
- Inline styles vs external CSS
- Duplicate code across pages (mice/keyboards/pc-components share structure)

## Current Architecture Notes
- Pages are static HTML with shared `styles.css` and `app.js`
- `ai-recommend.html` is self-contained (inline CSS + JS) — ~2595 lines
- SPA-like navigation within catalog pages (catalog ↔ detail ↔ favorites views)
- Google Translate integration for multilingual support
- Authentication system (login/register) with localStorage
- Product data loaded from `data/mice.js`, `data/keyboards.js`, `data/pc-components.js` (not included here)
- Theme toggle (dark/light) via `theme-toggle.js`
- Deployed on Render (free tier → cold start issues)

## Key Metrics to Target
- **CLS** < 0.1
- **LCP** < 2.5s
- **INP** < 200ms
- **TTFB** < 800ms
- **Lighthouse SEO** > 95
- **Lighthouse Accessibility** > 90
- **Lighthouse Performance** > 85
