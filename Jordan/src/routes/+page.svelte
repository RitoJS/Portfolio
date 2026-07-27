<script lang="ts">
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { getContext } from "svelte";

    const info = getContext<{ text: string | null }>('info');
</script>

<div>
    <h1>
        <AnimationLetter data="Jordan Sama" className="title-text"/>
    </h1>
</div>

