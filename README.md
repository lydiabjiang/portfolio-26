# Lydia Jiang — Portfolio

React + Vite. Dark theme, hero with a blur-to-focus phrase, purple/blue service cards.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Editing

- **Copy & projects:** everything lives in `src/content.js`. Items marked `TODO` are placeholders.
- **Focus words:** wrap a word or phrase in `*asterisks*` in `hero.lines` or `contact.line` to make it start blurred and come into focus letter by letter, then blur around the cursor on hover (the blur takes its colors from `--blue` → `--purple` in `src/styles.css`). In the hero the sharp text also gets the `--accent-gradient`.
- **Project images:** the case-study cards use CSS placeholder art (`src/components/ProjectVisual.jsx`).
  To use real screenshots, put an `<img>` inside `.project__media` in `src/components/Work.jsx`.
- **Colors & type:** tokens at the top of `src/styles.css`.
