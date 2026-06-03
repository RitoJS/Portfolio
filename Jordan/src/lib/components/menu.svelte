<script lang="ts">
	import { menuMock } from "$lib/mock/menu-mock";
	import type { Menu } from "$lib/types/menu";

    let menu: Menu[] = menuMock;
</script>

<div>
    {#each menu as link, index (index) }
        <a href={link.link}>{link.label}</a>
    {/each}
</div>

