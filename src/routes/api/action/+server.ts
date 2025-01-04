import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request }) {
	try {
		const { id, count } = await request.json();
		const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
		const currentCount = id == 0 ? count - 1 : count + 1;

		return json({ count: currentCount, data_mockup: data.results }, { status: 201 });
	} catch (error) {
		console.log(error);
	}
}
