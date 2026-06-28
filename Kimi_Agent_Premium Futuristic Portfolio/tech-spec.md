# Tech Spec — Mugilarasu R Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19 | UI framework |
| `react-dom` | ^19 | React DOM renderer |
| `gsap` | ^3.12 | Core animation engine (includes ScrollTrigger, SplitText, DrawSVG, ScrambleTextPlugin) |
| `@react-three/fiber` | ^9 | React renderer for Three.js |
| `@react-three/drei` | ^9 | R3F utilities (helpers, abstractions) |
| `three` | ^0.172 | Core 3D engine |
| `three.meshline` | ^1 | Glowing MeshLine trails for particles |
| `lenis` | ^1 | Smooth scroll with inertia, integrated with GSAP ScrollTrigger |
| `lucide-react` | ^0.468 | Icon set (WhatsApp, Mail, Code2, Brain, etc.) |
| `clsx` | ^2 | Conditional class composition |
| `tailwind-merge` | ^3 | Tailwind class deduplication |

**Fonts** (Google Fonts CDN, loaded via `<link>` in `index.html`):
- Inter: 300, 400, 500, 600, 700
- JetBrains Mono: 400
- Playfair Display: 400 italic

**Dev dependencies** (from Vite init): TypeScript, Vite, Tailwind CSS, PostCSS, autoprefixer.

**GSAP plugins used** (all free, register with `gsap.registerPlugin(...)`):
- `ScrollTrigger` — scroll-driven animations, triggers, pin
- `SplitText` — character/word splitting for heading reveals
- `DrawSVG` — SVG stroke drawing for decorative line reveals
- `ScrambleTextPlugin` — slot-machine digit scramble for stat counters

> **Note on ScrollSmoother**: The design specifies GSAP ScrollSmoother, which is a Club GSAP (paid) plugin. Lenis is used as the equivalent open-source alternative — it provides the same dampened smooth scrolling with GSAP ScrollTrigger integration.

---

## Component Inventory

### Layout (persistent across page)

| Component | Source | Notes |
|-----------|--------|-------|
| `Navbar` | Custom | Fixed header with blur backdrop, scroll-aware style change, mobile hamburger overlay |
| `LoadingScreen` | Custom | Full-viewport overlay with progress bar, orchestrated exit sequence |
| `FloatingWhatsAppButton` | Custom | Fixed-position circle, pulse animation, visible after Hero |
| `BackToTopButton` | Custom | Fixed-position circle, appears after 500px scroll, smooth-scrolls to top |
| `MouseGlowEffect` | Custom | Fixed div with radial gradient, lerped to cursor position via rAF |
| `FluidRibbonBackground` | Custom | Full-viewport SVG with `feTurbulence` + `feColorMatrix`, scroll-driven color morph |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| `GlassmorphismCard` | Custom | Skills (×4), Services (conceptually), Projects (×6), Contact form, Contact info cards (×4) |
| `GradientButton` | Custom | Hero ("Hire Me"), Contact form ("Send Message") |
| `GhostButton` | Custom | Hero ("Download Resume", "Contact Me") |
| `SectionHeader` | Custom | About, Skills, Services, Projects, Stats, Contact |
| `SplitTextHeading` | Custom wrapper around GSAP SplitText | All major section headings ( Hero name, section titles) |

### Section Components (page-specific)

| Component | Notes |
|-----------|-------|
| `HeroSection` | Portrait with rotating ring, name SplitText, typing effect, CTA buttons, social links, floating particles |
| `AboutSection` | Asymmetric 2-column grid, parallax portrait frame with corner accents, bio text, signature |
| `SkillsSection` | 2×2 glassmorphism card grid, skill tags inside each card |
| `ServicesSection` | 8 typographic rows with hover scramble effect and icon reveal |
| `ProjectsSection` | Masonry grid (3-col desktop, featured card spans 2×2), gradient placeholder previews |
| `StatisticsSection` | 4-column stat row with slot-machine counter scramble on scroll |
| `ContactSection` | Two-column layout, glassmorphism form, contact info cards, ParticleOrbitRing background |
| `FooterSection` | Three-column minimal footer |

### Specialized / Complex Components

| Component | Source | Notes |
|-----------|--------|-------|
| `ParticleOrbitRing` | Custom (Three.js) | Contact section background only. R3F canvas with InstancedMesh particles, mouse-attraction physics, MeshLine fading trails. Render loop paused via IntersectionObserver when off-screen. |
| `FloatingParticles` | Custom (CSS + JS) | Hero background only. 30–50 absolutely-positioned divs with randomized CSS animations. Reduced to 20 on mobile. |

