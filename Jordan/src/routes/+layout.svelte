<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setContext } from 'svelte';
	import Description from '$lib/components/description.svelte';
	

	let { children } = $props();
	const info = $state({
		text: null as string | null
	});

	setContext('info', info);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<Description />
