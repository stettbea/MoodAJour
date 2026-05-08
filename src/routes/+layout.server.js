import { redirect } from '@sveltejs/kit';

export function load({ locals, url }) {
	if (!locals.user && url.pathname !== '/login' && url.pathname !== '/tipps') {
		throw redirect(303, '/login');
	}
	return {
		user: locals.user
	};
}