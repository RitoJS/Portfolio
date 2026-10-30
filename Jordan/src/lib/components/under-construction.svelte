<script lang="ts">
    let {
        title = 'En cours de construction',
        text = "Cette section n'est pas encore disponible.",
        progress = 5
    }: { title?: string; text?: string; progress?: number } = $props();
</script>

<article class="w-full h-full flex items-center justify-center p-2">
    <section class="panel w-full lg:w-4/5 max-h-full flex flex-col">
        <div class="panel-bar text-lg lg:text-2xl">
            <span class="square h-1/2 aspect-square"></span>Information
        </div>

        <div class="stripes h-3 lg:h-5"></div>

        <div class="panel-body flex-1 min-h-0 flex flex-col justify-center gap-4 lg:gap-5 p-4 lg:px-12 lg:py-8">
            <h1 class="title text-2xl sm:text-3xl lg:text-5xl font-light uppercase tracking-widest leading-tight">
                {title}
            </h1>
            <p class="text-base lg:text-2xl font-light">{text}</p>

            <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-xs lg:text-base font-medium tracking-widest">
                    <span>PROGRESSION</span>
                    <span>{progress} %</span>
                </div>
                <div class="bar">
                    <div style="width: {progress}%"></div>
                </div>
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

    .bar {
        height: 0.875rem;
        border: 2px solid var(--bg-block-decorator);
    }
    .bar > div {
        height: 100%;
        background-color: var(--bg-block-decorator);
    }
</style>