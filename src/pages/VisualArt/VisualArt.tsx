import React from 'react'
import './VisualArt.scss'
import { OilPaintings } from './OilPainting'
import { Sketches } from './Sketches'
import { Sculptures } from './Sсulptures'

export function VisualArt() {
    return (
        <div className="page-visual-art-wrapper">
            <div className="visual-planet"></div>
            <h1>Visual Art</h1>

            <h2>Lorem ipsum may be used as a placeholder before final copy is available</h2>
            <OilPaintings />

            <h2>These are my graphic sketches! Pheheh!</h2>
            <Sketches />
            <h2>Oh, and is my sculpture works!</h2>
            <Sculptures />
        </div>
    )
}
