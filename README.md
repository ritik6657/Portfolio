###📃 Portfolio

   

Welcome to my dynamic, full-stack portfolio application! 🚀
Showcasing my journey as a Full-Stack Developer & AI Enthusiast, built with modern technologies, live Supabase backend, and a secure admin dashboard.


---

#🌟 Highlights

✅ Live Content: All portfolio data fetched in real-time from Supabase (projects, experience, blog, testimonials, etc.)
✅ Modern Tech Stack: Next.js, React, Tailwind CSS, Framer Motion, Supabase
✅ Admin Dashboard: Secure, password-protected, rate-limited, and session-managed
✅ Smooth UX: Animated transitions and interactive components
✅ SEO & Analytics: Open Graph tags, structured data, and live portfolio stats
✅ Modular & Scalable: Each section (Projects, Blog, Experience, Testimonials, etc.) is easy to maintain and extend


---
## Authentication System
- ✅ JWT-based authentication with secure HTTP-only cookies
- ✅ Server-side password validation via API routes
- ✅ Automatic session expiration and validation
- ✅ Enhanced login attempt limiting with proper error handling

![Enhanced Admin Login](https://github.com/user-attachments/assets/a4a8c9ad-489c-41c0-a26a-873008878bc2)

##📊 Application Flow

graph TD
  A[Visitor lands on Home] --> B{Chooses Section}
  B -- Projects --> C[ProjectsGrid fetches from Supabase]
  B -- Experience --> D[ExperienceTimeline fetches from Supabase]
  B -- Blog --> E[BlogGrid fetches posts]
  B -- Contact --> F[ContactForm (rate-limited)]
  B -- Admin (Protected) --> G[AdminLogin & Dashboard]
  G --> H[Manage Projects, Connections, Feedback, Stats]

🔄 Data Flow & Admin Overview

flowchart LR
  UserInput -- Contact/Feedback --> SupabaseDB
  AdminPanel -- Auth + CRUD --> SupabaseDB
  Visitor -- View --> FrontendApp
  FrontendApp -- Fetch Live Data --> SupabaseDB
  SupabaseDB -- Realtime Sync --> FrontendApp

---
## Dashboard Animations
![Admin Dashboard](https://github.com/user-attachments/assets/f5c2ffe0-dde8-4853-90ff-c95328d9c3cf)

- 🎬 Smooth tab transitions with AnimatePresence
- 💫 Staggered loading animations for better UX
- 🎯 Hover effects and micro-interactions
- ⏱️ Real-time session timer with animated badges

## 📊 New Data Management Features

### Projects Management Tab
![Projects Management](https://github.com/user-attachments/assets/0c54b338-00c1-4164-a930-b19c1362c9c4)

**Features Added:**
- ✅ Complete CRUD interface for portfolio projects
- 🔍 Real-time search and filtering
- 🏷️ Status management (Active, Draft, Archived)
- ⭐ Featured project toggle
- 🔗 Direct links to demo/GitHub
- 🎨 Animated table rows with staggered entry

### Experience Management Tab
- ✅ Full experience editing capabilities
- 📅 Date range management with "current position" toggle
- 🏢 Employment type categorization
- 🔧 Technology stack management
- 📍 Location tracking

### Enhanced Stats Dashboard
![Enhanced Stats](https://github.com/user-attachments/assets/cb6b11e8-7c66-43d4-8c42-3db63a291571)

- 🎯 Animated loading states
- 📈 Placeholder for advanced analytics
- 🎪 Engaging animations while data loads

---
🚀 Getting Started

1️⃣ Clone & Install

git clone https://github.com/Harshit16g/Portfolio.git
cd Portfolio
npm install

2️⃣ Configure Environment Variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

3️⃣ Start Development Server

npm run dev


---

🔐 Admin Dashboard

Access: /admin

Login: Password protected (configured in backend API)

Features: CRUD for projects, testimonials, stats, feedback, and connections — all rate-limited and secured



---

🧩 Key Features

Dynamic hero & featured projects

Live projects list with tags & links

Timeline of professional experience

Certifications & education modules

Testimonials with live admin approval

Dynamic blog posts

Realtime portfolio stats

Rate-limited contact form



---

🛠 Tech Stack

Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
Backend: Supabase (Postgres + Auth + Realtime)
Admin: Custom Next.js admin panel with secure APIs & session handling


---

📂 Directory Overview

app/
  ├── admin/
  ├── projects/
  ├── experience/
  ├── blog/
  ├── contact/
  ├── stats/
  ├── testimonials/
  ├── about/
  ├── certifications/
  ├── education/
  ├── toolbox/
components/
hooks/
lib/


---

🤝 Contributing

Pull requests and discussions welcome!
For big changes, please open an issue first to discuss your idea.


---

📬 Contact

📧 Email: harshitlodhi220593@acropolis.in

🌐 GitHub

💼 LinkedIn



---

⭐ Like this project? Star it!

> Crafted with Next.js, Supabase, and ☕ by Harshit Lodhi




---

If you'd like, I can: ✅ Export sample preview images to use in the repo
✅ Create a docs/ folder to host them
✅ Write a cleaner One-liner project description for GitHub bio

Just say “yes”! 🚀

