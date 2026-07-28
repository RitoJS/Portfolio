<script lang="ts">
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import AnimatedBlock from "$lib/components/animated-block.svelte";
    import { getContext } from "svelte";

    const info = getContext<{ text: string | null }>('info');
</script>

<div>
    <AnimatedBlock
          closedWidth = "65px" 
            closedHeight = "45px"
            openWidth = "100%"
            openHeight = "50%"
            moveDuration = {600}
            resizeDuration = {400}
            startTop = "0%"
            startLeft = "50%"
            endTop = "20%"
            endLeft = "0%"
            init = {true}
        > 
             {#snippet trigger(contentVisible)}
                {contentVisible ? '' : ''}
            {/snippet}
            <h1>
                <AnimationLetter data="Jordan Sama" className="title-text"/>
            </h1>
    </AnimatedBlock>
</div>

