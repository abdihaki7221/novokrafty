# Novokraft Website Revamp — Notes

## What changed

**Visual identity**
- New palette: deep ink (`#07090b`) base + single electric-lime accent (`#C6F23A`). The old blue/purple "AI gradient" look is gone.
- Typography: Space Grotesk (display) + Outfit (body) + JetBrains Mono (labels/numbers, tabular figures on stats).
- The Tailwind token names (`nova-*`, `accent.*`) were kept but remapped, so **every page and the admin panel inherit the rebrand automatically** — no API or schema changes.

**Motion**
- 5 generated, seamless 8-second looping background videos in `public/videos/` (each 0.1–0.6 MB):
  - `hero.mp4` — topographic contour lines (homepage hero + CTA panel)
  - `aquaflow.mp4` — liquid caustics (AquaFlow project card)
  - `gorayo.mp4` — conveyor/logistics packets (Gorayo project card)
  - `etims.mp4` — data-rain / ledger scan (eTIMS project card)
  - `ai.mp4` — particle constellation (featured service card)
- Videos pause automatically when off-screen, hide for `prefers-reduced-motion` users, and each has a `.jpg` poster.
- Hero headline uses a line-mask reveal (framer-motion), stats count up on scroll, tech stack is an infinite marquee, cards have cursor-tracked spotlight highlights.

**Layout upgrades**
- Hero: left-aligned, oversized display type over full-bleed video (was centered/symmetric).
- Services: asymmetric bento grid with a video-backed feature card (was 3 equal columns).
- "Why us": numbered editorial rows (was 3 card columns).
- Projects: ambient-video cards, first card spans 2 columns.
- Testimonials: offset grid.

**New components** (`components/ui/Motion.js`): `VideoPanel`, `CountUp`, `Marquee`, `Spotlight`.

## Mapping new project videos
`PROJECT_VIDEOS` in `app/HomeClient.js` and `app/projects/ProjectsClient.js` maps a project **slug** → video. Add new entries there (or extend to a DB field later).

## Nothing else touched
Prisma schema, API routes, admin logic, auth and analytics are untouched. `npm install && npx prisma generate && npm run dev` as before.
