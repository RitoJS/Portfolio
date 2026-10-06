<script lang="ts">
    import AnimationLetter from "$lib/components/animation-letter.svelte";
    import { aboutMock } from "$lib/mock/about-mock";
    import type { About } from "$lib/types/about";
    import { getContext } from "svelte";

    const info = getContext<{ text: string | null }>('info');

    let about: About = aboutMock;

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getAge(date: Date) {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const anniversaryHappened =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());
        if (!anniversaryHappened) age--;
        return age;
    }

    type BarOptions = {
        to?: number; // % value
        duration?: number;
        offset?: number;
        index?: number;
        step?: number; 
        easing?: string;
    };

    function animateBar(
        node: HTMLElement,
        { to = 100, duration = 1000, offset = 0, index = 0, step = 150, easing = 'ease-out' }: BarOptions = {}
    ) {
        if (prefersReducedMotion) {
            node.style.width = `${to}%`;
            return;
        }

        let anim: Animation | undefined;
        let destroyed = false;

        // Waiting for --stagger-delay duration to finish
        const frame = requestAnimationFrame(async () => {
            const host = node.closest<HTMLElement>('[style*="--stagger-delay"]');
            const blockAnim = host?.getAnimations()[0];

            if (blockAnim) await blockAnim.finished.catch(() => {});
            if (destroyed) return;

            anim = node.animate(
                [{ width: '0%' }, { width: `${to}%` }],
                { duration, delay: offset + index * step, easing, fill: 'both' }
            );
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

<!--Mobile-->
<article class="w-full h-full">
    <div class="about-profile w-full h-full">
        <div class="main-stats flex h-1/3 w-full">
            <div class="avatar-block border-blue w-1/3"></div>

            <div class="main-stats-info flex flex-col border-red w-2/3">
                <div class="names-and-jobs border-green w-full h-1/3 p-2">
                    <p>Name: <AnimationLetter data={about.name} className='' /></p>
                    <p>Age: <AnimationLetter data={getAge(about.age)} className='' /> ans</p>
                    <p>Job: <AnimationLetter data={about.job} className='' /></p>
                </div>

                <div class="main-gauges border-blue w-full h-2/3">
                    <div class="gauges flex flex-col p-2">
                        <div class="mr-2">stability :</div>
                        <div class="animated-bar w-full h-3">
                            <div
                                class="h-full"
                                use:animateBar={{ to: about.stability, offset: 300, duration: 1500 }}
                            ></div>
                        </div>

                        <div class="mr-2">creativity :</div>
                        <div class="animated-bar w-full h-3">
                            <div
                                class="h-full"
                                use:animateBar={{ to: about.creativity, offset: 300, duration: 1500 }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sub-stats w-full h-2/3 border-red p-2">
            <h2>Skills :</h2>
            <!--Front-->
            <div class="front-block grid grid-cols-3 gap-1 w-full h-2/4 border p-2">
                <!--loop-->
                {#each about.skills.front as front, index (index) }
                    <div class="border h-20">
                        <div class="name-subs">{ front.name }</div>
                        <div class="bar-subs h-3 border">
                            <div class="h-full" use:animateBar={{ to: front.bar, index: index, step: 200, offset: 200}}></div>
                        </div>
                    </div>    
                {/each}
                
            </div>
            <!--Back-->
            <!--Workflows-->
            <!--Logiciel et plugin-->
        </div>
    </div>
</article>

<style>
    .animated-bar {
        border: 1px solid black;

        div {
            background-color: blueviolet;
            width: 0%;
        }
    }

    .bar-subs {
        div {
            background-color: aqua;
            width: 0%;
        }
    }
</style>