import React from 'react'
import './OilPaintings.scss'

export const randomize = (arrLength: number) => Math.round(Math.random() * arrLength)

export function OilPaintings() {
    return (
        <>
            <div className="chaotic-pic">
                <div className="block1">
                    {/* <div style={{ backgroundImage: url(`./images/${randomize(12)}`) }}>One</div> */}
                    {/* <div style={{ backgroundImage: 'url(./images/1.jpg)' }}>One</div> */}
                    <div
                        style={{
                            backgroundImage: 'url(./images/two.jpg)'
                            // backgroundColor: 'yellow'
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
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        Two
                        <div></div>
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
