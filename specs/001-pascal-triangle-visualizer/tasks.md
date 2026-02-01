# Tasks: Pascal’s Triangle Visualization Website

**Input**: Design documents from `/specs/001-pascal-triangle-visualizer/`
**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: Not included (no explicit TDD/testing requirement in spec). Optional unit/component tests can be added later.

## Format: `- [ ] T### [P?] [US?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: Which user story this task belongs to (US1/US2/US3)
- Every task includes one or more exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline repository structure

- [x] T001 Create Vite + React + TypeScript app scaffold in package.json, vite.config.ts, tsconfig.json, index.html, src/main.tsx, src/App.tsx
- [x] T002 [P] Add base styling files and import wiring in src/styles/theme.css, src/styles/app.css, src/main.tsx
- [x] T003 [P] Create initial component modules in src/components/ControlPanel/ControlPanel.tsx, src/components/Triangle/TriangleGrid.tsx, src/components/Triangle/TriangleCell.tsx, src/components/Footer/Footer.tsx
- [x] T004 Configure GitHub Pages base path handling in vite.config.ts
- [x] T005 Add GitHub Pages deploy workflow (Actions on `main` only) in .github/workflows/pages.yml
- [x] T006 Create repo documentation entry point in README.md
- [x] T007 Add MIT license text file at LICENSE
- [x] T008 Add ignore rules for build artifacts and dependencies in .gitignore
- [x] T009 Add basic HTML metadata and root mount node in index.html
- [x] T010 [P] Add a placeholder favicon/static asset in public/favicon.svg

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core app building blocks required by all user stories

**⚠️ CRITICAL**: No user story work should start until this phase is complete

- [x] T011 [P] Implement viewport category + row cap constants in src/lib/breakpoints.ts
- [x] T012 [P] Implement Pascal’s Triangle generation helper in src/lib/pascal.ts
- [x] T013 [P] Define shared UI/domain types in src/lib/types.ts
- [x] T014 Create app state container skeleton (settings + selection) in src/App.tsx
- [x] T015 Create base page layout regions (control area, triangle area, content area, footer) in src/App.tsx, src/styles/app.css
- [x] T016 [P] Implement footer year range helper in src/lib/yearRange.ts
- [x] T017 [P] Implement external links configuration helper in src/lib/links.ts
- [x] T018 [P] Create gesture helper module placeholder in src/lib/gestures.ts

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Explore the Triangle (Priority: P1) 🎯 MVP

**Goal**: Render Pascal’s Triangle in a clean layout with a single row slider (upper-left) that respects responsive row caps.

**Independent Test**: Load the page, confirm the triangle renders, and move the row slider across `1..maxRowsForDevice` while verifying values and no layout breakage.

- [x] T019 [US1] Set default rowsDisplayed to device max and initialize settings in src/App.tsx
- [x] T020 [US1] Clamp rowsDisplayed to device max on viewport resize in src/App.tsx using src/lib/breakpoints.ts
- [x] T021 [US1] Implement row-count slider UI in src/components/ControlPanel/ControlPanel.tsx (upper-left) and bind it in src/App.tsx
- [x] T022 [US1] Build triangle data for rowsDisplayed in src/components/Triangle/TriangleGrid.tsx using src/lib/pascal.ts
- [x] T023 [US1] Render triangle row/column layout in src/components/Triangle/TriangleGrid.tsx
- [x] T024 [US1] Render hex cell with value text in src/components/Triangle/TriangleCell.tsx
- [x] T025 [US1] Implement responsive hex sizing and spacing (no overlap at 10/12/15 rows) in src/styles/app.css
- [x] T026 [US1] Ensure value text scales to fit hex at max rows in src/styles/app.css
- [x] T027 [P] [US1] Implement overall page layout for upper-left controls and centered triangle in src/styles/app.css
- [x] T028 [US1] Ensure only one row-count slider exists by consolidating control rendering in src/components/ControlPanel/ControlPanel.tsx
- [x] T029 [US1] Document manual verification steps for US1 in specs/001-pascal-triangle-visualizer/quickstart.md
- [x] T030 [US1] Add a small dev-only sanity check helper for known rows (e.g., first/last == 1) in src/lib/pascal.ts
- [x] T031 [US1] Handle trivial render case (rowsDisplayed=1) cleanly in src/components/Triangle/TriangleGrid.tsx
- [x] T032 [US1] Ensure breakpoints match the clarified thresholds in src/lib/breakpoints.ts

**Checkpoint**: US1 delivers a usable, responsive triangle explorer

---

## Phase 4: User Story 2 — Highlight “Hockey Stick” Paths (Priority: P2)

**Goal**: Selecting a cell shows Path A; double-select (when applicable) adds mirrored Path B; Reset clears highlights and selection.

**Independent Test**: Select a cell and verify Path A appears; double-select a non-edge cell to show Path B; select a different cell to replace highlights; use Reset to clear all.

