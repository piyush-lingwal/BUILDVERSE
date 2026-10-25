# BUILD-VERSE 2026 Microsite

Standalone Next.js repository for the **BUILD-VERSE 2026** innovation event microsite, built for deployment on a subdomain (e.g., `buildverse.awssbg.com`).

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env.local` based on `.env.example`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-supabase-service-role-secret-key
```
*(Both variables come from your existing Supabase project. The `register_buildverse_team` function and tables are already created if the migration was run.)*

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Run Unit Tests
```bash
npm test
```
All unit tests run purely with Node's native test runner (`node --test`), verifying validations, phone normalization, team size limits, deadlines, and registration logic.

---

## 📁 Repository Structure

```
BuildVerse/
├── app/
│   ├── api/register/route.ts   # POST /api/register endpoint (atomic team registration)
│   ├── register/page.tsx       # /register form page
│   ├── globals.css             # Tailwind base & utilities
│   ├── layout.tsx              # Root HTML/Body layout with anti-drag styles
│   └── page.tsx                # Main landing page (/)
├── components/
│   ├── Countdown.tsx           # Hydration-safe IST countdown timer
│   ├── Logos.tsx               # SBG, BuildVerse, and Utkrisht logos
│   ├── Mascot.tsx              # Official AWS mascot illustrations
│   ├── RegisterForm.tsx        # Registration client form with honeypot & validation
│   └── Sections.tsx            # Hero, About, Flow, Themes, Rules, Prizes, FAQs, Footer
├── config/
│   └── buildverse.ts           # The SINGLE source of truth for dates, fees, prizes, faqs
├── lib/
│   ├── ports.ts                # Supabase database adapter
│   ├── register.ts             # Pure registration logic
│   ├── state.ts                # Pure countdown & registration state logic
│   ├── validate.ts             # Pure input sanitizer & validation
│   └── supabase/admin.ts       # Supabase service-role admin client
├── public/
│   └── buildverse/             # Official mascot art, logos, and campus scene
├── supabase/
│   └── migrations/             # Database migration for buildverse_teams & members
├── tests/
│   └── validate.test.ts        # Pure unit tests
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🌐 Subdomain & Production Deployment

### Vercel / AWS Amplify / Cloudflare
1. Connect this repo to Vercel or your hosting provider.
2. In Project Settings > Domains, add your subdomain:
   - `buildverse.awssbg.com` (or your chosen domain)
3. In Project Settings > Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
4. Deploy!

### Pointing from Main Site
In your main site (`AWS-Website`), any link or button to BuildVerse can now point directly to:
`https://buildverse.awssbg.com`
