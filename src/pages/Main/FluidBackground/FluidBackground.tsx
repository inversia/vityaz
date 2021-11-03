import React, { useEffect, useRef } from 'react'
import { init } from './fluid'
import './FluidBackground.scss'

export function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (canvasRef.current) init(canvasRef.current)
    }, [])

    return <canvas className="fluid-background" ref={canvasRef} />
}
