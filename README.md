# [Plot Twist website](https://plottwist.hu)

The official website for [Plot Twist](https://plottwist.hu), and the home of the Plot Twist plugin docs.

The project uses [pnpm](https://pnpm.io), [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) (for `/docs/`). It needs Node.js 22.23.4 or later (see `.node-version`). To develop it locally, run:

```bash
pnpm install
pnpm dev
```

And visit `localhost:4321` to preview your changes.

## Content

- Company pages: `src/components/Home.astro`, with the English and Hungarian copy in `src/i18n/strings.ts`.
- Blog: `src/content/blog/en/` and `src/content/blog/hu/`. Use the same file name in both folders.
- Docs: `src/content/docs/docs/<plugin>/` (English) and `src/content/docs/<locale>/docs/<plugin>/` (other languages). The source of the Advanced Pixel for Barion docs is the plugin repo's `docs/` folder.

When you edit a page, edit all language versions.
