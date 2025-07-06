
````markdown
# 📃 Portfolio

Welcome to my dynamic, full-stack portfolio application! 🚀  
This portfolio showcases my journey as a **Full-Stack Developer & AI Enthusiast**, built with modern technologies, a live Supabase backend, and a secure admin dashboard.

---

## 🌟 Highlights

| Feature           | Description                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Live Content      | All portfolio data fetched in real-time from Supabase (projects, experience, blog, testimonials, etc.) |
| Modern Tech Stack | Next.js, React, Tailwind CSS, Framer Motion, Supabase                                                   |
| Admin Dashboard   | Secure, password-protected, rate-limited, and session-managed                                           |
| Smooth UX         | Animated transitions and interactive components                                                          |
| SEO & Analytics   | Open Graph tags, structured data, and live portfolio stats                                              |
| Modular & Scalable| Easy to maintain and extend sections like Projects, Blog, Experience, Testimonials, etc.                |

---

## 🔐 Authentication System

| Feature                      | Description                               |
| --------------------------- | ----------------------------------------- |
| JWT-based Authentication   | Secure HTTP-only cookies                  |
| Server-side Password Check | Via API routes                            |
| Automatic Session Expiry   | Session validation                        |
| Login Attempt Limiting     | Protects against brute force attacks      |

![Enhanced Admin Login](https://github.com/user-attachments/assets/a4a8c9ad-489c-41c0-a26a-873008878bc2)

---

## 📊 Application Flow

```mermaid
graph TD
  A[Visitor lands on Home] --> B{Chooses Section}
  B -- Projects --> C[ProjectsGrid fetches from Supabase]
  B -- Experience --> D[ExperienceTimeline fetches from Supabase]
  B -- Blog --> E[BlogGrid fetches posts]
  B -- Contact --> F[ContactForm (rate-limited)]
  B -- Admin (Protected) --> G[AdminLogin & Dashboard]
  G --> H[Manage Projects, Connections, Feedback, Stats]
````

---

## 🔄 Data Flow & Admin Overview

```mermaid
flowchart LR
  UserInput -- Contact/Feedback --> SupabaseDB
  AdminPanel -- Auth + CRUD --> SupabaseDB
  Visitor -- View --> FrontendApp
  FrontendApp -- Fetch Live Data --> SupabaseDB
  SupabaseDB -- Realtime Sync --> FrontendApp
```

---

## ✨ Dashboard Animations

| Feature                 | Description          |
| ----------------------- | -------------------- |
| Smooth Tab Transitions  | With AnimatePresence |
| Staggered Loading       | Better UX            |
| Hover Effects           | Micro-interactions   |
| Real-time Session Timer | Animated badges      |

---

## 🛠 New Data Management Features

### 📁 Projects Management

| Feature                 | Description                 |
| ----------------------- | --------------------------- |
| Complete CRUD Interface | Manage portfolio projects   |
| Real-time Search        | Quickly find projects       |
| Status Management       | Active, Draft, Archived     |
| Featured Project Toggle | Highlight selected projects |
| Direct Links            | Demo / GitHub               |
| Animated Rows           | Staggered entry             |

### 💼 Experience Management

| Feature             | Description                    |
| ------------------- | ------------------------------ |
| Full Editing        | Add & update experiences       |
| Date Range          | "Current position" toggle      |
| Employment Type     | Full-time, Part-time, Contract |
| Tech Stack Tracking | Track used technologies        |
| Location Tracking   | Remote / On-site               |

---

## 📊 Enhanced Stats Dashboard

| Feature               | Description                          |
| --------------------- | ------------------------------------ |
| Animated Loading      | Better UX                            |
| Placeholder Analytics | Future-proof for advanced dashboards |
| Engaging Animations   | While loading data                   |

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Harshit16g/Portfolio.git
cd Portfolio
npm install
```

### 2️⃣ Configure Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

---

## 🔐 Admin Dashboard

| Feature  | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| Access   | `/admin`                                                          |
| Login    | Password-protected (configured in backend API)                    |
| Manage   | CRUD for projects, testimonials, stats, feedback, and connections |
| Security | Rate-limited, session-managed                                     |

---

## 🧩 Key Features

| Feature                          | Description               |
| -------------------------------- | ------------------------- |
| Dynamic Hero & Featured Projects | Engaging landing section  |
| Live Projects List               | With tags & links         |
| Timeline of Experience           | Visual career progression |
| Certifications & Education       | Showcase qualifications   |
| Testimonials                     | With live admin approval  |
| Dynamic Blog Posts               | Regular updates           |
| Realtime Portfolio Stats         | Live analytics            |
| Rate-limited Contact Form        | Spam protection           |

---

## ⚙️ Tech Stack

| Category | Technologies                                                          |
| -------- | --------------------------------------------------------------------- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| Backend  | Supabase (Postgres + Auth + Realtime)                                 |
| Admin    | Custom Next.js admin panel with secure APIs & session handling        |

---

## 📂 Directory Overview

| Directory           | Description            |
| ------------------- | ---------------------- |
| app/                | Main application       |
| app/admin/          | Admin dashboard        |
| app/projects/       | Projects section       |
| app/experience/     | Experience section     |
| app/blog/           | Blog section           |
| app/contact/        | Contact section        |
| app/stats/          | Stats section          |
| app/testimonials/   | Testimonials section   |
| app/about/          | About section          |
| app/certifications/ | Certifications section |
| app/education/      | Education section      |
| app/toolbox/        | Toolbox section        |
| components/         | Reusable UI components |
| hooks/              | Custom React hooks     |
| lib/                | Utility functions      |

---

## 🤝 Contributing

Pull requests and discussions are welcome!
For major changes, please open an issue first to discuss your idea.

---

## 📬 Contact

| Method   | Details                                                                   |
| -------- | ------------------------------------------------------------------------- |
| Email    | [harshitlodhi220593@acropolis.in](mailto:harshitlodhi220593@acropolis.in) |
| GitHub   | [Harshit16g](https://github.com/Harshit16g)                               |
| LinkedIn | [Harshit Lodhi](https://linkedin.com/in/...)                              |

⭐ Like this project? Star it!

Crafted with Next.js, Supabase, and ☕ by **Harshit Lodhi**

