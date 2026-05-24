import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';

const DEFAULT_CATEGORIES = ['Arbeit', 'Freizeit', 'Familie', 'Gesundheit'];
const DEFAULT_PERSONS = ['Freund', 'Familie', 'Kollege', 'Partner'];

export async function load({ params, locals }) {
	if (!locals.user) {
		redirect(303, '/login');
	}

	const db = await getDb();
	const userId = locals.user.id;

	let entry;
	try {
		entry = await db.collection('moodEntries').findOne({
			_id: new ObjectId(params.id),
			userId
		});
	} catch {
		throw error(400, 'Ungültige Eintrags-ID');
	}

	if (!entry) {
		throw error(404, 'Mood-Eintrag nicht gefunden');
	}

	const settings = await db.collection('userSettings').findOne({ userId });

	const usedCategories = await db
		.collection('moodEntries')
		.distinct('category', { userId });

	const usedPersons = await db
		.collection('moodEntries')
		.distinct('persons', { userId });

	return {
		entry: {
			id: entry._id.toString(),
			title: entry.title,
			date: entry.date ? entry.date.split('T')[0] : '',
			persons: entry.persons,
			category: entry.category,
			mood: entry.mood,
			description: entry.description
		},
		categories: settings?.categories ?? DEFAULT_CATEGORIES,
		persons: settings?.persons ?? DEFAULT_PERSONS,
		usedCategories: usedCategories.filter((c) => c && c.trim()),
		usedPersons: usedPersons.filter((p) => p && p.trim())
	};
}

export const actions = {
	save: async ({ request, params, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const data = await request.formData();

		const title = data.get('title')?.toString();
		const date = data.get('date')?.toString();
		const persons = data.get('persons')?.toString();
		const category = data.get('category')?.toString();
		const mood = Number(data.get('mood'));
		const description = data.get('description')?.toString() ?? '';

		const db = await getDb();

		const result = await db.collection('moodEntries').updateOne(
			{ _id: new ObjectId(params.id), userId: locals.user.id },
			{ $set: { title, date, persons, category, mood, description, updatedAt: new Date() } }
		);

		if (result.matchedCount === 0) {
			throw error(404, 'Mood-Eintrag nicht gefunden');
		}

		throw redirect(303, '/overview');
	}
};
