# [Plot Twist website](https://plottwist.hu)

The official website for [Plot Twist](https://plottwist.hu), and the home of the Plot Twist plugin docs.

The project uses [pnpm](https://pnpm.io), [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) (for `/docs/`), and runs on Cloudflare Workers. It needs Node.js 22.23.4 or later (see `.node-version`).

To develop it locally, create two files with Cloudflare's [Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/). Git ignores both.

```bash
# .env (build time)
TURNSTILE_SITE_KEY=1x00000000000000000000AA

# .dev.vars (Worker runtime)
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
CONTACT_TO=you@example.com
```

Then run:

```bash
pnpm install
pnpm dev
```

And visit `localhost:4321` to preview your changes. Locally, the contact form does not send email: wrangler saves each message under `.wrangler/tmp/email/`.

## Deploy

Pages are prerendered. Only the contact form endpoint (`src/pages/api/contact.ts`) runs in the Worker.

Cloudflare Workers Builds deploys `main` to production, and gives every other branch a Preview URL (`<branch>-plottwist-hu.<subdomain>.workers.dev`) with a comment on its pull request. Previews have no secrets or email binding, because the repo is public: the contact form only works in production. To deploy by hand, run `pnpm build`, then `pnpm wrangler deploy`.

| Variable | Where | Value |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | Build variable | Turnstile widget site key (public) |
| `TURNSTILE_SECRET_KEY` | Worker secret | Turnstile widget secret key |
| `CONTACT_TO` | Worker secret | The inbox that gets form messages. It must be a verified destination address in Email Routing. |

## Content

- Company pages: `src/components/Home.astro`, with the English and Hungarian copy in `src/i18n/strings.ts`.
- Blog: `src/content/blog/en/` and `src/content/blog/hu/`. Use the same file name in both folders.
- Docs: `src/content/docs/docs/<plugin>/` (English) and `src/content/docs/<locale>/docs/<plugin>/` (other languages). The source of the Advanced Pixel for Barion docs is the plugin repo's `docs/` folder.

When you edit a page, edit all language versions.
