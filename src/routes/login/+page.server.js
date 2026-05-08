import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();

		const input = data.get('input')?.toString().toLowerCase().trim();
		const password = data.get('password')?.toString();

		if (!input || !password) {
			return fail(400, {
				action: 'login',
				error: 'Bitte E-Mail/Benutzername und Passwort eingeben.'
			});
		}

		const db = await getDb();
		const query = input.includes('@') ? { email: input } : { username: input };
		const user = await db.collection('users').findOne(query);

		if (!user || user.password !== password) {
			return fail(400, {
				action: 'login',
				error: 'E-Mail/Benutzername oder Passwort ist falsch.'
			});
		}

		cookies.set('userId', user._id.toString(), {
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(303, '/');
	},

	register: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString().trim();
		const email = data.get('email')?.toString().toLowerCase().trim();
		const password = data.get('password')?.toString();
		const passwordConfirm = data.get('passwordConfirm')?.toString();

		if (!username || !email || !password || !passwordConfirm) {
			return fail(400, {
				action: 'register',
				error: 'Bitte alle Felder ausfüllen.',
				values: { username, email }
			});
		}

		if (password !== passwordConfirm) {
			return fail(400, {
				action: 'register',
				error: 'Passwörter müssen übereinstimmen.',
				values: { username, email }
			});
		}

		const db = await getDb();

		const existingUser = await db.collection('users').findOne({
			$or: [{ email }, { username }]
		});

		if (existingUser) {
			const field = existingUser.email === email ? 'E-Mail' : 'Benutzername';
			return fail(400, {
				action: 'register',
				error: `Diese ${field} ist bereits registriert.`,
				values: { username, email }
			});
		}

		const result = await db.collection('users').insertOne({
			username,
			email,
			password,
			createdAt: new Date()
		});

		cookies.set('userId', result.insertedId.toString(), {
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(303, '/');
	}
};
