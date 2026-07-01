<script lang="ts">
	import { tick } from "svelte";

	let {
		children,
		closedWidth = "15%",
		closedHeight = "5%",
		openWidth = "50%",
		openHeight = "50%",
		moveDuration = 600,
		resizeDuration = 400
	} = $props();

	let centered = $state(false);
	let resized = $state(false);
	let contentVisible = $state(false);
	let block: HTMLDivElement;

	function waitTransitionEnd(node: HTMLElement, propertyName?: string) {
		return new Promise<void>((resolve) => {
			function handler(event: TransitionEvent) {
				if (event.target !== node) return;
				if (propertyName && event.propertyName !== propertyName) return;

				node.removeEventListener("transitionend", handler);
				resolve();
			}

			node.addEventListener("transitionend", handler);
		});
	}

	async function toggle() {
		if (!centered) {
			centered = true;
			await waitTransitionEnd(block, "transform");

			resized = true;
			await waitTransitionEnd(block, "width");

			contentVisible = true;
			await tick();
		} else {
			contentVisible = false;

			resized = false;
			await waitTransitionEnd(block, "width");

			centered = false;
			await waitTransitionEnd(block, "transform");
		}
	}
</script>

<div
	bind:this={block}
	class="animated-block"
	class:centered
	class:resized
	style="
		--closed-width: {closedWidth};
		--closed-height: {closedHeight};
		--open-width: {openWidth};
		--open-height: {openHeight};
		--move-duration: {moveDuration}ms;
		--resize-duration: {resizeDuration}ms;
	"
>
	<button on:click={toggle}>Toggle</button>

	{#if contentVisible}
		{@render children?.()}
	{/if}
</div>

<style>
	.animated-block {
		position: absolute;
		top: 0;
		left: 0;

		width: var(--closed-width);
		height: var(--closed-height);

		background: green;
		overflow: hidden;

		transform: translate(0, 0);

		transition:
			top var(--move-duration),
			left var(--move-duration),
			transform var(--move-duration),
			width var(--resize-duration),
			height var(--resize-duration);
	}

	.animated-block.centered {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.animated-block.resized {
		width: var(--open-width);
		height: var(--open-height);
	}
</style>