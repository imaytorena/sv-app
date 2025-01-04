import { json } from '@sveltejs/kit';
import { createClient } from 'redis';
import { REDIS_PUBLIC_URL } from '$env/static/private';

export async function POST({ request }) {
	try {
		const { id } = await request.json();

		// ==== REDIS CONNECTION ===============
		const client = createClient({ url: REDIS_PUBLIC_URL });
		client.on('error', (err) => console.error('Redis Error', err));
		await client.connect();

		let redisCount = (await client.get('count')) ?? '0';
		const count = parseInt(redisCount);

		if (id === 0) {
			if (count > 0) {
				// ==== REDIS VALUE DECREASING =====
				await client.decr('count');
			}
		} else {
			// ==== REDIS VALUE INCREMENTATION =====
			await client.incr('count');
		}
		// ==== REDIS GET CURRENT COUNT ========
		const currentCount = (await client.get('count')) ?? '0';

		return json({ count: parseInt(currentCount) }, { status: 201 });
	} catch (err) {
		// @ts-ignore
		return json({ count: 0, error: err?.message }, { status: 400 });
	}
}
