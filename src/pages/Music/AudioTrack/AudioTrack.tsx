import React, { useEffect, useCallback, useState, useRef } from 'react'
import cls from 'classnames'
import { rescale } from '~common'
import './AudioTrack.scss'

type Song = {
    name: string
    url: string
}

export function AudioTrack({ song }: { song: Song }) {
    const songRef = useRef<HTMLAudioElement>(null)
    const progressBar = useRef<HTMLDivElement>(null)
    const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false)
    const [progressPercentage, setProgressPercentage] = useState<number>(0)

    const PlaySong: React.MouseEventHandler = e => {
        const song = songRef.current

        console.log('e', e.target)

        if (!song) {
            console.warn('player not ready')
            return
        }

        // provides playback of only one audio
        document.querySelectorAll('audio').forEach(audio => {
            if (audio !== e.target) {
                audio.pause()
            }
        })

        if (song.paused && !isSongPlaying) {
            void song?.play()
            setIsSongPlaying(true)
        } else if (!song.paused && isSongPlaying) {
            song.pause()
            setIsSongPlaying(false)
        }
    }

    const showSliderPosition: React.MouseEventHandler = e => {
        const { left, top, width } = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const [x, y] = [e.clientX - left, e.clientY - top]
        const songDuration = songRef.current?.duration

        const time = songDuration && rescale(x, [0, width], [0, songDuration])

        if (songRef.current && time) {
            songRef.current.currentTime = time
            void songRef.current.play()
        }
    }

    const onTimeUpdated = useCallback(() => {
        const songg = songRef.current
        if (!songg) return
        const { currentTime, duration } = songg

        setProgressPercentage(rescale(currentTime, [0, duration], [0, 100]))
    }, [])

    return (
        <div className="audio-track-wrapper">
            <h3>{song.name}</h3>

            <div className="audio-track-container">
                {/* <audio
                    ref={songRef}
                    onPlaying={() => setIsSongPlaying(true)}
                    onPause={() => setIsSongPlaying(false)}
                    onTimeUpdate={onTimeUpdated}
                >
                    <source src={song.url}></source>
                </audio> */}
                <audio
                    ref={songRef}
                    onPlaying={() => setIsSongPlaying(true)}
                    onPause={() => setIsSongPlaying(false)}
                    onTimeUpdate={onTimeUpdated}
                >
                    <source src={song.url}></source>
                </audio>
                <button
                    onClick={e => PlaySong(e)}
                    className={cls(isSongPlaying ? 'playing-song' : 'paused-song')}
                />

                <div className="progress-bar-wrapper">
                    <div
                        className="progress-bar"
                        ref={progressBar}
                        onMouseDown={e => showSliderPosition(e)}
                        // onTouchStart={e => showSliderPosition(e)}
                    ></div>
                    <div className="slider" style={{ left: `${progressPercentage + 3.5}%` }} />
                </div>
            </div>
        </div>
    )
}
