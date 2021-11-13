import React from 'react'
import cls from 'classnames'
import './FullSizeCarousel.scss'
import { Carousel } from '~components'
import { useFullSizeContext } from '~components/FullSizeCarousel/Context'

export function FullSizeCarousel() {
    const { currentIndex, currentPicArray, isPicFullSize, setIsPicFullSize } = useFullSizeContext()

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
