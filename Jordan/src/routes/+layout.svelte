<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import CanvasBackground from '$lib/components/canvas-background.svelte';

	let { children } = $props();
</script>
<CanvasBackground></CanvasBackground>
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
