<script lang="ts">
import AnimationLetter from "./animation-letter.svelte";
   let { day, night } = $props();

   function getTimes() {
        const currentTime = new Date().getHours();
        return currentTime >= 6 && currentTime < 18 ? day : night;
    }
</script>

<AnimationLetter data={getTimes()} className="" classParent="inline-block"/>



