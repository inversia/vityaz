import React from 'react'
import './Image.scss'

export function Image({
    index,
    picturesArray,
    className,
    setIsPicFullSize,
    setCurrentPicArray,
    setCurrentIndex
}: {
    index: number
    picturesArray: string[]
    className?: string
    setIsPicFullSize: (b: boolean) => void
    setCurrentPicArray: (arr: string[]) => void
    setCurrentIndex: (i: number) => void
}) {
    return (
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
    )
}
