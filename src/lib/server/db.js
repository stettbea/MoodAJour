import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

let client;
let db;

export async function getDb() {
  if (db) return db;
  if (!client) {
    client = new MongoClient(env.MONGODB_URI);
    await client.connect();
  }
  db = client.db('moodajour');
  return db;
}