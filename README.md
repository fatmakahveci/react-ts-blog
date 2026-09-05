# React Router Product Demo

[![React](https://img.shields.io/badge/React-TypeScript-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![CI](https://github.com/fatmakahveci/react-ts-blog/actions/workflows/test.yml/badge.svg)](https://github.com/fatmakahveci/react-ts-blog/actions/workflows/test.yml)
[![Last commit](https://img.shields.io/github/last-commit/fatmakahveci/react-ts-blog)](https://github.com/fatmakahveci/react-ts-blog/commits/main)

A React and TypeScript routing exercise with nested layouts, product detail routes, and route-level error handling.

## Highlights

- Nested routes with a shared root layout
- Product list and parameterized product-detail pages
- Dedicated error boundary page
- Friendly recovery links for unknown product identifiers
- Declarative navigation with React Router

## Technology

- React
- TypeScript
- React Router
- Vite and Vitest
- React Testing Library and CSS Modules

## Getting Started

### Prerequisites

- Node.js 22.13 or newer
- npm

### Installation

```bash
npm ci
npm start
```

Open http://localhost:5173. No credentials or backend setup are required.

## Quality Checks

```bash
npm run check
npm audit --audit-level=low
```

The tests cover the home page, product navigation and return links, unknown products, and unmatched routes. The build includes strict TypeScript checking. Production output is written to `dist/`; use `npm run preview` to inspect it locally. Configure your static host to serve `index.html` for application routes such as `/products/1`.

### Tooling migration

Create React App was replaced with Vite to resolve the TypeScript installation conflict and remove the obsolete webpack-based dependency chain. `npm start` remains available; CRA-specific flags such as `--watchAll=false` and the `eject` command are no longer used.

## Repository Structure

- `src/app/App.tsx` — route configuration
- `src/app/pages` — route-level components
- `src/app/components` — shared navigation UI

## Project Resources

- [Changelog](CHANGELOG.md)
- [Contributing guide](.github/CONTRIBUTING.md)
- [Security policy](.github/SECURITY.md)
- [License](LICENSE.md)
