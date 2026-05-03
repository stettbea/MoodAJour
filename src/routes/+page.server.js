import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

// Load-Funktion: Lädt die letzten 3 Mood-Einträge des eingeloggten Users
export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const db = await getDb();

	const entries = await db.collection('moodEntries')
		.find({ userId: locals.user.id })
		.sort({ createdAt: -1 })
		.limit(3)
		.toArray();

	return {
		entries: entries.map(entry => ({
			id: entry._id.toString(),
			title: entry.title,
			date: entry.date,
			persons: entry.persons,
			category: entry.category,
			mood: entry.mood,
			description: entry.description
		}))
	};
}

// Actions: Verarbeitet das Formular zum Speichern eines neuen Eintrags
export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const data = await request.formData();

		const title = data.get('title');
		const date = data.get('date');
		const persons = data.get('persons');
		const category = data.get('category');
		const mood = parseInt(data.get('mood'), 10);
		const description = data.get('description');

		const newEntry = {
			userId: locals.user.id, // ✅ WICHTIG: echter eingeloggter User
			title,
			date,
			persons,
			category,
			mood,
			description,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		const db = await getDb();
		await db.collection('moodEntries').insertOne(newEntry);

		const showWarning = mood < 5;

		return { success: true, showWarning };
	}
};