<script lang="ts">
	import Counter from './Counter.svelte';

	const COUNT_LIMITER_FALLBACK = 10;

	type PageData = { count: number, limit?: number };
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>count to 50</title>
	<meta name="description" content="counter but doesn't strike" />
</svelte:head>

<section class="flex flex-col">
	<p class=" text-white font-mono text-lg">
		low-latency counter saved on <a class="italic" href="https://developers.cloudflare.com/kv/"
																		title="Cloudflare KV documentation" target="_blank">CF-KV</a>
	</p>
	<Counter count={data.count ?? 0} limit={data.limit ?? COUNT_LIMITER_FALLBACK} />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
</style>
