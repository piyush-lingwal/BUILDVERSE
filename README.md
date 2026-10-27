# BUILD-VERSE 2026 Microsite

Standalone Next.js repository for the **BUILD-VERSE 2026** innovation event microsite, built for deployment on a subdomain (e.g., `buildverse.awssbg.com`).

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Run Unit Tests
```bash
npm test
```
Runs unit tests using Node's native test runner (`node --test`), verifying countdown calculation, registration open/closed states, and configuration sanity.

---

## 📁 Repository Structure

```
BuildVerse/
├── app/
│   ├── globals.css             # Tailwind base & utilities, modal dialog styles
│   ├── layout.tsx              # Root HTML/Body layout with anti-drag styles
│   └── page.tsx                # Main landing page (/)
├── components/
│   ├── Countdown.tsx           # Hydration-safe IST countdown timer
│   ├── Decor.tsx               # Sparkle clusters and art dividers
│   ├── GsapMotion.tsx          # GSAP scroll animations & Lenis integration
│   ├── Header.tsx              # Navigation bar with mobile sheet & CTA
│   ├── Logos.tsx               # SBG, BuildVerse, and Utkrisht logos
│   ├── Mascot.tsx              # Official AWS mascot illustrations
│   ├── Sections.tsx            # Hero, About, Flow, Rules, Prizes, FAQs, Footer
│   └── Tracks.tsx              # 5 theme cards & accessible modal for tracks
├── config/
│   └── buildverse.ts           # The SINGLE source of truth for dates, prizes, FAQs & links
├── lib/
│   └── state.ts                # Pure countdown & registration state logic
├── public/
│   └── buildverse/             # Official mascot art, logos, and campus scene
├── tests/
│   └── state.test.ts           # Pure unit tests
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🌐 Registration & Deployment

### Registration Form
Team registrations are handled through Google Forms. The link is configured in `config/buildverse.ts` (`registrationFormUrl`). All CTA buttons throughout the site open this link directly in a new tab, and `/register` redirects to it via `next.config.ts`.

### Vercel / AWS Amplify / Cloudflare
1. Connect this repo to Vercel or your hosting provider.
2. In Project Settings > Domains, add your subdomain:
   - `buildverse.awssbg.com` (or your chosen domain)
3. No environment variables are required!
4. Deploy!
