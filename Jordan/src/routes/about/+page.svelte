<script lang="ts">
	import AnimatedBlock from "$lib/components/animated-block.svelte";
    import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { aboutMock } from "$lib/mock/about-mock";
    import type { About } from "$lib/types/about";
    import { getContext, onMount } from "svelte";

	import OpenedBlock from "$lib/components/opened-block.svelte";
	import Gallery from "$lib/components/gallery.svelte";

    const info = getContext<{ text: string | null }>('info');

    let about: About = aboutMock;

    const availability = {
        status: "Ouvert aux opportunités",
        tags: ["Front-end", "Intégration"]
    };

    

    const noInfo: string = "Une présentation de moi ainsi que de mes compétences"

    onMount(() => {
        info.text = noInfo;
         return () => {
            if (info.text === noInfo) info.text = null;
        };
    })

</script>

<!--Mobile-->
<article class="w-full h-full text-[1.2rem] sm:text-[1.3rem] ">
     <div>
        <AnimationLetter data="A propos de moi" className="page-title w-full text-left" />
    </div>
    <div class="about-profile w-full h-full lg:flex lg:pb-15">
        <!--Mobile/Tablet-->
        <div class=" lg:hidden main-stats flex h-3/10 w-full">
                <div class="avatar-block h-full p-1 w-1/3">
                    <OpenedBlock title="Mon Profil">
                        <Gallery startIndex={0} images={[about.avatarMobile]} miniature={about.avatarMobile} className="w-full h-full object-cover" detail={false} />
                    </OpenedBlock> 
                </div>
            

           <div class="main-stats-info flex flex-col w-2/3">
                <div class="w-full h-full p-1">
                    <OpenedBlock title="Disponibilité">
                        <p class="font-bold">● {availability.status}</p>
                        <ul class="flex flex-wrap gap-1 mt-2">
                            {#each availability.tags as tag, index (index)}
                                <li class="language-block px-2 py-1 font-bold">{tag}</li>
                            {/each}
                        </ul>
                    </OpenedBlock>
                </div>
            </div>
        </div>

        <!--Desktop-->
        <div class="hidden lg:flex lg:flex-col gap-2  w-1/3 xl:w-2/6 h-full min-h-0 xl:order-1">
            <div 
                class="avatar-block  w-full xl:h-full lg:h-2/5 shrink-0 "
                role="presentation"
                onmouseenter={() => (info.text = `C'est moi !`)}
                onmouseleave={() => (info.text = noInfo)}
            >  
                <OpenedBlock title="Mon Profil">
                    <Gallery startIndex={0} images={[about.avatarDesktop]} miniature={about.avatarDesktop} className="block w-full h-full object-cover" detail={false} />
                </OpenedBlock>
            </div>
            <div class="hidden lg:block lg:h-3/5 xl:hidden flex-1 min-h-0 ">
                <OpenedBlock title="A propos">
                    <p>
                        {about.description}
                    </p>
                </OpenedBlock>
            </div>
        </div>

        <div class=" flex flex-col sub-stats w-full lg:w-2/3 xl:w-2/6 h-6/10 lg:h-full mt-2 lg:mt-0 lg:ml-2 xl:order-3">
            <!--Desktop-->
            
            <div class=" flex-1 min-h-0 skills-block  ">
                <OpenedBlock title="Compétences">
                     <!--Front-->
                    <div class="flex items-center mb-1 p-5">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>
                    <h3 class="font-semibold sections-text">Front-End: </h3>
                    <ul class=" grid grid-cols-1 sm:grid-cols-2 gap-1 w-full   p-2 mb-5">
                        <!--loop-->
                        {#each about.skills.front as front, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                                <img class="icons-general mr-2" src="/{front.icon}" alt="icone {front.name}" /> <div>{ front.name }</div>
                            </li>    
                        {/each}
                    </ul>

                    <!--Back-->
                    <div class="flex items-center mb-1 p-5">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>
                    <h3 class="font-semibold sections-text">Back-End: </h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full   p-2 mb-3">
                        <!--loop-->
                        {#each about.skills.back as back, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                                <img class="icons-general mr-2" src="/{back.icon}" alt="icone {back.name}" /> <div>{ back.name }</div>
                            </li>    
                        {/each} 
                    </ul>

                    <!--Workflows-->
                    <div class="flex items-center mb-1 p-5">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>
                    <h3 class="font-semibold sections-text">Workflows: </h3>
                    <ul class=" grid grid-cols-1 sm:grid-cols-2 gap-1 w-full  p-2 mb-3">
                        <!--loop-->
                        {#each about.skills.workflow as workflow, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                                <img class="icons-general mr-2" src="/{workflow.icon}" alt="icone {workflow.name}" /> <div>{ workflow.name }</div>
                            </li>    
                        {/each}
                    </ul>

                    <!--Logiciel et plugin-->
                    <div class="flex items-center mb-1 p-5">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>
                    <h3 class="font-semibold sections-text">Logiciel et plugin: </h3>
                    <ul class="front-block grid grid-cols-1 sm:grid-cols-2 gap-1 w-full   p-2">
                        <!--loop-->
                        {#each about.skills.plugin as plugin, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                            <img class="icons-general mr-2" src="/{plugin.icon}" alt="icone {plugin.name}" /> <div>{ plugin.name }</div>
                            </li>    
                        {/each}
                    </ul>
                    <div class="flex items-center mb-1 p-5">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>
                </OpenedBlock>
               
            </div>
        </div>
        <div class="about-me-block w-full  h-1/10 xl:h-full  lg:hidden xl:block xl:w-2/6 xl:ml-2 xl:order-2">
            <!--Mobile/Tablet-->
            <div class="lg:hidden pt-2 ">
                <AnimatedBlock
                    anchored
                    closedWidth = "100%" 
                    closedHeight = "50px"
                    openWidth = "90%"
                    openHeight = "70%"
                    moveDuration = {600}
                    resizeDuration = {400}
                    startTop = "0%"
                    startLeft = "0%"
                    endTop = "50%"
                    endLeft = "50%"
                    init = {false}
                    transition = "0.5s"
                > 
                    {#snippet trigger(contentVisible)}
                        {#if contentVisible}
                            <h2 class="close-button-blocks font-bold cursor-pointer">X</h2>
                        {:else}
                           <h3 class="w-full h-full text-center about-me-animated">A propos</h3>
                        {/if}
                    {/snippet}
                    <div class="name-section flex items-center w-full">
                        <div class="decorator-cube-detail"></div> <h3 class="title-about-me font-bold">A propos</h3>
                    </div>
                    <div class="detail p-5 flex flex-col w-full">
                        <div class="flex items-center mb-1 mt-8">
                            <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                        </div>
                    </div>
                    <p class="p-5 text-[1.1rem]">
                        {about.description}
                    </p>

                    <div class="flex items-center mb-1 mt-1 p-5">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>
                </AnimatedBlock>
            </div>

            <!--Desktop XL-->
            <div class="hidden xl:block w-full h-full">
                <OpenedBlock title="A propos">
                    <div class="flex items-center mb-1">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>

                    <p class="p-4 text-xl leading-8 2xl:text-2xl 2xl:leading-9">
                        {about.description}
                    </p>

                    <div class="flex items-center mb-1">
                        <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
                    </div>

                    <p class="px-4 pt-2 font-bold">● {availability.status}</p>
                    <ul class="flex flex-wrap gap-2 px-4 pt-2">
                        {#each availability.tags as tag, index (index)}
                            <li class="language-block px-3 py-1 font-bold">{tag}</li>
                        {/each}
                    </ul>
                </OpenedBlock>
            </div>
                
        </div>
    </div>
</article>

<style>
    .sections-text {
        text-align: center;
    }

    .title-about-me {
        font-size: 1.5rem;
    }

    .about-me-animated {
        font-size: 1.8rem;
        font-weight: 700;
        cursor: pointer;
    }
</style>
