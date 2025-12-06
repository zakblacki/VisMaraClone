# Quick Start Guide - Fratelli Vismara Clone

## 🚀 Get Started in 3 Steps

### Step 1: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your PostgreSQL database URL
# Example: DATABASE_URL=postgresql://user:password@localhost:5432/vismara_clone
```

### Step 2: Setup Database
```bash
# Automated setup (recommended)
npm run db:setup
```

This will:
- ✅ Validate your database connection
- ✅ Create all necessary tables
- ✅ Seed with sample data (11 products, 6 categories)

### Step 3: Start Development
```bash
npm run dev
```

Visit **http://localhost:5000** 🎉

---

## 📋 Common Commands

### Development
```bash
npm run dev              # Start dev server with hot reload
```

### Database
```bash
npm run db:setup         # Complete database setup (recommended)
npm run db:push          # Push schema changes only
npm run db:seed          # Seed data only
```

### Quality Checks
```bash
npm run typecheck        # Check TypeScript types
npm run lint             # Lint with TypeScript
npm run build            # Build for production
```

### Production
```bash
npm run build            # Build the app
npm start                # Start production server
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `.env` file exists with valid `DATABASE_URL`
- [ ] Database tables created (run `npm run db:push`)
- [ ] Sample data seeded (run `npm run db:seed`)
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] Can access http://localhost:5000
- [ ] TypeScript checks pass (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: DATABASE_URL must be set
```
**Fix**: Create `.env` file from `.env.example` and set `DATABASE_URL`

### Port 5000 Already in Use
**Fix**: Kill the process or change port in `server/index.ts`
```bash
lsof -ti:5000 | xargs kill -9
```

### TypeScript Errors
**Fix**: Run type check to see details
```bash
npm run typecheck
```

### Build Warnings About Chunk Size
**Status**: ✅ Fixed! Manual chunking configured.

---

## 📦 What You Get

### Features
- 🏠 Homepage with hero carousel
- 📦 Product catalog (11 products, 6 categories)
- 🔧 Interactive elevator configurator
- ♿ Platform lift configurator
- 📧 Contact form with validation
- 📥 Downloads area
- 🎨 Dark/light theme toggle
- 📱 Fully responsive design

### Database Schema
- **categories** - Product categories
- **products** - Elevator components
- **inquiries** - Contact submissions
- **elevator_configurations** - Saved configs
- **platform_configurations** - Platform configs
- **users** - Admin users

### Tech Stack
- React 18 + TypeScript
- Tailwind CSS + Shadcn UI
- Express.js + Drizzle ORM
- PostgreSQL
- Vite build system

---

## 📖 More Information

See the comprehensive documentation:
- **README.md** - Full documentation
- **PROJECT_SUMMARY.md** - Detailed project analysis
- **replit.md** - Original project overview

---

**Need Help?** Check the troubleshooting section in README.md or PROJECT_SUMMARY.md
