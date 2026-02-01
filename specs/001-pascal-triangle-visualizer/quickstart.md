# Quickstart: Pascal’s Triangle Visualization Website

**Branch**: `001-pascal-triangle-visualizer`  
**Date**: 2026-02-01

## Overview

This project is a static site built with React + TypeScript and deployed to GitHub Pages using GitHub Actions from the `main` branch only.

## Prerequisites

- Node.js (LTS recommended)
- npm (bundled with Node) or an equivalent package manager

## Local Development

1. Install dependencies:

   - `npm install`

2. Start the dev server:

   - `npm run dev`

3. Build production assets:

   - `npm run build`

4. Preview the built site locally:

   - `npm run preview`

## Deployment (GitHub Pages)

- Deployment runs via GitHub Actions on pushes to `main`.
- The workflow builds the site and deploys the static output directory (expected: `dist/`) to GitHub Pages.

### Notes for GitHub Pages base path

If this repo is deployed as a **project site** (e.g., `https://<user>.github.io/<repo>/`), the build MUST set the correct base path so assets resolve under `/<repo>/`.

If this repo is deployed as a **user/organization site** (e.g., `https://<user>.github.io/`), the base can be `/`.

## Footer links

The footer includes links to:
- MIT License
- Project repository
- Open an issue

These will be set to the actual repo URLs during implementation.

## Manual Verification

### US1 — Explore the Triangle

- Load the page and confirm the triangle renders with the default max rows for the device.
- Move the Rows slider across 1..max and confirm row count clamps to device limits (10/12/15).
- Check that first/last values in a row are 1 and interior values sum from above-left/right.

### US2 — Hockey Stick Paths

- Select a cell and confirm Path A appears and prior highlights clear.
- Double-select a non-edge cell and confirm Path B appears with distinct styling.
- Select a different cell and confirm highlights recompute.
- Use Reset to clear selection + highlights.

### US3 — Customize Display + Learn More

- Toggle theme and confirm light/dark switch works and persists.
- Toggle Show numbers and Show hexes and confirm layout remains usable.
- Enable multiples, adjust n, and confirm multiples styling updates.
- Confirm highlight styling overrides multiples on highlighted cells.
- Confirm How to use, Properties (2–3 paragraphs), and footer render with 80px spacing.

## Validation Notes

- Base path is configured in vite.config.ts for GitHub Pages.
- Footer links configured in src/lib/links.ts.
