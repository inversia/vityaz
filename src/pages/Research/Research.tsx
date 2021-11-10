import React from 'react'
// import { useAppContext } from '~App/Context'
import { InfoBlock, Planet } from '~components'
import './Research.scss'
import { aipepople, graduallyImprove } from './images'
import { motherboard_solid, motherboard_transparent } from '~icons'

export function Research() {
    return (
        <div className="page-research">
            {/* <div className="menu-plug"></div> */}
            {/* <Planet img={motherboard_solid as string} /> */}
            <Planet img={motherboard_transparent as string} isInk={false} />
            <div className="research-titles-wrapper">
                <h1>Research / AI</h1>
                <h2>
                    GPU-Accelerated Robotics Simulation for <br></br>Distributed Reinforcement
                    Learning
                </h2>
                <p>
                    Most Deep Reinforcement Learning (Deep RL) algorithms require a prohibitively
                    large number of training samples for learning complex tasks. Many recent works
                    on speeding up Deep RL have focused on distributed training and simulation.
                </p>
                <p>
                    While distributed training is often done on the GPU, simulation is not. In this
                    work, we propose using GPU-accelerated RL simulations as an alternative to CPU
                    ones.
                </p>
            </div>
            <div className="AI-people"></div>
            <p>
                Using NVIDIA Flex, a GPU-based physics engine, we show promising speed-ups of
                learning various continuous-control, locomotion tasks. With one GPU and CPU core, we
                are able to train the Humanoid running task in less than 20 minutes, using 10-1000x
                fewer CPU cores than previous works. We also demonstrate the scalability of our
                simulator to multi-GPU settings to train for more challenging locomotion tasks.
            </p>
            <div className="AI-people2"></div>
            <h2 className="adapting-simulation">
                Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World
                Experience
            </h2>
            <InfoBlock
                text="Using NVIDIA Flex, a GPU-based physics engine, we show promising speed-ups of learning various continuous-control, locomotion tasks. With one GPU and CPU core, we are able to train the Humanoid running task in less than 20 minutes, using 10-1000x fewer CPU cores than previous works. We also demonstrate the scalability of our simulator to multi-GPU settings to train for more challenging locomotion tasks."
                image={graduallyImprove}
            />
        </div>
    )
}
