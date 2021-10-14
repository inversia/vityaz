import React from 'react'
import './Main.scss'

import { PlanetaryMenu } from './PlanetaryMenu'

export function Main() {
    return (
        <div className="main-wrapper">
            <div className="background-planet" />
            <PlanetaryMenu />
        </div>
    )
}
