import React, { useMemo } from 'react'
import { shuffle } from 'lodash'
import './OilPaintings.scss'
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
    return yes ? squareImages.pop() : rectImages.pop()
})

export function OilPaintings() {
    return (
        <>
            <div className="chaotic-pic">
                <div className="block1">
                    <>
                        <div
                            style={{
                                backgroundImage: `url(${images[0]!})`
                            }}
                        >
                            One
                        </div>

                        <div
                            style={{
                                backgroundImage: `url(${images[1]!})`
                            }}
                        >
                            Two
                        </div>
                    </>
                    <div
                        className="block1three"
                        style={{
                            backgroundImage: `url(${images[2]!})`
                        }}
                    >
                        Three
                    </div>
                </div>

                <div className="block2">
                    <div className="a2">
                        <div
                            style={{
                                backgroundImage: `url(${images[3]!})`
                            }}
                        ></div>
                        <div
                            style={{
                                backgroundImage: `url(${images[4]!})`
                            }}
                        ></div>
                        <div
                            style={{
                                backgroundImage: `url(${images[5]!})`
                            }}
                        ></div>
                        <div
                            style={{
                                backgroundImage: `url(${images[6]!})`
                            }}
                        ></div>
                    </div>

                    <>
                        <div
                            style={{
                                backgroundImage: `url(${images[7]!})`
                            }}
                        >
                            GOGOGOG
                            <div
                                style={{
                                    backgroundImage: `url(${images[8]!})`
                                }}
                            ></div>
                            <div
                                style={{
                                    backgroundImage: `url(${images[9]!})`
                                }}
                            ></div>
                        </div>
                        <div
                            style={{
                                backgroundImage: `url(${images[10]!})`
                            }}
                        >
                            Five
                        </div>
                    </>
                </div>

                <div className="block3">
                    <div
                        style={{
                            backgroundImage: `url(${images[11]!})`
                        }}
                    >
                        Six
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${images[12]!})`
                        }}
                    >
                        Seven
                    </div>
                </div>
            </div>
        </>
    )
}
