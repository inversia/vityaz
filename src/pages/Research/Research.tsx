import React from 'react'
// import { useAppContext } from '~App/Context'
import { InfoBlock, Planet } from '~components'
import './Research.scss'
import { graduallyImprove } from './images'
import { motherboard_transparent } from '~icons'
import { oscar } from './video'

export function Research() {
    return (
        <div className="page-research">
            {/* <div className="menu-plug"></div> */}
            <Planet img={motherboard_transparent as string} isInk={false} />
            <div className="research-titles-wrapper">
                <h1>Research / AI</h1>
                <a
                    className="title-link"
                    href="https://sites.google.com/view/accelerated-gpu-simulation/home"
                >
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
            <a
                className="title-link adapting-simulation"
                href="https://sites.google.com/view/simopt"
            >
                Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World
                Experience
            </a>
            <InfoBlock
                text="We consider the problem of transferring policies to the real world by training on a distribution of simulated scenarios. Rather than manually tuning the randomization of simulations, we adapt the simulation parameter distribution using a few real world roll-outs interleaved with policy training. In doing so, we are able to change the distribution of simulations to improve the policy transfer by matching the policy behavior in simulation and the real world. We show that policies trained with our method are able to reliably transfer to different robots in two real world tasks: swing-peg-in-hole and opening a cabinet drawer. The video of our experiments can be found at https://sites.google.com/view/simopt."
                image={graduallyImprove as string}
            />

            <div className="mozg"></div>

            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:eQOLeE2rZwMC"
            >
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
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:UeHWp8X0CEIC"
            >
                Is independent learning all you need in the starcraft multi-agent challenge?
            </a>
            <p>
                Most recently developed approaches to cooperative multi-agent reinforcement learning
                in the \emph{'centralized training with decentralized execution'} setting involve
                estimating a centralized, joint value function. In this paper, we demonstrate that,
                despite its various theoretical shortcomings, Independent PPO (IPPO), a form of
                independent learning in which each agent simply estimates its local value function,
                can perform just as well as or better than state-of-the-art joint learning
                approaches on popular multi-agent benchmark suite SMAC with little hyperparameter
                tuning. We also compare IPPO to several variants; the results suggest that
                IPPO&apos;s strong performance may be due to its robustness to some forms of
                environment non-stationarity.
            </p>
            <div className="mozg2"></div>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:d1gkVwhDpl0C"
            >
                Physics-based motion capture imitation with deep reinforcement learning
            </a>
            <p>
                We introduce a deep reinforcement learning method that learns to control articulated
                humanoid bodies to imitate given target motions closely when simulated in a physics
                simulator. The target motion, which may not have been seen by the agent and can be
                noisy, is supplied at runtime. Our method can recover balance from moderate external
                disturbances and keep imitating the target motion. When subjected to large
                disturbances that cause the humanoid to fall down, our method can control the
                character to get up and recover to track the motion. Our method is trained to
                imitate the mocap clips from the CMU motion capture database and a number of other
                publicly available databases. We use a state-of-the-art deep reinforcement learning
                algorithm to learn to dynamically control the gain of PD controllers, whose target
                angles are derived from the mocap clip and to apply corrective torques with the goal
                of imitating the …
            </p>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:9yKSN-GCB0IC"
            >
                Non-smooth newton methods for deformable multi-body dynamics
            </a>
            <p>
                A framework for the simulation of rigid and deformable bodies in the presence of
                contact and friction. Method is based on a non-smooth Newton iteration that solves
                the underlying nonlinear complementarity problems (NCPs) directly. This approach
                allows us to support nonlinear dynamics models, including hyperelastic deformable
                bodies and articulated rigid mechanisms, coupled through a smooth isotropic friction
                model.
            </p>
            <div className="non-smooth"></div>
            <p>
                The fixed-point nature of our method means it requires only the solution of a
                symmetric linear system as a building block. We propose a new complementarity
                preconditioner for NCP functions that improves convergence, and we develop an
                efficient GPU-based solver based on the conjugate residual (CR) method that is
                suitable for interactive simulations. We show how to improve robustness using a new
                geometric stiffness approximation and evaluate our method’s performance on …
            </p>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:YsMSGLbcyi4C"
            >
                Tesseract: Tensorised actors for multi-agent reinforcement learning
            </a>
            <p>
                Reinforcement Learning in large action spaces is a challenging problem. This is
                especially true for cooperative multi-agent reinforcement learning (MARL), which
                often requires tractable learning while respecting various constraints like
                communication budget and information about other agents. In this work, we focus on
                the fundamental hurdle affecting both value-based and policy-gradient approaches: an
                exponential blowup of the action space with the number of agents. For value-based
                methods, it poses challenges in accurately representing the optimal value function
                for value-based methods, thus inducing suboptimality. For policy gradient methods,
                it renders the critic ineffective and exacerbates the problem of the lagging critic.
            </p>
            <div className="tesseract"></div>
            <p>
                We show that from a learning theory perspective, both problems can be addressed by
                accurately representing the associated action-value function with a low-complexity
                hypothesis class. This requires accurately modelling the agent interactions in a
                sample efficient way. To this end, we propose a novel tensorised formulation of the
                Bellman equation. This gives rise to our method Tesseract, which utilises the view
                of Q-function seen as a tensor where the modes correspond to action spaces of
                different agents. Algorithms derived from Tesseract decompose the Q-tensor across
                the agents and utilise low-rank tensor approximations to model the agent
                interactions relevant to the task. We provide PAC analysis for Tesseract based
                algorithms and highlight their relevance to the class of rich observation MDPs.
                Empirical results in different domains confirm the gains in sample efficiency using
                Tesseract as supported by the theory.
            </p>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:qjMakFHDy7sC"
            >
                In-hand object pose tracking via contact feedback and gpu-accelerated robotic
                simulation
            </a>
            <p>
                Tracking the pose of an object while it is being held and manipulated by a robot
                hand is difficult for vision-based methods due to significant occlusions. Prior
                works have explored using contact feedback and particle filters to localize in-hand
                objects. However, they have mostly focused on the static grasp setting and not when
                the object is in motion, as doing so requires modeling of complex contact dynamics.
                In this work, we propose using GPU-accelerated parallel robot simulations and
                derivative-free, sample-based optimizers to track in-hand object poses with contact
                feedback during manipulation. We use physics simulation as the forward model for
                robot-object interactions, and the algorithm jointly optimizes for the state and the
                parameters of the simulations, so they better match with those of the real world.
                Our method runs in real-time (30Hz) on a single GPU, and it achieves an average
                point cloud distance error …
            </p>
            <div className="in-hand"></div>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:WF5omc3nYNoC"
            >
                Transferring dexterous manipulation from gpu simulation to a remote real-world
                trifinger
            </a>
            <p>
                We present a system for learning a challenging dexterous manipulation task involving
                moving a cube to an arbitrary 6-DoF pose with only 3-fingers trained with
                NVIDIA&apos;s IsaacGym simulator. We show empirical benefits, both in simulation and
                sim-to-real transfer, of using keypoints as opposed to position+quaternion
                representations for the object pose in 6-DoF for policy observations and in reward
                calculation to train a model-free reinforcement learning agent. By utilizing domain
                randomization strategies along with the keypoint representation of the pose of the
                manipulated object, we achieve a high success rate of 83% on a remote TriFinger
                system maintained by the organizers of the Real Robot Challenge. With the aim of
                assisting further research in learning in-hand manipulation, we make the codebase of
                our system, along with trained checkpoints that come with billions of steps of
                experience available <a href="https://s2r2-ig.github.io">here</a>
            </p>
            <div className="transferring-dexterous"></div>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:hqOjcs7Dif8C"
            >
                Accelerated policy learning with parallel differentiable simulation
            </a>
            <p>
                Deep reinforcement learning can generate complex control policies, but requires
                large amounts of training data to work effectively. Recent work has attempted to
                address this issue by leveraging differentiable simulators. However, inherent
                problems such as local minima and exploding/vanishing numerical gradients prevent
                these methods from being generally applied to control tasks with complex
                contact-rich dynamics, such as humanoid locomotion in classical RL benchmarks. In
                this work we present a high-performance differentiable simulator and a new policy
                learning algorithm (SHAC) that can effectively leverage simulation gradients, even
                in the presence of non-smoothness.
            </p>
            <div className="accelerated-policy"></div>
            <p>
                Our learning algorithm alleviates problems with local minima through a smooth critic
                function, avoids vanishing/exploding gradients through a truncated learning window,
                and allows many physical environments to be run in parallel. We evaluate our method
                on classical RL control tasks, and show substantial improvements in sample
                efficiency and wall-clock time over state-of-the-art RL and differentiable
                simulation-based algorithms. In addition, we demonstrate the scalability of our
                method by applying it to the challenging high-dimensional problem of muscle-actuated
                locomotion with a large action space, achieving a greater than 17x reduction in
                training time over the best-performing established RL algorithm.
            </p>
            <div className="accelerated-policy2"></div>
            <a className="title-link" href="https://github.com/Denys88/rl_games">
                RL Games: High performance RL library
            </a>
            <div className="rlgames"></div>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:_kc_bZDykSQC"
            >
                Envpool: A highly parallel reinforcement learning environment execution engine
            </a>
            <p>
                There has been significant progress in developing reinforcement learning (RL)
                training systems. Past works such as IMPALA, Apex, Seed RL, Sample Factory, and
                others aim to improve the system&apos;s overall throughput. In this paper, we try to
                address a common bottleneck in the RL training system, i.e., parallel environment
                execution, which is often the slowest part of the whole system but receives little
                attention. With a curated design for paralleling RL environments, we have improved
                the RL environment simulation speed across different hardware setups, ranging from a
                laptop, and a modest workstation, to a high-end machine like NVIDIA DGX-A100.
            </p>
            <div className="envpool"></div>
            <p>
                On a high-end machine, EnvPool achieves 1 million frames per second for the
                environment execution on Atari environments and 3 million frames per second on
                MuJoCo environments. When running on a laptop, the speed of EnvPool is 2.8 times of
                the Python subprocess. Moreover, great compatibility with existing RL training
                libraries has been demonstrated in the open-sourced community, including CleanRL,
                rl_games, DeepMind Acme, etc. Finally, EnvPool allows researchers to iterate their
                ideas at a much faster pace and has the great potential to become the de facto RL
                environment execution engine. Example runs show that it takes only 5 minutes to
                train Atari Pong and MuJoCo Ant, both on a laptop. EnvPool has already been
                open-sourced <a href="https://github.com/sail-sg/envpool">here</a>.
            </p>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:ufrVoPGSRksC"
            >
                OSCAR: Data-driven operational space control for adaptive and robust robot
                manipulation
            </a>
            <p>
                Learning performant robot manipulation policies can be challenging due to
                high-dimensional continuous actions and complex physics-based dynamics. This can be
                alleviated through intelligent choice of action space. Operational Space Control
                (OSC) has been used as an effective task-space controller for manipulation.
                Nonetheless, its strength depends on the underlying modeling fidelity, and is prone
                to failure when there are modeling errors. In this work, we propose OSC for
                Adaptation and Robustness (OSCAR), a data-driven variant of OSC that compensates for
                modeling errors by inferring relevant dynamics parameters from online trajectories.
                OSCAR decomposes dynamics learning into task-agnostic and task-specific phases,
                decoupling the dynamics dependencies of the robot and the extrinsics due to its
                environment. This structure enables robust zero-shot performance under
                out-of-distribution and rapid …
            </p>

            {/* <div className="oscar">{<VideoPlayer url={oscar as string} />}</div> */}
            <div className="oscar">
                {/* <video width="520" height="440" controls> */}
                <video controls autoPlay muted>
                    <source src={oscar as string} type="video/mp4" />
                </video>
            </div>

            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:LkGwnXOMwfcC"
            >
                Reinforcement Learning in Factored Action Spaces using Tensor Decompositions
            </a>
            <p>
                We present an extended abstract for the previously published work TESSERACT [Mahajan
                et al., 2021], which proposes a novel solution for Reinforcement Learning (RL) in
                large, factored action spaces using tensor decompositions. The goal of this abstract
                is twofold: (1) To garner greater interest amongst the tensor research community for
                creating methods and analysis for approximate RL, (2) To elucidate the generalised
                setting of factored action spaces where tensor decompositions can be used. We use
                cooperative multi-agent reinforcement learning scenario as the exemplary setting
                where the action space is naturally factored across agents and learning becomes
                intractable without resorting to approximation on the underlying hypothesis space
                for candidate solutions.
            </p>
            <div className="reinforcement_learning"></div>
            <a
                className="title-link"
                href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=rmAcDNkAAAAJ&citation_for_view=rmAcDNkAAAAJ:QIV2ME_5wuYC"
            >
                DeXtreme: Transfer of Agile In-hand Manipulation from Simulation to Reality
            </a>
            <p>
                Recent work has demonstrated the ability of deep reinforcement learning (RL)
                algorithms to learn complex robotic behaviours in simulation, including in the
                domain of multi-fingered manipulation. However, such models can be challenging to
                transfer to the real world due to the gap between simulation and reality. In this
                paper, we present our techniques to train a) a policy that can perform robust
                dexterous manipulation on an anthropomorphic robot hand and b) a robust pose
                estimator suitable for providing reliable real-time information on the state of the
                object being manipulated.
            </p>
            <div className="dextreme"></div>
            <p>
                Our policies are trained to adapt to a wide range of conditions in simulation.
                Consequently, our vision-based policies significantly outperform the best vision
                policies in the literature on the same reorientation task and are competitive with
                policies that are given privileged state information via motion capture systems. Our
                work reaffirms the possibilities of sim-to-real transfer for dexterous manipulation
                in diverse kinds of hardware and simulator setups, and in our case, with the Allegro
                Hand and Isaac Gym GPU-based simulation. Furthermore, it opens up possibilities for
                researchers to achieve such results with commonly-available, affordable robot hands
                and cameras.
            </p>

            {/* <a className="title-link" href="http://google.com">
                Is independent learning all you need in the starcraft multi-agent challenge?, 2020
            </a>
            <p></p> */}
            {/* <a className="title-link" href="http://google.com">
                In-hand object pose tracking via contact feedback and gpu-accelerated robotic
                simulation
            </a>
            <p></p> */}
        </div>
    )
}
