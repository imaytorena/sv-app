import { type Load } from '@sveltejs/kit';
import { createClient } from 'redis';
import { REDIS_PUBLIC_URL } from '$env/static/private';

type PageData = { count: number };

export type PageLoad = Load<{}>;
export const load: PageLoad = async (): Promise<PageData> => {
	// ==== REDIS CONNECTION ===============
	const client = createClient({ url: REDIS_PUBLIC_URL });
	client.on('error', err => console.error('Redis Error', err));
	await client.connect();

	// ==== REDIS GET CURRENT COUNT ========
	const currentCount = await client.get('count') ?? "0";

	return {
		count: parseInt(currentCount)
	};
};
