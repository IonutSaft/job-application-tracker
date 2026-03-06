# 🚀 Professional Job Application Tracker

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.4.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, full-stack application designed to streamline the job search process. Built with the latest industry standards—**Next.js 16 (App Router)** and **React 19**—this platform offers a seamless, production-grade experience for tracking job applications from initial submission to final offer.

---

## 🌟 Key Highlights

- **Modern Architecture**: Leverages React Server Components (RSC) and Client Components for optimal performance and SEO.
- **Robust Security**: Features secure authentication via NextAuth v5 (Beta) with bcrypt password hashing and protected API routes.
- **Resource Management**: Implements proactive **Storage Quota Management** to maintain system integrity under database constraints.
- **Data Integrity**: Managed by Prisma ORM with a PostgreSQL backend, ensuring type-safe database interactions and reliable migrations.

---

## ✨ Features

- 🔐 **Advanced Auth**: Secure registration and login flow with JWT-based session management.
- 📋 **Application Lifecycle**: Complete CRUD operations for job applications with persistent state tracking.
- 📊 **Dynamic Dashboard**: Real-time statistics and analytics to visualize your job search progress.
- 🏷️ **Smart Categorization**: Track status across multiple stages: *Applied*, *Interviewing*, *Offer*, and *Rejected*.
- 🔍 **Filtering & Sorting**: Sophisticated client-side filtering by status and sorting by application date or company name.
- 📱 **Adaptive UI**: A fully responsive interface crafted with Tailwind CSS v4, optimized for everything from mobile to wide-screen monitors.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.1.6](https://nextjs.org/) (App Router) |
| **Frontend** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **ORM** | [Prisma 7.4.2](https://www.prisma.io/) |
| **Database** | PostgreSQL |
| **Auth** | [NextAuth.js v5](https://authjs.dev/) |
| **Utilities** | [date-fns](https://date-fns.org/), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |

---

## ⚙️ Quota & Storage Management

To ensure reliability within resource-constrained environments (e.g., free tier databases), this application includes built-in limits:
- **User Cap**: Maximum of 50 registered accounts.
- **Usage Limit**: 100 job applications per user.
- **API Guardrails**: 403 Forbidden responses with descriptive error messages when limits are reached.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- PostgreSQL Instance
- npm (or your preferred package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd job-application-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/job_tracker"
   AUTH_SECRET="your-32-character-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 📁 Project Architecture

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Secure Backend API Routes
│   ├── components/       # Reusable Atomic UI Components
│   ├── dashboard/        # Authenticated User Interface
│   └── login/            # Authentication Entry Point
├── lib/                  # Shared Utilities & Singleton Instances
├── prisma/               # Schema Definition & Migrations
└── types/                # Global TypeScript Definitions
```

---

## 🛡️ Security Best Practices

- **Strict User Isolation**: Users can only access, modify, or delete their own data via middleware and server-side checks.
- **CSRF Protection**: Native NextAuth protection against Cross-Site Request Forgery.
- **Password Safety**: High-entropy salt rounds used for all stored passwords.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for a better job search experience.*
