type PageData = { count: number };

export const load = async ({ platform }): Promise<PageData> => {
	try {
		const kvCount = (await platform?.env?.COUNTER.get('count')) ?? '0';
		return { count: parseInt(kvCount) };
	} catch (error) {
		console.error(error);
		return { count: 0 };
	}
};
