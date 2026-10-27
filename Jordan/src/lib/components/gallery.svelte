<script lang="ts">
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    

    let {  miniature, images, startIndex, detail = true, className }: { miniature: string; images: string[]; startIndex: number, detail?: boolean, className?: string } = $props();

    let dialog: HTMLDialogElement;
    let index = $state(0);
    let direction = $state(1);

    // prevent imgs from pop in if transitioned while the img is not loaded
    function preload(i: number) {
        const img = new Image();
        img.src = `/${images[i]}`;
    }

    function go  (dir: number) {
        direction = dir;
        index = (index + dir + images.length) % images.length;
        preload((index + dir + images.length) % images.length); // the next one in the same direction
    };
    const prev = () => go(-1);
    const next = () => go(1);

    const open = (i = 0) => {
        index = i;
        direction = 1;
        images.forEach((_, n) => preload(n));
        dialog.showModal();
    };
    const close = () => dialog.close();
</script>
<!-- Thumbnail -->
<div
    role="button"
    tabindex="0"
    class:w-44={detail}
    class:h-20={detail}
    class:h-full={!detail}
    class="miniature relative cursor-pointer"
    onclick={() => open(startIndex)}
    onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open(startIndex);
        }
    }}
>
    <img src="/{miniature}" alt=""  class={className} />
    {#if detail}
        <div class="absolute inset-0 miniature-bg pointer-events-none"></div>
    {/if}
</div>

<dialog
    bind:this={dialog}
    onclick={(e) => e.target === dialog && close()}
    onkeydown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }}
    class=" w-full h-full dialog-gallery open:grid"
>
    <!--For detecting and trigger the in/out animation-->
    <div class="grid w-full h-full overflow-hidden place-items-center">
        {#key index}
            <img
                in:fly={{ x: 80 * direction, duration: 300, easing: cubicOut }}
                out:fly={{ x: -80 * direction, duration: 300, easing: cubicOut }}
                src="/{images[index]}"
                alt=""
                class="col-start-1 row-start-1 max-h-[80vh] max-w-full object-contain"
            />
        {/key}
    </div>
   

    {#if images.length > 1}
        <button type="button" class="nav-btn nav-prev" onclick={prev} aria-label="Previous image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" /></svg>
        </button>
        <button type="button" class="nav-btn nav-next" onclick={next} aria-label="Next image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" /></svg>
        </button>
        <span class="count-imgs">{index + 1} / {images.length}</span>
    {/if}

    <button id="close-button" type="button" onclick={close} aria-label="Close">×</button>
</dialog>


<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
        max-width: none;
        max-height: none;
        background: none;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
        position: absolute;
	}

/* arrows */
    .nav-btn {
        position: absolute;
        top: 50%;
        translate: 0 -50%;          
        z-index: 2;
        display: grid;
        place-items: center;
        width: 3rem;
        height: 5rem;
        border: none;
        cursor: pointer;
        background: var(--default-bg-elements2);
        color: var(--default-text-color);
        box-shadow: 3px 3px 0 var(--shadow-elements-color);
        transition: background 0.15s, color 0.15s;
    }

    .nav-prev { left: 0; }          /* stuck to the far left */
    .nav-next { right: 0; }         /* stuck to the far right */

    .nav-btn svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: square;     
        stroke-linejoin: miter;
        transition: translate 0.15s;
    }

    .nav-btn:hover,
    .nav-btn:focus-visible {
        background: var(--focus-elements);
        color: var(--focus-text-color);
        outline: none;
    }

    /* small nudge toward the direction of the arrow */
    .nav-prev:hover svg { translate: -3px 0; }
    .nav-next:hover svg { translate: 3px 0; }

    .nav-btn:active {
         box-shadow: 1px 1px 0 var(--shadow-elements-color);
        background: var(--focus-text-color);
        color: var(--default-bg-elements2);
    }

    @media (max-width: 767px) {
        .nav-btn { width: 2.25rem; height: 4rem; }
    }

    #close-button {
        position: absolute;
        top: 0;
        right: 1%;
        font-size: 3.5rem;
        color: var(--focus-text-color);
        background: none;
        border: none;
        cursor: pointer;
    }

    .miniature {
        img {
            border: 2px solid;
        }
    }
    .miniature-bg {
        background-color: #b3ac93;
        opacity: 0.35;
    }
    .count-imgs {
        text-align: center;
        font-size: 1.5rem;
        color: var(--focus-text-color);
        font-weight: 700;
    }
</style>