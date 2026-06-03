<script lang="ts">
	import type { AnimatedLetter } from "$lib/types/animated-letter";
    import { onMount } from "svelte";

    let { data, className, delays = 80 } = $props();

    let letterTabs = $state<AnimatedLetter[]>([]);
    let rafId: number;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function init() {
        const now = performance.now();

        letterTabs = Array.from(data as string).map((char, i) => ({
            letter: char,
            current: "",
            show: false,
            startAt: now + i * delays,        // stagger start
            revealAt: now + i * delays + 600   // stagger lock
        }));
    }

    function tick() {
        const now = performance.now();

        let allDone = true;

        letterTabs = letterTabs.map(l => {
            if (l.show) return l;

            allDone = false;

            if (now < l.startAt) return l;

            if (now >= l.revealAt) {
                return { ...l, show: true, current: l.letter };
            }

            return { ...l, current: randomChar() };
        });

        if (!allDone) {
            rafId = requestAnimationFrame(tick);
        }
    }

    onMount(() => {
        init();
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    });
</script>

<div>
    {#each letterTabs as letter, index (index)}
        {#if letter.show}
            <span class={className}>
                {letter.letter}
            </span>
        {:else}
            <span class={className}>
                {letter.current}
            </span>
        {/if}
    {/each}
</div>