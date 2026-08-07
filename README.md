<p align="center">
  <img src="public/logo.png" alt="Computer Anatomy" width="96" height="96" />
</p>

<h1 align="center">Computer Anatomy</h1>

<p align="center">
  <strong>An open-source, interactive 3D atlas of the computer on your desk.</strong><br />
  Peel apart the CPU, spin the GPU, trace the motherboard — and actually understand
  how your machine works.
</p>

<p align="center">
  <a href="https://github.com/"><img src="https://img.shields.io/badge/Open_Source-100%25-4d8dff?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="Open Source" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" /></a>
  <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-r185-7a5cff?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" /></a>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-087ea4?style=for-the-badge&logo=react&logoColor=white" alt="React 19" /></a>
  <a href="https://motion.dev/"><img src="https://img.shields.io/badge/Framer_Motion-13-8B5CF6?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/Zustand-Simple_State-1E3A8A?style=for-the-badge" alt="Zustand" /></a>
</p>

---

> **The Human Anatomy Atlas — for computers.** Most people use a computer every day but have
> never seen inside one. Computer Anatomy fixes that: it is a fully interactive 3D journey
> through every major component, explained in plain language and rendered in your browser.

---

## ✨ What is Computer Anatomy?

Computer Anatomy is an **interactive 3D educational platform** that teaches computer hardware by letting you *touch it*. Instead of static diagrams and dry tables, you get:

- 🧠 **Life-sized 3D models** of CPUs, GPUs, motherboards, RAM, storage, PSUs and more.
- 🔬 **Anatomical zoom** — peel a CPU down to its silicon die, or spin a motherboard like it's on a turntable.
- 🖱️ **Click-to-learn hotspots** on every component, with clear explanations of *what it does* and *why it matters*.
- 💬 **A built-in AI assistant** that answers your hardware questions in natural language.
- 🧭 **Structured learning paths** that take you from first boot to full fluency.

All of it is **100% open source** and free to use, fork, and learn from.

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🖥️ **Interactive 3D Explorer** | A full-screen WebGL viewer with orbit, zoom, and hotspot navigation — built on React Three Fiber. |
| 🧩 **16+ Components** | System Unit, CPU + water block, Motherboard, RAM, GPU, M.2 SSD, SATA SSD, HDD, PSU, CPU Cooler, Case Fans, Keyboard, Mouse, Monitor, UPS, and AVR. |
| 🔬 **CPU Layer Explosion** | Dissect the CPU layer by layer — heat spreader, TIM, die, substrate, and IHS — with lift animation. |
| 💬 **AI Assistant** | A context-aware chat guide (OpenRouter) that answers hardware questions with Markdown tables, specs and friendly explanations. |
| 🎬 **Landing Page** | A cinematic hero with a shader-based starfield, animated gradient headline, and glassmorphism — built with Framer Motion. |
| ⚡ **Modern Stack** | Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Three.js on webGL. |

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

---

## 📦 Project Structure

A clean, colocated layout under `src/`:

```
src/
├── app/
│   ├── api/
│   │   └── chat/          # OpenRouter-backed AI assistant route
│   ├── components/        # Per-component 3D pages (/components/[slug])
│   ├── explore/           # Full-screen 3D explorer page
│   ├── globals.css        # Tailwind + custom theme & utilities
│   ├── layout.tsx         # Root layout, fonts, SEO metadata
│   └── page.tsx           # Landing page
├── components/
│   ├── landing/           # Marketing page (hero, features, roadmap…)
│   ├── explorer/          # Sidebar · Viewer · Detail panel
│   ├── monitor / mouse / motherboard / systemunit / chat
│   └── icons.tsx          # Central lucide-icon registry
├── data/                  # Component content & CPU layer definitions
├── hooks/                 # Reusable Three.js hooks
├── lib/                   # Components catalog, store, chat models
└── utils/                 # Focus-camera & mesh helpers
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20.9+** (LTS)
- **npm**

### 1. Clone & install

```bash
git clone https://github.com/your-user/computer-anatomy.git
cd computer-anatomy
npm install
```

### 2. Configure the AI assistant (optional)

Copy the example env file and add an [OpenRouter](https://openrouter.ai/keys) key to enable the chat guide:

```bash
cp .env.example .env.local
```

```env
OPENROUTER_API_KEY=your_key_here
# OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free   # optional override
```

> The assistant gracefully falls back through a built-in model list, so the app works even without a key.

### 3. Run the dev server

```bash
npm run dev
```

Open **http://localhost:3000** — the landing page greets you, and **Explore Components** takes you into the 3D viewer.

---

## 🧭 How to use the explorer

1. From the landing page, click **Explore Components**.
2. Use the **left sidebar** to switch between 16+ interactive components.
3. **Drag** to orbit, **scroll** to zoom, and **click a hotspot** to inspect a part in detail.
4. In the **Detail Panel**, read the Overview, Functions, and common Issues for each part.
5. For the CPU, use the **layer slider** to peel it apart anatomically.

---

## 🤝 Contributing

Contributions are what make open source such an amazing ecosystem. To get involved:

1. 🍴 **Fork** the repository.
2. 🧑‍💻 **Create** a feature branch (`git checkout -b feature/amazing-thing`).
3. ✍️ **Commit** your changes (`git commit -m 'Add amazing thing'`).
4. 🚀 **Push** to the branch.
5. 🔁 Open a **Pull Request**.

Good places to start:
- Tag a component that's missing.
- Improve lesson content in `src/data/`.
- Add a new model to `public/models/`.
- Polish the landing page in `src/components/landing/`.

Please follow conventional commit style and run `npm run lint` before pushing.

---

## 🗺️ Roadmap

- [x] Core interactive 3D viewer & hotspots
- [x] CPU layer explosion
- [ ] Full component library for all supported parts
- [ ] Structured guided curriculum & quizzes
- [ ] Classroom / self-hosted deployment guides
- [ ] More localized (i18n) content

---

## 📜 License

Distributed under the **MIT** license. See [`LICENSE`](#) for more information.

---

<p align="center">
  Made with 🖤 for curious minds.<br />
  Star the repo, contribute a model, and help the world understand what's inside the box.
</p>