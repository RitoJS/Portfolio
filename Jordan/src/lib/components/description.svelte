<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import AnimationLetter from './animation-letter.svelte';

    const info = getContext<{ text: string | null }>('info');

    let hydrated = $state(false);
    onMount(() => (hydrated = true));

    const shown = $derived(
        hydrated && info.text ? info.text : 'Une description sans hover !'
    );
</script>

<div class="desc-block hidden md:flex">
    <div class="block-decorator flex">
        <div class="thick-line"></div>
        <div class="thin-line"></div>
    </div>
    <div>
        {#key shown}
            <AnimationLetter data={shown} className="title-text" />
        {/key}
    </div>
</div>

<style>
    .desc-block {
        background-color: var(--default-bg-elements2);
        box-shadow: 3px 3px 0px var(--shadow-elements-color);
    }
</style>
