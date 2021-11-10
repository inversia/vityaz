import React, { useState } from 'react'
import cls from 'classnames'
import './FullSizeCarousel.scss'
import { Carousel } from '~components'

export function FullSizeCarousel({
    currentIndex,
    currentPicArray,
    isPicFullSize,
    setIsPicFullSize
}: {
    currentIndex?: number
    currentPicArray: string[]
    isPicFullSize: boolean
    setIsPicFullSize: (b: boolean) => void
}) {
    return (
        <div className={cls('full-size-wrapper', { 'not-visible': !isPicFullSize })}>
            <button onClick={() => setIsPicFullSize(false)}></button>
            <Carousel
                itemsAmount={currentPicArray.length}
                paginationOn={false}
                currentIndex={currentIndex || 0}
            >
                {currentPicArray.map((image, i) => (
                    <div
                        className="full-size-image"
                        key={i}
                        style={{ backgroundImage: `url(${currentPicArray[i]!})` }}
                    />
                ))}
            </Carousel>
        </div>
    )
}
