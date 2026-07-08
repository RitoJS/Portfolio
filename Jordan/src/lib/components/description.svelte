<script lang="ts">
    import { getContext, onMount } from 'svelte';
	import AnimationLetter from './animation-letter.svelte';

    const info = getContext<{ text: string | null }>('info');

    let hydrated: boolean = $state(false);

    onMount(() => {
        hydrated = true;
    });
</script>

<div class="desc-block hidden md:flex ">
    <div class="block-decorator flex">
        <div class="thick-line"></div>
        <div class="thin-line"></div>
    </div>
    <div>
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
    </div>
   
</div>

<style>
    .desc-block {
        background-color: var(--default-bg-elements2);
        box-shadow: 3px 3px 0px var(--shadow-elements-color);
    }
</style>
