<script lang="ts">
    import { fade } from "svelte/transition";
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import AnimatedBlock from "$lib/components/animated-block.svelte";
    import { getContext } from "svelte";
	import Date from "$lib/components/date.svelte";
    import avatarMobile from "$lib/assets/avatar.png";

    const info = getContext<{ text: string | null }>('info');

    // Animation Avatar
    let landed = $state(false);
    let spinning = $state(false);
    function spinFade(node, { duration }) {
        return {
            duration,
            css: (t: number) => `
                opacity: ${t};
                bottom: ${100 - t * 100}%;
            `
        };
    }
</script>

<!--Mobile-->

<article class="md:hidden">
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
            opacity ={0}
        > 
            {#snippet trigger(contentVisible)}
                {contentVisible ? '' : ''}
            {/snippet}
            <h1>
                <AnimationLetter data="Jordan Sama" className="title-text"/>
            </h1>
            <figure>
                <img 
                    src={avatarMobile}
                    in:spinFade={{ duration: 1000 }}
                    out:fade
                    id="avatar"
                    onintrostart={() => (spinning = true)}
                    onintroend={() => (landed = true)}
                    class:landed
                    class:spinning
                    alt="C'est mon visage !"
                />
            </figure>
            <section>
                <Date day="Bonjour !" night="Bonsoirs" />
            </section>
    </AnimatedBlock>
</article>

<style>
    @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(-1080deg); }
    }

    #avatar {
        position: relative;
        bottom: 100%;
        opacity: 0;

        &.landed {
            bottom: 0;
            opacity: 1;
        }

        &.spinning {
            animation: spin 3s linear forwards; /* independent duration */
        }
    }
</style>