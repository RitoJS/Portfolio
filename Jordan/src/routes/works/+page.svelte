<script lang="ts">
    import { worksMock } from "$lib/mock/works-mock";
    import type { Works } from "$lib/types/works";
    import { getContext } from "svelte";

    const dataWorks: Works[] = worksMock;
</script>


<article class="w-full h-full">
    <!--Mobile-->
    <div class="lg:hidden w-full h-full block-timeline flex justify-items-center">
        <div
          class="border space-y-8 relative before:absolute before:inset-0 before:m-auto before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white before:from-white before:via-slate-300"
        >

        </div>
    </div>
</article>