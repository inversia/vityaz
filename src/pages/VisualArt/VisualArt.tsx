import React from 'react'
import './VisualArt.scss'
import { Planet } from '~components'
import { OilPaintings } from './OilPainting'
import { Sketches } from './Sketches'
import { Sculptures } from './Sсulptures'
import { turquoise_ink } from '~icons'

export function VisualArt() {
    return (
        <div className="page-visual-art-wrapper">
            {/* <div className="visual-planet"></div> */}
            <Planet img={turquoise_ink as string} isInk={true} />
            <h1>Visual Art</h1>
            <h2>Lorem ipsum may be used as a placeholder before final copy is available</h2>
            <OilPaintings />

            <h2>These are my graphic sketches! Pheheh!</h2>
            <Sketches />
            <div className="mountains"></div>
            <h2 className="sculpture-h2">Oh, and is my sculpture works!</h2>
            <Sculptures />
        </div>
    )
}
