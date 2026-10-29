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
		lead: "We are a team of dedicated, client-focused professionals, who believe in the power of building strong relationships. As businesses grow, so does their need for supporting systems and software. We're committed to supporting businesses with quality software solutions, every step of the way.",
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
	},
	ai: {
		title: 'How we use AI',
		lead: 'Three rules we keep on every AI project.',
		notes: [
			['Your data first', 'The AI answers from your own docs, products and orders, so customers get your answer, not a generic one.'],
			['A person approves', 'Someone on your team approves the answers until they are good enough to go out on their own.'],
			['We measure the hours saved', 'We measure the time you save. If a simple script is enough, we tell you and build that instead.'],
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
			['4', 'Handover', 'You get the code, the docs and a walkthrough.'],
			['5', 'Improve', 'After a month, we show you the time saved and tune what needs it. We can also look after your site after launch.'],
		],
	},
	contact: {
		title: 'Have something to build?',
		lead: 'In a free 30-minute call, we look at your site and how your team works, and tell you the first step that pays off fastest.',
		form: {
			name: 'Name',
			email: 'Email',
			message: 'What do you need help with?',
			privacy: 'We only use your details to reply to you.',
			sent: 'Thanks! We got your message and will reply soon.',
			error: 'Something went wrong. Please write to us at {email}.',
		},
	},
	footer: { docs: 'Plugin docs' },
	blog: { title: 'Blog', description: 'News from Plot Twist.', back: 'All posts' },
};

const hu: typeof en = {
	htmlTitle: 'Plot Twist · WordPress, WooCommerce és AI-automatizálás',
	description:
		'A Plot Twist szoftverfejlesztő tanácsadó cég. WordPress- és WooCommerce-oldalakat építünk és üzemeltetünk, AI-jal automatizáljuk a körülöttük lévő ismétlődő munkát, és gyorsabban válaszoló ügyfélszolgálati eszközöket építünk.',
	nav: { services: 'Szolgáltatások', plugins: 'Bővítmények', docs: 'Dokumentáció', blog: 'Blog', cta: 'Kérj ingyenes hívást' },
	langSwitch: { label: 'English', short: 'EN', href: '/' },
	hero: {
		title: 'WordPress, WooCommerce és AI,',
		titleTwist: 'egy kis csavarral.',
		lead: 'Írjuk át a forgatókönyvet: kevesebb kézi munka, gyorsabb válaszok, és egy webshop, ami nem áll le. WordPressben, WooCommerce-ben és AI-automatizálásban segítünk, a tervezéstől az üzemeltetésig.',
		cta: 'Kérj egy ingyenes 30 perces hívást',
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
		title: 'Szolgáltatások, melyek megváltoztatják a narratívát vállalkozásod körül',
		lead: 'Elkötelezett, ügyfélközpontú szakemberekből álló csapat vagyunk, akik hisznek az erős kapcsolatok építésének erejében. Ahogy egy vállalkozás bővül, úgy változnak a támogató rendszerek és szoftverek iránti igények is. Elkötelezettek vagyunk amellett, hogy minden lépésnél minőségi szoftvermegoldásokkal támogassuk a vállalkozásod.',
		groups: [
			{
				ref: 'A',
				name: 'WordPress és WooCommerce',
				lead: 'WordPress-oldalak és WooCommerce-webshopok építése, javítása és napi gondozása.',
				items: ['WordPress- és WooCommerce-tanácsadás', 'Digitális kereskedelem', 'Weboldal menedzsment', 'Web hosting', 'UI/UX design'],
			},
			{
				ref: 'B',
				name: 'AI-automatizálás',
				lead: 'Megkeressük a heti ismétlődő munkát, és átadjuk egy szoftvernek.',
				items: ['AI munkafolyamat-automatizálás', 'Analitika és automatizáció', 'Gépi tanulás'],
			},
			{
				ref: 'C',
				name: 'Ügyfélszolgálati eszközök',
				lead: 'Gyorsabb válaszok az ügyfeleidnek, kevesebb ismétlődő kérdés a csapatodnak.',
				items: ['AI-válaszok a saját dokumentációdból és termékeidből', 'Ügyfélszolgálati és levelezés-automatizálás', 'Rendelés- és szállítási státusz válaszok'],
			},
		],
		also: {
			label: 'Továbbá',
			items: ['Felhőstratégia', 'Rendszertervezés', 'Szoftverfejlesztés', 'Minőségbiztosítás', 'Alkalmazás menedzsment', 'Marketing'],
		},
	},
	ai: {
		title: 'Így használjuk az AI-t',
		lead: 'Három szabály, amit minden AI-projektben betartunk.',
		notes: [
			['Először a saját adataid', 'Az AI a saját dokumentációdból, termékeidből és rendeléseidből válaszol, így a vevő a te válaszodat kapja, nem egy általánosat.'],
			['Ember hagyja jóvá', 'A csapatodból valaki jóváhagyja a válaszokat, amíg azok elég jók ahhoz, hogy maguktól is kimehessenek.'],
			['Mérjük a megtakarított időt', 'Mérjük, mennyi időt spórolsz. Ha egy egyszerű szkript is elég, megmondjuk, és azt építjük meg.'],
		],
	},
	plugin: {
		title: 'WordPress-bővítményeink',
		lead: 'Nézd meg a kódot és a dokumentációt még az első hívás előtt. Ügyfélmunkánál is ugyanezt a mércét használjuk.',
		summary:
			'Barion Pixel követés WooCommerce-webshopokhoz, cookie-hozzájárulás támogatással. Ingyenes a wordpress.org-on.',
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
			['1', 'Hívás', 'Egy ingyenes 30 perces hívás. Elmondod, mire van szükséged, mi pedig addig kérdezünk, amíg a feladat világos.'],
			['2', 'Terjedelem', 'Írásos feladatleírást és becslést kapsz, mielőtt bármi elkezdődik.'],
			['3', 'Fejlesztés', 'Kis lépésekben építünk. Minden lépés után kapsz egy előnézeti linket.'],
			['4', 'Átadás', 'Megkapod a kódot, a dokumentációt és egy bemutatót.'],
			['5', 'Finomítás', 'Egy hónap után megmutatjuk, mennyi időt spóroltál, és finomítjuk, amit kell. Az indulás után az oldaladat is gondozhatjuk.'],
		],
	},
	contact: {
		title: 'Van valami, amit meg kell építeni?',
		lead: 'Egy ingyenes 30 perces hívásban átnézzük az oldaladat és azt, hogyan dolgozik a csapatod, és megmondjuk, melyik az a lépés, ami a leggyorsabban megtérül.',
		form: {
			name: 'Név',
			email: 'E-mail',
			message: 'Miben segíthetünk?',
			privacy: 'Az adataidat csak a válaszhoz használjuk.',
			sent: 'Köszönjük! Megkaptuk az üzenetedet, hamarosan válaszolunk.',
			error: 'Valami hiba történt. Írj nekünk a {email} címen.',
		},
	},
	footer: { docs: 'Bővítmény-dokumentáció' },
	blog: { title: 'Blog', description: 'Hírek a Plot Twisttől.', back: 'Összes bejegyzés' },
};

export const strings = { en, hu };
