# Feature Specification: Pascal’s Triangle Visualization Website

**Feature Branch**: `001-pascal-triangle-visualizer`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: Build a sleek, modern, educational Pascal’s Triangle visualization site with responsive row limits (mobile/tablet/desktop), interactive “hockey stick” path highlighting, multiple display toggles (numbers/hexes/multiples coloring), a light/dark theme toggle (default light), help + educational content sections, and a footer with dynamic copyright year range.

## Clarifications

### Session 2026-02-01

- Q: Define device category breakpoints for mobile/tablet/desktop. → A: Mobile <768px, Tablet 768–1023px, Desktop >=1024px.
- Q: Should there be one or two row-count sliders, given the control placement requirements? → A: One row-count slider in the upper-left control area.
- Q: For a single-select on an interior cell, which “hockey stick” path is shown first? → A: Single-select shows the above-right path; double-select adds the above-left path.
- Q: When “Color multiples of n” is enabled and a highlight path is active, which styling takes precedence? → A: Highlight styling overrides multiples coloring for highlighted cells only.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Explore the Triangle (Priority: P1)

As a learner, I want to view Pascal’s Triangle in a clean, modern layout and control how many rows are shown, so that I can explore the pattern without being overwhelmed.

**Why this priority**: This is the core educational value: rendering the triangle correctly and making it navigable on any device.

**Independent Test**: Can be fully tested by loading the page and using the row-count slider to render 1…max rows while verifying well-known rows and the device-specific maximum.

**Acceptance Scenarios**:

1. **Given** I open the site on a device-sized viewport, **When** the page loads, **Then** a Pascal’s Triangle is shown with a row-count control and the triangle values match the standard construction rule.
2. **Given** the triangle is visible, **When** I move the row-count slider, **Then** the number of displayed rows updates to the selected value and never exceeds the maximum for the current device category.
3. **Given** I view the top of the page, **When** the interface loads, **Then** the row-count slider is available in the upper-left control area.
4. **Given** the triangle is visible, **When** I inspect the first and last value of any displayed row, **Then** they are 1.
5. **Given** the triangle is visible, **When** I inspect any interior value, **Then** it equals the sum of the two values directly above it (treating missing values as 0).

---

### User Story 2 - Highlight “Hockey Stick” Paths (Priority: P2)

As a learner, I want to select a number and see one or two colored “hockey stick” highlight paths above it, so that I can understand the diagonal-sum relationships within Pascal’s Triangle.

**Why this priority**: Interactive highlighting is the signature visualization behavior and directly supports learning.

**Independent Test**: Can be fully tested by selecting specific known values and verifying that highlights reset correctly and that single vs. double selection produces the expected number of paths.

**Acceptance Scenarios**:

1. **Given** the triangle is visible, **When** I single-select a cell, **Then** any existing highlights clear and a first highlight path appears in one distinct color.
2. **Given** the triangle is visible, **When** I double-select a cell that supports two paths (i.e., not on the left or right edge of its row), **Then** a second highlight path appears in a second distinct color.
3. **Given** I have highlights visible, **When** I click/tap a different cell, **Then** the prior highlights disappear and new highlights are computed for the newly selected cell.
4. **Given** I select an edge cell (a 1 on the far left or far right of a row), **When** I single- or double-select it, **Then** only one path is shown.
5. **Given** the “Reset” control is available above and to the right of the triangle, **When** I activate Reset, **Then** all highlights and any “selected cell” emphasis are cleared.

**Definition of “path” for this feature**:

- A highlighted path is the classic Pascal’s Triangle “hockey stick” pattern: a diagonal run of cells above the selected cell (the “handle”) plus the selected cell (the “blade”), forming one bend/angle.
- The sum of the highlighted “handle” values equals the selected cell value.
- Two paths are possible (mirrored) for non-edge cells; edge cells only have one.
- Default behavior: on single-select, show the above-right hockey stick path; on double-select (when applicable), add the mirrored above-left path.
- **Deterministic path computation (0-based coordinates `(row, col)`)**:
  - **Path A (default / above-right-first)** for selection `(r, c)`:
    - Include `(r, c)`
    - If `r - 1 >= 0`, include `(r - 1, c)` (one step up-right)
    - Then for `k = 2..` while `r - k >= 0` and `c - (k - 1) >= 0`, include `(r - k, c - (k - 1))` (repeated steps up-left)
  - **Path B (mirrored / above-left-first)** for selection `(r, c)`:
    - Include `(r, c)`
    - If `r - 1 >= 0` and `c - 1 >= 0`, include `(r - 1, c - 1)` (one step up-left)
    - Then for `k = 2..` while `r - k >= 0` and `c - 1 <= r - k`, include `(r - k, c - 1)` (repeated steps up-right; column remains `c - 1`)
  - **Edge rule**: if `c == 0` or `c == r`, Path B is not shown.