### Hooks

| Hook | Purpose |
|------|---------|
| `useLenis` | Initialize Lenis smooth scroll, integrate with GSAP ScrollTrigger ticker |
| `useScrollReveal` | Reusable GSAP ScrollTrigger entrance animation (fade + translateY) |
| `useMouseLerp` | Track mouse position with lerp smoothing via rAF, returns lerped coordinates |
| `useTypingEffect` | Typewriter cycling through array of strings with configurable speed/pause |
| `useInView` | IntersectionObserver wrapper for triggering one-time animations and Three.js render loop |

---

## Animation Implementation

| # | Animation | Library / Approach | Implementation | Complexity |
|---|-----------|-------------------|----------------|------------|
| 1 | **Loading screen exit** | GSAP timeline | Timeline: progress bar fill → logo fade → container translateY(-100%). Remove from DOM on complete. | Low |
| 2 | **Hero entrance sequence** | GSAP timeline | Single timeline orchestrating 7 steps (portrait fade, ring rotation, SplitText name, typing start, tagline, CTAs, socials) with absolute offsets. | Medium |
| 3 | **Name SplitText reveal** | GSAP + SplitText | SplitText splits into chars. Each char: `rotateY(90→0)`, `opacity(0→1)`, stagger 0.03s per char. ScrollTrigger `start: "top 85%"`. | Medium |
| 4 | **Section heading SplitText** | GSAP + SplitText | Same pattern as #3, applied to all section headings. Reusable via `SplitTextHeading` component. | Low |
| 5 | **Role typing effect** | Custom hook | `useTypingEffect` — `setInterval`-based character append/delete cycling 7 roles. Blinking cursor via CSS `steps(1)` animation. | Medium |
| 6 | **Floating particles (Hero)** | CSS keyframes | 30–50 divs with randomized `animation-duration` (10–20s), `animation-delay`, and `translateX` drift. Pure CSS, GPU-composited. | Low |
| 7 | **Profile rotating ring** | CSS keyframes | `conic-gradient` masked as border, `rotate(0→360deg)` infinite linear 8s. | Low |
| 8 | **Fluid ribbon background** | GSAP ScrollTrigger + SVG filter | SVG `feTurbulence` with `baseFrequency` animated 0.02→0.04 across full scroll. `feColorMatrix` hueRotate 0→180. Rect fill interpolates through 5 color stops. Single ScrollTrigger with `scrub: true`. | High |
| 9 | **Particle orbit ring** | Three.js + R3F | InstancedMesh (200 particles) orbiting at radius 8. Mouse attraction (radius 4, strength 0.02) via raycaster. MeshLine fading trails (0.95/frame). Orthographic camera. Paused when off-screen via IntersectionObserver. | High |
| 10 | **Mouse glow effect** | Custom hook + CSS | `useMouseLerp` (factor 0.08) provides smooth coords. Fixed-position div with radial gradient, updated via CSS `transform`. | Low |
| 11 | **Scroll-triggered reveals** | GSAP ScrollTrigger | `useScrollReveal` hook: `opacity(0→1)`, `translateY(40→0)`, duration 0.8s, `power3.out`, stagger 0.12s. Applied to all non-heading section content. | Low |
| 12 | **About portrait parallax** | GSAP ScrollTrigger | `data-speed`-style parallax via ScrollTrigger `scrub`. Element moves at 0.8× scroll speed. | Low |
| 13 | **About horizontal rule draw** | GSAP + DrawSVG | `scaleX(0→1)` from left origin on scroll entry. 0.6s, `power2.out`. | Low |
| 14 | **Corner accent pulse** | CSS keyframes | `opacity(0.5→0.8→0.5)`, 3s infinite. Pure CSS. | Low |
| 15 | **Skill tag stagger** | GSAP ScrollTrigger | Tags within each card stagger in at 0.05s per tag on card scroll entry. | Low |
| 16 | **Service row hover scramble** | GSAP + ScrambleTextPlugin | On mouseenter: text scrambles through random chars for 0.4s then resolves. Desktop only. | Medium |
| 17 | **Service row hover shift** | CSS transitions | `translateX(0→10px)`, color change, border-color change, icon reveal. Pure CSS `:hover`. | Low |
| 18 | **Service row entrance** | GSAP ScrollTrigger | `translateX(-30→0)` + fade, 0.1s stagger per row, 0.6s, `power3.out`. | Low |
| 19 | **Project card hover** | CSS transitions | Card: border/background/shadow per glassmorphism hover spec. Preview: `scale(1→1.05)` 0.6s. | Low |
| 20 | **Stat counter scramble** | GSAP + ScrambleTextPlugin | Numbers rapidly cycle random digits (50ms intervals) for 1.5s, then lock. Digits settle L→R with 0.1s stagger. Glow pulse on settle. ScrollTrigger once at `start: "top 75%"`. | Medium |
| 21 | **Stat ambient glow** | CSS keyframes | Subtle box-shadow opacity oscillation (0.1→0.15→0.1), 4s infinite. | Low |
| 22 | **Contact form field stagger** | GSAP ScrollTrigger | Fields stagger in at 0.08s, `translateY(20→0)` + fade. | Low |
| 23 | **Contact info card stagger** | GSAP ScrollTrigger | Cards stagger in at 0.1s, `translateX(30→0)` + fade. | Low |
| 24 | **Floating WhatsApp pulse** | CSS keyframes | box-shadow oscillation, 2s infinite. | Low |
| 25 | **Button gradient shift** | CSS transitions | `::before` gradient angle rotates on hover. Inner text color change. Glow appears. | Low |
| 26 | **Mobile menu overlay** | GSAP timeline | Full-screen overlay fade-in, links stagger in at 0.1s delay each. | Low |
| 27 | **Back-to-top appearance** | GSAP ScrollTrigger | Toggle opacity + translateY based on scroll position (>500px). | Low |

