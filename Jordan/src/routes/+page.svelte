<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
    import { getContext, onMount } from 'svelte';
    import { beforeNavigate } from '$app/navigation';
    import Gallery from '$lib/components/gallery.svelte';
    import AnimationLetter from '$lib/components/animation-letter.svelte';
	import AnimationHome from '$lib/components/animation-home.svelte';

    const info = getContext<{ text: string | null }>('info');

    const avatarMobile: string = 'assets/imgs/home2.png';

    const links = [
        { href: '/works',   label: 'Works',   sub: 'Parcours et projets',   desc: 'Mon parcours, mes formations et mes projets.' },
        { href: '/about',   label: 'About',   sub: 'Profil et compétences', desc: 'Qui je suis et ce que je sais faire.' },
        { href: '/hobbies', label: 'Hobbies', sub: 'Hors du code',          desc: 'Ce que je fais quand je ne code pas.' },
        { href: '/contact', label: 'Contact', sub: 'Formulaire et liens',   desc: 'Un message, un projet ? Écris-moi.' }
    ];

    const tags: string[] = ['react', 'svelte', 'vue', 'nextjs'];

    const availability = {
        open: true,
        status: 'Disponible',
        rows: [
            { label: 'Contrat', value: 'CDI, CDD' },
            { label: 'Début',   value: 'Immédiat' },
            { label: 'Lieu',    value: 'Paris  / Télétravail' }
        ]
    };

    const defaultText: string = 'Choisissez une section pour commencer.';
    let active = $state(0);
    let leaving = false;

    beforeNavigate(() => {
        leaving = true;
    });

    onMount(() => {
        info.text = defaultText;
    });

    function hover(i: number) {
        if (leaving) return;
        active = i;
        info.text = links[i].desc;
    }
    function leave() {
        if (leaving) return;
        info.text = defaultText;
    }
</script>

<article
    class="text-base w-full h-full flex flex-col gap-4
           lg:grid lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_minmax(0,1fr)] lg:content-start
           lg:h-5/6 lg:gap-x-14 lg:gap-y-0 lg:px-8
           overflow-y-auto lg:overflow-visible"
