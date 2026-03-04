# Development and Deployment Guide

## Quick Start for Development

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- A modern web browser

### Setup Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd job-application-tracker
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env.local` file in the root directory:

   ```env
   # Replace with your actual PostgreSQL connection string
   DATABASE_URL="postgresql://user:password@localhost:5432/job_tracker"

   # Generate these using: openssl rand -base64 33
   NEXTAUTH_SECRET="your-generated-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   AUTH_SECRET="another-generated-secret-here"

   NODE_ENV="development"
   ```

4. **Set Up Database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) View database in Prisma Studio
   npx prisma studio
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Architecture

### Frontend Structure

- **Pages**: Located in `/app` directory
  - `/` - Landing page (public)
  - `/login` - Authentication page (public)
  - `/dashboard` - Main application (protected)

- **Components**: Reusable UI components in `/app/components`
  - Form components: Button, Input, Select, Textarea
  - Feature components: ApplicationCard, ApplicationForm, Navigation, Stats
  - Utility components: Modal, Alert, Skeleton

- **Hooks**: Custom React hooks in `/lib/hooks.ts`
  - `useApplications()` - Fetch user's applications
  - `useCreateApplication()` - Create new application
  - `useUpdateApplication()` - Update application
  - `useDeleteApplication()` - Delete application

### Backend Structure

- **API Routes**: Located in `/app/api`
  - `/auth/register` - User registration
  - `/auth/[...nextauth]` - NextAuth handlers
  - `/applications` - List and create applications
  - `/applications/[id]` - Get, update, delete specific application

- **Authentication**: NextAuth configuration in `/auth.ts`
  - Credentials provider with bcrypt password hashing
  - JWT session strategy
  - 30-day session expiration

- **Database**: Prisma ORM with PostgreSQL
  - User model for authentication
  - Application model for job tracking

## Building for Production

### Local Build Test

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Options

#### Vercel (Recommended for Next.js)

1. Push code to GitHub/GitLab
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy with one click

Example environment variables for Vercel:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourdomain.com
AUTH_SECRET=...
```

#### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t job-tracker .
docker run -p 3000:3000 -e DATABASE_URL="..." job-tracker
```

#### Traditional Server (Ubuntu/Debian)

```bash
# SSH into server
ssh user@server

# Clone repository
git clone <repo-url>
cd job-application-tracker

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name="job-tracker" -- start
pm2 startup
pm2 save
```

## Database Setup

### PostgreSQL Installation

**macOS (using Homebrew)**:

```bash
brew install postgresql
brew services start postgresql
createdb job_tracker
```

**Ubuntu/Debian**:

```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb job_tracker
```

**Windows**:

- Download from postgresql.org
- Follow installation wizard
- Use pgAdmin to create database

### Prisma Database Operations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Reset database (development only!)
npx prisma migrate reset

# View database
npx prisma studio

# Push schema to database
npx prisma db push

# Generate client
npx prisma generate
```

## Performance Optimization

### Frontend

- Image optimization via Next.js
- Code splitting with dynamic imports
- CSS optimization with Tailwind
- Client-side caching strategies

### Backend

- Database query optimization with Prisma
- API response caching
- Efficient pagination
- Connection pooling

### Database

- Index on frequently queried fields
- Optimize complex queries
- Regular backup strategy

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use strong, randomly generated secrets
   - Rotate secrets periodically

2. **Password Security**
   - bcrypt hashing with 10 salt rounds
   - Minimum 8 characters required
   - Add additional validation rules

3. **Session Management**
   - JWT-based sessions
   - 30-day expiration
   - Secure HTTP-only cookies

4. **API Security**
   - Authentication required for protected routes
   - User data isolation (can only access own data)
   - Input validation on all endpoints
   - Rate limiting recommended for production

5. **Database Security**
   - Use strong database credentials
   - Enable SSL/TLS connections
   - Regular backups
   - Principle of least privilege for database users

## Monitoring and Logging

### Development

- Check `.next` build output
- Console logs in browser DevTools
- Server logs in terminal

### Production

- Use error tracking (Sentry, Rollbar)
- Implement application logging
- Monitor database performance
- Track user analytics

## Troubleshooting

### Common Issues

**"Prisma Client did not initialize"**

- Run `npx prisma generate`
- Ensure DATABASE_URL is set
- Check Prisma schema validity

**"Port 3000 already in use"**

```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

**"Database connection refused"**

- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists

**"NextAuth secret is missing"**

- Set NEXTAUTH_SECRET in .env.local
- Generate with: `openssl rand -base64 33`

## Support and Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## License

This project is licensed under the MIT License.
