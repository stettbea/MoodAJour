import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';

// Load-Funktion: Lade den Mood-Eintrag aus MongoDB
export async function load({ params }) {
  const db = await getDb();
  
  // Versuche, die ObjectId zu erstellen
  let entry;
  try {
    entry = await db.collection('moodEntries').findOne({
      _id: new ObjectId(params.id),
      userId: 'demo-user'
    });
  } catch (err) {
    throw error(400, 'Ungültige Eintrags-ID');
  }

  if (!entry) {
    throw error(404, 'Mood-Eintrag nicht gefunden');
  }

  // In frontend-freundliches Format mappen
  return {
    entry: {
      id: entry._id.toString(),
      title: entry.title,
      date: entry.date,
      persons: entry.persons,
      category: entry.category,
      mood: entry.mood,
      description: entry.description
    }
  };
}

// Actions: Aktualisiere den Mood-Eintrag in MongoDB
export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    // Formulardaten auslesen
    const title = data.get('title');
    const date = data.get('date');
    const persons = data.get('persons');
    const category = data.get('category');
    const mood = Number(data.get('mood'));
    const description = data.get('description');

    // In MongoDB aktualisieren
    const db = await getDb();
    const result = await db.collection('moodEntries').updateOne(
      {
        _id: new ObjectId(params.id),
        userId: 'demo-user'
      },
      {
        $set: {
          title,
          date,
          persons,
          category,
          mood,
          description,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      throw error(404, 'Mood-Eintrag nicht gefunden');
    }

    // Nach erfolgreichem Update zurück zur Übersicht
    throw redirect(303, '/overview');
  }
};