import React from 'react'
import './Planet.scss'

export function Planet({ img, isInk }: { img: string; isInk: boolean }) {
    return (
        <div className="planet-wrapper">
            <div className="planet-blur" />
            {/* <div className="planet" style={{ backgroundImage: `url(${img})` }}></div> */}
            {/* <div className="planet" style={{ maskImage: `url(${img})` }}></div> */}
            {isInk ? (
                <div className="ink-planet" style={{ backgroundImage: `url(${img})` }} />
            ) : (
                <div
                    className="planet"
                    style={{ maskImage: `url(${img})`, WebkitMaskImage: `url(${img})` }}
                />
            )}
            <div className="inner-halo" />
        </div>
    )
}
