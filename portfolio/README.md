# Yashkumar Zalavadiya — AI Full-Stack Developer Portfolio

A premium, production-ready portfolio website with Next.js 15 frontend, Express.js backend, MongoDB, and a full admin panel.

---

## 📁 Project Structure

```
portfolio/
├── frontend/          # Next.js 15 (App Router) — deployed to Vercel
│   ├── src/
│   │   ├── app/       # Pages: / /about /services /projects /contact
│   │   │             #       /admin /admin/login /admin/projects /admin/leads
│   │   ├── components/
│   │   │   ├── ui/         # Shadcn-style components (Button, Card, Input…)
│   │   │   ├── sections/   # Hero, Stats, FeaturedProjects, CTA… sections
│   │   │   ├── admin/      # ProjectForm
│   │   │   ├── navbar.tsx, footer.tsx, theme-toggle.tsx
│   │   │   ├── whatsapp-button.tsx, scroll-progress.tsx
│   │   │   └── animated-background.tsx
│   │   ├── lib/       # utils.ts, api.ts, mock-data.ts
│   │   └── app/       # globals.css, layout.tsx, page.tsx
│   ├── public/
│   └── package.json
│
├── backend/           # Express.js API — deployed to Render
│   ├── src/
│   │   ├── config/    # db.js
│   │   ├── controllers/ # auth, projects, leads, stats, generic
│   │   ├── middleware/  # auth.js, errorHandler.js
│   │   ├── models/      # User, Project, ContactLead, Service, Testimonial, Skill
│   │   ├── routes/       # auth, projects, leads, services, testimonials, skills, stats
│   │   ├── utils/       # seed.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier)
- Git

### 2. Clone & Setup

```bash
# Unzip the project
unzip portfolio.zip
cd portfolio

# Setup Backend
cd backend
cp .env.example .env
# → Fill in your .env values (see Environment Variables section below)
npm install

# Setup Frontend
cd ../frontend
cp .env.example .env.local
# → Fill in your .env.local values
npm install
```

---

## ⚙️ Environment Variables

### Backend `.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | `development` or `production` | `development` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority` |
| `JWT_SECRET` | 64-char secret for token signing | (pre-generated, replace with your own) |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `ADMIN_EMAIL` | Admin login email | `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | Admin login password | `YourStrongPassword123!` |
| `FRONTEND_URL` | Your frontend URL (CORS) | `https://yourdomain.vercel.app` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | Your email | `you@gmail.com` |
| `SMTP_PASS` | Gmail App Password (16-char) | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM` | From name for emails | `Portfolio <you@gmail.com>` |
| `NOTIFY_EMAIL` | Email to receive lead notifications | `you@gmail.com` |
| `WHATSAPP_NUMBER` | WhatsApp with country code | `+919999999999` |
| `CONTACT_EMAIL` | Your contact email | `hello@yourdomain.com` |

**Gmail SMTP note:** If using Gmail, you need a **16-character App Password**, not your regular password. Generate it at: `myaccount.google.com → Security → 2-Step Verification → App Passwords`

### Frontend `.env.local`

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` (dev) or `https://your-api.onrender.com/api` (prod) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number | `+919999999999` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Your contact email | `hello@yourdomain.com` |
| `NEXT_PUBLIC_SITE_URL` | Your frontend URL | `http://localhost:3000` (dev) or `https://yourdomain.vercel.app` (prod) |
| `NEXT_PUBLIC_GITHUB_URL` | Your GitHub profile | `https://github.com/yashkumar` |
| `NEXT_PUBLIC_LINKEDIN_URL` | Your LinkedIn | `https://linkedin.com/in/yashkumar` |
| `NEXT_PUBLIC_TWITTER_URL` | Your Twitter | `https://twitter.com/yashkumar` |

---

## 🗄️ MongoDB Atlas Setup

