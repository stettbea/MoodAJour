import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';

export async function load({ url, locals }) {
	const entryId = url.searchParams.get('entryId');

	if (!entryId || !locals.user) {
		return { entryId: null, usedTips: [] };
	}

	try {
		const db = await getDb();
		const entry = await db.collection('moodEntries').findOne({
			_id: new ObjectId(entryId),
			userId: locals.user.id
		});
		return { entryId, usedTips: entry?.usedTips ?? [] };
	} catch {
		return { entryId: null, usedTips: [] };
	}
}

export const actions = {
	saveTips: async ({ request, locals }) => {
		if (!locals.user) throw redirect(303, '/login');

		const data = await request.formData();
		const entryId = data.get('entryId')?.toString();
		const selectedTips = data.getAll('tip').map((t) => t.toString());

		if (!entryId) return { success: false };

		try {
			const db = await getDb();
			await db.collection('moodEntries').updateOne(
				{ _id: new ObjectId(entryId), userId: locals.user.id },
				{ $set: { usedTips: selectedTips, updatedAt: new Date() } }
			);
			return { success: true };
		} catch {
			return { success: false, error: 'Fehler beim Speichern.' };
		}
	}
};
