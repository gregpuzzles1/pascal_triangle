# Data Model: Pascal’s Triangle Visualization Website

**Branch**: `001-pascal-triangle-visualizer`  
**Date**: 2026-02-01  
**Spec**: ../001-pascal-triangle-visualizer/spec.md

This is an in-memory model only (no database).

## Entities

### 1) TriangleCell

Represents one visible entry in Pascal’s Triangle.

**Fields**
- `row: number` (0-based)
- `col: number` (0-based, `0 <= col <= row`)
- `value: number`
- `isEdge: boolean` (true if `col == 0 || col == row`)
- `isSelected: boolean`
- `highlight: 'none' | 'pathA' | 'pathB'` (highlight paths)
- `isMultipleOfN: boolean` (derived when multiples-coloring is enabled)

**Validation rules**
- `value >= 1`
- `row >= 0`
- `0 <= col <= row`

### 2) TriangleSettings

Represents user-controlled UI settings.

**Fields**
- `theme: 'light' | 'dark'` (default `'light'`)
- `rowsDisplayed: number` (integer, `1..maxRowsForDevice`)
- `showNumbers: boolean`
- `showHexes: boolean`
- `multiplesEnabled: boolean`
- `multiplesN: number` (integer, `1..rowsDisplayed` when enabled)

**Validation rules**
- Clamp `rowsDisplayed` to device max on resize.
- If `multiplesEnabled == false`, `multiplesN` is ignored (but may be retained).

### 3) HighlightSelection

Represents the current selection and computed highlight state.

**Fields**
- `selected: { row: number; col: number } | null`
- `mode: 'none' | 'single' | 'double'`
- `pathA: Array<{ row: number; col: number }>`
- `pathB: Array<{ row: number; col: number }>`

**Invariants**
- When `selected == null`: `mode == 'none'` and both paths are empty.
- When `mode == 'single'`: `pathA` populated; `pathB` empty.
- When `mode == 'double'`: `pathA` populated; `pathB` populated only if selected is non-edge.

## Relationships

- `TriangleSettings.rowsDisplayed` determines the size of the triangle and therefore the set of `TriangleCell` entities.
- `HighlightSelection` is derived from `(TriangleSettings, TriangleCell selection event)` and updates per selection.
- Multiples coloring (`isMultipleOfN`) is derived from `(TriangleSettings.multiplesEnabled, TriangleSettings.multiplesN, TriangleCell.value)`.

## State Transitions

### Theme
- `light` ↔ `dark` via theme toggle.

### Row Count
- User changes slider → `rowsDisplayed` updates → triangle recomputed → selection/highlights cleared (recommended for simplicity).

### Selection / Highlight
- None → Single: select cell → compute Path A → apply highlight.
- Single → Double: double-select same cell → compute Path B if non-edge → apply second highlight.
- Any → None: Reset → clear selection and highlights.
- Any → Single: select a different cell → clear previous highlights → compute Path A for new cell.
