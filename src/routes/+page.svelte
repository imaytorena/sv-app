<script lang="ts">
	import Counter from './Counter.svelte';

	type PageData = { count: number };
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>sv-app</title>
	<meta name="description" content="aplicación para sumar un numero en redis" />
</svelte:head>

<section>
	<!--{data.count}-->
	<Counter count={data.count ?? 0} />
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