- [x] T033 [P] [US2] Implement Path A / Path B coordinate computation in src/lib/highlight.ts
- [x] T034 [US2] Add selection/highlight state wiring in src/App.tsx using src/lib/types.ts
- [x] T035 [US2] Wire single-select to compute Path A and clear previous selection in src/App.tsx, src/components/Triangle/TriangleCell.tsx
- [x] T036 [US2] Wire desktop double-click to enable Path B for non-edge cells in src/components/Triangle/TriangleCell.tsx
- [x] T037 [US2] Implement touch double-tap detection and hook it into cell interactions in src/lib/gestures.ts, src/components/Triangle/TriangleCell.tsx
- [x] T038 [US2] Apply highlight styling (distinct Path A vs Path B) in src/components/Triangle/TriangleCell.tsx, src/styles/app.css
- [x] T039 [US2] Enforce edge-cell rules (no Path B on edges) in src/lib/highlight.ts
- [x] T040 [US2] Add Reset control positioned above-right of the triangle in src/App.tsx, src/styles/app.css
- [x] T041 [US2] Ensure new selection resets highlight mode to single by default in src/App.tsx
- [x] T042 [US2] Document manual verification steps for US2 in specs/001-pascal-triangle-visualizer/quickstart.md

**Checkpoint**: US2 delivers correct and repeatable highlight interactions

---

## Phase 5: User Story 3 — Customize Display + Learn More (Priority: P3)

**Goal**: Add theme + display toggles, multiples coloring, on-page guidance/educational text, and a footer with dynamic year range and links.

**Independent Test**: Toggle theme, numbers, and hexes; enable multiples and adjust n; verify highlight precedence over multiples; verify help text, properties text, and footer appear with correct year range and spacing.

- [x] T043 [US3] Implement theme variables and default light theme in src/styles/theme.css
- [x] T044 [US3] Implement theme controller (data-theme + persistence) in src/lib/theme.ts
- [x] T045 [US3] Add theme toggle UI in src/components/ControlPanel/ControlPanel.tsx and connect it in src/App.tsx
- [x] T046 [US3] Add showNumbers state + UI and apply it in src/App.tsx, src/components/ControlPanel/ControlPanel.tsx, src/components/Triangle/TriangleCell.tsx
- [x] T047 [US3] Add showHexes state + UI and apply it in src/App.tsx, src/components/ControlPanel/ControlPanel.tsx, src/components/Triangle/TriangleCell.tsx
- [x] T048 [US3] Add multiplesEnabled and multiplesN state (clamp 1..rowsDisplayed) in src/App.tsx, src/components/ControlPanel/ControlPanel.tsx
- [x] T049 [US3] Apply multiples-of-n styling to non-highlighted cells in src/components/Triangle/TriangleCell.tsx, src/styles/app.css
- [x] T050 [US3] Enforce highlight-over-multiples precedence for highlighted cells in src/components/Triangle/TriangleCell.tsx
- [x] T051 [P] [US3] Add “How to use” section component and content in src/components/HowToUse/HowToUse.tsx, src/App.tsx
- [x] T052 [P] [US3] Add “Pascal’s Triangle properties” section component and content in src/components/Properties/Properties.tsx, src/App.tsx
- [x] T053 [US3] Implement footer with dynamic year range and required links in src/components/Footer/Footer.tsx, src/lib/yearRange.ts, src/lib/links.ts
- [x] T054 [US3] Add 80px whitespace below the footer in src/styles/app.css
- [x] T055 [US3] Document manual verification steps for US3 in specs/001-pascal-triangle-visualizer/quickstart.md

**Checkpoint**: US3 completes the customization and educational content

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories (quality, accessibility, consistency)

- [x] T056 [P] Add keyboard activation and ARIA labeling for interactive UI controls and cells in src/components/ControlPanel/ControlPanel.tsx, src/components/Triangle/TriangleCell.tsx
- [x] T057 [P] Add non-color cue differentiation for Path A vs Path B (e.g., outline style) in src/styles/app.css, src/components/Triangle/TriangleCell.tsx
- [x] T058 [P] Add focus-visible styling for all interactive elements in src/styles/app.css
- [x] T059 Update link configuration guidance and placeholders for repo/issue/license in README.md, src/lib/links.ts
- [x] T060 Record quickstart validation results and any gotchas in specs/001-pascal-triangle-visualizer/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — blocks all user stories
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on US1 (requires triangle rendering + cell interaction surface)
- **US3 (Phase 5)**: Depends on US1 (extends control panel + triangle rendering); integrates with US2 for precedence rules
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependency Graph

- US1 → US2 → US3
- US1 → US3

### Parallel Opportunities (examples)

- Setup: T002, T003, T010 can run in parallel
- Foundational: T011–T013, T016–T018 can run in parallel
- US2: T033 can run in parallel with T037
- US3: T051 and T052 can run in parallel
- Polish: T056–T058 can run in parallel

---

## Parallel Execution Examples Per User Story

### US1

- Run together: T022 in src/components/Triangle/TriangleGrid.tsx and T021 in src/components/ControlPanel/ControlPanel.tsx
- Run together: T025 and T027 in src/styles/app.css (coordinate via small, incremental edits)

### US2

- Run together: T033 in src/lib/highlight.ts and T037 in src/lib/gestures.ts
- Run together: T038 in src/styles/app.css and T040 in src/App.tsx

### US3

- Run together: T051 in src/components/HowToUse/HowToUse.tsx and T052 in src/components/Properties/Properties.tsx
- Run together: T043 in src/styles/theme.css and T044 in src/lib/theme.ts

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 → Phase 2
2. Implement US1 (Phase 3)
3. Validate US1 using the independent test criteria
4. Deploy via .github/workflows/pages.yml

### Incremental Delivery

- Add US2 after US1 validation
- Add US3 after US2 validation
- Finish with Phase 6 polish tasks
