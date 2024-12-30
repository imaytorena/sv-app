<script lang="ts">
	// import { spring } from 'svelte/motion';

	let count = $state(2934);

	// // svelte-ignore state_referenced_locally
	// const displayedCount = spring(count);
	//
	// $effect(() => {
	// 	displayedCount.set(count);
	// });
	// let offset = $derived(modulo($displayedCount, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="flex gap-1.5">

	{#each String(count).padStart(10, "0") as c}
		<div class="counter">
			<div class="counter-viewport">
		<!--		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">-->
		<!--			<strong class="hidden" aria-hidden="true">{Math.floor($displayedCount + 1)}</strong>-->
					<strong>{Math.floor(c)}</strong>
		<!--		</div>-->
			</div>
		</div>
	{/each}
</div>

<div class="action-buttons flex justify-center w-1/2">
	<button onclick={() => (count -= 1)} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5" />
		</svg>
	</button>

	<button onclick={() => (count += 1)} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button>
</div>

<style>
		.action-buttons button {
				@apply flex items-center justify-center
		}
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		/*margin: 1rem 0;*/
		@apply p-1.5 border-white border-opacity-5 border-solid border-4 rounded-xl
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 3em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;

	}
</style>
