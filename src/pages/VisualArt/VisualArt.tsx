import React, { useState } from 'react'
import './VisualArt.scss'
import { Planet } from '~components'
import { OilPaintings } from './OilPainting'
import { Sketches } from './Sketches'
import { Sculptures } from './Sсulptures'
import { turquoise_ink } from '~icons'
import { FullSizeCarousel } from './FullSizeCarousel'

export function VisualArt() {
    const [isPicFullSize, setIsPicFullSize] = useState(false)
    const [currentPicArray, setCurrentPicArray] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState()

    const picProps = {
        isPicFullSize,
        setIsPicFullSize,
        currentPicArray,
        setCurrentPicArray,
        currentIndex,
        setCurrentIndex
    }

    return (
        <>
            <FullSizeCarousel {...picProps} />
            <div className="page-visual-art-wrapper">
                <Planet img={turquoise_ink as string} isInk={true} />
                <div className="visual-titles-wrapper">
                    <h1>Visual Art</h1>
                    <h2>Lorem ipsum may be used as a placeholder before final copy is available</h2>
                </div>
                <OilPaintings {...picProps} />

                <h2>These are my graphic sketches! Pheheh!</h2>
                <Sketches />
                <div className="mountains"></div>
                <h2 className="sculpture-h2">Oh, and here is my sculpture works!</h2>
                <Sculptures />
            </div>
        </>
    )
}
