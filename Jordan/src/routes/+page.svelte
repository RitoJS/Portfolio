<script lang="ts">
    import { fade } from "svelte/transition";
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import AnimatedBlock from "$lib/components/animated-block.svelte";
    import { getContext, onMount, tick } from "svelte";
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

    let showAvatar = $state(false);

    onMount(async () => {
        await tick();
        showAvatar = true;
    });
</script>

<!--Mobile-->

<article class="md:hidden flex flex-col justify-center h-full">
    {#if showAvatar}
        <h1 class=" mb-2">
            <hr class="w-full mb-0.5 " />
            <div class="flex home-titles w-full items-center text-center">
                <AnimationLetter data="Jordan Sama" className="title-text" classParent="w-full"/>
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
                    onintroend={() => (landed = true)}
                    class:landed
                    class:spinning
                    alt="C'est moi !"
                    />
                </figure>
            
            <div class="flex flex-col mt-2 sm:flex-row sm:items-center">
                <div class="mt-2 mb-1 home-titles sm:mr-1 sm:w-1/2">
                    <hr class="w-full mt-0.5 " />
                    <h2 class="text-center p-1">Développeur Full-Stack</h2>
                    <hr class="w-full mb-0.5 " />
                </div>
                    <div class=" mb-2 home-titles sm:w-1/2 sm:mt-2 sm:mb-1">
                    <hr class="w-full mt-0.5 " />
                    <h2 class="text-center p-1">Intégrateur Web</h2>
                    <hr class="w-full mb-0.5 " />
                </div>
            </div>
        </div>
    {/if}
</article>

<!--Desktop-->
<article class="hidden md:block">
    <div class="border">
        <p>
            Je suis desktop !
        </p>
    </div>
</article>

<style>
    .animated-block-separator {
        width: 50%;
        color: var(--shadow-elements-color);
    }
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

    /** Small size **/
    @media (min-width: 640px) {
        #avatar {
            width: 65%;
        }
    }

    
</style>