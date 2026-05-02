import { getDb } from '$lib/server/db.js';

// Load-Funktion: Lädt gefilterte Mood-Einträge aus MongoDB
export async function load({ url }) {
  const params = url.searchParams;
  const query = { userId: 'demo-user' };

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
  const entries = await db.collection('moodEntries')
    .find(query)
    .sort({ createdAt: -1 })
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
    })),
    filters
  };
}