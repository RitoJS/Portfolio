<script lang="ts">
	import AnimatedBlock from "$lib/components/animated-block.svelte";
    import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { aboutMock } from "$lib/mock/about-mock";
    import type { About } from "$lib/types/about";
    import { getContext } from "svelte";

    import avatarMobile  from "$lib/assets/home9.jpg";
    import avatarDesktop from "$lib/assets/home3.png";

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
<article class="w-full h-full">
    <div class="about-profile w-full h-full lg:flex">
        <!--Mobile/Tablet-->
        <div class=" lg:hidden main-stats flex h-2/6 w-full">
            <div class="avatar-block border-blue w-1/3">
                <img class="lg:hidden" src={avatarMobile} alt="mon portrait !"  />
                <img class="hidden lg:block" src={avatarDesktop} alt="mon portrait sur grand écran !"  />
            </div>

            <div class="main-stats-info flex flex-col  w-2/3">
                <div class="names-and-jobs border-green w-full h-full p-2">
                    <p>Name: <AnimationLetter data={about.name} className='' /></p>
                    <p>Age: <AnimationLetter data={getAge(about.age)} className='' /> ans</p>
                    <p>Job: <AnimationLetter data={about.job} className='' /></p>
                </div>

                
            </div>
        </div>

        <!--Desktop-->
        <div class="hidden lg:block w-1/3 xl:w-2/4 border">
             <div class="avatar-block  w-full">
                <img class="hidden lg:block" src={avatarDesktop} alt="mon portrait sur grand écran !"  />
            </div>
        </div>

        <div class=" flex flex-col sub-stats w-full lg:w-2/3 xl:w-1/4 h-3/6 lg:h-full p-2">
            <!--Desktop-->
            <div class="hidden lg:block">
                <div class="main-stats-info flex flex-col border-red w-full">
                    <div class="names-and-jobs border-green w-full h-1/3 p-2">
                        <p>Name: <AnimationLetter data={about.name} className='' /></p>
                        <p>Age: <AnimationLetter data={getAge(about.age)} className='' /> ans</p>
                        <p>Job: <AnimationLetter data={about.job} className='' /></p>
                    </div>
                </div>
            </div>
            <h2 class="h-10">Skills :</h2>
            <div class="overflow-auto flex-1 min-h-0 skills-block">
                <!--Front-->
                <h3 class="font-semibold sections-text">Front-End: </h3>
                <ul class=" grid grid-cols-3 gap-1 w-full  border p-2 mb-5">
                    <!--loop-->
                    {#each about.skills.front as front, index (index) }
                        <li class="language-block flex justify-center items-center font-bold h-20">
                            <img class="icons-general mr-2" src="/{front.icon}" alt="icone {front.name}" /> <div>{ front.name }</div>
                        </li>    
                    {/each}
                </ul>

                <!--Back-->
                <h3 class="font-semibold sections-text">Back-End: </h3>
                <ul class="grid grid-cols-3 gap-1 w-full  border p-2 mb-3">
                    <!--loop-->
                    {#each about.skills.back as back, index (index) }
                        <li class="language-block flex justify-center items-center font-bold h-20">
                            <img class="icons-general mr-2" src="/{back.icon}" alt="icone {back.name}" /> <div>{ back.name }</div>
                        </li>    
                    {/each} 
                </ul>

                <!--Workflows-->
                <h3 class="font-semibold sections-text">Workflows: </h3>
                <ul class=" grid grid-cols-3 gap-1 w-full  border p-2 mb-3">
                    <!--loop-->
                    {#each about.skills.workflow as workflow, index (index) }
                        <li class="language-block flex justify-center items-center font-bold h-20">
                            <img class="icons-general mr-2" src="/{workflow.icon}" alt="icone {workflow.name}" /> <div>{ workflow.name }</div>
                        </li>    
                    {/each}
                </ul>

                <!--Logiciel et plugin-->
                <h3 class="font-semibold sections-text">Logiciel et plugin: </h3>
                <ul class="front-block grid grid-cols-3 gap-1 w-full  border p-2">
                    <!--loop-->
                    {#each about.skills.plugin as plugin, index (index) }
                        <li class="language-block flex justify-center items-center font-bold h-20">
                           <img class="icons-general mr-2" src="/{plugin.icon}" alt="icone {plugin.name}" /> <div>{ plugin.name }</div>
                        </li>    
                    {/each}
                </ul>
            </div>
        </div>
        <div class="about-me-block w-full  h-1/6 xl:h-full border lg:hidden xl:block xl:w-1/4">
            <!--Mobile/Tablet-->
            <div class="lg:hidden ">
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aliquam vitae placeat praesentium odio! Aperiam, nihil maxime! Eveniet explicabo eaque laboriosam rem et, excepturi ducimus fuga repellat pariatur obcaecati! Sit.
                    </p>
                </AnimatedBlock>
            </div>
                
        </div>
    </div>
</article>
