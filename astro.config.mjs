// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import starlight from '@astrojs/starlight';

const docsLocales = ['hu', 'cs', 'sk', 'de', 'hr', 'ro', 'sl', 'sr'];

export default defineConfig({
	site: 'https://plottwist.hu',
	// Pages stay prerendered; only the contact form endpoint runs in the Worker.
	adapter: cloudflare({ imageService: 'compile' }),
	// Nothing uses sessions, and enabling them would provision a KV namespace on deploy.
	session: false,
	env: {
		schema: {
			TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
		},
	},
	redirects: {
		// Old Nextra URLs.
		'/contact-us': '/#contact',
		'/hu-HU': '/hu/',
		'/hu-HU/contact-us': '/hu/#contact',
		'/hu-HU/blog': '/hu/blog/',
		'/hu-HU/blog/plottwist-website': '/hu/blog/plottwist-website/',
		// There is one plugin so far, so /docs/ opens its docs.
		'/docs': '/docs/advanced-pixel-for-barion/',
		...Object.fromEntries(
			docsLocales.map((l) => [`/${l}/docs`, `/${l}/docs/advanced-pixel-for-barion/`])
		),
	},
	integrations: [
		starlight({
			title: 'Advanced Pixel for Barion',
			logo: { src: './src/assets/plugins/advanced-pixel-for-barion.png' },
			routeMiddleware: './src/routeData.ts',
			components: {
				SiteTitle: './src/components/docs/SiteTitle.astro',
				SocialIcons: './src/components/docs/SocialIcons.astro',
				Footer: './src/components/docs/Footer.astro',
			},
			favicon: '/favicon.svg',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				hu: { label: 'Magyar' },
				cs: { label: 'Čeština' },
				sk: { label: 'Slovenčina' },
				de: { label: 'Deutsch' },
				hr: { label: 'Hrvatski' },
				ro: { label: 'Română' },
				sl: { label: 'Slovenščina' },
				sr: { label: 'Srpski' },
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/gcsecsey/advanced-pixel-for-barion',
				},
			],
			sidebar: [{ autogenerate: { directory: 'docs/advanced-pixel-for-barion' } }],
			customCss: [
				'@fontsource-variable/geist',
				'@fontsource-variable/geist-mono',
				'./src/styles/tokens.css',
				'./src/styles/starlight.css',
			],
		}),
	],
});
