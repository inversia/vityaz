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
            <Planet img={motherboard_transparent as string} isInk={false} />
            <div className="research-titles-wrapper">
                <h1>Research / AI</h1>
                <a className="title-link" href="http://google.com">
                    GPU-Accelerated Robotics Simulation for <br></br>Distributed Reinforcement
                    Learning
                </a>
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
            {/* <h2 className="adapting-simulation">
                Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World
                Experience
            </h2> */}
            <a className="title-link adapting-simulation" href="http://google.com">
                Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World
                Experience
            </a>
            <InfoBlock
                text="We consider the problem of transferring policies to the real world by training on a distribution of simulated scenarios. Rather than manually tuning the randomization of simulations, we adapt the simulation parameter distribution using a few real world roll-outs interleaved with policy training. In doing so, we are able to change the distribution of simulations to improve the policy transfer by matching the policy behavior in simulation and the real world. We show that policies trained with our method are able to reliably transfer to different robots in two real world tasks: swing-peg-in-hole and opening a cabinet drawer. The video of our experiments can be found at https://sites.google.com/view/simopt."
                image={graduallyImprove as string}
            />

            <div className="mozg"></div>

            <a className="title-link" href="http://google.com">
                Isaac gym: High performance gpu-based <br></br> physics simulation for robot
                learning
            </a>
            <p>
                Isaac Gym offers a high performance learning platform to train policies for wide
                variety of robotics tasks directly on GPU. Both physics simulation and the neural
                network policy training reside on GPU and communicate by directly passing data from
                physics buffers to PyTorch tensors without ever going through any CPU bottlenecks.
                This leads to blazing fast training times for complex robotics tasks on a single GPU
                with 2-3 orders of magnitude improvements compared to conventional RL training that
                uses a CPU based simulator and GPU for neural networks.
            </p>
        </div>
    )
}
