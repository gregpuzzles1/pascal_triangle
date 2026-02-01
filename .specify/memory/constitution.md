<!--
SYNC IMPACT REPORT
==================
Version Change: NONE → 1.0.0
Initial constitution ratification for static web app project.

Modified Principles: N/A (initial version)
Added Sections:
  - Core Principles (3 principles focused on static web apps)
  - Deployment & Hosting Requirements
  - Governance

Removed Sections: N/A

Templates Status:
  ✅ .specify/templates/plan-template.md - reviewed, aligns with constitution
  ✅ .specify/templates/spec-template.md - reviewed, aligns with constitution
  ✅ .specify/templates/tasks-template.md - reviewed, aligns with constitution

Follow-up TODOs: None

Rationale: Initial MAJOR version (1.0.0) for new constitution establishing
foundational governance for static web app hosted on GitHub Pages.
-->

# Pascal Triangle Static Web App Constitution

## Core Principles

### I. Static-First Architecture
All functionality MUST be implemented as client-side static assets (HTML, CSS, JavaScript). No server-side processing or backend APIs are permitted. All data and logic must be embedded in or loaded by static files.

**Rationale**: GitHub Pages serves only static content. This constraint ensures deployment compatibility and eliminates server infrastructure complexity.

### II. GitHub Actions Deployment from Main Branch
Deployment MUST occur exclusively through GitHub Actions workflows triggered by pushes to the main branch. Manual deployments, deployments from other branches, or alternative CI/CD systems are prohibited.

**Rationale**: Single-branch deployment ensures a clear, auditable path from code to production. GitHub Actions integration is native to GitHub Pages and provides zero-cost automation for public repositories.

### III. Minimal Dependencies
External dependencies (libraries, frameworks, build tools) MUST be justified and kept to the absolute minimum required for functionality. Prefer vanilla HTML/CSS/JavaScript over frameworks unless complexity demands otherwise.

**Rationale**: Static sites benefit from simplicity. Fewer dependencies mean faster load times, reduced maintenance burden, and lower risk of supply chain vulnerabilities.

## Deployment & Hosting Requirements

- **Hosting Platform**: GitHub Pages (github.io domain or custom domain via CNAME)
- **Build Process**: If build steps are required (e.g., bundling, minification), they MUST execute in GitHub Actions and output to a designated directory (e.g., `dist/`, `build/`, or root)
- **Branch Strategy**: Only commits merged to `main` trigger deployment; feature branches do not deploy
- **Deployment Artifacts**: All deployable files MUST be committed to the repository or generated during GitHub Actions workflow runs
- **HTTPS**: GitHub Pages provides HTTPS by default; custom domains MUST be configured with HTTPS enabled

## Governance

- This constitution supersedes all other development practices and guidelines
- All pull requests MUST verify compliance with these principles before merge
- Amendments to this constitution require:
  1. Documented rationale for the change
  2. Impact assessment on existing features and templates
  3. Version increment per semantic versioning (see below)
- Versioning Policy:
  - **MAJOR**: Backward-incompatible changes to principles or deployment requirements
  - **MINOR**: New principles added or existing principles materially expanded
  - **PATCH**: Clarifications, wording improvements, non-semantic refinements
- Compliance reviews occur at pull request time and before each deployment

**Version**: 1.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
