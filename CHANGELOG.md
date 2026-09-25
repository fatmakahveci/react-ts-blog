# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
where applicable.

## [Unreleased]

### Added

- Chromium end-to-end tests for browser and Pages builds, enforced before deployment.
- Shared CI quality gate, retained coverage artifacts, weekly dependency checks,
  and a gated GitHub Pages deployment on successful main-branch builds.
- Pages-compatible asset paths and hash routes, with deployment-aware share links.
- Category and maximum-price filters, name/price sorting, and filter reset.
- Persistent favorites with a favorites-only view, grid/list layout, and light/dark themes.
- Recently viewed products, copyable product links with manual fallback, and the `/` search shortcut.
- Tests for combined filters, persistence, unavailable storage/clipboard, and keyboard shortcuts.
- URL-based product search, empty results, and filter-preserving return links.
- Keyboard skip navigation, route focus management, and page titles.
- Separate missing-page and unexpected-error recovery messages.
- Biome lint/format checks, coverage thresholds, and behavior tests.
- Shared Node version, editor settings, PR and bug report templates, and npm dependency updates.

### Changed

- Standardized typography on locally bundled Inter Variable, increased small-label
  sizes, and introduced graphite/stone surfaces with blue accents in both themes.
- Redesigned the home, catalog, and product detail pages with a green/cream theme,
  responsive filter controls, illustrated product cards, and consistent typography.
- Refreshed both color themes and the demo recording; illustrations use local CSS
  without external image requests.
- Updated React and React DOM to 19.3.0, React Router to 7.18.4, TypeScript to 7.0.2,
  Vite to 8.3.1, Vitest and its coverage provider to 5.0.2, and jsdom to 30.1.1.
- Updated React type packages and imported the React-scoped JSX type for React 19.
  Node type definitions remain on the latest 22.x version to match `.nvmrc`.

### Fixed

- Keep the main layout mounted through child-route errors so keyboard focus is
  restored when entering, leaving, or revisiting error pages.
- CI now runs lint, coverage, type checks, and builds with the pinned Node version.
- Source files use descriptive names and dedicated layout, data, type, style, asset, and test directories.

### Previously added

- Added an initial changelog to track future project changes.

<!--
When preparing a release, move relevant entries from Unreleased into a dated
version section. Use Added, Changed, Deprecated, Removed, Fixed, and Security
headings as appropriate.
-->
