<script lang="ts">
	import AnimationLetter from "$lib/components/animation-letter.svelte";
	import Menu from "$lib/components/menu.svelte";
	import type { AnimatedLine } from "$lib/types/animated-line";
	import type { RotatingCircle } from "$lib/types/rotating-circle";
    import { onMount } from "svelte";


    let canvas: HTMLCanvasElement;
    let frameId: number;
    let style: CSSStyleDeclaration;

    const duration = 500;

    const lines: AnimatedLine[] = [
        {
            start: {x: 0.03, y: 0.05},
            end: {x: 0.45, y: 0.45},
            startTime: null,
            phase: "grow",
            delay: 7000 // 7 seconds
        },
        {
            start: {x: 0.75, y: 0.01},
            end: {x: 0.95, y: 0.50},
            startTime: null,
            phase: "grow",
            delay: 8000
        },
        {
            start: {x: 0.20, y: 0.20},
            end: {x: 0.80, y: 0.80},
            startTime: null,
            phase: "grow",
            delay: 5000
        },
        {
            start: {x: 0.03, y: 0.50},
            end: {x: 0.50, y: 0.95},
            startTime: null,
            phase: "grow",
            delay: 10000
        }
        

    ]

    const circles: RotatingCircle[] = [
        {
            x: 0.02,
            y: 0.02,
            radius: 200,
            startAngle: 0,
            endAngle: 0 + 0.5 * Math.PI,
            clockWise: true,
            angle: 0,
            rotationSpeed: 0.01
        },
        {
            x: 0.01,
            y: 0.04,
            radius: 120,
            startAngle: 0,
            endAngle: 0 + 0.5 * Math.PI,
            clockWise: false,
            angle: 0,
            rotationSpeed: 0.03
        },
        // Bottom circle
        {
            x: 0.90,
            y: 0.90,
            radius: 250,
            startAngle: 0,
            endAngle: 0 + 0.1 * Math.PI,
            clockWise: true,
            angle: 0,
            rotationSpeed: 0.01
        },
        {
            x: 0.88,
            y: 0.90,
            radius: 110,
            startAngle: 0,
            endAngle: 0 + 1 * Math.PI,
            clockWise: false,
            angle: 0,
            rotationSpeed: 0.03
        },

    ]



    let ctx : CanvasRenderingContext2D

    function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    function drawLine(ctx: CanvasRenderingContext2D, line: AnimatedLine, timestamp: number ) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        if (line.startTime === null) {
            line.startTime = timestamp + line.delay;
        }

        const elapsed = timestamp - line.startTime;
        if (elapsed < 0) {
            return;
        }
        const t = Math.min(elapsed / duration, 1);

        const x1 = line.start.x * w;
        const y1 = line.start.y * h;

        const x2 = line.end.x * w;
        const y2 = line.end.y * h;

        ctx.beginPath();

        if (line.phase === "grow") {
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;

            ctx.moveTo(x1, y1);
            ctx.lineTo(x, y);

            if (t >= 1) {
                line.phase = "shrink";
                line.startTime = timestamp;
            }
        } else {
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;

            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);

            if (t >= 1) {
                line.phase = "grow";
                line.startTime = timestamp + line.delay;
            }
    }

    ctx.strokeStyle = style.getPropertyValue('--line-canvas-color');
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    }

    
    function drawCircle(ctx: CanvasRenderingContext2D,  arcParams: RotatingCircle) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        // convert percentage -> pixels
        const x = arcParams.x * w;
        const y = arcParams.y * h;
        
        ctx.save();
        arcParams.angle += arcParams.rotationSpeed;
        // move origin to circle center
        ctx.translate(x, y);

        // rotate canvas
        ctx.rotate(arcParams.angle);

        // draw relative to rotated origin
        ctx.beginPath();

        ctx.arc(
            0,
            0,
            arcParams.radius,
            arcParams.startAngle,
            arcParams.endAngle,
            arcParams.clockWise
        );

        ctx.strokeStyle = style.getPropertyValue('--line-canvas-color');
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        ctx.stroke();

        ctx.restore();
    }

    function animate(timestamp: number) {
        if (!ctx) return;

        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        ctx.clearRect(0, 0, w, h);

        for (const line of lines) {
            drawLine(ctx, line, timestamp);
        };

        for (const circle of circles) {
            drawCircle(ctx, circle);
        };

        frameId = requestAnimationFrame(animate);
    }

    onMount(() => {
        style = window.getComputedStyle(document.body);
        const context = canvas.getContext("2d");
        if (!context) return;

        ctx = context;
        

        resizeCanvas(canvas, ctx);

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas(canvas, ctx);
        });

        resizeObserver.observe(canvas);

        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
        };
    });
</script>
<header class="flex head-menu m-1.5">
    <h1>JS</h1>
    <nav class="flex justify-around w-full menu-nav">
        <Menu />
    </nav>
</header>
<main>
    <canvas bind:this={canvas} id="main-background"></canvas>
    <h2>
        <AnimationLetter data="Jordan Sama" className="title-text"/>
    </h2>
</main>
