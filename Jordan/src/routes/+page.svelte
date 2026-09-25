<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
    import { menuMock } from "$lib/mock/menu-mock";
	import type { Menu } from "$lib/types/menu";

    import { fade, fly } from "svelte/transition";
	import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { getContext, onMount, tick } from "svelte";
	import Date from "$lib/components/date.svelte";
    import avatarMobile from "$lib/assets/avatar.png";
    import avatarDesktop from "$lib/assets/home9.jpg";

    const info = getContext<{ text: string | null }>('info');

    let menu: Menu[] = menuMock;

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
<article class="hidden w-full h-full md:block">
    <div class="border flex w-full h-full">
        <div class="w-1/4 h-full home-menu flex flex-col justify-around border-blue">
            {#each menu as link, i (i) }
                {#if  i != 0 && i <= 2 }
                    <div class="left-link">
                        <hr class="w-full mb-0.5 line-hover " />
                        <div class="flex desktop-link items-center" transition:fly|global={{x: -100, duration: 400, delay: i * 100}} >
                            <div class="decorator-cube"></div> <a class="w-full text-center  " href={link.link}>{link.label}</a> 
                        </div>
                        <hr class="w-full mt-0.5 line-hover " />
                    </div>
                {/if}
            {/each}
        </div>

        <div class="w-2/4 h-full home-portrait border-green">
            <div class="h-full w-full" id="portrait">
                <!--<img src={avatarDesktop} alt="mon portrait !" id="avatar-desktop"  />-->
            </div>
        </div>

        <div class="w-1/4 h-full home-menu flex flex-col justify-around border-blue">
            {#each menu as link, i (link) }
                {#if  i != 0 && i >= 3 }
                    <div class="right-link">
                        <hr class="w-full mb-0.5 line-hover " />
                        <div class="flex desktop-link items-center" transition:fly|global={{x: -100, duration: 400, delay: i * 100}} >
                            <div class="decorator-cube mr-0"></div> <a class="w-full text-center " href={link.link}>{link.label}</a> 
                        </div>
                        <hr class="w-full mt-0.5 line-hover " />
                    </div>
                   
                {/if}
            {/each}
        </div>
      
    </div>
</article>

<style>
    .border-red {
        border: 1px solid red;
        background-color: red;
    }
    .border-green {
        border: 1px solid green;
        background-color: green;
    }
    .border-blue {
        border: 1px solid blue;
        background-color: blue;
    }
    .home-titles {
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }

    .home-menu {
        .left-link, .right-link {
            height: 8%;
            position: relative;
        }

        .left-link {
            left: 5%;
        }

        .right-link {
            left: -5%;
        }

    }

    .desktop-link {
        width: 100%;
        background-color: var(--default-bg-elements);
        height: 100%;
        font-weight: 500;
        background: linear-gradient(to right, var(--focus-elements) 50%, var(--default-bg-elements) 50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: 500ms;
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

    #avatar-desktop {
        width: 100%;
        height: 100%;
    }

    /** Small size **/
    @media (min-width: 640px) {
        #avatar {
            width: 65%;
        }
    }

    
</style>