---

### User Story 3 - Customize Display + Learn More (Priority: P3)

As a learner, I want quick settings to customize what I see (theme, numbers, hexes, multiples coloring) and I want guidance + educational text on the page, so that the tool is both usable and informative.

**Why this priority**: These are polish and learning-support features that make the site feel complete and “sleek”, but they build on the core triangle + highlighting.

**Independent Test**: Can be fully tested by toggling each control and verifying visual changes, plus verifying the presence/content structure of the help section, properties section, and footer.

**Acceptance Scenarios**:

1. **Given** the page loads for the first time, **When** no preference is set, **Then** the site starts in light mode and provides a visible toggle to switch to dark mode.
2. **Given** I use the “Show numbers” checkbox, **When** I turn it off, **Then** the triangle numbers are hidden while the cell layout remains interactive.
3. **Given** I use the “Show hexes” checkbox, **When** I turn it off, **Then** the hexagon outlines/containers are hidden while cell positions remain consistent.
4. **Given** I enable “Color multiples of n”, **When** I adjust n using its slider, **Then** all visible cells whose values are multiples of n are visually distinguished (and updating n updates the coloring).
5. **Given** “Color multiples of n” is enabled and a highlight path is active, **When** I view the highlighted cells, **Then** the highlight styling is clearly visible on those cells and multiples coloring continues to apply to non-highlighted cells.
6. **Given** I view the top of the page, **When** the interface is visible, **Then** the main controls are grouped in the upper-left area and the Reset control is above and to the right of the triangle.
7. **Given** the main triangle area is present, **When** I scroll below it, **Then** I see a “How to use” section, then a Pascal’s Triangle properties section of 2–3 paragraphs, then a footer.
8. **Given** today’s year is Y and the start year is 2026, **When** I view the footer, **Then** it displays “© 2026 Greg Christian” if Y = 2026, otherwise “© 2026–Y Greg Christian”, and the footer links navigate to the license, repository, and issue creation locations.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Viewport resize while a row count is selected (e.g., desktop → mobile): the displayed row count clamps to the new device maximum without breaking layout.
- Selecting a cell when numbers are hidden: highlighting still works and is visible via the cell styling.
- Double-selecting a cell that only supports one path: the system does not invent a second path; it continues to show only the single valid path.
- Rapidly changing row count via slider: triangle remains usable and does not show partial/invalid rows.
- Multiples coloring enabled with n = 1: all visible cells are treated as multiples (visually consistent behavior).

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The site MUST render Pascal’s Triangle values according to the standard construction rule: the top entry is 1; each subsequent entry is the sum of the two entries above-left and above-right (treat missing as 0).
- **FR-002**: The site MUST present the triangle as a grid of cells where each cell visually contains a hexagon-shaped container around the value.
- **FR-003**: The value text MUST fit within its hexagon container without overlapping adjacent cells at all supported row counts.
- **FR-004**: The site MUST provide a row-count slider that allows selecting an integer row count from 1 up to the device category maximum.
- **FR-004a**: The row-count slider MUST appear in the upper-left control area (no duplicate row-count slider elsewhere on the page).
- **FR-005**: The maximum row count MUST be: 10 for mobile, 12 for tablet, 15 for desktop.
- **FR-006**: The site MUST include a “Reset” control positioned above and to the right of the triangle that clears all highlights and selection state.
- **FR-006a**: The selected cell MUST be visually indicated with a distinct outline (selection ring), and that indication MUST be cleared by Reset and by selecting a different cell.
- **FR-007**: The site MUST allow users to single-select a triangle cell to create a first colored highlight path and MUST clear any prior highlights when a new cell is selected.
- **FR-008**: On single-select, the site MUST show the above-right highlight path (when applicable).
- **FR-009**: The site MUST allow users to double-select a non-edge cell to additionally show a second colored highlight path distinct from the first (the mirrored above-left path).
- **FR-010**: For edge cells, the site MUST show at most one highlight path regardless of single/double selection.
- **FR-011**: The highlight paths MUST follow the “hockey stick” definition in User Story 2 (diagonal handle + selected cell as blade; handle sums to the selected cell).
- **FR-011a**: The site MUST provide a light/dark theme toggle and MUST default to light mode on first load.
- **FR-012**: The site MUST provide a “Show numbers” checkbox that hides/shows all triangle numbers.
- **FR-013**: The site MUST provide a “Show hexes” checkbox that hides/shows the hexagon containers/outlines.
- **FR-014**: The site MUST provide a “Color multiples of n” checkbox.
- **FR-015**: When “Color multiples of n” is enabled, the site MUST provide an n-slider with an integer range 1…R, where R is the current displayed row count.
- **FR-016**: When multiples coloring is enabled, the site MUST visually distinguish every visible cell value that is a multiple of n.
- **FR-016a**: If a highlight path is active, highlight styling MUST take precedence on highlighted cells; multiples coloring MUST still apply to non-highlighted cells.
- **FR-017**: The page MUST include a “How to use” section below the triangle that explains the controls and interactions.
- **FR-018**: The page MUST include a “Pascal’s Triangle properties” section beneath the “How to use” section containing 2–3 paragraphs of educational text.
- **FR-019**: The page MUST include a footer containing: copyright text for “Greg Christian” starting at 2026 and automatically extending to the current year when the year changes; a link labeled “MIT License”; a link to the project repository; and a link to open a new issue.
- **FR-020**: The page MUST include at least 80px of whitespace/padding below the footer.
- **FR-021**: The primary controls (theme toggle, row-count slider, “Show numbers”, “Show hexes”, “Color multiples of n”, and the n-slider when enabled) MUST be available in the upper-left area of the page.

