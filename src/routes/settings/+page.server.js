import { getDb } from '$lib/server/db.js';

// Defaultwerte für Einstellungen
const DEFAULT_CATEGORIES = ['Arbeit', 'Freizeit', 'Familie', 'Gesundheit'];
const DEFAULT_PERSONS = ['Freund', 'Familie', 'Kollege', 'Partner'];

// Load-Funktion: Lade die Benutzer-Einstellungen und welche verwendet werden
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

  // Finde welche Kategorien und Personen in Mood-Einträgen verwendet werden
  const usedCategories = await db.collection('moodEntries')
    .distinct('category', { userId: 'demo-user' });
  
  const usedPersons = await db.collection('moodEntries')
    .distinct('persons', { userId: 'demo-user' });

  return {
    categories: settings.categories || DEFAULT_CATEGORIES,
    persons: settings.persons || DEFAULT_PERSONS,
    usedCategories: usedCategories.filter(c => c && c.trim()),
    usedPersons: usedPersons.filter(p => p && p.trim())
  };
}

// Actions: Speichere die Benutzer-Einstellungen (mit Validierung)
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    // Extrahiere Kategorien und Personen aus dem Formular
    const formCategories = data.getAll('category').filter(c => c.trim());
    const formPersons = data.getAll('person').filter(p => p.trim());

    const db = await getDb();

    // Finde die aktuellen Einstellungen
    const currentSettings = await db.collection('userSettings').findOne({ userId: 'demo-user' });
    const currentCategories = currentSettings?.categories || DEFAULT_CATEGORIES;
    const currentPersons = currentSettings?.persons || DEFAULT_PERSONS;

    // Finde welche Kategorien und Personen aktuell verwendet werden
    const usedCategories = await db.collection('moodEntries')
      .distinct('category', { userId: 'demo-user' });
    
    const usedPersons = await db.collection('moodEntries')
      .distinct('persons', { userId: 'demo-user' });

    const usedCategoriesSet = new Set(usedCategories.filter(c => c && c.trim()));
    const usedPersonsSet = new Set(usedPersons.filter(p => p && p.trim()));

    // Finde welche Kategorien gelöscht werden sollen
    const deletedCategories = currentCategories.filter(c => !formCategories.includes(c));
    const deletedPersons = currentPersons.filter(p => !formPersons.includes(p));

    // Prüfe, ob gelöschte Kategorien/Personen verwendet werden
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

    // Aktualisiere oder erstelle die Einstellungen
    await db.collection('userSettings').updateOne(
      { userId: 'demo-user' },
      {
        $set: {
          userId: 'demo-user',
          categories: formCategories,
          persons: formPersons,
          updatedAt: new Date()
        }
      },
      { upsert: true } // Erstelle, wenn nicht vorhanden
    );

    return { success: true };
  }
};