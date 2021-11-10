import React, { useMemo } from 'react'
import { shuffle } from 'lodash'
import './OilPaintings.scss'
import { Image } from '../Image'
import * as _squareImages from './images'
import * as _rectImages from './images'

const squareImages = shuffle(Object.values(_squareImages)) as string[]
const rectImages = shuffle(Object.values(_rectImages)) as string[]

const isSquare = [
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false
]

const images = isSquare.map(yes => {
    const image = yes ? squareImages.pop() : rectImages.pop()
    if (!image) throw new Error(`no ${yes ? 'square' : 'non-square'} images left?`)
    return image
})

export function OilPaintings({
    isPicFullSize,
    setIsPicFullSize,
    setCurrentPicArray,
    setCurrentIndex
}: {
    isPicFullSize: boolean
    setIsPicFullSize: (b: boolean) => void
    setCurrentPicArray: (arr: string[]) => void
    setCurrentIndex: (i: number) => void
}) {
    return (
        <>
            {images.length !== 0 && (
                <div className="chaotic-pic">
                    <div className="block1">
                        <>
                            <Image
                                index={0}
                                picturesArray={images}
                                setIsPicFullSize={setIsPicFullSize}
                                setCurrentPicArray={setCurrentPicArray}
                                setCurrentIndex={setCurrentIndex}
                            />

                            <Image
                                index={1}
                                picturesArray={images}
                                setIsPicFullSize={setIsPicFullSize}
                                setCurrentPicArray={setCurrentPicArray}
                                setCurrentIndex={setCurrentIndex}
                            />
                        </>

                        <Image
                            index={2}
                            picturesArray={images}
                            className="block1three"
                            setIsPicFullSize={setIsPicFullSize}
                            setCurrentPicArray={setCurrentPicArray}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>

                    <div className="block2">
                        <div className="a2">
                            <Image
                                index={3}
                                picturesArray={images}
                                setIsPicFullSize={setIsPicFullSize}
                                setCurrentPicArray={setCurrentPicArray}
                                setCurrentIndex={setCurrentIndex}
                            />
                            <Image
                                index={4}
                                picturesArray={images}
                                setIsPicFullSize={setIsPicFullSize}
                                setCurrentPicArray={setCurrentPicArray}
                                setCurrentIndex={setCurrentIndex}
                            />
                            <Image
                                index={5}
                                picturesArray={images}
                                setIsPicFullSize={setIsPicFullSize}
                                setCurrentPicArray={setCurrentPicArray}
                                setCurrentIndex={setCurrentIndex}
                            />
                            <Image
                                index={6}
                                picturesArray={images}
                                setIsPicFullSize={setIsPicFullSize}
                                setCurrentPicArray={setCurrentPicArray}
                                setCurrentIndex={setCurrentIndex}
                            />
                        </div>
                        {/* <div
                                style={{
                                    backgroundImage: `url(${images[7]!})`
                                }}
                            > */}
                        {/* GOGOGOG */}
                        {/* <div
                                    style={{
                                        backgroundImage: `url(${images[8]!})`
                                    }}
                                ></div>
                                <div
                                    style={{
                                        backgroundImage: `url(${images[9]!})`
                                    }}
                                ></div> */}
                        {/* </div> */}
                        <Image
                            index={7}
                            picturesArray={images}
                            setIsPicFullSize={setIsPicFullSize}
                            setCurrentPicArray={setCurrentPicArray}
                            setCurrentIndex={setCurrentIndex}
                        />
                        <Image
                            index={10}
                            picturesArray={images}
                            setIsPicFullSize={setIsPicFullSize}
                            setCurrentPicArray={setCurrentPicArray}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>

                    <div className="block3">
                        <Image
                            index={11}
                            picturesArray={images}
                            setIsPicFullSize={setIsPicFullSize}
                            setCurrentPicArray={setCurrentPicArray}
                            setCurrentIndex={setCurrentIndex}
                        />
                        <Image
                            index={12}
                            picturesArray={images}
                            setIsPicFullSize={setIsPicFullSize}
                            setCurrentPicArray={setCurrentPicArray}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
