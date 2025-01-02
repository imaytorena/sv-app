import type { Load } from '@sveltejs/kit';

type PageData = { count: number };

export type PageLoad = Load<{}>;
export const load: PageLoad = (): PageData => {
	return {
		count: 40
	};
};
