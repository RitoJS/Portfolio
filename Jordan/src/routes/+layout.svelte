<script lang="ts">
	import './layout.css';
	import { fade } from 'svelte/transition';
	import favicon from '$lib/assets/favicon.svg';
	import CanvasBackground from '$lib/components/canvas-background.svelte';

	let { children, data } = $props();
</script>
<CanvasBackground></CanvasBackground>
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{#key data.pathname}
	<main transition:fade>
		{@render children()}
	</main>	
{/key}


