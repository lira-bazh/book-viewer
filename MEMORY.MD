# Project Memory

## Overview

`book-viewer` is a small React application scaffolded with Vite and TypeScript. The current product surface is minimal: `App` renders a centered page shell with the title "Book Viewer". Most of the repository is setup for future feature work rather than implemented book-viewing logic.

## Stack

- React 19 with `react-dom` and `StrictMode`.
- Vite 8 with `@vitejs/plugin-react`.
- TypeScript 6 in bundler mode, JSX via `react-jsx`, `noEmit`, and strict unused checks.
- Tailwind CSS 4 via `@tailwindcss/vite`.
- shadcn/radix-vega style setup with CSS variables and lucide icons configured.
- Vitest 4 with `jsdom` and `@testing-library/jest-dom/vitest`.
- Formatting/linting uses `oxfmt` and `oxlint`.

## Important Paths

- `src/main.tsx` mounts the React app into `#root`.
- `src/App.tsx` contains the current application shell.
- `src/style.css` imports Tailwind, shadcn styles, Inter variable font, animation CSS, and defines light/dark design tokens.
- `src/shared/ui/input.tsx` contains the shadcn-style `Input` component.
- `src/shared/lib/utils.ts` exports `cn`, combining `clsx` with `tailwind-merge`.
- `vite.config.ts` configures React, Tailwind, the `@` alias to `src`, and Vitest.
- `components.json` configures shadcn aliases:
  - `@/shared`
  - `@/shared/ui`
  - `@/shared/lib`
  - `@/shared/hooks`

## Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Check formatting: `pnpm format:check`
- Run tests: `pnpm test`
- Run tests once: `pnpm test:run`
- Full check: `pnpm check`

## Current State

- No routing is wired in yet, although `@tanstack/react-router` is installed.
- `zustand` is installed but no stores exist yet.
- `radix-ui`, `class-variance-authority`, and `lucide-react` are available for UI work.
- README still contains the default Vite template text and does not describe the actual project yet.
- There are no app-specific tests at the moment; only test setup exists.

## Local Working Rules

- Do not commit without explicit user permission.
- Do not run tests automatically; provide the command for the user instead.
- Keep code SOLID and avoid data races.
- Avoid rereading the same file in one session unless it changed.
- Do not load long test outputs or logs over 100 lines.
- If context would exceed the configured token limits, stop and ask the user to narrow files and lines.
