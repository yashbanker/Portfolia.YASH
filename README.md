# Yashkumar Zalavadiya — AI Full-Stack Developer Portfolio
A premium, production-ready portfolio website with Next.js 15 frontend, Express.js backend, MongoDB, and a full admin panel.

## Project Structure
```
portfolio/
├── frontend/         # Next.js 15 (App Router) — deploy to Vercel
│   ├── src/
│   │   ├── app/      # Pages: / /about /services /projects /contact /admin/*
│   │   ├── components/
│   │   │   ├── ui/         # Button, Card, Input, Textarea, Badge
│   │   │   ├── sections/   # Hero, Stats, FeaturedProjects, CTA, Testimonials, ServicesPreview
│   │   │   ├── admin/      # ProjectForm
│   │   │   ├── navbar.tsx, footer.tsx, theme-toggle.tsx
│   │   │   ├── whatsapp-button.tsx, scroll-progress.tsx, animated-background.tsx
│   │   ├── lib/       # utils.ts, api.ts, mock-data.ts
│   │   └── app/       # globals.css, layout.tsx, page.tsx
│   └── package.json
│
├── backend/          # Express.js API — deploy to Render
│   ├── src/
│   │   ├── config/    # db.js
│   │   ├── controllers/ # auth, projects, leads, stats, generic
│   │   ├── middleware/  # auth.js, errorHandler.js
│   │   ├── models/      # User, Project, ContactLead, Service, Testimonial, Skill
│   │   ├── routes/       # auth, projects, leads, services, testimonials, skills, stats
│   │   ├── utils/       # seed.js (populates all sample data)
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Quick Start
```bash
# Backend
cd backend
cp .env.example .env        # Fill in your MongoDB URI and credentials
npm install
npm run seed                # Populate sample data
npm run dev                 # Runs on http://localhost:5000

# Frontend (new terminal)
cd frontend
cp .env.example .env.local  # Set NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev                 # Runs on http://localhost:3000
```

## Environment Variables

### Backend .env
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | 64-char secret (pre-generated, replace) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `FRONTEND_URL` | Your Vercel URL (for CORS) |
| `SMTP_HOST/PORT/USER/PASS` | Email notifications |
| `WHATSAPP_NUMBER` | Your WhatsApp number |

### Frontend .env.local
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` (dev) or `https://your-backend.onrender.com/api` (prod) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Your email |
| `NEXT_PUBLIC_SITE_URL` | Your site URL |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub profile URL |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile URL |
| `NEXT_PUBLIC_TWITTER_URL` | Twitter profile URL |

## MongoDB Atlas Setup
1. Create free cluster at mongodb.com/cloud/atlas
2. Connect → Connect your application → Node.js driver
3. Copy connection string, replace `<password>` with your DB user password
4. Add database name: `/portfolio?retryWrites=true&w=majority`
5. Paste into `MONGODB_URI` in backend `.env`

## Seed Database
```bash
cd backend && npm run seed
```
Creates: Admin user, 6 projects, 8 services, 6 testimonials, 14 skills

## Deploy Backend → Render
1. Push backend to GitHub
2. Create Render Web Service → connect repo
3. Build Command: `npm install` | Start Command: `npm start`
4. Add env vars (from your `.env`)
5. Deploy — backend live at `https://your-backend.onrender.com`

## Deploy Frontend → Vercel
1. Push frontend to GitHub
2. Import to Vercel → Root Directory: `frontend`
3. Add env vars (from your `.env.local`), especially `NEXT_PUBLIC_API_URL` → your Render URL
4. Deploy — frontend live at `https://your-frontend.vercel.app`

## Admin Panel
| URL | Purpose |
|---|---|
| `/admin/login` | Admin login |
| `/admin` | Dashboard with stats + recent leads |
| `/admin/projects` | Manage projects (add/edit/delete) |
| `/admin/projects/new` | Add new project |
| `/admin/leads` | View + manage contact form submissions |

Default login: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from backend `.env`

## Tech Stack
Frontend: Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · Shadcn-style UI
Backend: Express.js · MongoDB + Mongoose · JWT + bcrypt
Email: Nodemailer (SMTP notifications)
Deployment: Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

## Security Checklist (Before Going Live)
- [ ] Change `JWT_SECRET` to a new random 64-char string
- [ ] Change `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- [ ] Set `NODE_ENV=production` on Render
- [ ] Whitelist your MongoDB Atlas cluster IP
- [ ] Use Gmail App Password (16-char), not regular password for SMTP
- [ ] Update `FRONTEND_URL` in Render to your actual Vercel domain
- [ ] Add `NEXT_PUBLIC_SITE_URL` to Vercel env vars

---
Built for Yashkumar Zalavadiya. All rights reserved.