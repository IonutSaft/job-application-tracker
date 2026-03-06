# Job Application Tracker - Project Context

This project is a modern, production-grade web application for tracking and managing job applications. It uses Next.js 16 (App Router), React 19, Prisma, and NextAuth for a full-stack experience.

## Project Overview

- **Purpose**: To provide a centralized dashboard for users to track job applications through various stages (Applied, Interviewing, Offer, Rejected).
- **Architecture**: Next.js App Router with React Server Components (RSC) and Client Components. API interactions are handled via Next.js API Routes and custom hooks.
- **Data Model**: Managed by Prisma with a PostgreSQL database. Primary models include `User` (authentication) and `Application` (job application details).
- **Authentication**: NextAuth v5 (Beta) with a Credentials provider and bcrypt password hashing.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Backend**: Next.js API Routes (Node.js runtime).
- **Database**: PostgreSQL with Prisma ORM.
- **Authentication**: NextAuth v5 (Beta) using JWT strategy.
- **Libraries**: `date-fns` for date manipulation, `bcryptjs` for security.

## Key Commands

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Build** | `npm run build` |
| **Start Production** | `npm run start` |
| **Linting** | `npm run lint` |
| **Database Migrations** | `npx prisma migrate dev --name <migration_name>` |
| **Prisma Studio** | `npx prisma studio` |
| **Generate Prisma Client** | `npx prisma generate` |

## Development Conventions

1.  **Next.js App Router**:
    *   Pages are defined in `app/` (e.g., `app/dashboard/page.tsx`).
    *   API routes are located in `app/api/` (e.g., `app/api/applications/route.ts`).
2.  **Authentication**:
    *   Auth configuration is centralized in `auth.ts`.
    *   Use the `auth()` helper to protect API routes and retrieve session data.
    *   Public routes should be excluded in `middleware.ts` if it exists.
3.  **Database Access**:
    *   Use the Prisma client exported from `lib/prisma.ts`.
    *   Keep schema changes in `prisma/schema.prisma`.
4.  **Client-Side API Hooks**:
    *   Reusable API logic is abstracted into custom hooks in `lib/hooks.ts`.
5.  **Component Design**:
    *   UI components are located in `app/components/`.
    *   Styling follows Tailwind CSS v4 conventions.
6.  **Environment Variables**:
    *   Required: `DATABASE_URL`, `NEXTAUTH_SECRET`, `AUTH_SECRET`, `NEXTAUTH_URL`.

## Key Files and Directories

- `app/api/`: Contains all backend API endpoints.
- `app/components/`: Reusable UI components.
- `app/dashboard/`: Main application interface for logged-in users.
- `auth.ts`: Central authentication configuration (NextAuth).
- `prisma/schema.prisma`: Source of truth for the database schema.
- `lib/hooks.ts`: Custom React hooks for data fetching and mutations.
- `lib/prisma.ts`: Singleton instance of the Prisma client.
- `lib/utils.ts`: Shared utility functions.
