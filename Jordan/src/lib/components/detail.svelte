<script lang="ts">
	import type { Works } from "$lib/types/works";
    import AnimationLetter from "./animation-letter.svelte";
	import Gallery from "./gallery.svelte";
    type Props = {
        work:  Works;
    };

    let { work }: Props = $props();
   
</script>

<article class="work-parent p-5 w-full h-full overflow-y-auto">
    <div class="detail flex flex-col w-full">
        <div class="compagny-section text-center w-full">
            <h3 class="compagny-title">{ work.company }</h3>
        </div>
        <div class="sections">
            <h3>Durée:</h3>
            <p>
                De { work.startDate?.getFullYear() } à { work.endDate?.getFullYear() }
            </p>
        </div>

        <div class="sections">
            <h3>A propos:</h3>
            <p>
                { work.description } 
            </p>
        </div>

        <div class="sections">
            <h3>Poste:</h3>
            <p>
                { work.jobName } 
            </p>
        </div>

        <div class="sections">
            <h3>Role:</h3>
            <p>
                { work.role } 
            </p>
        </div>

        <div class="sections">
            <h3>Problème(s) rencontré(s):</h3>
            <p>
                { work.problem } 
            </p>
        </div>

        <div class="sections">
            <h3>Résolutions:</h3>
            <p>
                { work.solution } 
            </p>
        </div>

        <div class="sections">
            <h3>Langages utilisé:</h3>
            <div class="languages-used grid grid-rows-2 md:grid-rows-3">
                {#each work.languages as language, index (index) }
                    <p class="language-block">
                        { language }
                    </p>
                {/each}
            </div>
        </div>

        <div class="section-img">
            <h3>Images :</h3>
            <div class="gallery-block grid grid-rows-2 md:grid-rows-3">
                {#each work.screenshots as screenshot, index (index) }
                    <Gallery images={work.screenshots} miniature={screenshot} startIndex={index} />
                {/each}
            </div>
        </div>
    </div>
</article>





