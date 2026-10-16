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
		opacity?: number;
		transition?: string;
		className?: string;
		buttonMenu?: boolean;
		animatedBorder?: boolean;
		anchored?: boolean; // true: closed state follows an in-flow placeholder
		intro?: (node: Element, params?: any) => any; // params for intro animation
		introParams?: Record<string, any>;
	};

	let {
		trigger,
		children,
		closedWidth = "15%",
		closedHeight = "5%",
		openWidth = "50%",
		openHeight = "50%",
		backgroundColor = "#d7d1b9",
		moveDuration = 600,
		resizeDuration = 400,
		startTop = 0,
		startLeft = 0,
		endTop = "50%",
		endLeft = "50%",
		init = false,
		opacity = 1,
		transition = "1s",
		className = "",
		buttonMenu = false,
		animatedBorder = false,
		anchored = false,
		intro = () => ({}),
		introParams = {},
	}: Props = $props();

	let moved = $state(false);
	let resized = $state(false);
	let contentVisible = $state(false);
	let block: HTMLDivElement;
	let mounted = $state(false);

	// --- anchored mode ---
	let anchor: HTMLDivElement | undefined = $state();
	let rect = $state({ top: 0, left: 0, width: 0, height: 0 });
	let anchorVisible = $state(false);
	let instant = $state(false); // disables transitions while following scroll/resize

	// Closed-state values: measured px when anchored, props otherwise
	const cTop = $derived(anchored ? `${rect.top}px` : String(startTop));
	const cLeft = $derived(anchored ? `${rect.left}px` : String(startLeft));
	const cWidth = $derived(anchored ? `${rect.width}px` : closedWidth);
	const cHeight = $derived(anchored ? `${rect.height}px` : closedHeight);

	function measure(snap = true) {
		if (!anchored || !anchor || moved) return;
		const r = anchor.getBoundingClientRect();
		anchorVisible = r.width > 0 && r.height > 0; // 0 when the anchor is display:none
		if (snap) {
			instant = true;
			requestAnimationFrame(() => (instant = false));
		}
		rect = { top: r.top, left: r.left, width: r.width, height: r.height };
	}

	// Moves the node to <body> so no transformed ancestor can affect position: fixed
	function portal(node: HTMLElement, enabled: boolean) {
		if (!enabled) return;
		document.body.appendChild(node);
		return { destroy() { node.remove(); } };
	}

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
			measure(false); // fresh position, without disabling the upcoming transition
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

	onMount(() => {
		mounted = true;
		let cleanup: (() => void) | undefined;

		if (anchored && anchor) {
			measure();
			const ro = new ResizeObserver(() => measure());
			ro.observe(anchor);
			const onChange = () => measure();
			window.addEventListener('resize', onChange);
			window.addEventListener('scroll', onChange, true); // true: inner scroll containers too
			cleanup = () => {
				ro.disconnect();
				window.removeEventListener('resize', onChange);
				window.removeEventListener('scroll', onChange, true);
			};
		}

		(async () => {
			if (init) {
				await nextFrame();
				toggle();
			}
		})();

		return cleanup;
	});
</script>

