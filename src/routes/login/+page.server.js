import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();

		const email = data.get('email')?.toString().toLowerCase().trim();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, {
				error: 'Bitte E-Mail und Passwort eingeben.'
			});
		}

		const db = await getDb();
		const user = await db.collection('users').findOne({ email });

		if (!user || user.password !== password) {
			return fail(400, {
				error: 'E-Mail oder Passwort ist falsch.'
			});
		}

		cookies.set('userId', user._id.toString(), {
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(303, '/');
	},

	register: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString().trim();
		const email = data.get('email')?.toString().toLowerCase().trim();
		const password = data.get('password')?.toString();
		const passwordConfirm = data.get('passwordConfirm')?.toString();

		if (!username || !email || !password || !passwordConfirm) {
			return fail(400, {
				error: 'Bitte alle Felder ausfüllen.',
				values: { username, email }
			});
		}

		if (password !== passwordConfirm) {
			return fail(400, {
				error: 'Passwörter müssen übereinstimmen.',
				values: { username, email }
			});
		}

		const db = await getDb();

		const existingUser = await db.collection('users').findOne({ email });

		if (existingUser) {
			return fail(400, {
				error: 'Diese E-Mail ist bereits registriert.',
				values: { username, email }
			});
		}

		await db.collection('users').insertOne({
			username,
			email,
			password,
			createdAt: new Date()
		});

		throw redirect(303, '/login');
	}
};