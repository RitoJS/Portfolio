<script lang="ts">
    import { getContext } from 'svelte';
    import AnimationLetter from './animation-letter.svelte';

    const info = getContext<{text: string | null}>('info');
</script>

<div>
    {#if info.text}
        <p>
            <AnimationLetter data={info.text} className="title-text"/>
        </p>
    {:else}
        <p>
            <AnimationLetter data="Une description sans hover !" className="title-text"/>
        </p>
    {/if}
</div>