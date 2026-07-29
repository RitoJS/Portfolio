<script lang="ts">
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import AnimatedBlock from "$lib/components/animated-block.svelte";
    import { getContext } from "svelte";
	import Date from "$lib/components/date.svelte";

    const info = getContext<{ text: string | null }>('info');
</script>

<div>
    <AnimatedBlock
          closedWidth = "65px" 
            closedHeight = "45px"
            openWidth = "70%"
            openHeight = "85%"
            backgroundColor = "#3e3b34"
            moveDuration = {600}
            resizeDuration = {400}
            startTop = "5%"
            startLeft = "50%"
            endTop = "50%"
            endLeft = "50%"
            init = {true}
        > 
             {#snippet trigger(contentVisible)}
                {contentVisible ? 'Yeag' : 'Yarr'}
            {/snippet}
            <h1>
                <Date day="Bonjour !" night="Bonsoirs" />
                <AnimationLetter data="Jordan Sama" className="title-text"/>
            </h1>
    </AnimatedBlock>
</div>