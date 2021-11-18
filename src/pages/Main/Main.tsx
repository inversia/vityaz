import React from 'react'
import './Main.scss'
import { FluidBackground } from './FluidBackground'

import { PlanetaryMenu } from './PlanetaryMenu'

// import { Motherboard } from './Motherboard'
// import { Planet } from '~components'

export function Main() {
    return (
        <div className="main-wrapper">
            <div className="background-planet" />
            {/* <Planet img={planet_research} /> */}
            {/* <Motherboard /> */}
            <PlanetaryMenu />
            <div className="fluid-container">
                <FluidBackground />
            </div>
        </div>
    )
}
