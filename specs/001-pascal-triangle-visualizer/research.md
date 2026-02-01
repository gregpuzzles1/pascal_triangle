# Research: Pascal’s Triangle Visualization Website

**Branch**: `001-pascal-triangle-visualizer`  
**Date**: 2026-02-01  
**Spec**: ../001-pascal-triangle-visualizer/spec.md

This document resolves technical choices for implementing the spec as a static GitHub Pages site using React + TypeScript.

## Decisions

### 1) Toolchain: Vite + React + TypeScript

- **Decision**: Use Vite to build a React 18 + TypeScript SPA, producing static assets in `dist/`.
- **Rationale**: Fast dev server, simple configuration, small/modern dependency surface; produces static output compatible with GitHub Pages.
- **Alternatives considered**:
  - Create React App: deprecated/legacy; heavier tooling.
  - Next.js: stronger routing/SSR features that are unnecessary and add complexity; static export possible but overkill here.

### 2) Deployment: GitHub Pages via GitHub Actions (main only)

- **Decision**: Use a GitHub Actions workflow that runs on pushes to `main`, builds the app, uploads `dist/` as a Pages artifact, and deploys via the official Pages actions.
- **Rationale**: Matches constitution (Actions-only, main-only) and keeps deploy reproducible and auditable.
- **Alternatives considered**:
  - `gh-pages` branch manual pushes: disallowed by constitution.
  - Third-party deploy services: not needed.

### 3) GitHub Pages base path / routing

- **Decision**: Build as a single-page app; avoid deep-link routing (or keep it hash-based if needed). Configure Vite `base` correctly for repo pages.
- **Rationale**: GitHub Pages serves from `/<repo>/` for project sites; correct base prevents broken asset links.
- **Alternatives considered**:
  - BrowserRouter with 404 rewrite: possible, but requires extra pages config; hash routing is simpler.

### 4) Theme: CSS variables + `data-theme` attribute

- **Decision**: Implement light/dark via CSS variables on `:root` and switch using `document.documentElement.dataset.theme = 'light' | 'dark'`. Default is light; persist user choice in `localStorage`.
- **Rationale**: Minimal dependencies, fast, works with any component structure.
- **Alternatives considered**:
  - Theme libraries: unnecessary.

### 5) Hexagon cells: CSS `clip-path` polygon

- **Decision**: Render each cell as a div clipped to a hexagon using `clip-path: polygon(...)`; support “hide hexes” by toggling outline/background styles, while keeping the clickable area.
- **Rationale**: Simple, no SVG math, scales well, easy to animate/highlight.
- **Alternatives considered**:
  - SVG per cell: crisp but more verbose.
  - Canvas: harder for per-cell interactions/semantics.

### 6) Interaction: single-select vs double-select (mouse + touch)

- **Decision**: Support mouse double-click (`dblclick`) and touch double-tap via a short timing window (e.g., 250–350ms). Treat selection as:
  - Single-select: compute and show **Path A** (above-right-first).
  - Double-select (if applicable): also show **Path B** (above-left-first).
- **Rationale**: Meets spec and keeps interaction consistent across devices.
- **Alternatives considered**:
  - Always show both: removes the learning “reveal” and reduces clarity.

### 7) “Hockey stick” highlight algorithm (two mirrored paths)

- **Decision**: Define two deterministic highlight paths that match the examples:

  - **Path A (default)**: from selected cell `(r,c)`, include `(r,c)`, then move **up-right** once to `(r-1,c)`, then continue **up-left** repeatedly: `(r-2,c-1)`, `(r-3,c-2)`, … until out of bounds.
  - **Path B (mirrored)**: from `(r,c)`, include `(r,c)`, then move **up-left** once to `(r-1,c-1)`, then continue **up-right** repeatedly: `(r-2,c-1)`, `(r-3,c-1)`, … until out of bounds.

- **Rationale**: Produces the “one angle” hockey-stick shape described in the spec and matches the provided 6 example (3+2+1).
- **Alternatives considered**:
  - Highlighting all contributing combinatorial paths: too complex for a first version.

### 8) Multiples coloring precedence

- **Decision**: Multiples coloring applies globally, but if a highlight path is active, highlight styling overrides multiples coloring **on highlighted cells only**.
- **Rationale**: Keeps the learning interaction readable while still allowing the multiples feature.
- **Alternatives considered**:
  - Combine styles: can become visually noisy.
  - Disable multiples on highlight: hides information.

## Open Items

None required to proceed to design; repository URL/issue URL for footer links will be wired during implementation.
