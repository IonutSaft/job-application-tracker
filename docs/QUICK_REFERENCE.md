# Quick Reference Guide

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Navigate to project
cd job-application-tracker

# 2. Install dependencies
npm install

# 3. Create .env.local with:
# DATABASE_URL="postgresql://..."
# NEXTAUTH_SECRET="random-secret"
# NEXTAUTH_URL="http://localhost:3000"
# AUTH_SECRET="random-secret"

# 4. Setup database
npx prisma generate
npx prisma migrate dev --name init

# 5. Start server
npm run dev

# 6. Open browser
# http://localhost:3000
```

## 📁 Key Files Quick Reference

| What            | Where                    |
| --------------- | ------------------------ |
| Landing page    | `app/page.tsx`           |
| Login form      | `app/login/page.tsx`     |
| Dashboard       | `app/dashboard/page.tsx` |
| API endpoints   | `app/api/`               |
| UI components   | `app/components/`        |
| Auth config     | `auth.ts`                |
| Database schema | `prisma/schema.prisma`   |
| API hooks       | `lib/hooks.ts`           |
| Constants       | `lib/constants.ts`       |

## 🔑 Key Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build          # Build for production
npm start              # Start production server

# Database
npx prisma generate   # Generate Prisma client
npx prisma migrate dev --name <name>  # Create migration
npx prisma studio    # Open database browser

# Code Quality
npm run lint          # Run ESLint
npm run lint --fix    # Fix lint issues
```

## 🗄️ Database

### Connection String Format

```
postgresql://username:password@host:port/database_name
```

### Example (Local)

```
postgresql://postgres:password@localhost:5432/job_tracker
```

### Tables

- **User** - Stores user accounts with encrypted passwords
- **Application** - Stores job applications with status

## 🔐 Environment Variables

### Required

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=random_string_here
NEXTAUTH_URL=http://localhost:3000 (or production URL)
AUTH_SECRET=another_random_string
```

### Optional

```env
NODE_ENV=development  # or production
```

### Generate Secrets

```bash
# Linux/Mac
openssl rand -base64 33

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

## 🛣️ Page Routes

| URL          | Component    | Auth      |
| ------------ | ------------ | --------- |
| `/`          | Landing page | Public    |
| `/login`     | Auth form    | Public    |
| `/dashboard` | Main app     | Protected |

## 📡 API Endpoints

### Authentication

```
POST /api/auth/register        # Register user
POST /api/auth/signin          # Login (NextAuth)
POST /api/auth/signout         # Logout (NextAuth)
```

### Applications

```
GET    /api/applications               # List all
POST   /api/applications               # Create
GET    /api/applications/[id]          # Get one
PATCH  /api/applications/[id]          # Update
DELETE /api/applications/[id]          # Delete
```

### Query Parameters

```
?status=APPLIED&sortBy=appliedAt&sortOrder=desc
```

## 🎨 Component Props

### Button

```tsx
<Button variant="primary" isLoading={false}>
  Click Me
</Button>
```

### Input

```tsx
<Input
  label="Email"
  error="Invalid email"
  placeholder="user@example.com"
  type="email"
  required
/>
```

### Select

```tsx
<Select
  label="Status"
  options={[
    { value: "applied", label: "Applied" },
    { value: "rejected", label: "Rejected" },
  ]}
/>
```

## 🎯 Common Tasks

### Add a New Field to Application

1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_field_name`
3. Update form in `app/components/ApplicationForm.tsx`
4. Update API in `app/api/applications/route.ts`

### Change Colors

- Edit Tailwind classes in components
- Modify `tailwind.config.ts` for custom colors
- Use Tailwind color names: `bg-blue-600`, `text-gray-900`

### Customize Status Options

- Edit Status enum in `prisma/schema.prisma`
- Update constants in `lib/constants.ts`
- Update colors in components

### Add New Component

1. Create `app/components/NewComponent.tsx`
2. Add to `app/components/index.ts`
3. Import and use in pages

## 🧪 Testing

### Test User Flow

```
1. Go to /login
2. Sign up (register)
3. Go to /dashboard
4. Add application
5. Edit application
6. Delete application
7. Sign out
```

### Check Database

```bash
npx prisma studio
# Opens browser at http://localhost:5555
```

### Check API Responses

```bash
# In browser console or with curl
fetch('/api/applications')
  .then(r => r.json())
  .then(d => console.log(d))
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Error

- Check DATABASE_URL is set
- Verify PostgreSQL is running
- Test connection string

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
npx prisma generate
```

### TypeScript Errors

- Check `tsconfig.json`
- Run `npm run build` to see all errors
- Verify imports match export paths

## 📚 Documentation

- `README.md` - Setup and overview
- `DEPLOYMENT_GUIDE.md` - How to deploy
- `FEATURES.md` - Feature list
- `PROJECT_OVERVIEW.md` - Architecture
- `SETUP_CHECKLIST.md` - Verification checklist
- `FILE_MANIFEST.md` - File listing

## 🚀 Deployment

### Vercel (Easiest)

```
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy with one click
```

### Traditional Server

```
1. SSH into server
2. Clone repository
3. Install Node.js
4. Configure database
5. npm install && npm run build
6. Use PM2 or similar for process management
```

### Docker

```bash
docker build -t job-tracker .
docker run -p 3000:3000 -e DATABASE_URL="..." job-tracker
```

## 📊 Performance Tips

### Frontend

- Use Lighthouse DevTools
- Check Network tab in DevTools
- Monitor Core Web Vitals

### Backend

- Use `npx prisma studio` to check queries
- Monitor database connection pool
- Check API response times

## 🔒 Security Checklist

- [ ] NEXTAUTH_SECRET is strong and random
- [ ] DATABASE_URL not in version control
- [ ] Passwords are hashed (bcryptjs)
- [ ] User data is isolated
- [ ] API routes have auth checks
- [ ] No sensitive data in logs
- [ ] HTTPS enabled in production
- [ ] Database backups configured

## 💡 Best Practices

### Code

- Keep components small and reusable
- Use hooks for shared logic
- Type everything with TypeScript
- Write meaningful error messages

### Database

- Run migrations in version control
- Backup regularly
- Index frequently queried fields
- Use migrations, not direct SQL

### Deployment

- Test build locally first
- Set environment variables before deploying
- Run migrations on production
- Monitor error logs
- Keep backups

## 📱 Responsive Design

Tested at:

- Desktop: 1920px
- Tablet: 768px
- Mobile: 375px

Adjust in components using:

```tsx
// Small screens
sm: hidden;

// Medium screens
md: flex;

// Large screens
lg: grid;
```

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)

## 🆘 Need Help?

1. Check the relevant documentation file
2. Search error message in browser/terminal
3. Check GitHub issues
4. Review code comments
5. Ask in community forums

## ✅ Verification Checklist

After setup:

- [ ] npm install successful
- [ ] Database connected
- [ ] npm run dev works
- [ ] Can access http://localhost:3000
- [ ] Can register account
- [ ] Can add application
- [ ] Can view dashboard
- [ ] Can logout

---

**Quick Reference Version**: 1.0  
**Last Updated**: March 2026

Bookmark this file for quick access during development!
