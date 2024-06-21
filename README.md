# Monorepo Setup with Lerna

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="100" height="100">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="100" height="100">
  <img src="https://lerna.js.org/images/lerna-logo-light.svg" alt="Lerna" width="100" height="100">
</p>

## Overview

This repository is a monorepo managed with Lerna. It contains two main applications:

- **frontend**: A Vite React app using `React Query`, `React Router DOM`, `Zustand`, `MUI`, `React Hook Form`, and `Vitest`.
- **api**: A Fastify server using `Prisma`, `Mocha`, and `c8` for code coverage.

Additionally, Husky is set up to enforce pre-commit hooks using lint-staged and validate commit messages using conventional commits. If the branch name contains a ClickUp ID, it will be automatically appended to the commit message.

## Getting Started

### Prerequisites

- Node.js (>= 20.x)
- npm (>= 10.x)
- Lerna (>= 8.x)

## Structure

├── .husky
├── apps
│ ├── frontend
│ └── api
├── packages
│ └── common (optional common utilities or packages)
├── .commitlintrc
├── scripts
│ └── prepare-commit-msg.js (Add Clickup ID to commit message if the branch name has Clickup ID eg. feat/Cu-erfs12gh-test )
├── lerna.json
└── package.json

## Code Quality and Commit Validation

### Husky and lint-staged

Husky is used to run pre-commit, commit-msg, and prepare-commit-msg hooks, and lint-staged is used to lint staged files before committing.

## Coverage Configuration

### Frontend (Vitest)

In apps/frontend/vite.config.js:

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
})
```

### API (c8)

In apps/api/.c8rc

```json
{
  "all": true,
  "check-coverage": true,
  "include": ["src/**/*.js"],
  "reporter": ["html", "text-summary"],
  "report-dir": "./reports",
  "branches": 80,
  "lines": 80,
  "functions": 80,
  "statements": 80
}
```
