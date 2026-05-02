import { getDb } from '$lib/server/db.js';

// Load-Funktion: Lädt alle Mood-Einträge aus der Datenbank für den Demo-User
export async function load() {
  const db = await getDb();
  const entries = await db.collection('moodEntries')
    .find({ userId: 'demo-user' }) // Nur Einträge für den Demo-User
    .sort({ createdAt: -1 }) // Neueste zuerst
    .toArray();

  // In frontend-freundliches Format mappen
  return {
    entries: entries.map(entry => ({
      id: entry._id.toString(), // ObjectId als String
      title: entry.title,
      date: entry.date,
      persons: entry.persons,
      category: entry.category,
      mood: entry.mood,
      description: entry.description
    }))
  };
}