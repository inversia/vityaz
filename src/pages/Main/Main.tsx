import React from 'react'
import './Main.scss'
import { FluidBackground } from './FluidBackground'

import { PlanetaryMenu } from './PlanetaryMenu'

import { Motherboard } from './Motherboard'

export function Main() {
    return (
        <div className="main-wrapper">
            <div className="background-planet" />
            <Motherboard />
            <PlanetaryMenu />
            <div className="fluid-container">
                <FluidBackground />
            </div>
        </div>
    )
}
