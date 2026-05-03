import { getDb } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function handle({ event, resolve }) {
	const userId = event.cookies.get('userId');

	event.locals.user = null;

	if (userId) {
		const db = await getDb();

		const user = await db.collection('users').findOne({
			_id: new ObjectId(userId)
		});

		if (user) {
			event.locals.user = {
				id: user._id.toString(),
				username: user.username,
				email: user.email
			};
		}
	}

	return resolve(event);
}