1. Go to [mongodb.com](https://www.mongodb.com/cloud/atlas) → Create free cluster
2. Choose **M0 Sandbox** (free, 512MB) — AWS/N. Virginia recommended
3. Click **Connect** → **Connect your application**
4. Choose **Node.js** driver, copy the connection string
5. Replace `<password>` with your database user password
6. Add your database name at the end: `/portfolio?retryWrites=true&w=majority`
7. Paste into `MONGODB_URI` in backend `.env`

---

## 🌱 Seed the Database (Populate Sample Data)

After setting up your MongoDB URI:

```bash
cd backend
npm run seed
```

This creates:
- ✅ Admin user (login credentials from your `.env`)
- ✅ 6 sample projects (AI, SaaS, Ecommerce, Dashboard, Web Apps)
- ✅ 8 services
- ✅ 6 testimonials
- ✅ 14 skills

---

## 🏃 Run Locally

### Backend (Terminal 1)
```bash
cd backend
npm run dev
# → Runs on http://localhost:5000
```

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# → Runs on http://localhost:3000
```

---

## ☁️ Deployment Guide

### Deploy Backend → Render

Render is free tier friendly and works great with Express.js.

**Steps:**

1. **Push to GitHub first:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m “Initial backend”
   git remote add origin https://github.com/YOUR_USERNAME/backend.git
   git push -u origin main
   ```

2. **Create Render Web Service:**
   - Go to [render.com](https://render.com) → Sign up (free)
   - Click **New** → **Web Service**
   - Connect your GitHub repo
   - Configure:
     - **Root Directory:** (leave empty — it's the root of the repo)
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment:** `Node`
   - Add Environment Variables (copy from your `.env`):
     - `MONGODB_URI` → your MongoDB Atlas URI
     - `JWT_SECRET` → your 64-char secret
     - `JWT_EXPIRES_IN` → `7d`
     - `ADMIN_EMAIL` → your admin email
     - `ADMIN_PASSWORD` → your admin password
     - `FRONTEND_URL` → `https://your-frontend.vercel.app`
     - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `NOTIFY_EMAIL`
   - Click **Create Web Service**
   - Wait ~2 minutes for deployment
   - Your backend will be live at: `https://your-backend.onrender.com`

3. **Update Render env var:** Once deployed, set:
   - `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

---

### Deploy Frontend → Vercel

Vercel is the best deployment target for Next.js (free, fast, optimized).

**Steps:**

1. **Push frontend to GitHub:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m “Initial frontend”
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-frontend.git
   git push -u origin main
   ```

2. **Create Vercel Project:**
   - Go to [vercel.com](https://vercel.com) → Sign up → New Project
   - Import your GitHub repo
   - Framework: **Next.js** (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Add Environment Variables (from your `.env.local`):
     - `NEXT_PUBLIC_API_URL` → `https://your-backend.onrender.com/api`
     - `NEXT_PUBLIC_WHATSAPP_NUMBER` → `+919999999999`
     - `NEXT_PUBLIC_CONTACT_EMAIL` → `hello@yourdomain.com`
     - `NEXT_PUBLIC_SITE_URL` → `https://yourdomain.vercel.app`
     - `NEXT_PUBLIC_GITHUB_URL` → your GitHub URL
     - `NEXT_PUBLIC_LINKEDIN_URL` → your LinkedIn URL
     - `NEXT_PUBLIC_TWITTER_URL` → your Twitter URL
   - Click **Deploy**
   - First deploy takes ~2-3 minutes, subsequent pushes deploy automatically

3. **Custom Domain (optional):**
   - Vercel → Your Project → Settings → Domains
   - Add `yourdomain.com` (purchase from Namecheap/GoDaddy)
   - Update `NEXT_PUBLIC_SITE_URL` to your domain
   - Update `FRONTEND_URL` in Render backend env vars to your domain

---

## 🔐 Admin Panel

After deployment:

| URL | Purpose |
|---|---|
| `https://yourdomain.com/admin` | Redirects to login if not authenticated |
| `https://yourdomain.com/admin/login` | Admin login page |
| `https://yourdomain.com/admin` | Dashboard (stats, quick actions, recent leads) |
| `https://yourdomain.com/admin/projects` | Manage all projects |
| `https://yourdomain.com/admin/projects/new` | Add new project |
| `https://yourdomain.com/admin/projects/[id]` | Edit project |
| `https://yourdomain.com/admin/leads` | View & manage all contact form submissions |

**Default login:** `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your backend `.env`

---

## 📁 Sitemap & SEO

- **Sitemap:** `https://yourdomain.com/sitemap.xml` — auto-generated with all pages + project slugs
- **Robots:** `https://yourdomain.com/robots.txt` — blocks `/admin` routes from crawlers
- **Meta tags:** All pages have dynamic OpenGraph + Twitter card metadata
- **404 page:** Custom not-found page at `https://yourdomain.com/not-found`

---

## 🔧 Updating Your Content

### Change personal info (bio, about page)
Edit `frontend/src/app/about/page.tsx`

### Add/remove projects
Go to `/admin/projects` → Add New or Edit existing

### Change services
Backend seed handles services. For custom services, use the services API or add directly in MongoDB.

### Update testimonials
Use the testimonials API endpoint or add via MongoDB directly.

### Change branding (name, tagline, colors)
- Name/tagline: `frontend/src/lib/utils.ts` → `SITE` object
- Colors: `frontend/src/app/globals.css` → CSS variables in `:root` and `.dark`
- Primary blue: `hsl(217 91% 60%)` → adjust HSL values

---

## 🛡️ Security Checklist (Before Going Live)

- [ ] Change `JWT_SECRET` to a new random 64-char string
- [ ] Change `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- [ ] Set `NODE_ENV=production` on Render
- [ ] Whitelist your MongoDB Atlas cluster IP (or use 0.0.0.0/0 for flexibility)
- [ ] Enable 2FA on your MongoDB Atlas account
- [ ] Use Gmail App Password (not real password) for SMTP
- [ ] Add `FRONTEND_URL` to Render backend (your Vercel domain only, no wildcards)
- [ ] Update `NEXT_PUBLIC_SITE_URL` on Vercel to your actual domain

---

## 📦 Tech Stack Summary

| Layer | Tech |
|---|---|
| Frontend Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| UI Components | Custom Shadcn-style |
| Theme | Dark/Light (next-themes) |
| Backend | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Email | Nodemailer |
| Deployment | Vercel (frontend) + Render (backend) |
| Database Hosting | MongoDB Atlas |

---

## 📄 License

Private. All rights reserved to Yashkumar Zalavadiya.