<!--Only show this if buttonMenu is True-->
{#if !init && buttonMenu}
	<button class="menu-block" class:moved onclick={toggle}>
		{#if buttonMenu}
			<div class="burger-icon w-full h-full">
				<hr class="line-burger" id="line1" class:moved />
				<hr class="line-burger" id="line2" class:moved />
				<hr class="line-burger" id="line3" class:moved />
			</div>
		{/if}
	</button>
{/if}

<!--In-flow placeholder: it takes the space and gives the fixed block its start position-->
{#if anchored}
	<div
		bind:this={anchor}
		class="anchor-placeholder"
		style="width: {closedWidth}; height: {closedHeight};"
	></div>
{/if}

{#if mounted}
	<div
		use:portal={anchored}
		in:intro|global={introParams}
		bind:this={block}
		class={`animated-block ${className}`}
		class:moved
		class:resized
		class:instant
		class:offscreen={anchored && !anchorVisible && !moved}
		class:animated-border={animatedBorder}
		style="
			--closed-width: {cWidth};
			--closed-height: {cHeight};
			--open-width: {openWidth};
			--open-height: {openHeight};
			--bg-color: {backgroundColor};
			--move-duration: {moveDuration}ms;
			--resize-duration: {resizeDuration}ms;
			--start-top: {cTop};
			--start-left: {cLeft};
			--end-top: {endTop};
			--end-left: {endLeft};
			--opacity: {opacity};
			--transition: {transition}
		"
	>
		<!--Refaire cette partie pour les label de block générique-->
		{#if !init}
			<button class="" onclick={toggle}>
				{#if !buttonMenu}
					{@render trigger?.(contentVisible)}
				{/if}
			</button>
		{/if}

		{#if contentVisible}
			{@render children?.()}
		{/if}
	</div>
{/if}

<style>
	.anchor-placeholder {
		pointer-events: none;
		flex-shrink: 0;
	}

	#line1.moved {
		position: relative;
		transform: rotate(40deg);
		top: 25%;
		background-color: var(--focus-text-color);
	}

	#line2.moved {
		border: 0px solid;
		opacity: 0;
	}

	#line3.moved {
		position: relative;
		transform: rotate(-40deg);
		bottom: 20%;
		background-color: var(--focus-text-color);
	}

	.menu-block {
		width: 65px;
		height: 45px;
		border: 1px solid;
		position: fixed;
		top: 1%;
		left: 2%;
		z-index: 6;
		overflow: hidden;
		transition: 1s;
		background: var(--default-bg-elements2);
	}

	.menu-block.moved {
		background-color: var(--focus-elements);
		color: var(--focus-text-color);
	}

	.line-burger {
		transition: 1s;
		margin-top: 0.5em;
		width: 80%;
		margin-right: auto;
		margin-left: auto;
		border: 2px solid;
	}

	.animated-block {
		position: fixed;
		z-index: 5;
		opacity: var(--opacity);
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

		box-shadow: 3px 3px 0px var(--shadow-elements-color);
	}

	.animated-block.moved {
		transition: var(--transition);
		opacity: 1;
		top: var(--end-top);
		left: var(--end-left);
		transform: translate(-50%, -50%);
	}

	.animated-block.resized {
		width: var(--open-width);
		height: var(--open-height);
	}

	/* following scroll/resize: no animation */
	.animated-block.instant:not(.moved) {
		transition: none;
	}

	/* anchor hidden (e.g. lg:hidden parent): hide the block too */
	.animated-block.offscreen {
		display: none;
	}

	/* --- animated border --- */
	.animated-block.animated-border::after {
		content: "";
		position: absolute;
		inset: 0;
		padding: 2px;
		border-radius: inherit;
		background: conic-gradient(
			from var(--border-angle),
			transparent 0deg,
			transparent 40deg,
			var(--default-bg-elements, --focus-text-color) 45deg,
			transparent 50deg,
			transparent 130deg,
			var(--default-bg-elements, --focus-text-color) 135deg,
			transparent 140deg,
			transparent 220deg,
			var(--default-bg-elements, --focus-text-color) 225deg,
			transparent 230deg,
			transparent 310deg,
			var(--default-bg-elements, --focus-text-color) 315deg,
			transparent 320deg,
			transparent 360deg
		);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		z-index: 1;

		animation: border-rotate-fade 4s ease-in-out infinite;
	}

	@property --border-angle {
		syntax: "<angle>";
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes border-rotate-fade {
		0% {
			--border-angle: 0deg;
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
		70% {
			--border-angle: 90deg;
			opacity: 1;
		}
		100% {
			--border-angle: 180deg;
			opacity: 0;
		}
	}
</style>