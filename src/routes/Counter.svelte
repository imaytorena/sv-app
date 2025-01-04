<script lang="ts">
	let { count = 0 } = $props();
	let arrayCount = $derived(String(count).padStart(5, '0').split('').map(c => parseInt(c)));
	$effect(() => {
		if (count <= 0) {
			count = 0;
		}
	});

	let decrease = async () => {
		try {
			const response = await fetch('/api/action', {
				method: 'POST',
				body: JSON.stringify({ id: 0, count }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			count = parseInt(data.count);
		} catch (e) {
			console.error(e);
		}
	};
	let increase = async () => {
		try {
			const response = await fetch('/api/action', {
				method: 'POST',
				body: JSON.stringify({ id: 1, count }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			count = parseInt(data.count);
		} catch (e) {
			console.error(e);
		}
	};

</script>

<div class="counter flex gap-1.5">
	{#each arrayCount as c}
		<div class="counter-viewport">
			<div class="counter-number flex flex-col">
				<!--				<strong class="hidden" aria-hidden="true">{c > 0 ? Math.floor(c - 1) % 10 : 0}</strong>-->
				<strong>{Math.floor(c)}</strong>
				<!--				<strong class="hidden" aria-hidden="true">{Math.floor(c + 1) % 10}</strong>-->
			</div>
		</div>
	{/each}
</div>

<div class="flex gap-5 text-2xl font-bold text-[#E35D4F]">
	<button onclick={decrease} aria-label="Decrease the counter by one">-</button>
	<button onclick={increase} aria-label="Increase the counter by one">+</button>
</div>

<style>
    .counter {
        font-weight: 300;
        font-size: 5em;
    }
</style>
