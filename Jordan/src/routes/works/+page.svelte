<script lang="ts">
	import AnimatedBlock from "$lib/components/animated-block.svelte";
    import { worksMock } from "$lib/mock/works-mock";
    import type { Works } from "$lib/types/works";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { getContext } from "svelte";

    const dataWorks: Works[] = worksMock;

</script>


<article class="w-full h-full">
    <!--Mobile-->
    <div class="lg:hidden w-full h-full block-timeline flex justify-center items-start">
        <div
          class="space-y-8 relative w-fit h-fit before:absolute before:inset-0 before:m-auto before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white"
        >
            {#each dataWorks as work, index (index) }
                <!--Item-->
                <div class="relative flex justify-between md:justify-normal md:odd:flex-row-reverse group is-active" >
                    <!--Icon-->
                    <div  class={ `${(dataWorks.length-1 !== index ? 'mb-5' : '')} `}>
                        <AnimatedBlock
                            anchored
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
                                {contentVisible ? 'close' : 'About Me'}
                            {/snippet}
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vero minima repudiandae hic officia, dicta quod tempore amet quis ipsum, delectus ea earum. Quam placeat, non repellendus nobis soluta earum.</p>
                        </AnimatedBlock>
                    </div>
                   
                </div>
            {/each}
        </div>
    </div>
</article>


<style>
    
</style>