<script lang="ts">
    /* eslint-disable svelte/no-navigation-without-resolve */
    import { tick } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { page } from '$app/state';
    import { afterNavigate } from '$app/navigation';
    import { menuMock } from '$lib/mock/menu-mock';

    const links = menuMock;

    let open = $state(false);
    let panel: HTMLElement | undefined = $state();
    let button: HTMLButtonElement | undefined = $state();

    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ms = reduced ? 0 : 300;

    async function toggle() {
        open = !open;
        if (open) {
            await tick();
            panel?.focus(); 
        } else {
            button?.focus();
        }
    }

    function close() {
        if (open) toggle();
    }

    
    afterNavigate(() => {
        open = false;
    });

    // pas de défilement de la page derrière le menu
    $effect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    });
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && close()} />

<button
    bind:this={button}
    class="burger fixed top-2 left-2 z-60 size-12 lg:hidden"
    class:open
    onclick={toggle}
    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
    aria-expanded={open}
    aria-controls="burger-panel"
>
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
</button>

{#if open}
    <!-- fond : un clic ferme le menu -->
    <div
        class="fixed inset-0 z-50 bg-black/50 lg:hidden"
        role="presentation"
        onclick={close}
        transition:fade={{ duration: ms }}
    ></div>

    <nav
        bind:this={panel}
        id="burger-panel"
        class="panel fixed top-0 left-0 z-55 h-full w-4/5 max-w-sm flex flex-col lg:hidden"
        aria-label="Navigation principale"
        tabindex="-1"
        transition:fly={{ x: -320, duration: ms }}
    >
        <div class="title-bar">
            <span class="square"></span>Menu
        </div>

        <ul class="flex flex-col gap-3 p-4">
            {#each links as link, i (link.link)}
                <li in:fly={{ x: -24, duration: ms, delay: reduced ? 0 : 120 + i * 60 }}>
                    <a
                        href={link.link}
                        class="item"
                        class:active={page.url.pathname === link.link}
                        aria-current={page.url.pathname === link.link ? 'page' : undefined}
                    >
                        <span class="marker"></span>{link.label}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
{/if}

<style>
    /* --- bouton : 3 barres qui deviennent une croix --- */
    .burger {
        background: var(--default-bg-elements2);
        color: var(--bg-block-decorator);
        box-shadow: 3px 3px 0 var(--shadow-elements-color);
        transition: background-color 0.3s, color 0.3s;
    }
    .burger.open {
        background: var(--bg-block-decorator);
        color: var(--focus-text-color);
        box-shadow: none;
    }
    .bar {
        position: absolute;
        left: 25%;
        right: 25%;
        height: 2px;
        background: currentColor;
        transition: top 0.3s, transform 0.3s, opacity 0.2s;
    }
    .bar:nth-child(1) { 
        top: 32%; 
    }
    .bar:nth-child(2) { 
        top: 50%; 
    }
    .bar:nth-child(3) { 
        top: 68%; 
    }
    .open .bar:nth-child(1) { 
        top: 50%; transform: rotate(45deg); 
    }
    .open .bar:nth-child(2) { 
        opacity: 0; 
    }
    .open .bar:nth-child(3) { 
        top: 50%; 
        transform: rotate(-45deg); 
    }

    /* --- panneau --- */
    .panel {
        background: var(--default-bg-elements2);
        box-shadow: 4px 0 0 var(--shadow-elements-color);
        outline: none;
    }
    .title-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        height: 4rem;
        padding-left: 4.5rem; /* laisse la place au bouton */
        font-weight: 600;
        font-size: 1.25rem;
        background: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }
    .square {
        width: 1.25rem;
        aspect-ratio: 1;
        background: var(--default-bg-elements2);
    }

    .item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: 500;
        color: inherit;
        text-decoration: none;
        box-shadow: 3px 3px 0 var(--shadow-elements-color);
        transition: background-color 0.2s, color 0.2s;
    }
    .marker {
        width: 0.75rem;
        aspect-ratio: 1;
        background: var(--bg-block-decorator);
    }
    .item:hover,
    .item:focus-visible,
    .item.active {
        background: var(--bg-block-decorator);
        color: var(--focus-text-color);
    }
    .item:hover .marker,
    .item:focus-visible .marker,
    .item.active .marker {
        background: var(--focus-text-color);
    }
</style>