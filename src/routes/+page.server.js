import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

const DEFAULT_CATEGORIES = ['Arbeit', 'Freizeit', 'Familie', 'Gesundheit'];
const DEFAULT_PERSONS = ['Freund', 'Familie', 'Kollege', 'Partner'];

// Load-Funktion: Lädt die letzten 3 Mood-Einträge und Settings des eingeloggten Users
export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const db = await getDb();
	const userId = locals.user.id;

	const entries = await db
		.collection('moodEntries')
		.find({ userId })
		.sort({ createdAt: -1 })
		.limit(3)
		.toArray();

	let settings = await db.collection('userSettings').findOne({ userId });

	if (!settings) {
		settings = {
			categories: DEFAULT_CATEGORIES,
			persons: DEFAULT_PERSONS
		};
	}

	return {
		username: locals.user.username,
		entries: entries.map((entry) => ({
			id: entry._id.toString(),
			title: entry.title,
			date: entry.date,
			persons: entry.persons,
			category: entry.category,
			mood: entry.mood,
			description: entry.description
		})),
		categories: settings.categories || DEFAULT_CATEGORIES,
		persons: settings.persons || DEFAULT_PERSONS
	};
}

// Actions: Verarbeitet das Formular zum Speichern eines neuen Eintrags
export const actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const data = await request.formData();

		const title = data.get('title')?.toString();
		const date = data.get('date')?.toString();
		const persons = data.get('persons')?.toString();
		const category = data.get('category')?.toString();
		const mood = parseInt(data.get('mood'), 10);
		const description = data.get('description')?.toString() ?? '';

		const db = await getDb();

		await db.collection('moodEntries').insertOne({
			userId: locals.user.id,
			title,
			date,
			persons,
			category,
			mood,
			description,
			createdAt: new Date(),
			updatedAt: new Date()
		});

		const showWarning = mood < 5;

		return { success: true, showWarning };
	}
};