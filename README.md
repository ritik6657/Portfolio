

#📃 Dynamic Portfolio

   

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

🖼️ Previews

![Preview Home](https://harshitlodhisportfolio.vercel.app/home) 

---

📊 Application Flow

graph TD
  A[Visitor lands on Home] --> B{Chooses Section}
  B -- Projects --> C[ProjectsGrid fetches from Supabase]
  B -- Experience --> D[ExperienceTimeline fetches from Supabase]
  B -- Blog --> E[BlogGrid fetches posts]
  B -- Contact --> F[ContactForm (rate-limited)]
  B -- Admin (Protected) --> G[AdminLogin & Dashboard]
  G --> H[Manage Projects, Connections, Feedback, Stats]


---

🔄 Data Flow & Admin Overview

flowchart LR
  UserInput -- Contact/Feedback --> SupabaseDB
  AdminPanel -- Auth + CRUD --> SupabaseDB
  Visitor -- View --> FrontendApp
  FrontendApp -- Fetch Live Data --> SupabaseDB
  SupabaseDB -- Realtime Sync --> FrontendApp

(These diagrams are rendered natively on GitHub with Mermaid)


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

