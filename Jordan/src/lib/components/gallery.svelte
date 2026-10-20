<script lang="ts">
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let { miniature, images, startIndex }: { miniature: string; images: string[]; startIndex: number } = $props();

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
    class="miniature w-44 h-20 cursor-pointer"
    onclick={() => open(startIndex)}
    onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open(startIndex);
        }
    }}
>
    <img src="/{miniature}" alt="" class="h-full w-full object-cover" />
</div>

<dialog
    bind:this={dialog}
    onclick={(e) => e.target === dialog && close()}
    onkeydown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }}
    class=" flex w-full h-full dialog-gallery"
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
        <button id="previous-button" type="button" onclick={prev} aria-label="Previous image">‹</button>
        <button id="next-button" type="button" onclick={next} aria-label="Next image">›</button>
        <span>{index + 1} / {images.length}</span>
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

    #previous-button {
        top: 50%;
        left: 1%;
    }

    #next-button {
        top: 50%;
        right: 1%;
    }
    #close-button {
        top: 5%;
        right: 1%;
    }
</style>