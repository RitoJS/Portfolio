<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
    import { page } from '$app/state';
	import { getContext, onMount } from 'svelte';

    const is404 = $derived(page.status === 404);

    const title = $derived(is404 ? 'Page introuvable' : 'Une erreur est survenue');
    const text = $derived(
        is404
            ? "Cette page n'existe pas ou a été déplacée."
            : (page.error?.message ?? 'Une erreur inattendue est survenue.')
    );
    const info = getContext<{ text: string | null }>('info');
    const noInfo: string = "Ooops !"

    onMount(() => {
        info.text = noInfo;
        return () => {
            if (info.text === noInfo) info.text = noInfo;
        };
    })
</script>

<article class="w-full h-full flex items-center justify-center p-2">
    <section class="panel w-full lg:w-4/5 max-h-full flex flex-col">
        <div class="panel-bar text-lg lg:text-2xl">
            <span class="square h-1/2 aspect-square"></span>Erreur
        </div>

        <div class="stripes h-3 lg:h-5"></div>

        <div class="panel-body flex-1 min-h-0 flex flex-col justify-center gap-4 lg:gap-5 p-4 lg:px-12 lg:py-8">
            <p class="code text-7xl sm:text-8xl lg:text-9xl font-light leading-none">{page.status}</p>
            <h1 class="title text-2xl sm:text-3xl lg:text-5xl font-light uppercase tracking-widest leading-tight">
                {title}
            </h1>
            <p class="text-base lg:text-2xl font-light">{text}</p>

            <div class="flex flex-wrap gap-3">
                <a href="/" class="btn btn-primary">Retour à l'accueil</a>
                <button type="button" class="btn" onclick={() => history.back()}>Page précédente</button>
            </div>
        </div>

        <div class="stripes h-3 lg:h-5"></div>
    </section>
</article>

<style>
    .panel {
        box-shadow: 4px 4px 0 var(--shadow-elements-color);
    }

    .panel-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        height: 2.5rem;
        padding: 0 0.75rem;
        font-weight: 600;
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }
    .square {
        background-color: var(--default-bg-elements2);
    }

    .panel-body {
        background-color: var(--default-bg-elements2);
    }

    .code,
    .title {
        text-shadow: 3px 3px 0 var(--shadow-elements-color);
    }

    .stripes {
        background: repeating-linear-gradient(
            -45deg,
            var(--bg-block-decorator) 0 14px,
            var(--default-bg-elements2) 14px 28px
        );
    }

    .btn {
        padding: 0.5rem 1.25rem;
        font-weight: 500;
        border: 1px solid var(--bg-block-decorator);
        box-shadow: 3px 3px 0 var(--shadow-elements-color);
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s;
    }
    .btn:hover,
    .btn:focus-visible,
    .btn-primary {
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }
    .btn-primary:hover,
    .btn-primary:focus-visible {
        background-color: transparent;
        color: inherit;
    }
</style>