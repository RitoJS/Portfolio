<script lang="ts">
    import AnimatedBlock from "$lib/components/animated-block.svelte";
    import { worksMock } from "$lib/mock/works-mock";
    import type { Works } from "$lib/types/works";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
	import Detail from "$lib/components/detail.svelte";
    import degreeIcon from '$lib/assets/icons/degree.svg';
    import workIcon from '$lib/assets/icons/work.svg';
    import projectIcon from '$lib/assets/icons/project.svg';
	import AnimationLetter from "$lib/components/animation-letter.svelte";
	import { getContext, onMount } from "svelte";
    
    const info = getContext<{ text: string | null }>('info');
    const dataWorks: Works[] = worksMock;
    const noInfo: string = "Cliquez sur les icônes pour afficher les détails"

    onMount(() => {
        info.text = noInfo;
         return () => {
            if (info.text === noInfo) info.text = null;
        };
    })
</script>

<article class="w-full h-full">
    <div class="h-1/10">
        <AnimationLetter data="Expériences" className="page-title w-full text-left" />
    </div>
    <!--Mobile: vertical timeline-->
    <div class="lg:hidden w-full h-9/10 block-timeline flex justify-center items-start">
        <div
            class="space-y-8 relative w-fit h-fit before:absolute before:inset-0 before:m-auto before:-translate-x-px before:h-full before:w-0.5 bg-timeline"
        >
            {#each dataWorks as work, index (index)}
                <div class="relative grid grid-cols-[5rem_auto_5rem] gap-x-6 items-center">
                    <div class="col-start-2 row-start-1">
                        <AnimatedBlock
                            anchored
                            disabled={!work.hasDetail}
                            intro={fly}
                            introParams={{ y: 10, duration: 500, delay: index * 150, easing: cubicOut }}
                            closedWidth="56px"
                            closedHeight="56px"
                            openWidth="90%"
                            openHeight="90%"
                            moveDuration={600}
                            resizeDuration={400}
                            endTop="50%"
                            endLeft="50%"
                            transition="0.5s"
                            buttonMenu={false}
                        >
                            {#snippet trigger(contentVisible)}
                                {#if contentVisible}
                                    <h2 class="close-button-blocks font-bold cursor-pointer">X</h2>
                                    
                                {:else}
                                    <div 
                                        class="no-detail" 
                                        role="presentation"
                                        onmouseenter={() => (info.text = `${work.jobName} - ${work.company}`)}
                                        onmouseleave={() => (info.text = noInfo)}
                                    >
                                        {#if !work.hasDetail && work.formation}
                                            <img class="cursor-pointer" src="{degreeIcon}"  alt="icone formation"/>
                                        {:else if work.hasDetail && work.formation}
                                            <img class="cursor-pointer" src="{projectIcon}"  alt="icone projet perso"/>
                                        {:else if work.hasDetail && !work.formation}
                                            <img class="cursor-pointer" src="{workIcon}"  alt="icone expérience pro"/>
                                        {/if}
                                    </div>
                                {/if}
                            {/snippet}
                            <Detail work={work} />
                        </AnimatedBlock>
                    </div>

                    <div
                        class="card-name w-20 flex bg-arrows border-slate-200 row-start-1 {index % 2 === 0 ? 'col-start-1' : 'col-start-3'}"
                        data-side={index % 2 === 0 ? 'left' : 'right'}
                    >
                        <h2 class="text-center m-auto">{work.startDate?.getFullYear()}</h2>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    
    <!--Desktop: horizontal timeline-->
    <div class="hidden lg:flex w-full h-9/10 block-timeline-desktop overflow-x-auto items-center">
        <div class="relative flex w-full min-w-max justify-between gap-x-24 px-6
                    before:absolute before:top-1/2 before:h-0.5 before:-translate-y-px bg-timeline
                    before:left-13 before:right-13">
            {#each dataWorks as work, index (index)}
                <!--Item -->
                <div class="shrink-0 w-14 grid grid-rows-[2.5rem_56px_2.5rem] gap-y-4 justify-items-center">
                    <div class="row-start-2 w-14 flex justify-center relative">
                         <AnimatedBlock
                            anchored
                            disabled={!work.hasDetail}
                            intro={fly}
                            introParams={{ y: 10, duration: 500, delay: index * 150, easing: cubicOut }}
                            closedWidth="56px"
                            closedHeight="56px"
                            openWidth="50%"
                            openHeight="70%"
                            moveDuration={600}
                            resizeDuration={400}
                            endTop="50%"
                            endLeft="50%"
                            transition="0.5s"
                            buttonMenu={false}
                        >
                            {#snippet trigger(contentVisible)}
                                {#if contentVisible}
                                    <h2 class="close-button-blocks font-bold cursor-pointer">X</h2>
                                    
                                {:else}
                                    <div 
                                        class="no-detail" 
                                        role="presentation"
                                        onmouseenter={() => (info.text = `${work.jobName} - ${work.company}`)}
                                        onmouseleave={() => (info.text = noInfo)}
                                    >
                                        {#if !work.hasDetail && work.formation}
                                            <img class="cursor-pointer" src="{degreeIcon}"  alt="icone formation"/>
                                        {:else if work.hasDetail && work.formation}
                                            <img class="cursor-pointer" src="{projectIcon}"  alt="icone projet perso"/>
                                        {:else if work.hasDetail && !work.formation}
                                            <img class="cursor-pointer" src="{workIcon}"  alt="icone expérience pro"/>
                                        {/if}
                                    </div>
                                {/if}
                            {/snippet}
                            <Detail work={work} />
                        </AnimatedBlock>
                    </div>

                    <!--Label-->
                    <div
                        class="card-name-h w-24 flex bg-arrows border-slate-200
                            {index % 2 === 0 ? 'row-start-1 self-end' : 'row-start-3 self-start'}"
                        data-side={index % 2 === 0 ? 'top' : 'bottom'}
                    >
                        <h2 class="text-center m-auto">{work.startDate?.getFullYear()}</h2>
                    </div>
                </div>
            {/each}
        </div>
    </div>

</article>



<style>
    .bg-timeline::before, .bg-arrows {
        background-color: var(--bg-block-decorator);
    }
    /*  Mobile (vertical) */
    .card-name {
        position: relative;
        color: var(--focus-text-color);
        font-weight: 500;
    }

    .card-name::after {
        content: '';
        position: absolute;
        top: 7px;
        height: 10px;
        width: 10px;
        background-color: var(--bg-block-decorator);
        transform: rotate(-135deg);
    }

    .card-name[data-side="left"]::after  { right: -5px; }
    .card-name[data-side="right"]::after { left: -5px; }

    /*  Desktop (horizontal) */
    .card-name-h {
        position: relative;
        height: 2rem;
        color: var(--focus-text-color);
        font-weight: 500;
    }

    .card-name-h::after {
        content: '';
        position: absolute;
        left: calc(50% - 5px);
        height: 10px;
        width: 10px;
        background-color: var(--bg-block-decorator);
        transform: rotate(-135deg);
    }

    /* top label: arrow on its bottom edge, pointing down to the icon */
    .card-name-h[data-side="top"]::after    { bottom: -5px; }

    /* bottom label: arrow on its top edge, pointing up to the icon */
    .card-name-h[data-side="bottom"]::after { top: -5px; }

</style>