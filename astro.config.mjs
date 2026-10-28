// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const docsLocales = ['hu', 'cs', 'sk', 'de', 'hr', 'ro', 'sl', 'sr'];

export default defineConfig({
	site: 'https://plottwist.hu',
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
			title: 'Plot Twist',
			logo: {
				light: './src/assets/mark-on-light.svg',
				dark: './src/assets/mark-on-dark.svg',
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
			sidebar: [
				{
					label: 'Advanced Pixel for Barion',
					items: [{ autogenerate: { directory: 'docs/advanced-pixel-for-barion' } }],
				},
			],
			customCss: [
				'@fontsource-variable/geist',
				'@fontsource-variable/geist-mono',
				'./src/styles/tokens.css',
				'./src/styles/starlight.css',
			],
		}),
	],
});
