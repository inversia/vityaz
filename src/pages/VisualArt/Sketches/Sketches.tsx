import React from 'react'
import './Sketches.scss'
import { Carousel } from '~components/Carousel'
import _images from './images/*.jpeg'

const images = Object.values(_images as { [key: string]: string })
console.log(_images)

export function Sketches() {
    return (
        <div className="sketches-wrapper">
            <Carousel>
                {images.map((image, i) => (
                    <div
                        className="sketch-image"
                        key={i}
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </Carousel>
        </div>
    )
}
