<script lang="ts">
    type Props = { images: string[] };
    let { images }: Props = $props();

    let dialog: HTMLDialogElement;
    let index = $state(0);

    export function open(i = 0) {
        index = i;
        dialog.showModal();
    }

    const prev = () => (index = (index - 1 + images.length) % images.length);
    const next = () => (index = (index + 1) % images.length);
</script>

<dialog
    bind:this={dialog}
    onclick={(e) => e.target === dialog && dialog.close()}
    onkeydown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }}
>
    <img src={images[index]} alt="" class="max-h-[80vh] max-w-full object-contain" />
    <button onclick={prev}>‹</button>
    <button onclick={next}>›</button>
    <button onclick={() => dialog.close()}>×</button>
</dialog>