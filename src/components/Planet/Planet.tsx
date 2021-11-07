import React from 'react'
import './Planet.scss'

export function Planet({ img }: { img: string }) {
    return (
        <div className="planet-wrapper">
            <div className="planet-blur" />
            <div className="planet" style={{ backgroundImage: `url(${img})` }}></div>
        </div>
    )
}
