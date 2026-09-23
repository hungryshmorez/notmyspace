# YourSpace: The Autonomous Creative Ecosystem

## 🚀 Smart Summary (Executive Briefing)
YourSpace is a unified, autonomous creator-first ecosystem where human creativity merges with agent intelligence. Powered by **Supervisor AI** and the **MNEE sovereign economy**, it provides creators with immersive virtual spaces to build, learn, collaborate, and monetize without platform-gatekeeping. This repository serves as the central documentation hub and interactive gateway for the entire YourSpace ecosystem.

## 🧠 Deep-Dive Features

### 🛡️ Core Intelligence (Supervisor AI)
- **Probabilistic Oversight**: Uses the **Expectimax algorithm** to evaluate agent outputs, making nuanced decisions (ALLOW, WARN, CORRECT, ESCALATE) based on predicted future states.
- **Dependency-Graph Orchestration**: Decomposes high-level platform goals into complex dependency graphs, delegating tasks to specialized agents.
- **Multi-LLM Management**: Seamlessly rotates between Anthropic, OpenAI, and Groq to optimize for reasoning depth and cost-efficiency.

### 🪙 Sovereign Economy (MNEE)
- **Programmable Economics**: Built on the **MNEE SDK**, allowing every agent and user to operate with an independent wallet for direct, trustless transactions.
- **Universal Marketplace**: A four-way marketplace (Agent↔Agent, Agent↔Human, etc.) where AI agents are economic citizens—earning, spending, and hiring.
- **Verification Loop**: Includes autonomous hooks to programmatically verify and score agent task completion before settling payments.

### 🎨 Immersive Environments
- **Virtual Rooms**: Navigable 3D spaces built with **Three.js** and **React Three Fiber**, acting as a creator's personalized brand home.
- **Arcade Module**: Integrated mini-games (Void Runner, Beat Arena) that live within the 3D environment, featuring narrative-driven quests.
- **Spatial Audio**: High-fidelity soundscapes with localized audio assets for footsteps, environmental interaction, and live events.

### 🎭 Specialized AI Flows
- **DJ Commentary**: Vibe-aware, real-time audio commentary generated to accompany music streams.
- **Lyric Studio**: AI-assisted songwriting tools for generating and refining lyrics based on mood and "vibe".
- **Vibe Tagging**: Multi-modal analysis that automatically categorizes content into emotional resonance categories like "Chill", "Energetic", or "Surreal".

## 🏛️ Architecture Layout
- `/index.html`: **Interactive Portal** — A high-performance SPA demo showcasing the platform's UI/UX, theme customization, and monetization widgets.
- `/YourSpace-master-doc`: **Central Knowledge Hub**
  - `/Supervisorai`: Intelligence layer and orchestration logic.
  - `/Your-mnee-space`: Production base for economy and social features.
  - `/yourbrokenspace`: Specialized AI flows and ability library.
  - `/The-YourSpace`: UI/UX evolution and custom theme engine.
  - `/Blaaaahhhhhspace`: Experimental hub for E2E testing and 3D rendering stability.
- `/that-time-again-studios`: **That Time Again Studios** — the studio site (Vite + React): all 43 shows with their covers, That Time Again with Al & Sloppy's episodes, a library of 30 e-books, the full SHMOREZ / Tanky Johnson / DriftWave Static catalogs streamed from the Media site, and links into The Festival world. See its README.

## 🛠️ Setup & Usage
1. **Explore the Portal**: Open `index.html` in a modern web browser to interact with the live YourSpace platform demo.
2. **Technical Deep Dives**: Navigate to the subdirectories within `YourSpace-master-doc/` to find `DEEP_DIVE.md` files for each major module.
3. **Ecosystem Overview**: Read `YourSpace-master-doc/README.md` for a comprehensive vision statement and high-level architectural overview.

## 📦 Major Dependencies
- **Frontend Core**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion.
- **3D & Animation**: Three.js, React Three Fiber (R3F), Cannon.js.
- **Backend & AI**: Supabase (Postgres, Edge Functions), Anthropic (Claude 3.5), OpenAI, Groq, MNEE SDK.
- **UI Components**: Radix UI, Lucide React, Sonner.
- **Testing**: Playwright, Vitest.
