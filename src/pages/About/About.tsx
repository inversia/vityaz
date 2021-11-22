import React from 'react'
import './About.scss'

export function About() {
    return (
        <div className="page-about">
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
