# План работ по настройке проекта

Проект: фронтенд-приложение для отображения загруженного списка книг.

Стек: pnpm, Vite, React, TanStack Router, Zustand, shadcn/ui, Tailwind CSS, oxlint, oxfmt, Vitest.

## 1. Базовая структура проекта

- Убрать остатки Vite-шаблона из `src/App.tsx`, `src/App.css`, `src/index.css`.
- Оставить один CSS-вход для Tailwind/shadcn, например `src/style.css`.
- Убрать прямое подключение `/src/style.css` из `index.html`, если стили импортируются из `main.tsx`.
- Определиться с корнем alias `@`:
  - либо оставить `@/* -> ./*` и добавить такой же alias в Vite;
  - либо перенести `components/` и `lib/` внутрь `src/` и сделать `@/* -> ./src/*`.

Рекомендуемый вариант: держать приложение внутри `src/`.

```text
src/
  app/
  routes/
  entities/book/
  features/book-filter/
  widgets/book-list/
  shared/ui/
  shared/lib/
  shared/types/
```

## 2. Vite и TypeScript

- Добавить `resolve.alias` в `vite.config.ts`, чтобы импорты вида `@/lib/utils` работали во время dev/build.
- Проверить, что `tsconfig.json` и Vite используют одинаковую схему alias.
- Рассмотреть добавление отдельного `tsconfig.node.json`, если появятся Node-конфиги со строгой типизацией.
- Оставить строгие TypeScript-настройки: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.

## 3. Tailwind CSS и shadcn/ui

- Использовать `src/style.css` как единый файл Tailwind/shadcn-темы.
- Проверить `components.json` после выбора структуры каталогов.
- Перенести shadcn-компоненты в выбранную структуру, например `src/shared/ui`.
- Оставить `cn` в общем shared/lib-модуле.
- Добавлять shadcn-компоненты по мере необходимости: `button`, `card`, `dialog`, `select`, `checkbox`, `tabs`, `skeleton`, `scroll-area`.

## 4. Скрипты package.json

Добавить скрипты под заявленный tooling.

```json
{
  "format": "oxfmt .",
  "format:check": "oxfmt --check .",
  "lint:ox": "oxlint .",
  "test": "vitest",
  "test:run": "vitest run",
  "check": "pnpm lint:ox && pnpm format:check && pnpm build"
}
```

## 5. Vitest

- Добавить настройку Vitest в `vite.config.ts`.
- Для React-компонентов добавить:
  - `@testing-library/react`;
  - `@testing-library/jest-dom`;
  - `jsdom` или `happy-dom`;
  - `test.setup.ts`.

Тесты запускать вручную по команде пользователя.

## 6. oxlint и oxfmt

- Добавить oxlint как быстрый дополнительный lint.
- Добавить oxfmt как основной форматтер.
- При необходимости добавить ignores для `dist`, `coverage`, `node_modules`.

## 7. Команды для ручной проверки

```bash
pnpm install
pnpm build
pnpm oxlint .
pnpm oxfmt --check .
pnpm vitest run
```
