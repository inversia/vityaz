export function rescale(x: number, from: [number, number], to: [number, number]) {
    const t = (x - from[0]) / (from[1] - from[0])
    return to[0] + (to[1] - to[0]) * t
}
