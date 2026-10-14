# Attendly — Deployment & Operations Guide

## 1. Prerequisites
- Node.js 18+ (tested on Node 20 / 24)
- A Supabase Project (Free Tier compatible)
- Vercel Account for hosting

## 2. Environment Variables

Create `.env.local` for development and configure project environment variables in Vercel:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Server only!

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3001"
NEXT_PUBLIC_DEFAULT_TARGET_ATTENDANCE="85"
```

## 3. Database Migration Execution
Apply database migrations using Supabase CLI or the Supabase SQL Editor:
```bash
npx supabase db push
```
Or execute the SQL migration script located in `supabase/migrations/001_initial_schema.sql`.

## 4. Initial Administrator Bootstrap
Run the initialization CLI script to seed the first institution and college administrator:
```bash
npm run seed:admin -- --email="admin@college.edu" --password="SecurePassword123!" --institution="State University"
```

## 5. Vercel Deployment
1. Connect Git repository to Vercel.
2. Set Build Command: `next build`
3. Set Output Directory: `.next`
4. Add all required Environment Variables.
5. Deploy.
