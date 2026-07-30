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
            openHeight = "60%"
            backgroundColor = "#afaa96"
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
            <h1 class="mt-2 mb-2">
                <hr class="w-full mb-0.5 " />
                <div class="flex home-titles w-full items-center text-center">
                    <AnimationLetter data="Jordan Sama" className="title-text"/>
                </div>
                <hr class="w-full mt-0.5 " />
            </h1>
            <div>
                <figure class="pl-2 pr-2">
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
                <div class="flex flex-col sm:flex-row">
                    <div>
                        <hr class="w-full mb-0.5 " />
                        <h2 class="text-center">Développeur Full-Stack</h2>
                        <hr class="w-full mb-0.5 " />
                    </div>
                     <div>
                        <hr class="w-full mb-0.5 " />
                        <h2 class="text-center">Intégrateur Web</h2>
                        <hr class="w-full mb-0.5 " />
                    </div>
                </div>
                <section class="pr-2 pl-2">
                    <p>
                        <Date day="Bonjour !" night="Bonsoirs" /> et bienvenue sur mon site internet.<br/>
                        Vous pouvez naviguer en slidant vers la gauche ou la droite ou via le menu à gauche.
                    </p>
                </section>
            </div>
    </AnimatedBlock>
</article>

<style>
    .home-titles {
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(1080deg); }
    }

    #avatar {
        position: relative;
        bottom: 100%;
        opacity: 0;
        width: 80%;
        margin: auto;

        &.landed {
            bottom: 0;
            opacity: 1;
        }

        &.spinning {
            animation: spin 1s linear forwards; /* independent duration */
        }
    }
</style>