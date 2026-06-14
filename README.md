<div align="center">

# 🛡️ Srachet Rai — Portfolio

### A neo-brutalist developer portfolio for a Platform Engineer & cybersecurity professional

*Penetration testing · Vulnerability assessment · Data platform engineering · Creative design*

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

[**Report Bug**](https://github.com/Cryio/portfolio/issues) · [**Request Feature**](https://github.com/Cryio/portfolio/issues)

</div>

---

## ✨ Overview

A fast, animated portfolio built with the **Next.js App Router**, styled in a bold **neo-brutalist** aesthetic. It statically renders for performance and ships an interactive terminal, an animated skills radar, a Markdown-powered blog, and a live GitHub projects feed.

## 🚀 Features

| | Section | Description |
|---|---|---|
| 🏠 | **Home** | Animated hero, highlights, and section previews |
| 👤 | **About** | Bio, education, and an interactive skills radar |
| 🧰 | **Technologies** | Categorized toolkit with per-tool logos and descriptions |
| 📂 | **Projects** | Showcase plus a live GitHub projects feed |
| 💼 | **Roles** | Professional experience timeline |
| 🎓 | **Certifications** | Credential paths with a built-in certificate viewer |
| ✍️ | **Blog** | Markdown posts from `content/blogs`, rendered with `remark` |
| 💻 | **Terminal** | Interactive CLI — explore the portfolio by command |

Plus: a gooey custom cursor, particle/animated backgrounds, magnetic elements, light/dark theming, and full SEO metadata + sitemap.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS 4 · Radix UI · `class-variance-authority`
- **Animation:** Framer Motion
- **Data viz:** Recharts · Chart.js
- **Content:** Markdown via `gray-matter` + `remark`
- **Deploy:** Netlify (`@netlify/plugin-nextjs`)

## 📦 Getting Started

> **Prerequisites:** [Node.js](https://nodejs.org) 18+ and npm

```sh
# 1. Clone the repository
git clone https://github.com/Cryio/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`next lint`) |

## 📁 Project Structure

```
portfolio/
├── content/blogs/        # Markdown blog posts
├── public/               # Static assets (certificates, projects, icons)
└── src/
    ├── app/              # App Router routes
    │   ├── about/  projects/  roles/  certifications/
    │   ├── blogs/  blogs/[slug]/  terminal/
    │   ├── layout.tsx  page.tsx  sitemap.ts  globals.css
    ├── components/       # UI + feature components (Timeline, SkillRadar, Terminal…)
    ├── config/           # SEO config + feature flags
    ├── data/             # portfolio.ts (content) + technologies.ts (logos)
    ├── hooks/  lib/  types/
```

## ⚙️ Configuration

- **Content** lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) — name, experience, projects, certifications, and contact details.
- **Tech logos** are mapped in [`src/data/technologies.ts`](src/data/technologies.ts).
- **SEO / metadata** (Open Graph, Twitter, JSON-LD) is centralized in [`src/config/seo.ts`](src/config/seo.ts).
- **Blog posts** are Markdown files in [`content/blogs/`](content/blogs/) with front-matter.

## 📫 Contact

**Srachet Rai** — Platform Engineer & Cybersecurity Professional

[![GitHub](https://img.shields.io/badge/GitHub-Cryio-181717?logo=github&logoColor=white)](https://github.com/Cryio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-srachetrai-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/srachetrai)
[![Email](https://img.shields.io/badge/Email-srachetrai@gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:srachetrai@gmail.com)

---

<div align="center">
<sub>Built with ☕ and a healthy paranoia about security.</sub>
</div>
