# Deployment Guide for Vercel

This guide provides steps to successfully deploy the Job Application Tracker on Vercel.

## 1. Why Deployment Failed Before

The error `Module '"@prisma/client"' has no exported member 'PrismaClient'` occurs because the Prisma client is not being generated during the Vercel build process. 

To fix this, the following changes have been made:
-   **`postinstall`**: Added `prisma generate` to the `postinstall` script in `package.json`. Vercel automatically runs `postinstall` after installing dependencies.
-   **`build`**: Updated the `build` script to `prisma generate && next build` as an additional safeguard.

## 2. Prerequisites

-   A Vercel account linked to your GitHub repository.
-   A hosted PostgreSQL database (e.g., Supabase, Neon, or Railway).

## 3. Environment Variables

When importing your project on Vercel, ensure you provide the following environment variables:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | Your PostgreSQL connection string (must be accessible from Vercel). |
| `NEXTAUTH_SECRET` | A secure random string for signing cookies. |
| `AUTH_SECRET` | A secure random string for NextAuth v5. |
| `NEXTAUTH_URL` | Your production URL (e.g., `https://your-app.vercel.app`). |

## 4. Deployment Steps

1.  Push your latest changes to your GitHub repository.
2.  Open the Vercel dashboard and click **Add New** > **Project**.
3.  Import the repository.
4.  In the **Build & Development Settings**, leave the defaults (they will now use the updated `build` script).
5.  In the **Environment Variables** section, add the keys listed above.
6.  Click **Deploy**.

## 5. Post-Deployment Database Setup

Since this is a fresh deployment, you may need to apply your migrations to the production database:

```bash
# From your local machine, run:
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

## 6. Troubleshooting

-   **Database Connection Issues**: Ensure your database allows connections from Vercel's IP addresses (or allow connections from everywhere `0.0.0.0/0`).
-   **Prisma Client Errors**: If the error persists, ensure that `@prisma/client` and `prisma` in `package.json` have matching versions.
