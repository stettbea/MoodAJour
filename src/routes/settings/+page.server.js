import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

const DEFAULT_CATEGORIES = ['Arbeit', 'Freizeit', 'Familie', 'Gesundheit'];
const DEFAULT_PERSONS = ['Freund', 'Familie', 'Kollege', 'Partner'];

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const db = await getDb();
	const userId = locals.user.id;

	let settings = await db.collection('userSettings').findOne({
		userId
	});

	if (!settings) {
		settings = {
			userId,
			categories: DEFAULT_CATEGORIES,
			persons: DEFAULT_PERSONS,
			createdAt: new Date(),
			updatedAt: new Date()
		};
	}

	const usedCategories = await db
		.collection('moodEntries')
		.distinct('category', { userId });

	const usedPersons = await db
		.collection('moodEntries')
		.distinct('persons', { userId });

	return {
		categories: settings.categories || DEFAULT_CATEGORIES,
		persons: settings.persons || DEFAULT_PERSONS,
		usedCategories: usedCategories.filter((c) => c && c.trim()),
		usedPersons: usedPersons.filter((p) => p && p.trim())
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const data = await request.formData();

		const formCategories = [...new Set(data.getAll('category').map((c) => c.trim()).filter(Boolean))];
		const formPersons = [...new Set(data.getAll('person').map((p) => p.trim()).filter(Boolean))];

		const db = await getDb();
		const userId = locals.user.id;

		const currentSettings = await db.collection('userSettings').findOne({ userId });
		const currentCategories = currentSettings?.categories || DEFAULT_CATEGORIES;
		const currentPersons = currentSettings?.persons || DEFAULT_PERSONS;

		const usedCategories = await db
			.collection('moodEntries')
			.distinct('category', { userId });

		const usedPersons = await db
			.collection('moodEntries')
			.distinct('persons', { userId });

		const usedCategoriesSet = new Set(usedCategories.filter((c) => c && c.trim()));
		const usedPersonsSet = new Set(usedPersons.filter((p) => p && p.trim()));

		const deletedCategories = currentCategories.filter((c) => !formCategories.includes(c));
		const deletedPersons = currentPersons.filter((p) => !formPersons.includes(p));

		for (const cat of deletedCategories) {
			if (usedCategoriesSet.has(cat)) {
				return {
					success: false,
					error: `Die Kategorie "${cat}" kann nicht gelöscht werden, da sie noch in Mood-Einträgen verwendet wird.`
				};
			}
		}

		for (const person of deletedPersons) {
			if (usedPersonsSet.has(person)) {
				return {
					success: false,
					error: `Die Person "${person}" kann nicht gelöscht werden, da sie noch in Mood-Einträgen verwendet wird.`
				};
			}
		}

		await db.collection('userSettings').updateOne(
			{ userId },
			{
				$set: {
					userId,
					categories: formCategories,
					persons: formPersons,
					updatedAt: new Date()
				},
				$setOnInsert: {
					createdAt: new Date()
				}
			},
			{ upsert: true }
		);

		return { success: true };
	}
};