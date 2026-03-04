# Job Application Tracker

A modern, production-grade web application for tracking and managing your job applications. Built with Next.js 16, React 19, Prisma, and NextAuth for a seamless user experience.

## Features

- 🔐 **Secure Authentication** - User registration and login with encrypted passwords
- 📋 **Application Management** - Add, edit, and delete job applications
- 📊 **Analytics Dashboard** - View statistics on your applications by status
- 🏷️ **Status Tracking** - Track application through Applied, Interviewing, Offer, or Rejected stages
- 🔍 **Filters & Sorting** - Filter by status and sort applications by date or company
- 💾 **Notes & Links** - Save job posting links and personal notes for each application
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, professional interface with intuitive navigation

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5
- **UI Components**: Custom built components with Tailwind CSS
- **Date Formatting**: date-fns

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd job-application-tracker

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/job_tracker"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-auth-secret-here"
```

**To generate secure secrets:**

```bash
# On macOS/Linux
openssl rand -base64 33

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

### 3. Set Up the Database

```bash
# Create database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
job-application-tracker/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts      # User registration endpoint
│   │   │   ├── [...nextauth]/route.ts # NextAuth routes
│   │   └── applications/
│   │       ├── route.ts                # Get/create applications
│   │       └── [id]/route.ts           # Update/delete specific application
│   ├── components/
│   │   ├── Button.tsx                 # Reusable button component
│   │   ├── Input.tsx                  # Form input component
│   │   ├── Select.tsx                 # Dropdown component
│   │   ├── Textarea.tsx               # Textarea component
│   │   ├── ApplicationCard.tsx         # Application display card
│   │   ├── ApplicationForm.tsx         # Form for adding/editing
│   │   ├── Navigation.tsx              # Top navigation bar
│   │   ├── Stats.tsx                  # Statistics dashboard
│   │   ├── Modal.tsx                  # Modal dialog component
│   │   ├── Alert.tsx                  # Alert notification component
│   │   └── index.ts                   # Component exports
│   ├── dashboard/
│   │   └── page.tsx                   # Main dashboard page
│   ├── login/
│   │   └── page.tsx                   # Login/register page
│   ├── layout.tsx                     # Root layout with session provider
│   ├── page.tsx                       # Landing page
│   └── globals.css                    # Global Tailwind styles
├── lib/
│   ├── prisma.ts                      # Prisma client instance
│   └── hooks.ts                       # Custom React hooks for API
├── prisma/
│   ├── schema.prisma                  # Database schema
│   └── migrations/                    # Database migrations
├── auth.ts                            # NextAuth configuration
├── middleware.ts                      # Request middleware for auth
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Usage

### Creating an Account

1. Navigate to the login page
2. Click "Sign up" to create a new account
3. Enter your email, password, and name
4. Click "Create Account"

### Adding Job Applications

1. Click the "+ Add Application" button
2. Fill in the application details:
   - **Company**: The company name
   - **Role**: Job title/position title
   - **Position**: Employment type (Full-time, Contract, etc.)
   - **Job URL** (optional): Link to the job posting
   - **Notes** (optional): Any notes about the application
3. Click "Add Application"

### Updating Application Status

1. On the dashboard, find the application card
2. Use the status dropdown to change the status:
   - **Applied**: Initial application submitted
   - **Interviewing**: In the interview process
   - **Offer**: Received a job offer
   - **Rejected**: Application rejected

### Filtering and Sorting

- Use the status dropdown to filter applications by status
- Use the sort dropdown to organize by date or company name

### Managing Applications

- **Edit**: Click the "Edit" button on any application card to modify details
- **Delete**: Click the "Delete" button to remove an application

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/signin` - User login (handled by NextAuth)
- **POST** `/api/auth/signout` - User logout (handled by NextAuth)

### Applications

- **GET** `/api/applications` - Fetch user's applications (with optional filters)
  - Query parameters:
    - `status`: Filter by status (APPLIED, INTERVIEWING, OFFER, REJECTED)
    - `sortBy`: Sort field (appliedAt, company)
    - `sortOrder`: asc or desc

- **POST** `/api/applications` - Create a new application

- **GET** `/api/applications/[id]` - Get a specific application

- **PATCH** `/api/applications/[id]` - Update an application

- **DELETE** `/api/applications/[id]` - Delete an application

## Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())

  applications Application[]
}
```

### Application Model

```prisma
model Application {
  id        String   @id @default(uuid())
  company   String
  role      String
  position  String
  status    Status   @default(APPLIED)
  appliedAt DateTime @default(now())
  notes     String?
  url       String?
  updatedAt DateTime @updatedAt

  userId    String
  user      User     @relation(fields: [userId], references: [id])
}

enum Status {
  APPLIED
  INTERVIEWING
  OFFER
  REJECTED
}
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ Secure session management with NextAuth
- ✅ Protected API routes with authentication checks
- ✅ CSRF protection built-in
- ✅ Environment variable protection
- ✅ User data isolation (can only access own applications)

## Performance Optimizations

- Server-side rendering with Next.js
- Optimized API responses
- Tailwind CSS for minimal CSS output
- Image optimization
- Component lazy loading ready

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue on the GitHub repository.

---

Happy job hunting! 🚀