### Non-Functional Requirements

- **NFR-001**: All interactive controls (including triangle cells) MUST be operable by keyboard without a pointer.
- **NFR-002**: A non-gesture alternative MUST be provided for revealing the second path (for users who cannot double-click/tap).
- **NFR-003**: A visible focus indicator MUST be present for all interactive elements.
- **NFR-004**: Highlight paths MUST be distinguishable without color alone (e.g., solid vs. dashed outline).
- **NFR-005**: The UI MUST meet WCAG AA contrast for text and key indicators in both themes.
- **NFR-006**: Touch targets for controls and triangle cells MUST be at least 40px in their smallest dimension on mobile.
- **NFR-007**: If animations are used, the UI MUST respect reduced-motion preferences and provide an equivalent non-animated experience.
- **NFR-008**: Interaction updates (selection, toggles, slider) MUST complete within 100ms at 15 rows on a typical modern device.

### Visual Design Constraints

- **VDC-001**: Path A and Path B colors MUST be distinct and maintain at least a 3:1 contrast ratio against each other and the background.
- **VDC-002**: Multiples-of-n styling MUST be visually distinct from normal cells via a defined token (e.g., background tint + subtle border) and MUST not override highlight styling.
- **VDC-003**: “Clearly visible” highlight styling means a minimum 2px outline and a minimum 3:1 contrast against the cell background.
- **VDC-004**: The “sleek, modern” layout MUST maintain consistent spacing (at least 12px between primary UI regions) and a typography scale that keeps labels readable at all breakpoints.

### Key Entities *(include if feature involves data)*

- **Triangle Cell**: Represents one position in the triangle (row index, column index, displayed value, whether it is currently selected, and any active highlight styles).
- **Triangle Settings**: Represents user-controlled display settings (row count, show/hide numbers, show/hide hexes, multiples coloring enabled, multiples base n, and theme).
- **Highlight Path**: Represents a computed set of cells to highlight for a selection (path type: first/second, color identity, and the list of cells included).

### Assumptions

- Device categories are determined by viewport width: Mobile <768px, Tablet 768–1023px, Desktop >=1024px.
- Default displayed rows on initial load is the device-category maximum.
- “Single-select” means click/tap; “double-select” means double-click on desktop or double-tap on touch devices.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: A user can successfully display Pascal’s Triangle at any row count from 1 to the device maximum (10/12/15) without layout breaking.
- **SC-002**: A user can perform the core learning interaction: select a cell and see at least one correct “hockey stick” highlight path; selecting a different cell replaces highlights; Reset clears highlights.
- **SC-003**: On non-edge cells, a user can reveal a second (distinctly colored) valid path via double-select.
- **SC-004**: A first-time visitor can identify and use the theme toggle, the row slider, and at least one visibility toggle using only the on-page “How to use” instructions.
