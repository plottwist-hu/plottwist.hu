export type Lang = 'en' | 'hu';

export const EMAIL = 'hello@plottwist.hu';
export const PLUGIN = {
	name: 'Advanced Pixel for Barion',
	wporg: 'https://wordpress.org/plugins/advanced-pixel-for-barion/',
	github: 'https://github.com/gcsecsey/advanced-pixel-for-barion',
};

/** Prefix a site path with the locale. */
export const localePath = (lang: Lang, path: string) => (lang === 'en' ? path : `/hu${path}`);

const en = {
	htmlTitle: 'Plot Twist · WordPress, WooCommerce and AI automation',
	description:
		'Plot Twist is a software consultancy. We build and run WordPress and WooCommerce sites, automate the repetitive work around them with AI, and build customer service tools that answer faster.',
	nav: { services: 'Services', plugins: 'Plugins', docs: 'Docs', blog: 'Blog', cta: 'Book a free call' },
	langSwitch: { label: 'Magyar', short: 'HU', href: '/hu/' },
	hero: {
		title: 'WordPress, WooCommerce and AI,',
		titleTwist: 'with a twist.',
		lead: "Let's rewrite the script: less manual work, faster answers, and an online store that keeps running. We help with WordPress, WooCommerce and AI automation, from planning to hosting and upkeep.",
		cta: 'Book a free 30-minute call',
		secondary: 'See our plugins',
	},
	drawing: {
		label:
			'Construction drawing of the Plot Twist mark. Two identical halves stand side by side; the right half sits 10 units higher than the left. That offset is the twist.',
		a: 'WordPress & WooCommerce',
		b: 'AI automations',
		c: 'Customer service tooling',
	},
	services: {
		title: 'Flip the script with our consultancy services',
		lead: 'We start small: we solve one task first, and only move on once it has paid off.',
		groups: [
			{
				ref: 'A',
				name: 'WordPress & WooCommerce',
				lead: 'Builds, fixes and day-to-day care for WordPress sites and WooCommerce stores.',
				items: ['WordPress & WooCommerce consultancy', 'Digital commerce', 'Website management', 'Web hosting', 'UI/UX design'],
			},
			{
				ref: 'B',
				name: 'AI automations',
				lead: 'We find the repetitive work in your week and hand it to software.',
				items: ['AI workflow automation', 'Analytics & automation', 'Machine learning'],
			},
			{
				ref: 'C',
				name: 'Customer service tooling',
				lead: 'Faster answers for your customers, and fewer repeat questions for your team.',
				items: ['AI answers from your own docs and products', 'Helpdesk and inbox automation', 'Order and delivery status answers'],
			},
		],
		also: {
			label: 'Also',
			items: ['Cloud strategy', 'Systems design', 'Software engineering', 'Quality engineering', 'Application management', 'Marketing'],
		},
		tools: {
			label: "Hungarian systems we've worked with",
			items: ['Barion', 'SimplePay', 'Számlázz.hu', 'Billingo', 'Innvoice', 'Foxpost', 'GLS'],
		},
	},
	ai: {
		title: 'How we use AI',
		lead: 'Three rules we keep on every AI project.',
		notes: [
			['Your data first', 'The AI answers from your own docs, products and orders, so customers get your answer, not a generic one.'],
			['A person approves', 'Someone on your team approves the answers until they are good enough to go out on their own.'],
			['We measure the hours saved', "We don't promise ROI figures up front: we measure the time you save. If there's nothing worth automating, or a simple script is enough, we tell you."],
		],
	},
	plugin: {
		title: 'Our WordPress plugins',
		lead: 'Read the code and the docs before the first call. This is the same standard we use for client work.',
		summary:
			'Barion Pixel tracking for WooCommerce shops, with cookie consent support. Free on wordpress.org.',
		docs: 'Read the docs',
		wporg: 'wordpress.org',
		github: 'Source on GitHub',
		specTitle: 'Specification',
		// Copied from wordpress.org on 2026-10-28 (both languages); update it with each release.
		spec: [
			['Version', '1.0.10'],
			['Active installs', '80+'],
			['WordPress', '5.0 or higher'],
			['PHP', '7.4 or higher'],
			['WooCommerce', '5.0 or higher'],
			['Docs', '9 languages'],
			['License', 'GPL-2.0-or-later'],
		],
	},
	process: {
		title: 'How a project runs',
		cols: { rev: 'No.', step: 'Step', what: 'What happens' },
		rows: [
			['1', 'Call', 'A free 30-minute call. You tell us what you need, and we ask questions until the scope is clear.'],
			['2', 'Scope', 'You get a written scope and an estimate before any work starts.'],
			['3', 'Build', 'We build in small steps. You get a preview link at each step.'],
			['4', 'Handover', 'You get the code, the docs and a walkthrough. We fix bugs for free for 30 days after handover.'],
			['5', 'Improve', 'After a month, we show you the time saved and tune what needs it. You can keep the code, or we host and run it for you.'],
		],
	},
	contact: {
		title: 'Have something to build?',
		lead: "I'm Gergely Csécsey, and I've built on WordPress and WooCommerce for 10 years. In a free 30-minute call, we look at your site and how your team works, and I tell you the first step that pays off fastest.",
		form: {
			name: 'Name',
			email: 'Email',
			message: 'What do you need help with?',
			privacy: 'We reply within one business day, and only use your details to reply to you.',
			sent: 'Thanks! We got your message and will reply within one business day.',
			error: 'Something went wrong. Please write to us at {email}.',
		},
	},
	footer: { docs: 'Plugin docs' },
	blog: { title: 'Blog', description: 'News from Plot Twist.', back: 'All posts' },
};

