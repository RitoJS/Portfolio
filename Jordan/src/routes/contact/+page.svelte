<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
    import { onMount } from "svelte";
    import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { contactPageMock } from "$lib/mock/contact-page-mock";
    import type { ContactPage } from "$lib/types/contact";
    import { getContext } from "svelte";
    import { enhance } from '$app/forms';
    const description = getContext<{ text: string | null }>('info');

    let contactPageInfo: ContactPage = contactPageMock;
    const noInfo: string = "Envie d'échanger ? Remplissez le formulaire, je réponds dès que possible.";

    //Envoi de mail
    let { form } = $props();
    let sending = $state(false);

    // Le résultat de l'envoi s'affiche aussi dans ta barre de description
    $effect(() => {
        if (form?.success) description.text = 'Message envoyé, merci ! Je vous réponds dès que possible.';
        else if (form?.error) description.text = form.error;
    });

    onMount(() => {
        description.text = noInfo;
    })
</script>

<article class="w-full h-full overflow-y-auto">
    <div>
        <AnimationLetter data="Contactez - moi" className="page-title w-full text-left" />
    </div>
    <div class="flex flex-col  lg:flex-row-reverse justify-between lg:justify-center w-full p-5">
        <div class="lg:w-5/10">
            <!--Form-->
            <div class="form-block">
                <form
                    method="POST"
                    use:enhance={() => {
                        sending = true;
                        return async ({ update }) => {
                            await update();
                            sending = false;
                        };
                    }}
                >
                    <div class="form-input  mt-3 md:mt-5 lg:mt-0 ">
                        <label class="ml-6.5 label-form" for="nom">
                            <AnimationLetter data="Nom: " className='' delays={20} />
                        </label>
                        <div class="flex w-full">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <input 
                                id="nom"
                                type="text"
                                class="w-full h-20 md:h-15"
                                name="nom"
                                autocomplete="name"
                                maxlength="100"
                                value={form?.values?.nom ?? ''}
                                required 
                            />
                        </div>
                        {#if form?.errors?.nom}<p class="field-error ml-6.5" role="alert">{form.errors.nom}</p>{/if}
                        
                    </div>

                    
                    <div class="form-input  mt-3 md:mt-5 lg:mt-0">
                        <label class="ml-6.5 label-form"  for="email">
                             <AnimationLetter data="Adresse Email: " className='' delays={20} />
                        </label>
                        <div class="flex w-full ">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <input
                                id="email"
                                type="email"
                                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                class="w-full h-20 md:h-15"
                                name="email"
                                autocomplete="email"
                                maxlength="254"
                                value={form?.values?.email ?? ''}
                                required
                            />
                        </div>
                        {#if form?.errors?.email}<p class="field-error ml-6.5" role="alert">{form.errors.email}</p>{/if}
                       
                    </div>

                    <div class="form-input  mt-3 md:mt-5 lg:mt-0">
                        <label class="ml-6.5 label-form" for="sujet">
                             <AnimationLetter data="Sujet: " className='' delays={20} />
                        </label>
                        <div class="w-full flex">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <input 
                                id="sujet"
                                type="text"  
                                class="w-full h-20 md:h-15"  
                                name="sujet" 
                                autocomplete="off"
                                maxlength="150"
                                value={form?.values?.sujet ?? ''}
                                required 
                            />
                        </div>
                        {#if form?.errors?.sujet}<p class="field-error ml-6.5" role="alert">{form.errors.sujet}</p>{/if}
                        
                    </div>

                    <div class="form-textarea   mt-3 md:mt-5 lg:mt-0">
                        <label class="ml-6.5 label-form" for="description">
                             <AnimationLetter data="Description: " className='' delays={20} />
                        </label>
                        <div class="flex w-full">
                            <div class=" w-3 md:block thick-line-pages mr-2"></div>
                            <div class="w-1 thin-line-pages mr-2"></div>
                            <textarea
                                id="description"
                                class="w-full"
                                rows="5"
                                name="description"
                                autocomplete="off"
                                maxlength="5000"
                                value={form?.values?.description ?? ''}
                                required
                            ></textarea>
                        </div>
                        {#if form?.errors?.description}<p class="field-error ml-6.5" role="alert">{form.errors.description}</p>{/if}
                       
                    </div>
                    <!--Prevent Bot-->
                    <input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px" />

                    <div class="form-button flex justify-center mb-3 mt-3 text-center">
                        <button class="flex w-1/2 h-15 items-center" type="submit" disabled={sending}>
                            <div class="text-center w-full">{sending ? 'Envoi…' : 'Envoyer'}</div>
                        </button>
                    </div>

                    {#if form?.success}<p class="text-center" role="status">Message envoyé, merci !</p>{/if}
                    {#if form?.error}<p class="text-center field-error" role="alert">{form.error}</p>{/if}
                </form>

            </div>
        </div>

        <!--External links-->
        <div class=" hidden lg:grid grid-cols-1 lg:w-1/10 self-start h-fit">
            <ul>
                <li>
                     <div 
                        class="external-link-block p-2 m-2 transition-transform duration-300 hover:scale-125"
                        role="presentation"
                        onmouseenter={() => (description.text = `Mon adresse mail: jsscottsama@gmail.com`)}
                        onmouseleave={() => (description.text = noInfo)}
                    >
                        <img class="cursor-pointer m-auto imgs-icons" src="/assets/icons/mail.svg" alt="icone de l'addresse mail" />
                    </div>
                </li>
                 <li>
                    <div 
                        class="external-link-block p-2 m-2 transition-transform duration-300 hover:scale-125"
                        role="presentation"
                        onmouseenter={() => (description.text = `Voir mon CV traditionnel`)}
                        onmouseleave={() => (description.text = noInfo)}
                    >
                        <a href="/assets/files/Jordan-Sama_cv-1.pdf" target="_blank" rel="noopener noreferrer">
                            <img class="cursor-pointer m-auto imgs-icons" src="/assets/icons/resume.svg" alt="icone de mon cv" />
                        </a>
                    </div>
                </li>
                 <li>
                    <div 
                        class="external-link-block p-2 m-2 transition-transform duration-300 hover:scale-125"
                        role="presentation"
                        onmouseenter={() => (description.text = `Aller sur ma page github`)}
                        onmouseleave={() => (description.text = noInfo)}
                    >
                        <a href="https://github.com/RitoJS" target="_blank" rel="noopener noreferrer">
                            <img class="cursor-pointer m-auto imgs-icons" src="/assets/icons/git.svg" alt="icone de ma page github" />
                        </a>
                    </div>
                </li>
                 {#each contactPageInfo.externLink as info, index (index) }
                     <li>
                         <div 
                            class="external-link-block p-2 m-2 transition-transform duration-300 hover:scale-125"
                            role="presentation"
                            onmouseenter={() => (description.text = `Aller sur ${info.name}`)}
                            onmouseleave={() => (description.text = noInfo)}
                         >
                            <a href={info.link} target="_blank" rel="noopener noreferrer">
                                <img class="cursor-pointer m-auto imgs-icons" src="/{info.icon}" alt="icone de {info.name}" />
                            </a>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
        
        
    

</article>


<style>
    .form-input, .form-textarea {
        background: none;
        border: 0;
        input, textarea {
            background: var(--default-bg-elements2);
            box-shadow: 5px 3px 5px rgba(39, 38, 36, 0.2);
            border-bottom: 2px solid var(--shadow-elements-color);
            border-top: 0;
            border-left: 0;
            border-right: 0;
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
            background: linear-gradient(to right, var(--focus-elements) 50%, var(--default-bg-elements2) 50%);
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
    .external-link-block {
        background-color: #d2cbb4;
        border-bottom: 2px solid;
        border-radius: 2px;
        transition: 0.15s;
    }
    
    .imgs-icons {
        height: 40px;
        width: 40px;
    }

    .field-error {
        font-size: 0.9em;
        font-weight: 500;
    }
</style>