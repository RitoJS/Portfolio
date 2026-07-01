
<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
	import { menuMock } from "$lib/mock/menu-mock";
	import type { Menu } from "$lib/types/menu";
	import { fly } from "svelte/transition";

    let { options } = $props();

    let menu: Menu[] = menuMock;

</script>
{#if options.visible}
    {#each menu as link, index (index) }
        <div class="flex selected-block" transition:fly|global={{x: -100, duration: 400, delay: index * 100}} >
            <div class="decorator-cube"></div> <a class="w-full pl-4" href={link.link}>{link.label}</a> 
        </div>
    {/each}
{/if}

