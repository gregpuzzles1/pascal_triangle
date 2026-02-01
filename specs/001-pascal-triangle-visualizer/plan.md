# Implementation Plan: Pascal’s Triangle Visualization Website

**Branch**: `001-pascal-triangle-visualizer` | **Date**: 2026-02-01 | **Spec**: ../001-pascal-triangle-visualizer/spec.md
**Input**: Feature specification from `/specs/001-pascal-triangle-visualizer/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a sleek, responsive Pascal’s Triangle visualization site with hex cells, a single row-count slider (upper-left), light/dark theme (default light), visibility toggles, multiples-of-n coloring, “Reset highlights”, and interactive hockey-stick path highlighting (single-select shows above-right path; double-select adds above-left path). Implement as a static React + TypeScript app built with Vite and deployed to GitHub Pages via GitHub Actions from `main` only.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (target ES2022), React 18  
**Primary Dependencies**: React, React DOM, Vite (build), minimal CSS (no UI framework required)  
**Storage**: N/A (no database); `localStorage` only for theme preference (optional)  
**Testing**: Vitest + React Testing Library (unit/component), Playwright (optional)  
**Target Platform**: Modern browsers (mobile/tablet/desktop) served as a static GitHub Pages site  
**Project Type**: single (static web app)  
**Performance Goals**: Smooth interaction and slider updates; keep UI updates under ~16ms/frame at max rows (15)  
**Constraints**: No backend, no server APIs; GitHub Pages base path must be correct; responsive row caps: mobile 10 / tablet 12 / desktop 15  
**Scale/Scope**: Single page; in-memory triangle generation up to 15 rows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ Static-First Architecture: All logic runs client-side; no backend; no DB.
- ✅ GitHub Actions Deployment from Main: Plan assumes Pages deploy via Actions on `main`.
- ⚠️ Minimal Dependencies: Using React + Vite is a justified exception to “vanilla-first” to support complex interactive UI (responsive controls, touch + mouse selection, and consistent state management) while keeping the dependency surface small. No additional UI frameworks are required.

Re-check after design outputs (research/contracts) confirmed static, minimal dependencies, and no backend.

## Project Structure

### Documentation (this feature)

```text
specs/001-pascal-triangle-visualizer/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
package.json
vite.config.ts
index.html
public/
  [static assets]

src/
  main.tsx
  App.tsx
  styles/
    theme.css
    app.css
  components/
    ControlPanel/
      ControlPanel.tsx
    Triangle/
      TriangleGrid.tsx
      TriangleCell.tsx
    HowToUse/
      HowToUse.tsx
    Properties/
      Properties.tsx
    Footer/
      Footer.tsx
  lib/
    pascal.ts            # triangle generation
    highlight.ts         # hockey-stick path computation
    breakpoints.ts       # device category + max rows
    yearRange.ts         # footer year logic
    theme.ts             # theme persistence + apply
    links.ts             # footer links config

tests/
  unit/
    pascal.test.ts
    highlight.test.ts
```

**Structure Decision**: Single static web app at repository root built with Vite; code in `src/` and lightweight unit tests in `tests/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Minimal Dependencies: React + Vite | Interactive visualization with multiple synchronized controls and touch+mouse selection needs predictable state management and component composition | Vanilla DOM implementation would be more error-prone and harder to maintain while still requiring a bundler for TS and modern assets |
