
<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
	import { menuMock } from "$lib/mock/menu-mock";
	import type { Menu } from "$lib/types/menu";
	import { fly } from "svelte/transition";
    import HomeIcon  from "$lib/components/icons/home-icon.svelte";

    let { options } = $props();

    let menu: Menu[] = menuMock;

</script>
{#if options.visible}
    {#each menu as link, index (index) }
        <!--Mobile-->
        <div class={ `w-full p-2  ${(menu.length-1 === index && !(menu.length-1 & 1) ? 'col-span-full' : '')} md:hidden`}>
            <div class="content-menu flex flex-col  w-full h-full">
                <div class="icon-menu w-full grow-7 border ">
                   <HomeIcon />
                </div>
                <div class="label-menu w-full grow-2">
                    <a class="w-full" href={link.link}>{link.label}</a> 
                </div>
            </div>
        </div>
        
        <!--Desk-->
        <div class="hidden md:flex flex-col w-full h-full selected-hover pt-1 pb-1 justify-center items-center">
            <hr class="w-full mb-0.5 line-hover " />
            <div class="flex selected-block items-center" transition:fly|global={{x: -100, duration: 400, delay: index * 100}} >
                <div class="decorator-cube"></div> <a class="w-full  " href={link.link}>{link.label}</a> 
            </div>
            <hr class="w-full mt-0.5 line-hover " />
        </div>
    {/each}
{/if}


<style>
    .content-menu {
        border: 0px solid var(--shadow-elements-color);
        background: #b2ad99;
        box-shadow: 3px 3px 0px var(--shadow-elements-color);
    }
</style>

