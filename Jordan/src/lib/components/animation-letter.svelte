<script lang="ts">
	import type { AnimatedLetter } from "$lib/types/animated-letter";
	import { onMount } from "svelte";

    let data: string = $props();

    let letterTabs: AnimatedLetter[] = $state([]);
    let loadingLetter = $state()

    function setStringArray(): void {
        let transformed_string = Array.from(data);

        for (let index = 0; index < transformed_string.length; index++) {
            letterTabs.push({
                letter: transformed_string[index],
                show: false,
            })
            
        }

        randomCharacterGenerator(letterTabs);
        showTimedLetters(letterTabs);

    }

    function randomCharacterGenerator(letters: AnimatedLetter[]): void {
        const charactersTabs = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
        loadingLetter = charactersTabs[Math.floor(Math.random() * charactersTabs.length)]
        
        if (letters.every(obj => !obj.show)) {
            setTimeout(() => randomCharacterGenerator(letters), 16); // ~60fps
        }
    }

    function showTimedLetters(letters: AnimatedLetter[]): void {
        for (let index = 0; index < letters.length; index++) {
            setTimeout(() => {
                letters[index].show = true;
            }, index * 1000);
            
        }
    }

    onMount(() => {
        setStringArray();
    })
</script>

<div>
    {#each letterTabs as letter (letter) }
        {#if !letter.show}
            {loadingLetter}
        {:else}
            {letter.letter}
        {/if} 
    {/each}
</div>