import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ locals }) => {
	const route = locals.starlightRoute;
	// The docs header shows the plugin, so its link goes to the plugin docs, not the company home page.
	route.siteTitleHref = route.siteTitleHref.replace(/\/?$/, '/docs/advanced-pixel-for-barion/');
	// The docs home page has the same title as the site; don't print it twice.
	const title = route.head.find(({ tag }) => tag === 'title');
	if (title && route.entry.data.title === route.siteTitle) title.content = route.siteTitle;
	// The company site exists only in English and Hungarian.
	route.sidebar.unshift({
		type: 'link',
		label: '← Plot Twist',
		href: route.locale === 'hu' ? '/hu/' : '/',
		isCurrent: false,
		badge: undefined,
		attrs: {},
	});
});
