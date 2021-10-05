import React, { useEffect, useState, useRef } from 'react'
import './Player.scss'
import mp3files from './music/*.mp3'

const songs = Object.values(mp3files)

export function Player() {
    const [isPlaying, setIsPlaying] = useState(false)

    const playerRef = useRef<HTMLAudioElement>(null)

    const [currentTrack, setCurrentTrack] = useState<number>(0)

    console.log({ currentTrack })

    function PlaySong() {
        const player = playerRef.current

        if (!player) {
            console.warn('player not ready')
            return
        }

        if (player.paused && !isPlaying) {
            void player?.play()
        } else if (!player.paused && isPlaying) {
            player.pause()
        }
    }

    useEffect(() => {
        void (async () => {
            const p = playerRef.current
            p?.load()
            try {
                await p?.play()
            } catch (e) {
                // this is fine (browser throws exception here on page load)
            }
        })()
    }, [currentTrack])

    return (
        <>
            <div className="player-background">
                {/* <div className="record-one"></div>
                <div className="record-two"></div> */}
            </div>
            <div className="play-button-container" onClick={PlaySong}>
                <audio
                    ref={playerRef}
                    onPlaying={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    autoPlay={true}
                    onEnded={() => setCurrentTrack(currentTrack + 1)}
                >
                    <source src={songs[currentTrack]}></source>
                </audio>
                <h2>{currentTrack}</h2>
                <div className="record-one"></div>
                <div className="record-two"></div>
            </div>
        </>
    )
}
