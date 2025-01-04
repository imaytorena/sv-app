import { json } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';

const LIMIT = 50;

export async function GET({ platform }) {
	try {
		const kvCount = (await platform?.env?.COUNTER.get('count')) ?? '0';
		return json({ count: parseInt(kvCount) }, { status: 201 });
	} catch (err) {
		// @ts-ignore
		return json({ count: 0, error: err?.message }, { status: 400 });
	}
}

export async function POST({ request, platform }) {
	try {
		const { id } = await request.json();
		const kv: KVNamespace | undefined = platform?.env?.COUNTER ?? undefined;
		if (!kv) {
			throw new Error('KV_NOT_FOUND');
		}

		const kvCount = (await kv?.get('count')) ?? '0';
		const count = parseInt(kvCount);
		if (LIMIT <= count)  return json({
			count: count,
			message: 'WHY ARE U TRYING TO REACH THIS ENDPOINT BRO????'
		}, { status: 404 }) ;

		if (id === 0) {
			if (count > 0) {
				await kv?.put('count', String(count - 1));
			}
		} else {
			await kv?.put('count', String(count + 1));
		}
		const currentCount = (await kv?.get('count')) ?? '0';

		return json({ count: parseInt(currentCount) }, { status: 201 });
	} catch (err) {
		// @ts-ignore
		return json({ count: 0, error: err?.message }, { status: 400 });
	}
}
