# Lydia Jiang — Portfolio

React + Vite. Dark theme, particle-text hero, purple/yellow service cards.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Editing

- **Copy & projects:** everything lives in `src/content.js`. Items marked `TODO` are placeholders.
- **Particle words:** wrap a word in `*asterisks*` in `hero.lines` or `contact.line`.
- **Project images:** the case-study cards use CSS placeholder art (`src/components/ProjectVisual.jsx`).
  To use real screenshots, put an `<img>` inside `.project__media` in `src/components/Work.jsx`.
- **Colors & type:** tokens at the top of `src/styles.css`.
