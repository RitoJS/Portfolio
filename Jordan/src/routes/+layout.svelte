<script lang="ts">
    import './layout.css';
    import { fly } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
	import { setContext } from 'svelte';
    import favicon from '$lib/assets/favicon.svg';
    import CanvasBackground from '$lib/components/canvas-background.svelte';
	import Description from '$lib/components/description.svelte';
	import AnimatedBlock from '$lib/components/animated-block.svelte';
	import Menu from '$lib/components/menu.svelte';

    let { children, data } = $props();

	const info = $state({
		text: null as string | null
	});

	let optionsMenu = $state({
        visible: true,
    });

    let modalBgShow = $state(false);

	setContext('info', info);

    const transitionIn = { easing: cubicIn, x: 10, duration: 300, delay: 800 };
    const transitionOut = { easing: cubicOut, x: -10, duration: 300 };

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // one config table, keyed by route
    const staggerConfig: Record<string, { className: string; delay?: number; step?: number, depth?: number }> = {
        '/about':   { className: 'stagger-in-about',   delay: 800, step: 60 },
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
		let targets: Element[] = Array.from(node.children);

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
    <div class="fixed z-1 w-full h-full top-0 left-0 modal-bg md:hidden"></div>
{/if}
<header class=" z-2 md:flex head-menu md:p-1">
    <h1 class="hidden">JS</h1>
    <!--Burger Menu-->
    <button class=" md:hidden" onclick={modalBg}>
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
                {contentVisible ? 'close' : 'Menu'}
            {/snippet}
            <nav class="grid grid-cols-2 auto-rows-fr p-2 w-full h-full menu-nav min-w-0">
                <Menu options={optionsMenu} />
            </nav>
        </AnimatedBlock>
    </button>

    <!--Desktop Menu-->
    <div class="hidden md:block w-full">
         <nav class="flex justify-around items-center  w-full menu-nav">
            <Menu options={optionsMenu} />
        </nav>
        
    </div>
    
</header>

{#key data.pathname}
<main class=" main-content mt-15 mr-5 ml-5 mb-15 Z-3" in:fly={transitionIn} out:fly={transitionOut} use:stagger={pageStagger}>
    {@render children()}
    <div class="tips">
        <Description />
    </div>
</main>
{/key}

<footer class=" z-3 none footer border flex md:block">
    <div>RitoJS</div>
    <div>Fait avec truc</div>
</footer>

<style>
     .modal-bg {
        opacity: 0.2;
        background-color: red;
        transition: 0.2s;
    }
</style>
