import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

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

		return { success: true, showWarning: mood < 5 };
	}
};

const DEFAULT_CATEGORIES = ['Arbeit', 'Freizeit', 'Familie', 'Gesundheit'];
const DEFAULT_PERSONS = ['Freund', 'Familie', 'Kollege', 'Partner'];

export async function load({ url, locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const params = url.searchParams;
	const query = { userId: locals.user.id };

	const filters = {
		title: params.get('title') ?? '',
		category: params.get('category') ?? '',
		mood: params.get('mood') ?? '',
		persons: params.get('persons') ?? '',
		day: params.get('day') ?? '',
		month: params.get('month') ?? '',
		year: params.get('year') ?? ''
	};

	if (filters.title) {
		query.title = { $regex: filters.title, $options: 'i' };
	}

	if (filters.persons) {
		query.persons = { $regex: filters.persons, $options: 'i' };
	}

	if (filters.category) {
		query.category = filters.category;
	}

	if (filters.mood) {
		const moodValue = Number(filters.mood);
		if (!Number.isNaN(moodValue)) {
			query.mood = moodValue;
		}
	}

	if (filters.day || filters.month || filters.year) {
		const year = filters.year || '\\d{4}';
		const month = filters.month ? String(filters.month).padStart(2, '0') : '\\d{2}';
		const day = filters.day ? String(filters.day).padStart(2, '0') : '\\d{2}';
		const datePattern = `^${year}-${month}-${day}`;
		query.date = { $regex: new RegExp(datePattern) };
	}

	const db = await getDb();

	const entries = await db
		.collection('moodEntries')
		.find(query)
		.sort({ createdAt: -1 })
		.toArray();

	let settings = await db.collection('userSettings').findOne({
		userId: locals.user.id
	});

	if (!settings) {
		settings = {
			categories: DEFAULT_CATEGORIES,
			persons: DEFAULT_PERSONS
		};
	}

	const usedCategories = await db
		.collection('moodEntries')
		.distinct('category', { userId: locals.user.id });

	const usedPersons = await db
		.collection('moodEntries')
		.distinct('persons', { userId: locals.user.id });

	return {
		entries: entries.map((entry) => ({
			id: entry._id.toString(),
			title: entry.title,
			date: entry.date,
			persons: entry.persons,
			category: entry.category,
			mood: entry.mood,
			description: entry.description
		})),
		filters,
		categories: settings.categories || DEFAULT_CATEGORIES,
		persons: settings.persons || DEFAULT_PERSONS,
		usedCategories: usedCategories.filter((c) => c && c.trim()),
		usedPersons: usedPersons.filter((p) => p && p.trim())
	};
}