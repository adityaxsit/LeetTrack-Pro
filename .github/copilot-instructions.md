# Copilot instructions for LeetTrack-Pro

## Build, lint, and test

Run all frontend commands from `client/`.

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

Testing:
- There is currently no test runner configured in `client/package.json` (no `test` script).
- Single-test command is therefore not available yet in this repository.

## High-level architecture

- The repository currently contains a single frontend app in `client/` (React + Vite).
- Runtime flow is:
  1. `index.html` provides `<div id="root"></div>` and loads `/src/main.jsx`.
  2. `src/main.jsx` creates the React root and renders `<App />` inside `StrictMode`.
  3. `src/App.jsx` is the top-level application component.
- Bundling/dev server are handled by Vite with `@vitejs/plugin-react` (`client/vite.config.js`).

## Key conventions in this codebase

- JavaScript + JSX only (no TypeScript setup). `eslint.config.js` scopes linting to `**/*.{js,jsx}`.
- ESM is required (`"type": "module"` in `client/package.json`); use `import`/`export`.
- Keep app entrypoint structure unchanged unless intentionally refactoring (`index.html` -> `src/main.jsx` -> `src/App.jsx`).
- Follow the existing ESLint flat config, including:
  - `@eslint/js` recommended rules
  - `eslint-plugin-react-hooks` recommended rules
  - `eslint-plugin-react-refresh` Vite rules
- Build output directory `dist/` is ignored by linting (`globalIgnores(['dist'])`).
