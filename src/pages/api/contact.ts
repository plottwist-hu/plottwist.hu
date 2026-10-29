import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { localePath } from '../../i18n/strings';

export const prerender = false;

const field = (form: FormData, name: string) => String(form.get(name) ?? '').trim();

export const POST: APIRoute = async ({ request, redirect }) => {
	const form = await request.formData();
	const lang = form.get('lang') === 'hu' ? 'hu' : 'en';
	// The home page shows the matching message through :target, so the form works without our own JS.
	const back = (status: 'sent' | 'error') => redirect(`${localePath(lang, '/')}#contact-${status}`, 303);

	// Collapse whitespace so a name can't add lines to the email subject.
	const name = field(form, 'name').replace(/\s+/g, ' ');
	const email = field(form, 'email');
	const message = field(form, 'message');
	if (!name || name.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 5000) {
		return back('error');
	}

	const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body: new URLSearchParams({
			secret: env.TURNSTILE_SECRET_KEY,
			response: field(form, 'cf-turnstile-response'),
			remoteip: request.headers.get('CF-Connecting-IP') ?? '',
		}),
	});
	const { success } = (await check.json()) as { success: boolean };
	if (!success) return back('error');

	try {
		// Without Email Sending, Cloudflare only delivers to verified destination addresses, so CONTACT_TO must be one.
		await env.EMAIL.send({
			from: { email: 'form@plottwist.hu', name: 'plottwist.hu' },
			to: env.CONTACT_TO,
			replyTo: { email, name },
			subject: `Contact form: ${name}`,
			text: `${message}\n\n${name} <${email}>\nPage language: ${lang}`,
		});
	} catch (error) {
		console.error('Contact form email failed', error);
		return back('error');
	}
	return back('sent');
};
