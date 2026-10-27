<script lang="ts">
	import AnimatedBlock from "$lib/components/animated-block.svelte";
    import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { aboutMock } from "$lib/mock/about-mock";
    import type { About } from "$lib/types/about";
    import { getContext } from "svelte";

	import OpenedBlock from "$lib/components/opened-block.svelte";
	import Gallery from "$lib/components/gallery.svelte";

    const info = getContext<{ text: string | null }>('info');

    let about: About = aboutMock;

    function getAge(date: Date) {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const anniversaryHappened =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());
        if (!anniversaryHappened) age--;
        return age;
    }

</script>

<!--Mobile-->
<article class="w-full h-full ">
     <div>
        <AnimationLetter data="A propos de moi" className="page-title w-full text-left" />
    </div>
    <div class="about-profile w-full h-full lg:flex">
        <!--Mobile/Tablet-->
        <div class=" lg:hidden main-stats flex h-3/10 w-full">
                <div class="avatar-block h-full p-1 w-1/3">
                    <OpenedBlock title="Mon Profil">
                        <Gallery startIndex={0} images={[about.avatarMobile]} miniature={about.avatarMobile} className="w-full h-full object-cover" detail={false} />
                    </OpenedBlock> 
                </div>
            

            <div class="main-stats-info flex flex-col  w-2/3">
                <div class="names-and-jobs w-full h-full p-1">
                    <OpenedBlock title="Informations">
                        <p>Name: <AnimationLetter data={about.name} className='' /></p>
                        <p>Age: <AnimationLetter data={getAge(about.age)} className='' /> ans</p>
                        <p>Job: <AnimationLetter data={about.job} className='' /></p>
                    </OpenedBlock>
                </div>

                
            </div>
        </div>

        <!--Desktop-->
        <div class="hidden lg:flex lg:flex-col gap-2  w-1/3 xl:w-3/6 h-full min-h-0 ">
             <div class="avatar-block  w-full xl:h-full lg:h-2/5 shrink-0 ">  
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

        <div class=" flex flex-col sub-stats w-full lg:w-2/3 xl:w-2/6 h-6/10 lg:h-full mt-2 lg:mt-0 lg:ml-2">
            <!--Desktop-->
            <div class="hidden lg:block">
                <div class="main-stats-info flex flex-col  w-full ">
                    <div class="names-and-jobs w-full h-1/3 mb-2 ">
                        <OpenedBlock title="Informations">
                            <p>Name: <AnimationLetter data={about.name} className='' /></p>
                            <p>Age: <AnimationLetter data={getAge(about.age)} className='' /> ans</p>
                            <p>Job: <AnimationLetter data={about.job} className='' /></p>
                        </OpenedBlock>
                       
                    </div>
                </div>
            </div>
            
            <div class=" flex-1 min-h-0 skills-block  ">
                <OpenedBlock title="Compétences">
                     <!--Front-->
                    <h3 class="font-semibold sections-text">Front-End: </h3>
                    <ul class=" grid grid-cols-2 md:grid-cols-3 gap-1 w-full   p-2 mb-5">
                        <!--loop-->
                        {#each about.skills.front as front, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                                <img class="icons-general mr-2" src="/{front.icon}" alt="icone {front.name}" /> <div>{ front.name }</div>
                            </li>    
                        {/each}
                    </ul>

                    <!--Back-->
                    <h3 class="font-semibold sections-text">Back-End: </h3>
                    <ul class="grid grid-cols-2 md:grid-cols-3 gap-1 w-full   p-2 mb-3">
                        <!--loop-->
                        {#each about.skills.back as back, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                                <img class="icons-general mr-2" src="/{back.icon}" alt="icone {back.name}" /> <div>{ back.name }</div>
                            </li>    
                        {/each} 
                    </ul>

                    <!--Workflows-->
                    <h3 class="font-semibold sections-text">Workflows: </h3>
                    <ul class=" grid grid-cols-2 md:grid-cols-3 gap-1 w-full  p-2 mb-3">
                        <!--loop-->
                        {#each about.skills.workflow as workflow, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                                <img class="icons-general mr-2" src="/{workflow.icon}" alt="icone {workflow.name}" /> <div>{ workflow.name }</div>
                            </li>    
                        {/each}
                    </ul>

                    <!--Logiciel et plugin-->
                    <h3 class="font-semibold sections-text">Logiciel et plugin: </h3>
                    <ul class="front-block grid grid-cols-2 md:grid-cols-3 gap-1 w-full   p-2">
                        <!--loop-->
                        {#each about.skills.plugin as plugin, index (index) }
                            <li class="language-block flex justify-center items-center font-bold h-20">
                            <img class="icons-general mr-2" src="/{plugin.icon}" alt="icone {plugin.name}" /> <div>{ plugin.name }</div>
                            </li>    
                        {/each}
                    </ul>
                </OpenedBlock>
               
            </div>
        </div>
        <div class="about-me-block w-full  h-1/10 xl:h-full  lg:hidden xl:block xl:w-1/6 xl:ml-2">
            <!--Mobile/Tablet-->
            <div class="lg:hidden pt-2 ">
                <AnimatedBlock
                    anchored
                    closedWidth = "100%" 
                    closedHeight = "50px"
                    openWidth = "90%"
                    openHeight = "50%"
                    moveDuration = {600}
                    resizeDuration = {400}
                    startTop = "0%"
                    startLeft = "0%"
                    endTop = "50%"
                    endLeft = "50%"
                    init = {false}
                    transition = "0.5s"
                    buttonMenu = {false}> 
                    {#snippet trigger(contentVisible)}
                        {contentVisible ? 'close' : 'About Me'}
                    {/snippet}
                    <p>
                        {about.description}
                    </p>
                </AnimatedBlock>
            </div>

            <!--Desktop XL-->
            <div class="hidden xl:block w-full h-1/2 ">
                <OpenedBlock title="A propos">
                    <p>
                        {about.description}
                    </p>
                </OpenedBlock>
            </div>
                
        </div>
    </div>
</article>

<style>
    .sections-text {
        text-align: center;
    }
</style>
