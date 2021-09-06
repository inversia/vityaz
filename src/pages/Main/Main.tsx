import React from 'react'
import './Main.scss'

import { PlanetaryMenu } from './PlanetaryMenu'

export function Main() {
    return (
        <div className="main-wrapper">
            <div className="background-planet" />
            <PlanetaryMenu />
            {/* <div className="planetary-menu">
                <div className="logo">
                    <span>MakoViychuk</span>
                </div>
                <div className="visual-art">
                    <div className="art-planet">
                        <span>Visual Art</span>
                    </div>
                    <div className="art-background"></div>
                </div>
                <div className="research-and-music">
                    <div className="research">
                        <div className="research-planet">
                            <span>Research / AI</span>
                        </div>
                        <div className="research-background"></div>
                    </div>

                    <div className="music">
                        <div className="music-planet">
                            <span>Music</span>
                        </div>
                        <div className="music-background"></div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
