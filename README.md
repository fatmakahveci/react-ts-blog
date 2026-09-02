# React Router Product Demo

[![React](https://img.shields.io/badge/React-TypeScript-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Create React App](https://img.shields.io/badge/Tooling-Create%20React%20App-09D3AC?logo=createreactapp&logoColor=white)](https://create-react-app.dev/)
[![Last commit](https://img.shields.io/github/last-commit/fatmakahveci/react-ts-blog)](https://github.com/fatmakahveci/react-ts-blog/commits/main)

A React and TypeScript routing exercise with nested layouts, product detail routes, and route-level error handling.

## Highlights

- Nested routes with a shared root layout
- Product list and parameterized product-detail pages
- Dedicated error boundary page
- Declarative navigation with React Router

## Technology

- React
- TypeScript
- React Router
- Create React App
- Styled Components

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
npm start
```

Open http://localhost:3000.

## Quality Checks

```bash
CI=true npm test -- --watchAll=false
npm run build
```

## Repository Structure

- `src/app/App.tsx` — route configuration
- `src/app/pages` — route-level components
- `src/app/components` — shared navigation UI

## Project Resources

- [Changelog](CHANGELOG.md)
- [Contributing guide](.github/CONTRIBUTING.md)
- [Security policy](.github/SECURITY.md)
- [License](LICENSE.md)
