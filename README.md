# ApexGrowth — Digital Marketing & Technical SEO Consultant Platform

A production-grade, full-stack personal brand and lead generation platform designed for an elite Digital Marketing & SEO Consultant. Engineered as a unified **Next.js 14** application with native **App Router Serverless API Route Handlers**, Tailwind CSS, Framer Motion, TypeScript, and MongoDB with Mongoose ODM — optimized for **1-click deployment on Vercel**.

---

## 🌟 Key Features

- **17 High-Converting Homepage Sections**:
  - Sticky Navbar with Mega-Menu, Dark/Light theme toggle, and Mobile drawer.
  - Animated Hero with statistical counters ($48M+ revenue, 160+ clients, 99% reviews), portrait with floating stat badges, and bidirectional infinite horizontal marquee.
  - 6 Core Practice Areas (SEO, Social Media, Google & Meta Ads, Web Development, Local Marketing, Fractional CMO).
  - About/Bio with credentials badges and animated skill progress bars.
  - "Why Choose Us" with 4-pillar consultant vs agency feature cards & 200+ business impact banner.
  - 3 Interactive Case Studies with verified before/after metrics (Traffic, Demo bookings, CAC reduction).
  - 8-Dimension "Me vs Typical Agency" comparison matrix.
  - 5-Step Process Timeline (Audit → Strategy → Implementation → Monitor → Report).
  - Industry Results snapshots for B2B SaaS, D2C E-Commerce, and Healthcare.
  - 5-Star Testimonials Carousel with executive quotes and avatar chips.
  - 3-Tier Pricing Table with Monthly/Quarterly toggle and feature checklists.
  - Multi-City Service Area / Local SEO section (San Francisco, New York, Austin, London).
  - Latest Blog Insights preview pulled live from CMS/API.
  - Expandable FAQ Accordion with category filtering.
  - Dual Conversion CTA Band (Free 20-Point Audit + WhatsApp direct hotline).
  - React Hook Form + Zod Lead Capture form posting to serverless API with email alert notification.
  - Comprehensive Footer with legal, sitemap, social links, and admin portal.

- **Dynamic Inner Pages**:
  - `/services` & `/services/[slug]`
  - `/case-studies` & `/case-studies/[slug]`
  - `/blog` & `/blog/[slug]`
  - `/about`, `/why-choose-us`, `/results`, `/testimonials`, `/pricing`, `/contact`

- **Protected Custom Admin CMS Dashboard (`/admin`)**:
  - Secure JWT authentication with session cookies & Bearer tokens.
  - **Leads Manager**: Real-time table of incoming inquiries, status manager (New, Contacted, In-Progress, Converted, Closed), detailed view drawer, and single-click **Export to CSV**.
  - **Site Settings & Hero Counters**: Modify consultant details, live counter numbers, WhatsApp number, and SEO defaults.
  - **Services, Case Studies, Blogs, Testimonials, Pricing & FAQs**: Full CRUD management.

- **Full Technical SEO & Core Web Vitals**:
  - Dynamic `generateMetadata()` on all dynamic pages querying live API/DB for title, description, and OpenGraph/Twitter cards.
  - Dynamic XML Sitemap (`/sitemap.xml`) in `app/sitemap.ts` pulling live blog and service slugs.
  - Dynamic Robots (`/robots.txt`) with admin crawl exclusions.
  - JSON-LD Structured Data: `LocalBusiness` / `Person`, `Article`, `FAQPage`, and `BreadcrumbList`.
  - Next.js Image optimization and zero CLS typography.

---

## 🏗️ Unified Full-Stack Architecture

```
digital-marketing-consultant/
├── package.json               # Unified frontend & backend dependencies
├── tsconfig.json              # TypeScript configuration (@/* -> ./src/*)
├── next.config.mjs            # Next.js configuration (images, optimizations)
├── tailwind.config.ts         # Tailwind CSS design system & tokens
├── postcss.config.mjs         # PostCSS configuration
├── vercel.json                # Vercel deployment settings
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables
└── src/
    ├── app/
    │   ├── api/               # Serverless Next.js Route Handlers
    │   │   ├── auth/          # /api/auth/login, /api/auth/me, /api/auth/logout
    │   │   ├── settings/      # /api/settings (GET, PUT)
    │   │   ├── services/      # /api/services, /api/services/[slug]
    │   │   ├── case-studies/  # /api/case-studies, /api/case-studies/[slug]
    │   │   ├── testimonials/  # /api/testimonials, /api/testimonials/[id]
    │   │   ├── pricing/       # /api/pricing, /api/pricing/[id]
    │   │   ├── blog/          # /api/blog, /api/blog/[slug]
    │   │   ├── faqs/          # /api/faqs, /api/faqs/[id]
    │   │   ├── leads/         # /api/leads, /api/leads/[id]/status, /export/csv
    │   │   ├── seed/          # /api/seed (POST / GET database seeder)
    │   │   └── health/        # /api/health (GET health status)
    │   ├── (frontend pages)   # /, /services, /case-studies, /blog, /pricing, etc.
    │   └── admin/             # /admin (Admin CMS Dashboard)
    ├── components/            # React UI components (layout, sections, seo, providers)
    ├── lib/                   # Database connection (db.ts), Auth (auth.ts), Mailer (mailer.ts), API SDK (api.ts)
    ├── models/                # Mongoose Models (Admin, Service, Lead, etc.)
    └── types/                 # Shared TypeScript types & interfaces
```

---

## 🚀 Local Quickstart (Zero Configuration)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the local development server:**
   ```bash
   npm run dev
   ```

3. Open **http://localhost:3000** in your browser.
4. Access the **Admin Dashboard** at **http://localhost:3000/admin/login**:
   - **Default Email:** `admin@apexconsulting.com`
   - **Default Password:** `Admin@123456`

---

## ☁️ Deploying to Vercel

### Step 1: Push Code to GitHub / Git Repository
Push this unified repository to your GitHub, GitLab, or Bitbucket account.

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your repository.
3. Framework Preset: **Next.js** (automatically detected).
4. Root Directory: `./` (leave default).

### Step 3: Add Environment Variables in Vercel
In the Vercel project settings, configure the following Environment Variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/growth_db?retryWrites=true&w=majority`)
- `JWT_SECRET`: Any secure random secret string
- `ADMIN_EMAIL`: `admin@apexconsulting.com`
- `ADMIN_PASSWORD`: `Admin@123456` (or your custom password)
- *(Optional)* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` for live email notifications.

### Step 4: Click Deploy!
Vercel will build the entire application and deploy all frontend pages and serverless API endpoints together.

### Step 5: Initial Database Seed
Once deployed, visit `https://your-domain.vercel.app/api/seed` in your browser (or send a POST request) once to automatically populate all default case studies, services, testimonials, pricing plans, blog posts, and your admin user into your MongoDB Atlas database.

---

## 🔐 Admin Credentials Summary
- **Login URL:** `/admin/login`
- **Default Email:** `admin@apexconsulting.com`
- **Default Password:** `Admin@123456`
