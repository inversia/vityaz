import React from 'react'
import './Research.scss'

export function Research() {
    return (
        <div className="page-research">
            <h1>Research / AI</h1>
            <h2>GPU-Accelerated Robotics Simulation for Distributed Reinforcement Learning</h2>
            <p>
                Most Deep Reinforcement Learning (Deep RL) algorithms require a prohibitively large
                number of training samples for learning complex tasks. Many recent works on speeding
                up Deep RL have focused on distributed training and simulation.
            </p>
            <p>
                While distributed training is often done on the GPU, simulation is not. In this
                work, we propose using GPU-accelerated RL simulations as an alternative to CPU ones.
            </p>
            <div className="AI-people"></div>
        </div>
    )
}
