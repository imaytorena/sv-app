<script lang="ts">
	let { count = 0, limit } = $props();
	const blockActions = $derived(count >= limit);
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
			if (data.error) throw Error(data.error);

			count = parseInt(data.count);
		} catch (e) {
			count = 0;
		}
	};

</script>

<span
	class=" text-amber-500 font-mono text-xs mt-10">
		CURRENT LIMIT SET TO: {limit}
	{ blockActions ? "(LIMIT REACHED)" : ""}
</span>

<div class="counter flex gap-1.5 {blockActions?'text-[#757b7a]':''}">
	{#each arrayCount as c}
		<div class="counter-viewport">
			<div class="counter-number flex flex-col">
				<strong>{Math.floor(c)}</strong>
			</div>
		</div>
	{/each}
</div>

<div class="buttons {blockActions?'disabled':''}">
	<button disabled={blockActions} onclick={decrease} aria-label="Decrease the counter by one">-</button>
	<button disabled={blockActions} onclick={increase} aria-label="Increase the counter by one">+</button>
</div>

<style>
    .buttons {
        @apply flex gap-10 justify-center
        text-2xl font-bold text-[#E35D4F]
        border-[#E35D4F] border-t-2 px-5 pb-1;
    }

    .buttons.disabled {
        @apply text-[#ee9d95] border-[#ee9d95];
    }

    .counter {
        @apply font-light text-[5em]
    }
</style>
