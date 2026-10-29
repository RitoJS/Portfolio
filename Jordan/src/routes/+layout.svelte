<script lang="ts">
/* eslint-disable svelte/no-navigation-without-resolve */
    import './layout.css';
    import { page } from '$app/state';
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
	import { setContext } from 'svelte';
    import { beforeNavigate } from '$app/navigation';
    import favicon from '$lib/assets/favicon.svg';
    import CanvasBackground from '$lib/components/canvas-background.svelte';
	import Description from '$lib/components/description.svelte';
	import AnimatedBlock from '$lib/components/animated-block.svelte';
	import Menu from '$lib/components/menu.svelte';

    type Icons = {
        name: string;
        icon: string;
        link: string;
        showMobile: boolean;
    }

    let links: Icons[] = [
        {name: 'Svelte', icon:'assets/icons/svelte.svg', link: 'https://svelte.dev/', showMobile: false},
        {name: 'Github', icon:'assets/icons/git.svg', link: 'https://github.com/RitoJS', showMobile: true},
        {name: 'Linkedin', icon:'assets/icons/linkedin.svg', link: 'https://www.linkedin.com/in/jordan-sama', showMobile: true},
        {name: 'Wordpress', icon:'assets/icons/wordpress.svg', link: 'https://picrito.wordpress.com/', showMobile: true},
    ]

    let { children, data } = $props();

	const info = $state({
		text: null as string | null
	});

	let optionsMenu = $state({
        visible: true,
    });

    let modalBgShow = $state(false);

	setContext('info', info);

     beforeNavigate(() => {
        info.text = null;
    });

    const transitionIn = { easing: cubicIn, x: 10, duration: 800, delay: 800 };
    const transitionOut = { easing: cubicOut, x: -10, duration: 300 };

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // one config table, keyed by route
    const staggerConfig: Record<string, { className: string; delay?: number; step?: number, depth?: number }> = {
        '/about':   { className: 'stagger-in-about',   delay: 200, step: 80, depth: 3 },
        '/contact': { className: 'stagger-in-contact', delay: 800, step: 80 },
        default:    { className: 'stagger-in', delay: 900, step: 320, depth: 2 }
    };

    const pageStagger = $derived(staggerConfig[data.pathname] ?? staggerConfig.default);

    function stagger(
		node: HTMLElement,
		{
			delay = 800,
			step = 60,
			className = 'stagger-in',
			depth = 1
		}: { delay?: number; step?: number; className?: string; depth?: number } = {}
	) {
		if (prefersReducedMotion) return;

		// depth 1 = stagger main's direct children (default)
		// depth 2 = stagger the children INSIDE each of main's direct children instead
		let targets: Element[] = Array.from(node.children).filter((el) => !el.classList.contains('tips'));

		for (let level = 1; level < depth; level++) {
			targets = targets.flatMap((el) => Array.from(el.children));
		}

		targets.forEach((child, i) => {
            if (child.classList.contains('animated-block')) return; // skip
            (child as HTMLElement).style.setProperty('--stagger-delay', `${delay + i * step}ms`);
            child.classList.add(className);
        });
	}

    function modalBg() {
        return modalBgShow = !modalBgShow;
    }
</script>

<CanvasBackground />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{#if modalBgShow}
    <div class="fixed z-1 w-full h-full top-0 left-0 modal-bg lg:hidden"></div>
{/if}
<header class="z-2 lg:flex head-menu md:p-1 shrink-0">
    <!--Burger Menu-->
    <div 
    role="button" 
    tabindex="0"
    onkeydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      modalBg();
    }
  }} 
    class=" lg:hidden" onclick={modalBg} 
    >
        <AnimatedBlock
          closedWidth = "65px" 
            closedHeight = "45px"
            openWidth = "90%"
            openHeight = "70%"
            moveDuration = {600}
            resizeDuration = {400}
            startTop = "1%"
            startLeft = "2%"
            endTop = "50%"
            endLeft = "50%"
            init = {false}
            transition = "0.5s"
            buttonMenu = {true}
            
        > 
             {#snippet trigger(contentVisible)}
                {contentVisible ? '' : ''}
            {/snippet}
            <nav class="grid grid-cols-2 auto-rows-fr p-2 w-full h-full menu-nav min-w-0" >
                <Menu options={optionsMenu} />
            </nav>
        </AnimatedBlock>
    </div>

    <!--Desktop Menu-->
    {#if page.url.pathname !== '/'}
        <div class="hidden lg:block w-full">
            <nav class="flex justify-around items-center  w-full menu-nav">
                <Menu options={optionsMenu} />
            </nav>
        </div>
    {/if}
    
</header>


<div class="relative grid grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] flex-1 min-h-0">
    {#key data.pathname}
        <div class="grid-bg absolute w-full h-full"></div>
        <main
            style="grid-area: 1 / 1"
            class="main-content mt-15 mr-5 ml-5 mb-15 min-h-0 "
            in:fly={transitionIn}
            out:fly={transitionOut}
            use:stagger={pageStagger}
        >
            {@render children()}
        </main>
    {/key}

    <div class="tips">
        <Description />
    </div>
</div>


<footer class="site-footer flex  justify-between">
    <div class="flex h-full items-center md:w-1/2">
        <div class="footer-mark " aria-hidden="true"></div>
        <div class="footer-name ">
            <a href="https://github.com/RitoJS">
                Jordan Sama <span class="hidden md:inline">(RitoJS)</span>
            </a>
        </div>
    </div>

    <!--Mobile-->
    <div class="flex  md:hidden">
        {#each links as link, index (index)}
            {#if link.showMobile}
                <div class="ml-2">
                    <a href={link.link}>
                        <img class=" w-9 h-9 m-auto" src="/{link.icon}" alt="icone {link.name}" />
                    </a>
                </div>
            {/if}
        {/each}
    </div>
    <!--Desktop-->
    <div class="hidden md:flex w-1/2 h-full items-center justify-end pr-3">
        <div class="footer-note flex items-center gap-2">
            <span>Fait avec</span>
            <a class="flex items-center gap-1 font-semibold" href={links[0].link}>
                {links[0].name}
                <img class="size-6" src="/{links[0].icon}" alt="Icone de {links[0].name}" />
            </a>
        </div>
    </div>
    
</footer>

<style>
    .main-content {
        grid-area: 1 / 1;
    }
    .modal-bg {
        opacity: 0.5;
        background-color: rgb(0, 0, 0);
        transition: 0.2s;
    }

    .tips {
        grid-area: 1 / 1;
        align-self: end;
        margin-left: 5%;
        margin-right: 5%;
        z-index: 4;
    }

    .tips:hover {
        opacity: 0.3;
        transition: 0.2s;
    }

    .site-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
        height: var(--footer-h, 2.5rem);
        padding: 0 0.75rem 0 0;
        border-top: 1px solid var(--focus-elements);
        background: var(--default-bg-elements2);
        box-shadow: 0 -3px 0 var(--shadow-elements-color);
        z-index: 3;
    }

    /* same dark square as the menu buttons */
    .footer-mark {
        align-self: stretch;
        width: 2rem;
        background: var(--focus-elements);
    }

    .footer-name {
        font-weight: 700;
    }

    /* pushes the note to the right on larger screens */
    .footer-note {
        margin-left: auto;
        opacity: 0.8;
    }

</style>
