<script lang="ts">
    import { onMount } from "svelte";

    // TODO: make each type interface in their own files
    type Point = {
        x: number;
        y: number;
    };

    type AnimatedLine = {
        start: Point;
        end: Point;
        startTime: number | null;
        phase: "grow" | "shrink";
        delay: number,
    }

    let canvas: HTMLCanvasElement;
    let frameId: number;

    const duration = 3500;

    let progress = 0;

    const lines: AnimatedLine[] = [
        {
            start: {x: 0.05, y: 0.05},
            end: {x: 0.8, y: 0.8},
            startTime: null,
            phase: "grow",
            delay: 3000 // 3 seconds
        },
        {
            start: {x: 0.45, y: 0.05},
            end: {x: 0.45, y: 0.45},
            startTime: null,
            phase: "grow",
            delay: 1000
        }

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
    // TODO: Add Types to start/end object
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
                line.startTime = timestamp;
            }
    }

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.stroke();
    }

    // TODO: Replace arcParams with a type
    function drawCircle(progress: number, ctx: CanvasRenderingContext2D,  arcParams: {x: number, y: number, radius: number, startAngle: number, endAngle: number, clockWise: boolean}) {
        ctx.beginPath();
        ctx.arc(arcParams.x, arcParams.y, arcParams.radius, arcParams.startAngle, arcParams.endAngle, arcParams.clockWise );
        ctx.stroke();
    }

    function animate(timestamp: number) {
        if (!ctx) return;

        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        ctx.clearRect(0, 0, w, h);

        for (const line of lines) {
            drawLine(ctx, line, timestamp);
        }

        drawCircle(progress, ctx, {
            x: 95,
            y: 50,
            radius: 40,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockWise: true
        });

        frameId = requestAnimationFrame(animate);
    }

    onMount(() => {
        const context = canvas.getContext("2d");
        if (!context) return;

        ctx = context;
        

        resizeCanvas(canvas, ctx);

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas(canvas, ctx);
            frameId = requestAnimationFrame(animate);
        });

        resizeObserver.observe(canvas);

        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
        };
    });
</script>

<canvas bind:this={canvas} id="main-background"></canvas>