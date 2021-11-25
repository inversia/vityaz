import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import './Sketches.scss'
import { Carousel, Image } from '~components'
import _images from './images/*.jpeg'

const images = Object.values(_images as { [key: string]: string })

export function Sketches() {
    return (
        <VisibilitySensor scrollCheck={true} scrollThrottle={100} partialVisibility={true}>
            {({ isVisible }) => (
                <div className="sketches-wrapper">
                    {isVisible && (
                        <Carousel itemsAmount={images.length} paginationOn={false} arrowsOn={false}>
                            {images.map((image, i) => (
                                <Image
                                    index={i}
                                    picturesArray={images}
                                    className={'sketch-image'}
                                    key={i}
                                />
                            ))}
                        </Carousel>
                    )}
                </div>
            )}
        </VisibilitySensor>
    )
}
