<script lang="ts">
    import UnderConstruction from "$lib/components/under-construction.svelte";
	import { getContext, onMount } from "svelte";
    const info = getContext<{ text: string | null }>('info');
    const noInfo: string = "Revenez bientôt"

    onMount(() => {
        info.text = noInfo;
         return () => {
            if (info.text === noInfo) info.text = noInfo;
        };
    })
</script>
<article class="w-full h-full">
    <UnderConstruction />
</article>