<!-- $lib/components/profile-design-simple.svelte -->
<script lang="ts">
    // x, y, w, h : position et taille de la pièce dans la page (en %)
    // ox, oy, rot : décalage (en % de la zone) et rotation quand la pièce flotte
    // fill : couleur de remplissage une fois en place
    const pieces = [
        { x: 0,  y: 0,  w: 100, h: 14, fill: 'dark',  ox: -22, oy: -20, rot: -8 },  // header
        { x: 4,  y: 3.5, w: 5,  h: 7,  fill: 'light', ox: 30,  oy: 25,  rot: 20 },  // logo
        { x: 8,  y: 26, w: 50,  h: 7.5, fill: 'dark', ox: -30, oy: 18,  rot: 6 },   // titre
        { x: 8,  y: 38, w: 38,  h: 3.5, fill: 'mid',  ox: 14,  oy: -30, rot: -12 }, // sous-titre
        { x: 8,  y: 44, w: 30,  h: 3.5, fill: 'mid',  ox: -12, oy: 30,  rot: 10 },  // sous-titre
        { x: 8,  y: 55, w: 20,  h: 9,   fill: 'dark', ox: 26,  oy: 22,  rot: -14 }, // bouton
        { x: 62, y: 24, w: 30,  h: 40,  fill: 'mid',  ox: 20,  oy: -26, rot: 9 },   // image
        { x: 8,  y: 72, w: 26,  h: 20,  fill: 'paper', ox: -34, oy: 12, rot: -6 },  // carte
        { x: 37, y: 72, w: 26,  h: 20,  fill: 'paper', ox: 4,   oy: 34, rot: 12 },  // carte
        { x: 66, y: 72, w: 26,  h: 20,  fill: 'paper', ox: 30,  oy: 8,  rot: -9 }   // carte
    ];
</script>

<div class="scene">
    <!-- la page : ses pièces se placent dedans, en pourcentages -->
    <div class="page">
        {#each pieces as p, i (i)}
            <div class="slot" style="left:{p.x}%; top:{p.y}%; width:{p.w}%; height:{p.h}%"></div>
            <div
                class="piece"
                style="left:{p.x}%; top:{p.y}%; width:{p.w}%; height:{p.h}%;
                       --i:{i}; --ox:{p.ox}; --oy:{p.oy}; --rot:{p.rot}"
            >
                <div class="bob {p.fill}"></div>
            </div>
        {/each}
    </div>

    <p class="hint">
        <span class="when-idle">SURVOLER POUR ASSEMBLER</span>
        <span class="when-hover">PAGE ASSEMBLÉE</span>
    </p>
</div>

<style>
    .scene {
        background-color:  rgba(62, 59, 52, 0.2);
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        container-type: size; /* permet d'utiliser cqw / cqh */
        --ink: var(--bg-block-decorator, #3e3b34);
    }

    /* la page est centrée, 80 % de la hauteur, proportions fixes */
    .page {
        position: absolute;
        top: 10%;
        left: 50%;
        height: 80%;
        aspect-ratio: 1.7;
        transform: translateX(-50%);
    }

    /* emplacement vide, en pointillés */
    .slot {
        position: absolute;
        border: 1px dashed var(--ink);
        opacity: 0.35;
        transition: opacity 0.4s;
    }

    /* PIÈCE : se déplace de sa position flottante vers sa place */
    .piece {
        position: absolute;
        transform: translate(calc(var(--ox) * 1cqw), calc(var(--oy) * 1cqh)) rotate(calc(var(--rot) * 1deg));
        /* au repos, les pièces repartent dans l'ordre inverse */
        transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1) calc((9 - var(--i)) * 50ms);
    }

    /* BOB : petit mouvement de flottement en continu */
    .bob {
        width: 100%;
        height: 100%;
        border: 1.5px solid var(--ink);
        background-color: transparent;
        animation: bob calc(3s + var(--i) * 0.4s) ease-in-out calc(var(--i) * -0.7s) infinite alternate;
        transition: background-color 0.4s;
    }
    @keyframes bob {
        from { transform: translate(-6px, -4px) rotate(-2deg); }
        to   { transform: translate(6px, 4px) rotate(2deg); }
    }

    .dark  { --fill: var(--ink); }
    .mid   { --fill: #7a7466; }
    .light { --fill: #d7d1b9; }
    .paper { --fill: var(--default-bg-elements2, #d2cbb4); }

    /* SURVOL : tout se met en place, l'une après l'autre */
    .scene:hover .piece {
        transform: none;
        transition-delay: calc(var(--i) * 90ms);
    }
    .scene:hover .bob {
        animation: none;
        background-color: var(--fill);
        transition-delay: calc(var(--i) * 90ms + 750ms);
    }
    .scene:hover .slot {
        opacity: 0;
    }

    /* texte d'état */
    .hint {
        position: absolute;
        left: 12px;
        bottom: 10px;
        font: 600 10px ui-monospace, monospace;
        letter-spacing: 0.08em;
        color: var(--ink);
    }
    .when-hover { display: none; }
    .scene:hover .when-idle { display: none; }
    .scene:hover .when-hover { display: inline; }

    /* mouvement réduit : page assemblée, sans animation */
    @media (prefers-reduced-motion: reduce) {
        .piece { transform: none; transition: none; }
        .bob { animation: none; background-color: var(--fill); }
        .slot { opacity: 0; }
        .when-idle { display: none; }
        .when-hover { display: inline; }
    }
</style>