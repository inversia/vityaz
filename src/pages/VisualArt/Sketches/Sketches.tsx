import React from 'react'
import './Sketches.scss'
import { Carousel, Image } from '~components'
import _images from './images/*.jpeg'

const images = Object.values(_images as { [key: string]: string })

export function Sketches() {
    return (
        <div className="sketches-wrapper">
            <Carousel itemsAmount={images.length} paginationOn={false}>
                {images.map((image, i) => (
                    <Image index={i} picturesArray={images} className={'sketch-image'} key={i} />
                ))}
            </Carousel>
        </div>
    )
}
