
<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
	import { menuMock } from "$lib/mock/menu-mock";
	import type { Menu } from "$lib/types/menu";

    let menu: Menu[] = menuMock;
</script>
{#each menu as link, index (index) }
    <span class="flex selected-block">
        <div class="decorator-cube"></div> <a class="w-full pl-4" href={link.link}>{link.label}</a> 
    </span>
{/each}

