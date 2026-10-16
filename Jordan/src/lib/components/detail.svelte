<script lang="ts">
	import type { Works } from "$lib/types/works";
    import AnimationLetter from "./animation-letter.svelte";
    type Props = {
        work:  Works;
    };

    let { work }: Props = $props();
   
</script>

<article class="work-parent p-5">
    <div class="detail flex flex-col">
        <div class="sections">
            <h3>Durée:</h3>
            <p>
                De { work }
            </p>
        </div>
    </div>
</article>





