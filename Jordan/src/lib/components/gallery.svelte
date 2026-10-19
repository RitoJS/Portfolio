<script lang="ts">
    type Props = { images: string[], miniature: string};
    let { images, miniature }: Props = $props();

    let dialog: HTMLDialogElement;
    let index = $state(0);

    export function open(i = 0) {
        index = i;
        dialog.showModal();
    }

    const prev = () => (index = (index - 1 + images.length) % images.length);
    const next = () => (index = (index + 1) % images.length);
</script>

<div role="button" tabindex="0" onclick={(e) => e.target === dialog && dialog.close()} class="miniature w-44 h-20" onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
        }
    }}>
    <img src="/{miniature}" alt="" class="max-h-[80vh] max-w-full object-contain" />
</div>

<dialog
    bind:this={dialog}
    onclick={(e) => e.target === dialog && dialog.close()}
    onkeydown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }}
>
    <img src="/{images[index]}" alt="" class="max-h-[80vh] max-w-full object-contain" />
    <button onclick={prev}>‹</button>
    <button onclick={next}>›</button>
    <button onclick={() => dialog.close()}>×</button>
</dialog>