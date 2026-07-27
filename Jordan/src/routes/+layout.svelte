<script lang="ts">
    import './layout.css';
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import favicon from '$lib/assets/favicon.svg';
    import CanvasBackground from '$lib/components/canvas-background.svelte';

    let { children, data } = $props();

    const transitionIn = { easing: cubicIn, x: 10, duration: 300, delay: 800 };
    const transitionOut = { easing: cubicOut, x: -10, duration: 300 };

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // one config table, keyed by route
    const staggerConfig: Record<string, { className: string; delay?: number; step?: number, depth?: number }> = {
        '/about':   { className: 'stagger-in-about',   delay: 800, step: 60 },
        '/contact': { className: 'stagger-in-contact', delay: 800, step: 80 },
        default:    { className: 'stagger-in', delay: 900, step: 320, depth: 2 }
    };

    const pageStagger = $derived(staggerConfig[data.pathname] ?? staggerConfig.default);

    function stagger(
		node: HTMLElement,
		{
			delay = 800,
			step = 60,
			className = 'stagger-in',
			depth = 1
		}: { delay?: number; step?: number; className?: string; depth?: number } = {}
	) {
		if (prefersReducedMotion) return;

		// depth 1 = stagger main's direct children (default)
		// depth 2 = stagger the children INSIDE each of main's direct children instead
		let targets: Element[] = Array.from(node.children);

		for (let level = 1; level < depth; level++) {
			targets = targets.flatMap((el) => Array.from(el.children));
		}

		targets.forEach((child, i) => {
			(child as HTMLElement).style.setProperty('--stagger-delay', `${delay + i * step}ms`);
			child.classList.add(className);
		});
	}
</script>

<CanvasBackground />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#key data.pathname}
<main in:fly={transitionIn} out:fly={transitionOut} use:stagger={pageStagger}>
    {@render children()}
</main>
{/key}