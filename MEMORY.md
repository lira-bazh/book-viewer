# Project Memory

## Overview

`book-viewer` is a React application for viewing a book plan from a local JSON file. The main screen lets the user upload a JSON file, validates it as an array of books, stores the parsed data in Zustand, and renders a two-column table with book metadata and descriptions.

The user-facing UI text is currently Russian.

## Stack

- React 19 with `react-dom` and `StrictMode`.
- Vite 8 with `@vitejs/plugin-react`.
- TypeScript 6 in bundler mode, JSX via `react-jsx`, `noEmit`, `erasableSyntaxOnly`, and strict unused checks.
- `@tanstack/react-router` is wired with a root route and `/` route.
- Zustand 5 stores loaded books.
- Tailwind CSS 4 via `@tailwindcss/vite`.
- shadcn/radix-vega style setup with CSS variables, Inter variable font, `tw-animate-css`, `clsx`, and `tailwind-merge`.
- lucide-react is used for icons.
- Vitest 4 with `jsdom`, `@testing-library/react`, and `@testing-library/jest-dom/vitest`.
- Formatting/linting uses `oxfmt` and `oxlint`.

## Important Paths

- `src/main.tsx` mounts the React app into `#root`.
- `src/App.tsx` creates the TanStack router and renders `RouterProvider`.
- `src/pages/Main/Main.tsx` is the main page layout.
- `src/pages/Main/ui/Header.tsx` renders the sticky header and theme toggle.
- `src/pages/Main/ui/Content.tsx` composes the file uploader and data table.
- `src/pages/Main/ui/ThemeToggle.tsx` toggles `light`/`dark`, persists the value in `localStorage` under `book-viewer-theme`, and falls back to `prefers-color-scheme`.
- `src/features/FileUploader/FileUploader.tsx` handles JSON file selection, rejects non-JSON files, parses file contents, stores books, and ignores stale async file reads via `loadIdRef`.
- `src/features/FileUploader/parseBooksFile.ts` parses and validates the expected books JSON structure.
- `src/features/DataTable/DataTable.tsx` renders an empty state before upload and a fixed-layout books table after data is loaded.
- `src/features/DataTable/BookTitleCell/BookTitleCell.tsx` renders cover/title/authors for one book.
- `src/features/DataTable/BookDescription/BookDescription.tsx` renders the description, truncating long text to 280 characters behind a native `details` expander.
- `src/shared/store/booksStore.ts` exports `useBooksStore` with `books`, `setBooks`, and `clearBooks`.
- `src/shared/types/book.ts` defines the `Book` shape.
- `src/shared/types/tableData.ts` exists but is not currently used by the rendered flow.
- `src/shared/ui/card.tsx` and `src/shared/ui/input.tsx` contain shadcn-style primitives.
- `src/shared/lib/utils.ts` exports `cn`.
- `src/style.css` imports Tailwind/shadcn/font styles and defines light/dark design tokens.
- `vite.config.ts` configures React, Tailwind, `@` as an alias to `src`, and Vitest setup.
- `components.json` configures shadcn aliases:
  - `@/shared`
  - `@/shared/ui`
  - `@/shared/lib`
  - `@/shared/hooks`

## Book JSON Contract

`parseBooksFile` expects the uploaded file to contain a JSON array. Each item must have:

- `title: string`
- `authors: string[]`
- `url: string`
- `yandex_books_urls: string[]`
- `litres_urls: string[]`

Supported optional fields:

- `description?: string`
- `image?: string`
- `audiobook_duration_minutes?: number`

Invalid JSON or invalid item shape throws `Invalid books file structure`, which the uploader displays as `JSON не соответствует структуре списка книг`.

## Tests

Current test coverage exists for:

- `src/features/FileUploader/parseBooksFile.test.ts`
  - valid book arrays
  - optional fields
  - invalid JSON
  - non-array payloads
  - missing required fields
  - invalid array item types
  - invalid optional field types
- `src/features/FileUploader/FileUploader.test.tsx`
  - loading valid JSON into the Zustand store
  - rejecting non-JSON files without changing existing books
  - showing an error for invalid book structure
  - ignoring stale file reads when a newer file is selected
- `src/pages/Main/ui/ThemeToggle.test.tsx`
  - stored theme
  - preferred color scheme fallback
  - toggling light/dark themes

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
- Preview production build: `pnpm preview`

## Current State

- The app has a working `/` route and a functional main view.
- Book data is loaded only from a user-selected local JSON file.
- The table currently shows book title/authors/cover and description only.
- Long descriptions are collapsed after 280 characters.
- The uploader uses a monotonically increasing load id to avoid stale async file reads overwriting newer selections.
- README still contains the default Vite template text and does not describe the actual project.
- There are active working-tree changes in multiple source files; do not assume they are committed.

## Local Working Rules

- Do not commit without explicit user permission.
- Do not run tests automatically; provide the command for the user instead.
- Keep code SOLID and avoid data races.
- Each React component should live in its own file.
- A folder containing a component should be named the same as the component.
- Use Camel case naming.
- Avoid rereading the same file in one session unless it changed.
- Do not load long test outputs or logs over 100 lines.
- If context would exceed the configured token limits, stop and ask the user to narrow files and lines.
