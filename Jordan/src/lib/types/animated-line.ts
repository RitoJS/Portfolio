import type { Point } from "./points";

export type AnimatedLine = {
    start: Point;
    end: Point;
    startTime: number | null;
    phase: "grow" | "shrink";
    delay: number,
}