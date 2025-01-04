import { json } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';

export async function POST({ request, platform }) {
	try {
		const { id } = await request.json();
		const kv: KVNamespace<string> | undefined = platform?.env?.KV_NAMESPACE ?? undefined;
		console.log(kv);
		const kvCount = await kv?.get('count') ?? "0";
		const count = parseInt(kvCount);

		if (id === 0) {
			if (count > 0) {
				await kv?.put('count', String(count-1));
			}
		} else {
			await kv?.put('count', String(count+1));
		}
		const currentCount = await kv?.get('count') ?? "0";

		return json({ count: parseInt(currentCount) }, { status: 201 });
	} catch (err) {
		// @ts-ignore
		return json({ count: 0, error: err?.message }, { status: 400 });
	}
}
