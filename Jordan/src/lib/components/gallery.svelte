<script lang="ts">
    let { miniature, images, startIndex }: { miniature: string; images: string[]; startIndex: number } = $props();

    let dialog: HTMLDialogElement;
    let index = $state(0);

    const open = (i = 0) => {
        index = i;
        dialog.showModal();
    };
    const close = () => dialog.close();
    const prev = () => (index = (index - 1 + images.length) % images.length);
    const next = () => (index = (index + 1) % images.length);
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
    class="w-full"
>
    <img src="/{images[index]}" alt="" class="max-h-[80vh] max-w-full object-contain" />

    {#if images.length > 1}
        <button type="button" onclick={prev} aria-label="Previous image">‹</button>
        <button type="button" onclick={next} aria-label="Next image">›</button>
        <span>{index + 1} / {images.length}</span>
    {/if}

    <button type="button" onclick={close} aria-label="Close">×</button>
</dialog>


<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
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
	}
</style>