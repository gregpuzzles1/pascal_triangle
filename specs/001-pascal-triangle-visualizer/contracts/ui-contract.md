# UI Contract: Pascal’s Triangle Visualization Website

**Branch**: `001-pascal-triangle-visualizer`  
**Date**: 2026-02-01

## Public Pages / Routes

- Single page (no required deep linking).

## UI State (conceptual)

### Settings

- `theme`: `'light' | 'dark'` (default `'light'`)
- `rowsDisplayed`: integer in `1..maxRowsForDevice`
- `showNumbers`: boolean
- `showHexes`: boolean
- `multiplesEnabled`: boolean
- `multiplesN`: integer in `1..rowsDisplayed` when enabled

### Selection

- `selectedCell`: `{ row: number; col: number } | null`
- `highlightMode`: `'none' | 'single' | 'double'`

## Events

### `setTheme(theme)`

- Updates theme.
- Theme defaults to `'light'` when no saved preference exists.

### `setRowsDisplayed(rows)`

- Clamps `rows` to `1..maxRowsForDevice`.
- Recommended: clears `selectedCell` and any highlights.

### `toggleShowNumbers(isOn)`

- Hides/shows numeric text without disabling interactions.

### `toggleShowHexes(isOn)`

- Hides/shows hex outlines/containers without disabling interactions.

### `toggleMultiples(enabled)` and `setMultiplesN(n)`

- When enabled, multiples coloring is applied to all visible cells whose value is divisible by `n`.

### `selectCell(row, col)` (single-select)

- Clears any existing highlights.
- Sets `selectedCell`.
- Computes and shows **Path A** (above-right-first).

### `doubleSelectCell(row, col)` (double-select)

- If the cell can support two paths (non-edge), computes and shows **Path B** (above-left-first) in a distinct color.
- If the cell is an edge cell, Path B is not created.

### `resetHighlights()`

- Clears selection and all highlights.

## Invariants

- Max rows depend on viewport width:
  - Mobile: `<768px` → max 10
  - Tablet: `768–1023px` → max 12
  - Desktop: `>=1024px` → max 15
- Only one row-count slider exists, located in the upper-left control area.
- Highlight precedence: if a cell is highlighted (Path A or Path B), highlight styling overrides multiples coloring for that cell only.
