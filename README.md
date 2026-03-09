# BidHub Platform Boilerplate

React + Vite + Tailwind CSS v4 + `shadcn/ui` starter project.

## Tech Stack

- React 19
- Vite 7
- TypeScript 5
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `shadcn/ui` (new-york style)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the local URL shown in terminal.

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build production assets
- `npm run preview` - preview the production build locally

## Project Structure

- `src/main.tsx` - app entry point
- `src/App.tsx` - initial app shell
- `src/index.css` - Tailwind import and global styles
- `src/components/ui/*` - generated `shadcn/ui` components
- `src/lib/utils.ts` - shared utility helpers

## Add More shadcn Components

```bash
npx shadcn@latest add button card input dialog form
```

## Notes

- Path alias `@/*` is configured in `tsconfig.json` and `vite.config.ts`.
- `components.json` contains your `shadcn` project config.