const hu: typeof en = {
	htmlTitle: 'Plot Twist · WordPress, WooCommerce és AI-automatizálás',
	description:
		'A Plot Twist WordPress- és WooCommerce-oldalakat fejleszt és üzemeltet, AI-jal automatizálja az ismétlődő feladatokat, és ügyfélszolgálati AI-asszisztenseket épít.',
	nav: { services: 'Szolgáltatások', plugins: 'Bővítmények', docs: 'Dokumentáció', blog: 'Blog', cta: 'Ingyenes konzultáció' },
	langSwitch: { label: 'English', short: 'EN', href: '/' },
	hero: {
		title: 'WordPress, WooCommerce és AI,',
		titleTwist: 'egy kis csavarral.',
		lead: 'Írjuk át a forgatókönyvet: kevesebb kézi munka, gyorsabb válaszok és egy webshop, amely nem áll le. WordPress- és WooCommerce-fejlesztésben, valamint AI-automatizálásban segítünk, a tervezéstől az üzemeltetésig.',
		cta: 'Ingyenes konzultációt kérek',
		secondary: 'Nézd meg a bővítményeinket',
	},
	drawing: {
		label:
			'A Plot Twist logó szerkesztési rajza. Két egyforma fél áll egymás mellett; a jobb oldali 10 egységgel magasabban van. Ez az eltolás a csavar.',
		a: 'WordPress és WooCommerce',
		b: 'AI-automatizálás',
		c: 'Ügyfélszolgálati eszközök',
	},
	services: {
		title: 'Miben segítünk?',
		lead: 'Kicsiben kezdünk: először egy feladatot oldunk meg, és csak akkor lépünk tovább, ha az első megtérült.',
		groups: [
			{
				ref: 'A',
				name: 'WordPress és WooCommerce',
				lead: 'WordPress-oldalak és WooCommerce-webshopok építése, javítása és napi gondozása.',
				items: ['WordPress- és WooCommerce-tanácsadás', 'E-kereskedelem', 'Weboldal-üzemeltetés', 'Tárhely', 'UI/UX-tervezés'],
			},
			{
				ref: 'B',
				name: 'AI-automatizálás',
				lead: 'Megkeressük, melyik ismétlődő feladatot végezheti el helyetted egy program, és automatizáljuk.',
				items: ['AI-alapú folyamatautomatizálás', 'Analitika és automatizáció', 'Gépi tanulás'],
			},
			{
				ref: 'C',
				name: 'Ügyfélszolgálati eszközök',
				lead: 'Gyorsabb válaszok az ügyfeleidnek, kevesebb ismétlődő kérdés a csapatodnak.',
				items: ['AI-válaszok a saját dokumentációdból és termékeidből', 'E-mailek és ügyfélszolgálati jegyek automatikus kezelése', 'Automatikus válasz a „Hol tart a rendelésem?” kérdésekre'],
			},
		],
		also: {
			label: 'Továbbá',
			items: ['Felhőstratégia', 'Rendszertervezés', 'Szoftverfejlesztés', 'Minőségbiztosítás', 'Alkalmazás-üzemeltetés', 'Marketing'],
		},
		tools: {
			label: 'Magyar rendszerek, amelyekkel már dolgoztunk',
			items: ['Barion', 'SimplePay', 'Számlázz.hu', 'Billingo', 'Innvoice', 'Foxpost', 'GLS'],
		},
	},
	ai: {
		title: 'Így használjuk az AI-t',
		lead: 'Három szabály, amit minden AI-projektben betartunk.',
		notes: [
			['Először a saját adataid', 'Az AI a saját dokumentációdból, termékeidből és rendeléseidből válaszol, így a vevő a te válaszodat kapja, nem egy általánosat.'],
			['Ember hagyja jóvá', 'Eleinte a csapatodból valaki jóváhagyja a válaszokat. Automatikusan csak akkor mennek ki, ha már megbízhatóak.'],
			['Mérjük a megtakarított időt', 'Megtérülési számokat nem ígérünk előre: mérjük, mennyi időt spórolsz. Ha nincs mit automatizálni, vagy egy egyszerű szkript is elég, megmondjuk.'],
		],
	},
	plugin: {
		title: 'WordPress-bővítményeink',
		lead: 'Nézd meg a kódot és a dokumentációt még az első konzultáció előtt. Az ügyfeleinknek is ugyanilyen gondossággal dolgozunk.',
		summary:
			'Barion Pixel-mérés WooCommerce-webshopokhoz, a cookie-hozzájárulás kezelésével. Ingyenesen letölthető a wordpress.org-ról.',
		docs: 'Dokumentáció',
		wporg: 'wordpress.org',
		github: 'Forráskód a GitHubon',
		specTitle: 'Specifikáció',
		spec: [
			['Verzió', '1.0.10'],
			['Aktív telepítések', '80+'],
			['WordPress', '5.0 vagy újabb'],
			['PHP', '7.4 vagy újabb'],
			['WooCommerce', '5.0 vagy újabb'],
			['Dokumentáció', '9 nyelven'],
			['Licenc', 'GPL-2.0-or-later'],
		],
	},
	process: {
		title: 'Így zajlik egy projekt',
		cols: { rev: 'Sz.', step: 'Lépés', what: 'Mi történik' },
		rows: [
			['1', 'Konzultáció', 'Egy ingyenes, 30 perces beszélgetés. Elmondod, mire van szükséged, mi pedig addig kérdezünk, amíg a feladat világos.'],
			['2', 'Ajánlat', 'Mielőtt bármi elkezdődne, írásban megkapod a feladat leírását és a becsült költséget.'],
			['3', 'Fejlesztés', 'Kis lépésekben építünk. Minden lépés után kapsz egy előnézeti linket.'],
			['4', 'Átadás', 'Megkapod a kódot, a dokumentációt és egy bemutatót. Az átadás után 30 napig ingyen javítjuk a hibákat.'],
			['5', 'Finomítás', 'Egy hónap után megmutatjuk, mennyi időt spóroltál, és finomítjuk, amit kell. A kód a tiéd lehet, vagy mi üzemeltetjük, ha nem akarsz vele foglalkozni.'],
		],
	},
	contact: {
		title: 'Mesélj a projektedről!',
		lead: 'Csécsey Gergely vagyok, 10 éve fejlesztek WordPressre és WooCommerce-re. Az ingyenes, 30 perces konzultáción átnézzük az oldaladat és a csapatod munkáját, és megmondom, melyik lépés térül meg a leggyorsabban.',
		form: {
			name: 'Név',
			email: 'E-mail',
			message: 'Miben segíthetünk?',
			privacy: 'Egy munkanapon belül válaszolunk, és az adataidat csak a válaszhoz használjuk.',
			sent: 'Köszönjük! Megkaptuk az üzenetedet, egy munkanapon belül válaszolunk.',
			error: 'Valami hiba történt. Írj nekünk a {email} címen.',
		},
	},
	footer: { docs: 'Bővítmény-dokumentáció' },
	blog: { title: 'Blog', description: 'Hírek a Plot Twisttől.', back: 'Összes bejegyzés' },
};

export const strings = { en, hu };
