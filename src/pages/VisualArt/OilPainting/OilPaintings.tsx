import React, { useMemo } from 'react'
import { shuffle } from 'lodash'
import './OilPaintings.scss'
import * as _squareImages from './images'
import * as _rectImages from './images'

const squareImages = shuffle(Object.values(_squareImages)) as string[]
const rectImages = shuffle(Object.values(_rectImages)) as string[]

const isSquare = [true, false, true, true, true, false, false]

const images = isSquare.map(yes => {
    return yes ? squareImages.pop() : rectImages.pop()
})

export function OilPaintings() {
    return (
        <>
            <div className="chaotic-pic">
                <div className="block1">
                    <div
                        style={{
                            backgroundImage: `url(${images[0]!})`
                        }}
                    >
                        One
                    </div>

                    <div>Two</div>
                    <div>Three</div>
                </div>

                <div className="block2">
                    <div className="a2">
                        <div></div>
                        <div
                            style={{
                                backgroundImage: `url(${images[1]!})`
                            }}
                        ></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        Two
                        <div
                            style={{
                                backgroundImage: `url(${images[2]!})`
                            }}
                        ></div>
                        <div></div>
                    </div>
                    <div>Three</div>
                </div>

                <div className="block3">
                    <div>One</div>
                    <div>Two</div>
                </div>
            </div>
        </>
    )
}
