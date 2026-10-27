<script lang="ts">
	import type { Works } from "$lib/types/works";
	import Gallery from "./gallery.svelte";
    type Props = {
        work:  Works;
    };

    let { work }: Props = $props();
   
</script>

<article class=" w-full h-full overflow-y-auto">
    <div class="compagny-section flex items-center w-full">
         <div class="decorator-cube-detail"></div> <h3 class="compagny-title font-bold">{ work.company }</h3>
    </div>
    <div class="detail p-5 flex flex-col w-full">
        <div class="flex items-center mb-1 mt-8">
            <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
        </div>
        <div class="sections">
            <h3>Durée:</h3>
            <p>
                De <span class="font-semibold"> { work.startDate?.getFullYear() } </span> à <span class="font-semibold"> { work.endDate?.getFullYear() } </span>
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

         <div class="flex items-center mb-1 mt-5">
            <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
        </div>

        {#if work.role}
            <div class="sections">
                <h3>Role:</h3>
                <p>
                    { work.role } 
                </p>
            </div>
        {/if}
        

        {#if work.problem}
            <div class="sections">
                <h3>Problème(s) rencontré(s):</h3>
                <p>
                    { work.problem } 
                </p>
            </div>
        {/if}
        

        {#if work.solution}
            <div class="sections">
                <h3>Résolutions:</h3>
                <p>
                    { work.solution } 
                </p>
            </div>
        {/if}
        
        {#if work.languages?.length}
            <div class="sections-languages">
                <h3>Langages utilisé:</h3>
                <div class="languages-used grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  justify-items-center">
                    {#each work.languages as language, index (index) }
                        <p class="language-block p-2 m-1 text-center w-full sm:w-40 flex justify-center items-center font-bold">
                            <img class="icons-general mr-2" src="/{language.icon}" alt="icone {language.name}" />{ language.name }
                        </p>
                    {/each}
                </div>
            </div>
        {/if}
        

         <div class="flex items-center mb-1 mt-8">
            <div class="mr-0.5">&bull;</div><hr class="block block-separator w-full m-1" /><div class="ml-0.5">&bull;</div>
        </div>

        {#if work.screenshots?.length}
            <div class="section-imgs">
                <h3>Images :</h3>
                <div class="gallery-block grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  justify-items-center">
                    {#each work.screenshots as screenshot, index (index) }
                        <div class="p-2">
                            <Gallery images={work.screenshots} miniature={screenshot} startIndex={index} />
                        </div>
                        
                    {/each}
                </div>
            </div>
        {/if}
        

    </div>
</article>

<style>
    .compagny-section {
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
        pointer-events: none;
        position: absolute;
        z-index: 8;
    }

    .compagny-title {
        font-size: 1.5rem;
    }
    .decorator-cube-detail {
        background-color: var(--focus-text-color);
        width: 35px;
        height: 35px;
        margin: 5px;
    }

    .block-separator {
        border: 1px solid;
    }

    .sections {
        padding: 5px;
        margin-bottom: 1rem;

        h3 {
            font-weight: 700;
            text-align: center;
            
        }

        p {
            border: 2px solid var(--focus-elements);
            text-align: center;
            padding: 5px;
        }

        
    }

    

    .sections-languages {
        padding: 5px;
        margin-bottom: 1rem;
        h3 {
            font-weight: 700;
            text-align: center;
        }
        .languages-used {
            border: 2px solid var(--focus-elements);
            padding: 5px;
        }

        

        
    }

     .section-imgs {
        padding: 5px;
        margin-bottom: 1rem;
        h3 {
            font-weight: 700;
            text-align: center;
        }
       
    }
</style>





