<script lang="ts">
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;
    let frameId: number;

    function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    onMount(() => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // your “scene state” (THIS is what prevents loss)
        const start = { x: 0.05, y: 0.05 };
        const end = { x: 0.8, y: 0.8 };

        const duration = 500;
        let startTime: number | null = null;
        let progress = 0;

        function draw(progress: number) {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            ctx?.clearRect(0, 0, w, h);

            const x1 = start.x * w;
            const y1 = start.y * h;

            const x2 = end.x * w;
            const y2 = end.y * h;

            const x = x1 + (x2 - x1) * progress;
            const y = y1 + (y2 - y1) * progress;

            ctx?.beginPath();
            ctx?.moveTo(x1, y1);
            ctx?.lineTo(x, y);

            ctx!.lineWidth = 8;
            ctx!.strokeStyle = "#3b82f6";
            ctx!.lineCap = "round";
            ctx?.stroke();
        }

        function animate(timestamp: number) {
            if (startTime === null) startTime = timestamp;

            progress = Math.min((timestamp - startTime) / duration, 1);

            draw(progress);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        }

        resizeCanvas(canvas, ctx);

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas(canvas, ctx);

            // 🔥 IMPORTANT: redraw after resize using stored state
            draw(progress);
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