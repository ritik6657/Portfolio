# 📃 Portfolio

Welcome to my dynamic, full-stack portfolio application! 🚀 This portfolio showcases my journey as a Full-Stack Developer & AI Enthusiast, built with modern technologies, a live Supabase backend, and a secure admin dashboard.

---

## 🌟 Highlights
   Feature | Description |
 |---------|-------------|
 | Live Content | All portfolio data fetched in real-time from Supabase (projects, experience, blog, testimonials, etc.) |
 | Modern Tech Stack | Next.js, React, Tailwind CSS, Framer Motion, Supabase |
 | Admin Dashboard | Secure, password-protected, rate-limited, and session-managed |
 | Smooth UX | Animated transitions and interactive components |
 | SEO & Analytics | Open Graph tags, structured data, and live portfolio stats |
 | Modular & Scalable | Each section (Projects, Blog, Experience, Testimonials, etc.) is easy to maintain and extend |

---

## 🔐 Authentication System
 | Feature | Description |
 |---------|-------------|
 | JWT-based Authentication | Secure HTTP-only cookies |
 | Server-side Password Validation | Via API routes |
 | Automatic Session Expiration | Session validation |
 | Enhanced Login Attempt Limiting | Proper error handling |

![Enhanced Admin Login](https://github.com/user-attachments/assets/a4a8c9ad-489c-41c0-a26a-873008878bc2)

---

## 📊 Application Flow


graph TD
  A[Visitor lands on Home] --> B{Chooses Section}
  B -- Projects --> C[ProjectsGrid fetches from Supabase]
  B -- Experience --> D[ExperienceTimeline fetches from Supabase]
  B -- Blog --> E[BlogGrid fetches posts]
  B -- Contact --> F[ContactForm (rate-limited)]
  B -- Admin (Protected) --> G[AdminLogin & Dashboard]
  G --> H[Manage Projects, Connections, Feedback, Stats]
🔄 Data Flow & Admin Overview
Copy
flowchart LR
  UserInput -- Contact/Feedback --> SupabaseDB
  AdminPanel -- Auth + CRUD --> SupabaseDB
  Visitor -- View --> FrontendApp
  FrontendApp -- Fetch Live Data --> SupabaseDB
  SupabaseDB -- Realtime Sync --> FrontendApp
Dashboard Animations

Feature	Description
Smooth Tab Transitions	With AnimatePresence
Staggered Loading Animations	Better UX
Hover Effects	Micro-interactions
Real-time Session Timer	Animated badges
📊 New Data Management Features
Projects Management Tab

Feature	Description
Complete CRUD Interface	For portfolio projects
Real-time Search and Filtering	Quick data access
Status Management	Active, Draft, Archived
Featured Project Toggle	Highlight key projects
Direct Links	To demo/GitHub
Animated Table Rows	Staggered entry
Experience Management Tab
Feature	Description
Full Experience Editing	Capabilities
Date Range Management	With "current position" toggle
Employment Type Categorization	Full/Part-time, Contract
Technology Stack Management	Track technologies used
Location Tracking	Remote/On-site
Enhanced Stats Dashboard

Feature	Description
Animated Loading States	Engaging UX
Placeholder for Advanced Analytics	Future-proofing
Engaging Animations	While data loads
🚀 Getting Started
1️⃣ Clone & Install
Copy
git clone https://github.com/Harshit16g/Portfolio.git
cd Portfolio
npm install
2️⃣ Configure Environment Variables

Create .env.local:

Copy
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
3️⃣ Start Development Server
Copy
npm run dev
🔐 Admin Dashboard
Feature	Description
Access	/admin
Login	Password protected (configured in backend API)
Features	CRUD for projects, testimonials, stats, feedback, and connections — all rate-limited and secured
🧩 Key Features
Feature	Description
Dynamic Hero & Featured Projects	Engaging landing section
Live Projects List	With tags & links
Timeline of Professional Experience	Visual career progression
Certifications & Education Modules	Showcase qualifications
Testimonials	With live admin approval
Dynamic Blog Posts	Regular updates
Realtime Portfolio Stats	Live analytics
Rate-limited Contact Form	Prevent spam
🛠 Tech Stack
Category	Technologies
Frontend	Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
Backend	Supabase (Postgres + Auth + Realtime)
Admin	Custom Next.js admin panel with secure APIs & session handling
📂 Directory Overview
Directory	Description
app/	Main application
app/admin/	Admin dashboard
app/projects/	Projects section
app/experience/	Experience section
app/blog/	Blog section
app/contact/	Contact section
app/stats/	Stats section
app/testimonials/	Testimonials section
app/about/	About section
app/certifications/	Certifications section
app/education/	Education section
app/toolbox/	Toolbox section
components/	Reusable components
hooks/	Custom hooks
lib/	Utility functions
🤝 Contributing

Pull requests and discussions are welcome! For major changes, please open an issue first to discuss your idea.

📬 Contact
Method	Details
Email	harshitlodhi220593@acropolis.in
GitHub	Harshit16g
LinkedIn	Harshit Lodhi
⭐ Like this project? Star it!

Crafted with Next.js, Supabase, and ☕ by Harshit Lodhi

