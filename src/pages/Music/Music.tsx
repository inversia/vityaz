import React from 'react'
import { AudioTrack } from './AudioTrack'
import './Music.scss'
import { mantra } from './audiofiles'
import { reflect, piknik } from './video'

import { Planet, Player, VideoPlayer } from '~components'
import { circle_notes, oil2 } from '~icons'
import { useVideoJS } from '~hooks'

type Songs = {
    name: string
    url: string
}[]
const songs: Songs = [{ name: 'MANTRA', url: mantra }]

// 'https://www.youtube.com/watch?v=9t7SclAXoQw'
export function Music() {
    // const { Video } = useVideoJS({
    //     poster: mountains,
    //     sources: [{ src: reflect as string, type: 'video/mp4' }],
    //     controls: true,
    //     playbackRates: [0.5, 1, 1.5, 2],
    //     responsive: true,
    //     name: 'Max Cooper'
    // })

    return (
        <div className="page-music">
            <Planet img={circle_notes as string} isInk={false} />
            <div className="music-titles-wrapper">
                <h1>Music</h1>
                <h2>Piano concert in Great Music Hall 26/02/20</h2>
                <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly
                    used to demonstrate the visual form of a document or a typeface without relying
                    on meaningful content.
                </p>
            </div>
            <div className="video-container">
                {<VideoPlayer url={reflect as string} />}
                {<VideoPlayer poster={oil2 as string} url={piknik as string} />}
            </div>
            {/* {songsURLs.length > 0 && ( */}
            <div className="music-container">
                <h2>My tracks:</h2>
                <AudioTrack song={songs[0]} />
            </div>
            {/* )} */}
        </div>
    )
}