>
    <!-- Ligne 1 : titre -->
    <h1 class="text-4xl lg:text-5xl xl:text-6xl font-light leading-none lg:mb-3 lg:col-start-1 lg:row-start-1">
        <AnimationLetter data="Jordan Sama" className="" />
    </h1>

    <!-- Ligne 2, colonne gauche : métier + (profil mobile) + menu -->
    <div class="flex flex-col gap-4 lg:col-start-1 lg:row-start-2 lg:min-h-0">
        <div class="job px-3 py-2 lg:px-4 text-base lg:text-lg font-medium">
            <span class="font-bold">D</span>éveloppeur <span class="font-bold">W</span>eb <span class="font-bold">F</span>ront-<span class="font-bold">E</span>nd / <span class="font-bold">I</span>ntégrateur <span class="font-bold">W</span>eb
        </div>

        <!-- Mobile -->
        <div class="flex gap-2.5 h-1/3 shrink-0 lg:hidden">
            <div class="panel w-1/3 shrink-0 flex flex-col">
                <div class="panel-bar tracking-wider"><span class="square h-1/2 aspect-square"></span>Profil</div>
                <div class="flex-1 min-h-0">
                    <Gallery
                        startIndex={0}
                        images={[avatarMobile]}
                        miniature={avatarMobile}
                        className="w-full h-full object-cover"
                        detail={false}
                    />
                </div>
            </div>
            <div class="panel flex-1 min-w-0 flex flex-col">
                <div class="panel-bar tracking-wider"><span class="square h-1/2 aspect-square"></span>Disponibilités</div>
                <div class="panel-body flex-1 min-h-0 p-3 flex flex-col justify-between gap-2">
                    <p class="status text-lg font-semibold">
                        <span class="dot {availability.open ? 'is-open' : ''}"></span>{availability.status}
                    </p>
                    <dl class="leading-5">
                        {#each availability.rows as row (row.label)}
                            <div class="flex gap-1">
                                <dt class="font-bold">{row.label} :</dt>
                                <dd>{row.value}</dd>
                            </div>
                        {/each}
                    </dl>
                    <ul class="flex flex-wrap gap-1.5">
                        {#each tags as tag (tag)}
                            <li class="tag text-xs">{tag}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>

        <!-- Menu -->
        <nav class="flex flex-col gap-2.5 lg:gap-0 lg:flex-1 lg:min-h-0 lg:mt-6" onmouseleave={leave} aria-label="Sections">
            {#each links as link, i (link.href)}
                <a
                    href={link.href}
                    class="menu-item py-4 lg:py-0 lg:flex-1 {active === i ? 'is-active' : ''}"
                    onmouseenter={() => hover(i)}
                    onfocus={() => hover(i)}
                    onblur={leave}
                >
                    <span class="square-sm"></span>
                    <span class="flex-1 text-xl lg:text-2xl font-medium">{link.label}</span>
                    <span class="text-sm lg:text-base tracking-wider">{link.sub}</span>
                </a>
            {/each}
        </nav>
    </div>

    <!-- Desktop : ligne 2, colonne droite -->
    <div class="panel hidden lg:flex min-w-0 min-h-0 flex-col lg:col-start-2 lg:row-start-2">
        <div class="panel-bar text-lg"><span class="square h-1/2 aspect-square"></span>Mon Profil</div>
        <div class="panel-body flex-1 min-h-0 p-5 flex flex-col gap-5">
            <div class="h-1/2 min-h-0 border-2">
               <AnimationHome />
            </div>

            <ul class="flex flex-wrap gap-2">
                {#each tags as tag (tag)}
                    <li class="tag text-sm">{tag}</li>
                {/each}
            </ul>

            <div class="flex flex-col gap-2 min-h-0">
                <p class="status text-lg font-semibold">
                    <span class="dot {availability.open ? 'is-open' : ''}"></span>{availability.status}
                </p>
                <dl class="text-base lg:text-[1.2rem] lg:tracking-wider leading-6">
                    {#each availability.rows as row (row.label)}
                        <div class="flex gap-2 border-b border-(--shadow-elements-color) py-1">
                            <dt class="font-bold w-1/4">{row.label}</dt>
                            <dd>{row.value}</dd>
                        </div>
                    {/each}
                </dl>
            </div>
        </div>
    </div>
</article>

<style>

    .job {
        padding-block: 0.5rem;
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }

    .panel {
        box-shadow: 3px 3px 0 var(--shadow-elements-color);
    }

    .panel-bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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

    .tag {
        padding: 0.25rem 0.625rem;
        font-weight: 600;
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }

    .status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .dot {
        width: 0.75rem;
        aspect-ratio: 1;
        border: 2px solid var(--bg-block-decorator);
        background-color: transparent;
    }
    .dot.is-open {
        background-color: var(--bg-block-decorator);
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding-inline: 0.875rem;
        background-color: var(--default-bg-elements2);
        box-shadow: 3px 3px 0 var(--shadow-elements-color);
        text-decoration: none;
        transition: background-color 0.2s, color 0.2s;
    }
    .square-sm {
        width: 0.75rem;
        aspect-ratio: 1;
        background-color: var(--bg-block-decorator);
    }
    .menu-item:hover,
    .menu-item:focus-visible,
    .menu-item.is-active {
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }
    .menu-item:hover .square-sm,
    .menu-item:focus-visible .square-sm,
    .menu-item.is-active .square-sm {
        background-color: var(--focus-text-color);
    }

    /* Desktop  */
    @media (min-width: 1024px) {
        .menu-item {
            background-color: transparent;
            box-shadow: none;
            border-bottom: 1px solid var(--shadow-elements-color);
        }
        .menu-item:hover,
        .menu-item:focus-visible,
        .menu-item.is-active {
            box-shadow: 3px 3px 0 var(--shadow-elements-color);
        }
    }
</style>