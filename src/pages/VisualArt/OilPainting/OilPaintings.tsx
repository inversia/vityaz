import React, { useMemo } from 'react'
import { shuffle } from 'lodash'
import './OilPaintings.scss'
import { Image } from '~components'
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

export function OilPaintings() {
    return (
        <>
            {images.length !== 0 && (
                <div className="chaotic-pic">
                    <div className="block1">
                        <>
                            <Image index={0} picturesArray={images} />

                            <Image index={1} picturesArray={images} />
                        </>

                        <Image index={2} picturesArray={images} className="block1three" />
                    </div>

                    <div className="block2">
                        <div className="a2">
                            <Image index={3} picturesArray={images} />
                            <Image index={4} picturesArray={images} />
                            <Image index={5} picturesArray={images} />
                            <Image index={6} picturesArray={images} />
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
                        <Image index={7} picturesArray={images} />
                        <Image index={10} picturesArray={images} />
                    </div>

                    <div className="block3">
                        <Image index={11} picturesArray={images} />
                        <Image index={12} picturesArray={images} />
                    </div>
                </div>
            )}
        </>
    )
}
