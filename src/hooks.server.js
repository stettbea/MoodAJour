import { getDb } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function handle({ event, resolve }) {
	const userId = event.cookies.get('userId');

	event.locals.user = null;

	if (userId) {
		try {
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
			} else {
				event.cookies.delete('userId', { path: '/' });
			}
		} catch {
			event.cookies.delete('userId', { path: '/' });
		}
	}

	return resolve(event);
}
