
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
        <div class="flex flex-col w-full h-full selected-hover pt-1 pb-1 justify-center items-center">
            <hr class="w-full mb-0.5 line-hover " />
            <div class="flex selected-block items-center" transition:fly|global={{x: -100, duration: 400, delay: index * 100}} >
                <div class="decorator-cube"></div> <a class="w-full  " href={link.link}>{link.label}</a> 
            </div>
            <hr class="w-full mt-0.5 line-hover " />
        </div>
        
    {/each}
{/if}

