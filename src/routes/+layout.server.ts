type PageData = { count: number; limit: number };

const LIMIT = 50;

export const load = async ({ platform }): Promise<PageData> => {
	return { count: LIMIT, limit: LIMIT };
	try {
		const kvCount = (await platform?.env?.COUNTER.get('count')) ?? '0';
		return { count: parseInt(kvCount), limit: LIMIT };
	} catch (error) {
		console.error(error);
		return { count: 0, limit: 0 };
	}
};
