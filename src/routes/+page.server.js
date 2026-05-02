import { getDb } from '$lib/server/db.js';

// Load-Funktion: Lädt die letzten 3 Mood-Einträge aus der Datenbank
export async function load() {
  const db = await getDb();
  const entries = await db.collection('moodEntries')
    .find({ userId: 'demo-user' }) // Nur Einträge für den Demo-User
    .sort({ createdAt: -1 }) // Neueste zuerst
    .limit(3) // Nur die letzten 3
    .toArray();

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

// Actions: Verarbeitet das Formular zum Speichern eines neuen Eintrags
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    // Formulardaten extrahieren
    const title = data.get('title');
    const date = data.get('date');
    const persons = data.get('persons');
    const category = data.get('category');
    const mood = parseInt(data.get('mood'), 10);
    const description = data.get('description');

    // Neuen Eintrag erstellen
    const newEntry = {
      userId: 'demo-user', // Vorerst fester Demo-User
      title,
      date,
      persons,
      category,
      mood,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In MongoDB speichern
    const db = await getDb();
    await db.collection('moodEntries').insertOne(newEntry);

    // Wenn Stimmung < 5, soll die WarningBox angezeigt werden
    const showWarning = mood < 5;

    // Nach dem Speichern die Seite neu laden (kein Redirect nötig)
    return { success: true, showWarning };
  }
};