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
                    <div class="form-input  mt-3 md:mt-10 ">
                        <label class="ml-6.5 label-form" for="nom">Nom: </label>
                        <div class="flex w-full">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <input type="text" class="w-full" name="nom"  required />
                        </div>
                        
                    </div>

                    
                    <div class="form-input  mt-3 md:mt-10 ">
                        <label class="ml-6.5 label-form"  for="email">Adresse Email: </label>
                        <div class="flex w-full ">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <input
                                type="mail"
                                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                class="w-full"
                                name="email"
                                required
                            />
                        </div>
                       
                    </div>

                    <div class="form-input  mt-3 md:mt-10 ">
                        <label class="ml-6.5 label-form" for="nom">Sujet: </label>
                        <div class="w-full flex">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <input type="text" placeholder="sujet" class="w-full"  name="Sujet: " required />
                        </div>
                        
                    </div>

                    <div class="form-textarea   mt-3 md:mt-10 ">
                        <label class="ml-6.5 label-form" for="description">Description: </label>
                        <div class="flex w-full">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <textarea
                                class="w-full"
                                placeholder="Tapez votre message ici"
                                rows="5"
                                name="description"
                                required
                            ></textarea>
                        </div>
                       
                    </div>

                    <div class="form-button flex justify-center mb-3 mt-3 text-center">
                        <button class="flex w-1/2 h-15 items-center "  type="submit">
                            
                            <div class="text-center w-full ">
                                Envoyer
                            </div>
                        </button>
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
    .form-input, .form-textarea {
        background: none;
        border: 0;
        input, textarea {
            background: #b8b19b;
            box-shadow: 5px 3px 5px rgba(39, 38, 36, 0.2);
            border-bottom: 2px solid var(--shadow-elements-color);
            border-top: 0;
            border-left: 0;
            border-right: 0;
        }
        input {
            height: 75px;
        }
        input:focus-visible {
            outline: none;
        }

    }

    .label-form {
        font-size: 1.3em;
        font-weight: 400;
    }

    .form-button {
        button {
            font-weight: 500;
            background: linear-gradient(to right, var(--focus-elements) 50%, var(--default-bg-elements) 50%);
            background-size: 200% 100%;
            background-position: right bottom;
            border-bottom: 3px solid;
            border-radius: 2px;
            transition: 0.1s;

        }

        button:active {
            border-bottom: 0;
            border-top: 2px solid;
            border-left: 1px solid;
        }
    }
</style>