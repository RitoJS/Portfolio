<script lang="ts">
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { getContext } from "svelte";

    const info = getContext<{ text: string | null }>('info');
</script>

<main>
    <h1
        onmouseenter={() => info.text = "C'est mon nom !"}
	    onmouseleave={() => info.text = null}
    >
        <AnimationLetter data="Jordan Sama" className="title-text"/>
    </h1>

</main>
