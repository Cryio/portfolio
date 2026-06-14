<div align="center">

# 🛡️ Srachet Rai — Portfolio

### A neo-brutalist developer portfolio for a cybersecurity enthusiast

*Penetration testing · Vulnerability assessment · Secure coding · Creative design*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000?logo=threedotjs&logoColor=white)](https://threejs.org)

[**Live Demo**](#) · [**Report Bug**](https://github.com/Cryio/portfolio/issues) · [**Request Feature**](https://github.com/Cryio/portfolio/issues)

</div>

---

## ✨ Overview

A fast, animated single-page portfolio built with React + Vite, styled in a bold **neo-brutalist** aesthetic. Beyond the standard sections, it ships with an interactive command-line interface and a small arcade of playable 3D/2D mini-games.

## 🚀 Features

| | Feature | Description |
|---|---|---|
| 🏠 | **Home** | Animated hero, highlights, and section previews |
| 👤 | **About & Experience** | Bio, career timeline, and leadership roles |
| 🧰 | **Skills** | Categorized toolkit with skill → related-project mapping |
| 📂 | **Projects** | Filterable showcase with tech stacks and links |
| 🎓 | **Certifications** | Credential cards with auto-resolved badge images |
| ✍️ | **Blog** | Searchable, category-filtered posts with Markdown rendering |
| 💻 | **Terminal** | Interactive CLI — type `help` to explore the portfolio by command |
| 🎮 | **Games** | Crossy Road (Three.js), Chess, Flappy Bird, Tic-Tac-Toe, Memory Cards |
| 📬 | **Contact** | Validated form (Zod) wired to Web3Forms |

Plus: smooth route transitions (Framer Motion), a custom animated cursor, and dark-mode-aware theming.

## 🛠️ Tech Stack

- **Framework:** React 18 · TypeScript · Vite
- **Styling:** Tailwind CSS · shadcn/ui · Radix UI
- **Animation:** Framer Motion
- **3D / Games:** Three.js · @react-three/fiber · @react-three/drei · chess.js
- **Forms & Validation:** React Hook Form · Zod · Web3Forms
- **Content:** react-markdown
- **Data:** TanStack Query

## 📦 Getting Started

> **Prerequisites:** [Node.js](https://nodejs.org) 18+ and npm

```sh
# 1. Clone the repository
git clone https://github.com/Cryio/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
└── src/
    ├── assets/             # Images, certificates, game assets, documents
    ├── components/
    │   ├── chess/          # Chess game
    │   ├── crossy-road/    # Three.js Crossy Road (components, hooks, stores)
    │   ├── flappy-bird/    # Flappy Bird game
    │   ├── memory-card/    # Memory matching game
    │   ├── tictactoe/      # Tic-Tac-Toe game
    │   ├── layout/         # Navbar, Footer
    │   ├── sections/       # Home page sections
    │   └── ui/             # shadcn/ui primitives + custom cursor
    ├── data/               # Portfolio content (projects, skills, certs, blog)
    ├── hooks/              # Custom React hooks
    ├── lib/                # Utilities (asset loader, helpers)
    └── pages/              # Route pages (About, Skills, Projects, Blog, …)
```

## ⚙️ Configuration

- **Content** lives in [`src/data/`](src/data/) — edit `portfolio.ts`, `certifications.ts`, and `blog.ts` to update text, projects, certs, and posts.
- **Certificate badges** are auto-resolved from [`src/assets/certificates/`](src/assets/certificates/) by name.
- **Contact form** uses a public Web3Forms access key in [`src/pages/Contact.tsx`](src/pages/Contact.tsx); swap it for your own.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an [issue](https://github.com/Cryio/portfolio/issues) or submit a PR.

## 📫 Contact

**Srachet Rai** — Cybersecurity Enthusiast & BTech CSE

[![GitHub](https://img.shields.io/badge/GitHub-Cryio-181717?logo=github&logoColor=white)](https://github.com/Cryio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-srachetrai-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/srachetrai)
[![Email](https://img.shields.io/badge/Email-srachetrai@gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:srachetrai@gmail.com)

---

<div align="center">
<sub>Built with ☕ and a healthy paranoia about security.</sub>
</div>
