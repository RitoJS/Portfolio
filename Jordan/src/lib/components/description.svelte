<script lang="ts">
    import { getContext, onMount } from 'svelte';
	import AnimationLetter from './animation-letter.svelte';

    const info = getContext<{ text: string | null }>('info');

    let hydrated: boolean = $state(false);

    onMount(() => {
        hydrated = true;
    });
</script>

{#if hydrated && info.text}
    <AnimationLetter 
        data={info.text} 
        className="title-text"
    />
{:else}
    <AnimationLetter 
        data="Une description sans hover !" 
        className="title-text"
    />
{/if}