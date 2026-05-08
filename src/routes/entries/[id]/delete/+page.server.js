import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';

export const actions = {
	default: async ({ params, locals, request }) => {
		if (!locals.user) {
			redirect(303, '/login');
		}

		const data = await request.formData();
		const redirectTo = data.get('redirectTo')?.toString() || '/';

		const db = await getDb();

		let result;
		try {
			result = await db.collection('moodEntries').deleteOne({
				_id: new ObjectId(params.id),
				userId: locals.user.id
			});
		} catch {
			throw error(400, 'Ungültige Eintrags-ID');
		}

		if (result.deletedCount === 0) {
			throw error(404, 'Eintrag nicht gefunden oder keine Berechtigung');
		}

		redirect(303, redirectTo);
	}
};
