import React from 'react'
import './Image.scss'
import cls from 'classnames'
import { useFullSizeContext } from '~components/FullSizeCarousel/Context'

export function Image({
    index,
    picturesArray,
    className
}: {
    index: number
    picturesArray: string[]
    className?: string
}) {
    const { setIsPicFullSize, setCurrentPicArray, setCurrentIndex } = useFullSizeContext()

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${picturesArray[index]!})`
                }}
                onClick={() => {
                    setIsPicFullSize(true)
                    setCurrentPicArray(picturesArray)
                    setCurrentIndex(index)
                }}
                className={className}
            />
        </>
    )
}