---

## State & Logic Plan

### Global Orchestration

**Loading → Content sequence**: The `LoadingScreen` owns a GSAP timeline that resolves after ~2.5s. On resolution, it sets a global React state (`isLoaded`) that the `HeroSection` watches to begin its entrance timeline. This is the only required cross-component coordination.

### Lenis ↔ GSAP ScrollTrigger Integration

Lenis must be initialized once at app level via `useLenis`. Its `scroll` event feeds into `ScrollTrigger.update()` via `gsap.ticker.add()`. This is a single setup point — all scroll-driven animations (reveal, parallax, fluid ribbon, SplitText triggers) consume ScrollTrigger which reads from Lenis. No per-component scroll handling needed.

### Three.js Render Loop Management

The `ParticleOrbitRing` component manages its own Three.js render loop via `useFrame` from R3F. An `useInView` hook (IntersectionObserver) toggles a boolean that conditionally calls `invalidate()` or returns early from `useFrame`. This prevents GPU waste when the Contact section is off-screen.

### Mouse Position Sharing

The `useMouseLerp` hook is instantiated once at app level. It registers a single `mousemove` listener and runs a `requestAnimationFrame` loop for lerp interpolation. The lerped coordinates are stored in a `useRef` (not state, to avoid re-renders) and consumed by:
- `MouseGlowEffect` — CSS transform updates
- `ParticleOrbitRing` — particle attraction target (read in `useFrame`)

Both consumers read from the same ref. No React state updates on mouse move.

### Responsive Effect Gating

A `useMediaQuery` hook (or Tailwind breakpoint classes) gates these effects:
- **< 768px**: `ParticleOrbitRing` renders with 80 particles (down from 200), no MeshLine trails. `MouseGlowEffect` is unmounted. `FloatingParticles` reduced to 20.
- **`prefers-reduced-motion`**: All continuous animations (particles, ribbon, ring rotation, typing) disabled. All entrance animations reduced to instant or 0.1s fade.

---

## Other Key Decisions

### No shadcn/ui Components

The design is entirely custom glassmorphism-styled. No standard UI primitives (buttons, inputs, dialogs, forms) from shadcn are used — every element has a bespoke visual treatment. shadcn is excluded from the dependency list.

### Three.js over Canvas 2D for Particles

The Contact section's particle orbit requires 3D positioning (ring formation, depth), instanced rendering for 200 particles, and real-time mouse interaction with physics. Canvas 2D would struggle with performance for this. Three.js with `InstancedMesh` and R3F's declarative API is the right choice.

### Image Assets

The user's uploaded portrait (`1000118445.png`) is the only image asset. All project previews use CSS gradient placeholders as specified. No additional images need generation or sourcing.

### Form Submission

The contact form has no backend specified. The "Send Message" button will show a success toast/alert (placeholder behavior). The WhatsApp and Email buttons use direct links (`wa.me` and `mailto:`) which require no backend.

### Font Loading Strategy

Three Google Fonts (Inter, JetBrains Mono, Playfair Display) loaded via a single `<link>` with `display=swap` in `index.html`. This avoids npm font packages and leverages browser caching. The loading screen provides cover time for font load.
