import { getDb } from '$lib/server/db.js';

// Defaultwerte für Einstellungen
const DEFAULT_CATEGORIES = ['Arbeit', 'Freizeit', 'Familie', 'Gesundheit'];
const DEFAULT_PERSONS = ['Freund', 'Familie', 'Kollege', 'Partner'];

// Load-Funktion: Lade die Benutzer-Einstellungen aus MongoDB
export async function load() {
  const db = await getDb();
  
  let settings = await db.collection('userSettings').findOne({
    userId: 'demo-user'
  });

  // Wenn keine Einstellungen existieren, erstelle sie mit Defaults
  if (!settings) {
    settings = {
      userId: 'demo-user',
      categories: DEFAULT_CATEGORIES,
      persons: DEFAULT_PERSONS,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  return {
    categories: settings.categories || DEFAULT_CATEGORIES,
    persons: settings.persons || DEFAULT_PERSONS
  };
}

// Actions: Speichere die Benutzer-Einstellungen
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    // Extrahiere Kategorien und Personen aus dem Formular
    const formCategories = data.getAll('category');
    const formPersons = data.getAll('person');

    const db = await getDb();

    // Aktualisiere oder erstelle die Einstellungen
    await db.collection('userSettings').updateOne(
      { userId: 'demo-user' },
      {
        $set: {
          userId: 'demo-user',
          categories: formCategories.filter(c => c.trim()),
          persons: formPersons.filter(p => p.trim()),
          updatedAt: new Date()
        }
      },
      { upsert: true } // Erstelle, wenn nicht vorhanden
    );

    return { success: true };
  }
};