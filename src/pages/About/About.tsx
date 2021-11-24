import React from 'react'
import './About.scss'
import Blobs from './blobs.svgr'

export function About() {
    const style = {
        '--blob-pos': getRandomNumber(),
        '--blob-pos1': getRandomNumber(),
        '--blob-pos2': getRandomNumber(),
        '--blob-pos3': getRandomNumber()
    } as React.CSSProperties

    return (
        <div className="page-about" style={style}>
            <div className="blobs">
                <Blobs />
            </div>
            <div className="avatar"></div>
            <div className="biography">
                <p>
                    Viktor is a Senior Software Engineer and Researcher at NVIDIA, based in Santa
                    Clara, CA. His work lies at the intersection of simulation, robotics, and
                    reinforcement learning.
                </p>
                <p>
                    He is one of the core developers of Isaac Gym, as well as the first author of
                    several research papers on GPU simulation and distributed reinforcement learning
                    for robotic locomotion, dexterous manipulation, and physics-based animation.
                </p>
            </div>
            <div className="biography2">
                <p>
                    He is one of the core developers of Isaac Gym, as well as the first author of
                    several research papers on GPU simulation and distributed reinforcement learning
                    for robotic locomotion, dexterous manipulation, and physics-based animation.
                </p>
            </div>
        </div>
    )
}

function getRandomNumber() {
    return `${Math.floor(Math.random() < 0.5 ? Math.random() * 100 : Math.random() * -100)}vw`
}
