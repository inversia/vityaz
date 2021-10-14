import React from 'react'
import { AudioTrack } from './AudioTrack'
import './Music.scss'
import { mantra } from './audiofiles'

type Songs = {
    name: string
    url: string
}[]
const songs: Songs = [{ name: 'MANTRA', url: mantra }]

export function Music() {
    return (
        <div className="music-wrapper">
            <h1>Music</h1>
            <h2>Piano concert in Great Music Hall 26/02/20</h2>
            <p>
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
                demonstrate the visual form of a document or a typeface without relying on
                meaningful content.
            </p>
            <div className="video-container">
                <video width="300px" height="300px" autoPlay={true}>
                    <source src="https://www.youtube.com/watch?v=9t7SclAXoQw"></source>
                </video>
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
