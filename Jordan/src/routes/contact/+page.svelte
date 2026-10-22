<script lang="ts">
    import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { contactPageMock } from "$lib/mock/contact-page-mock";
    import type { ContactPage } from "$lib/types/contact";
    import { getContext } from "svelte";

    let contactPageInfo: ContactPage = contactPageMock;
</script>

<article class="w-full h-full">
    <div class="flex flex-col justify-between w-full h-full border p-5">
        <div>
            <h2 class="page-title w-full text-left">Contactez - moi</h2>
            <!--Form-->
            <div class="form-block">
                <form>
                    <div class="form-input flex  mt-3 md:mt-10 text-center">
                        <div class=" w-3 md:block thick-line mr-2"></div>
                        <div class="w-1 thin-line mr-2"></div>
                        <input type="text" placeholder="Nom" class="w-full"  required />
                    </div>

                    <div class="form-input flex  mt-3 md:mt-10 text-center">
                        <div class=" w-3 md:block thick-line mr-2"></div>
                        <div class="w-1 thin-line mr-2"></div>
                        <input
                            type="mail"
                            placeholder="Adresse Email"
                            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                            class="w-full"
                            required
                        />
                    </div>

                    <div class="form-input flex  mt-3 md:mt-10 text-center">
                        <div class=" w-3 md:block thick-line mr-2"></div>
                        <div class="w-1 thin-line mr-2"></div>
                        <input type="text" placeholder="sujet" class="w-full"  required />
                    </div>

                    <div class="form-textarea flex   mt-3 md:mt-10 text-center">
                        <div class=" w-3 md:block thick-line mr-2"></div>
                        <div class="w-1 thin-line mr-2"></div>
                        <textarea
                            class="w-full"
                            placeholder="Tapez votre message ici"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    <div class="form-button mb-3 mt-3 text-center">
                        <button  type="submit">Envoyer</button>
                    </div>
                </form>

            </div>
        </div>

        <!--External links-->
        <div class="border grid grid-cols-3">
            <div class="external-link-block p-2 m-2">
                @
            </div>
            <div class="external-link-block p-2 m-2">
                @
            </div>
            <div class="external-link-block p-2 m-2">
                @
            </div>
            {#each contactPageInfo.externLink as info, index (index) }
                 <div class="external-link-block p-2 m-2">
                    @
                </div>
            {/each}
        </div>
    </div>
        
        
    

</article>


<style>
    .form-input {
        background: none;
        height: 75px;
    }
</style>