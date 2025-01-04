import { type Load } from '@sveltejs/kit';
// import { createClient } from 'redis';
// import { REDIS_PUBLIC_URL } from '$env/static/private';

type PageData = { count: number };

export type PageLoad = Load<{}>;
export const load: PageLoad = async (): Promise<PageData> => {
	try {
		return {
			count: 0
		};
	} catch (e) {
		return { count: 0 };
	}
};
