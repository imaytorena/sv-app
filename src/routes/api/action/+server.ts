import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { id, count } = await request.json();
	const currentCount = id == 0 ? count - 1 : count + 1;

	return json({ count: currentCount }, { status: 201 });
}
