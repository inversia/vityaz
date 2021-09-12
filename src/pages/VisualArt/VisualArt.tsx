import React from 'react'
import './VisualArt.scss'
import { OilPaintings } from './OilPainting'

export function VisualArt() {
    return (
        <div className="page-visual-art-wrapper">
            <h1>Visual Art</h1>
            <h2>Lorem ipsum may be used as a placeholder before final copy is available</h2>
            <OilPaintings />
        </div>
    )
}
