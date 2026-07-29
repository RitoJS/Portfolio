<script lang="ts">
	import { tick, onMount } from "svelte";

	type Props = {
		trigger: import('svelte').Snippet<[boolean]>;
		children: import('svelte').Snippet;
		closedWidth?: string;
		closedHeight?: string;
		openWidth?: string;
		openHeight?: string;
		backgroundColor?: string;
		moveDuration?: number;
		resizeDuration?: number;
		startTop?: string | number;
		startLeft?: string | number;
		endTop?: string;
		endLeft?: string;
		init?: boolean;
	};

	let {
		trigger,
		children,
		closedWidth = "15%", 
		closedHeight = "5%",
		openWidth = "50%",
		openHeight = "50%",
		backgroundColor = "#afaa96",
		moveDuration = 600,
		resizeDuration = 400,
		startTop = 0,
		startLeft = 0,
		endTop = "50%",
		endLeft = "50%",
		init = false,
	}: Props = $props();

	let moved = $state(false);
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
		if (!moved) {
			moved = true;
			await waitTransitionEnd(block, "transform");

			resized = true;
			await waitTransitionEnd(block, "width");

			contentVisible = true;
			await tick();
		} else {
			contentVisible = false;

			resized = false;
			await waitTransitionEnd(block, "width");

			moved = false;
			await waitTransitionEnd(block, "transform");
		}
	}

	function nextFrame() {
		return new Promise<void>((resolve) => 
			requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
		);
	}

	onMount(async () => {
        if (init) {
			await nextFrame();
			toggle();
		}
    });
</script>

<div
	bind:this={block}
	class="animated-block"
	class:moved
	class:resized
	style="
		--closed-width: {closedWidth};
		--closed-height: {closedHeight};
		--open-width: {openWidth};
		--open-height: {openHeight};
		--bg-color: {backgroundColor};
		--move-duration: {moveDuration}ms;
		--resize-duration: {resizeDuration}ms;
		--start-top: {startTop};
		--start-left: {startLeft};
		--end-top: {endTop};
		--end-left: {endLeft};
	"
>	
	{#if !init}
		<button onclick={toggle}>
			{@render trigger?.(contentVisible)}
		</button>
	{/if}

	{#if contentVisible}
		{@render children?.()}
	{/if}
</div>

<style>
	.animated-block {
		position: fixed;
		z-index: 5;
		top: var(--start-top);
		left: var(--start-left);

		width: var(--closed-width);
		height: var(--closed-height);

		background: var(--bg-color);
		overflow: hidden;

		transform: translate(0, 0);

		transition:
			top var(--move-duration),
			left var(--move-duration),
			transform var(--move-duration),
			width var(--resize-duration),
			height var(--resize-duration);
	}

	.animated-block.moved {
		top: var(--end-top);
		left: var(--end-left);
		transform: translate(-50%, -50%);
	}

	.animated-block.resized {
		width: var(--open-width);
		height: var(--open-height);
	}
</style>