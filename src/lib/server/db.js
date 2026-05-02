import { MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_DB } from '$env/static/private';

// Singleton-Verbindung: Client wird nur einmal erstellt und wiederverwendet
let client;
let clientPromise;

if (!globalThis.__mongoClientPromise) {
  client = new MongoClient(MONGODB_URI);
  globalThis.__mongoClientPromise = client.connect();
}
clientPromise = globalThis.__mongoClientPromise;

// Funktion, um die Datenbank-Verbindung zu bekommen
export async function getDb() {
  const client = await clientPromise;
  return client.db(MONGODB_DB);
}