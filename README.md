<p align="center">
  <img src="public/logo.png" alt="PC Anatomy logo" width="96" height="96" />
</p>

<h1 align="center">PC Anatomy (traducción al español)</h1>

<p align="center">
  <strong>Versión en español de PC Anatomy</strong> — atlas 3D interactivo del hardware del PC, adaptada para uso educativo.
</p>

## 📌 Origen del proyecto

Este repositorio es una **traducción al español** del proyecto original creado por **brickshow**.

| | |
| --- | --- |
| **Proyecto original** | [https://github.com/brickshow/pc-anatomy](https://github.com/brickshow/pc-anatomy) |
| **Autor original** | [brickshow](https://github.com/brickshow) |
| **Esta traducción** | [https://github.com/AntonioVR92/PC_Anatomy_Traducido](https://github.com/AntonioVR92/PC_Anatomy_Traducido) |
| **Licencia** | MIT (se mantiene el aviso de copyright del original) |

El código, los modelos 3D y la idea del proyecto pertenecen a sus autores originales. Aquí solo se ha traducido la interfaz y el contenido visible para facilitar su uso en clase.

---

<p align="center">
  <a href="https://github.com/brickshow/pc-anatomy"><img src="https://img.shields.io/badge/Original-brickshow%2Fpc--anatomy-4d8dff?style=for-the-badge&logo=github&logoColor=white" alt="Original repo" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" /></a>
  <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-r185-7a5cff?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" /></a>
</p>

---

> **The Human Anatomy Atlas — for computers.** Most people use a computer every day but have
> never seen inside one. PC Anatomy fixes that: it is a fully interactive 3D journey
> through every major component, explained in plain language and rendered in your browser.

---

## 🚀 Live Demo

> Demo original del autor: **https://pc-anatomy.brickshow.site**
>
> Repo original: **https://github.com/brickshow/pc-anatomy**

- Landing page: `/`
- Explorador 3D: `/explore`
- Guía de montaje: `/assembly`
- Páginas de componentes: `/components/cpu`, `/components/ram`, etc.

---

## ✨ What is PC Anatomy?

PC Anatomy is an **interactive 3D educational platform** that teaches computer hardware by letting you *touch it*. Instead of static diagrams and dry tables, you get:

- 🧠 **Life-sized 3D models** of CPUs, GPUs, motherboards, RAM, storage, PSUs and more.
- 🔬 **Anatomical zoom** — peel a CPU down to its silicon die, or spin a motherboard like it's on a turntable.
- 🖱️ **Click-to-learn hotspots** on every component, with clear explanations of *what it does* and *why it matters*.
- 📚 **Crawlable educational articles** on every component page — written answers, key specs, FAQs, and related-component links that work even without WebGL.
- 💬 **A built-in AI assistant** that answers your hardware questions in natural language.

All of it is **100% open source** and free to use, fork, and learn from.

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🖥️ **Interactive 3D Explorer** | A full-screen WebGL viewer with orbit, zoom, and hotspot navigation — built on React Three Fiber. |
| 🧩 **16+ Components** | PC Case, CPU + water block, Motherboard, RAM, GPU, M.2 SSD, SATA SSD, HDD, PSU, CPU Cooler, Case Fans, Keyboard, Mouse, Monitor, UPS, and AVR. |
| 🔬 **CPU Layer Explosion** | Dissect the CPU layer by layer — heat spreader, TIM, die, substrate, and IHS — with lift animation. |
| 🔍 **SEO + AI Answer Engines** | Every component page is a full educational article with FAQ structured data, breadcrumbs, canonicals, sitemap, and robots — readable by Google, Bing, ChatGPT, Perplexity, and Gemini. |
| 🛠️ **PC Assembly Guide** | A step-by-step `/assembly` guide connecting every step to the relevant component page and 3D model. |
| 💬 **AI Assistant** | A context-aware chat guide (OpenRouter) that answers hardware questions with Markdown tables, specs and friendly explanations. |
| 🎬 **Landing Page** | A cinematic hero with a shader-based starfield, animated gradient headline, and glassmorphism — built with Framer Motion. |
| ⚡ **Modern Stack** | Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Three.js on WebGL. |

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **3D Rendering** | [Three.js](https://threejs.org/) + [React Three Fiber 9](https://docs.pmnd.rs/react-three-fiber) |
| **3D Helpers** | [@react-three/drei](https://docs.pmnd.rs/drei) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://motion.dev/) + [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) |
| **State** | [Zustand](https://zustand.docs.pmnd.rs/) (persisted explorer state) |
| **AI Chat** | [OpenRouter](https://openrouter.ai/) |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| **SEO** | App Router metadata, `sitemap.ts`, `robots.ts`, Schema.org JSON-LD (no extra dependencies) |

---

## 📦 Project Structure

A clean, colocated layout under `src/`:

```
src/
├── app/
│   ├── api/
│   │   └── chat/          # OpenRouter-backed AI assistant route
│   ├── assembly/          # Step-by-step PC assembly guide
│   ├── components/
│   │   ├── [slug]/        # Per-component SEO pages (/components/[slug])
│   │   └── storage/       # Computer storage topic page
│   ├── explore/           # Full-screen 3D explorer page
│   ├── error.tsx          # Friendly error boundary (no stack traces)
│   ├── globals.css        # Tailwind + custom theme & utilities
│   ├── layout.tsx         # Global metadata, JSON-LD, fonts
│   ├── loading.tsx        # Global loading spinner
│   ├── not-found.tsx      # Custom 404 page
│   ├── page.tsx           # Landing page
│   ├── robots.ts          # robots.txt
│   └── sitemap.ts         # sitemap.xml
├── components/
│   ├── chat/              # AI assistant chat UI
│   ├── detail/            # Component detail panel (specs, hotspots)
│   ├── explorer/          # 3D explorer layout & viewer
│   ├── landing/           # Hero, info sections, footer
│   ├── seo/               # JSON-LD renderer, breadcrumbs, article
│   └── viewer/            # Lazy-loaded 3D model viewer sections
├── data/
│   ├── seo.ts             # Per-component educational content (FAQ, etc.)
│   └── components.ts      # Component metadata & 3D model paths
├── lib/
│   ├── site.ts            # Site identity & absolute URL helpers
│   ├── store.ts           # Explorer state (selected component, etc.)
│   └── support.ts         # Support links & donate QR config
└── styles/
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (or 22+ for some features)
- A browser with **WebGL** support
- An [OpenRouter](https://openrouter.ai/) API key *(optional, for the AI assistant)*

### Setup

```bash
git clone https://github.com/AntonioVR92/PC_Anatomy_Traducido.git
cd PC_Anatomy_Traducido
npm install
cp .env.example .env.local  # optional
```

### Run

```bash
npm run dev        # start dev server at http://localhost:3000
```

### Build

```bash
npm run build      # production build
npm run start      # serve the production build
```

---

## 🌍 Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No* | Production URL for canonical URLs, OG tags, `sitemap.xml`, `robots.txt`. Defaults to `https://pc-anatomy.example.com` in development. *Required for production SEO.* |
| `OPENROUTER_API_KEY` | No | Enables the AI assistant. Without it, the chat explains it is not configured. |
| `OPENROUTER_MODEL` | No | Overrides the default chat model (e.g. `google/gemma-4-26b-a4b-it:free`). |
| `NEXT_PUBLIC_DONATE_QR_URL` | No | Path to a donation QR code image shown in the support panel. |

> ⚠️ **Never commit real secrets.** `.env.local` is git-ignored. The deployed app reads these from the hosting platform's environment.

---

## 🔍 SEO & AI Answer Engines

PC Anatomy is built to be found — by humans *and* by AI answer engines:

- **Server-rendered educational articles** on every component page, written in a "direct answer first" style that AI assistants extract from.
- **Schema.org JSON-LD**: `WebSite`, `Organization`, `EducationalApplication`, `TechArticle`, `FAQPage`, `BreadcrumbList`.
- **Canonical URLs, Open Graph, Twitter cards** on every page, with a global 1200×630 OG image.
- **`sitemap.xml`** covering every route and **`robots.txt`** with the sitemap reference.
- **No index/no follow hygiene** on error pages and the `/api` surface.
- **Semantic internal linking** between component pages (related parts), the assembly guide, and the storage topic hub.

---

## 🛡️ Security

- Client components never log API keys; the `OPENROUTER_API_KEY` lives server-side only.
- The API route strips instructions and keeps prompts contextual, without echoing secrets.
- No tracking scripts, no analytics on by default, no external requests except the 3D models and fonts you opt into.

---

## 🤝 Contributing

PC Anatomy is a community project — contributions are welcome! Help with 3D models, hotmaps, articles, translations, or code:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-idea`
5. Open a pull request.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Original work © brickshow — [https://github.com/brickshow/pc-anatomy](https://github.com/brickshow/pc-anatomy).  
This repository is a Spanish translation / educational fork of that project.

---

## 🔖 Topics

`computer-anatomy` · `computer-hardware` · `pc-assembly` · `threejs` · `react` · `nextjs` · `webgl` · `education` · `3d` · `seo`
