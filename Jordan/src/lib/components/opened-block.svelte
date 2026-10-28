<script lang="ts">

    // Params
    type Props = {
        children: import('svelte').Snippet;
        title?: string;
    }

    let {
        children,
        title = "Un titre",
    }: Props = $props();

    const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    type OpenBlockParams = { 
        duration?: number; 
        easing?: string 
    };   
    function openBlock(node: HTMLElement, { duration = 1000, easing = 'ease-out' }: OpenBlockParams = {}) {
        if (prefersReducedMotion) {
            node.style.height = '100%';
            return;
        }

        node.style.height = '0';

        let anim: Animation | undefined;
        let destroyed = false;

        const frame = requestAnimationFrame(async () => {
            const host = node.closest<HTMLElement>('[style*="--stagger-delay"]');
            if (host) await Promise.all(host.getAnimations().map((a) => a.finished.catch(() => {})));
            if (destroyed) return;

            anim = node.animate([{ height: '0%' }, { height: '100%' }], { duration, easing, fill: 'both' });
        });

        return {
            destroy() {
                destroyed = true;
                cancelAnimationFrame(frame);
                anim?.cancel();
            }
        };
    }
</script>

<div class="flex flex-col h-full">
    <div class="name-blocks flex w-full items-center shrink-0">
        <div class="decorator-cube-detail"></div> <h3 class="font-bold">{ title }</h3>
    </div>
    <div class="flex-1 min-h-0  ">
        <div
            use:openBlock={{ duration: 1500 }}
            class="content-child"
        >   
            <div class="p-2 h-full">
                {@render children?.()}
            </div>
            
        </div>
    </div>
   
</div>

<style>
    .name-blocks {
        background-color: var(--bg-block-decorator);
        color: var(--focus-text-color);
        h3 {
            font-size: 1.5rem;
        }
    }

    .content-child {
        overflow-x: hidden;
        overflow-y: auto;
        background-color: var(--default-bg-elements);
    }
</style>
