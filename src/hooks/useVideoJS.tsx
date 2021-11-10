import React, { useCallback, useRef, useEffect, MutableRefObject } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

type SoursesProps = {
    src: string
    type: string
}

type VideoProps = {
    poster: string
    sources: SoursesProps[]
    controls: boolean
    playbackRates: number[]
    responsive: boolean
    name: string
}

export const useVideoJS = (videoJsOptions: VideoProps) => {
    // const videoNode = useRef<HTMLVideoElement | null>(null)
    const videoNode = useRef(null)
    const player = useRef<any>(null)

    useEffect(() => {
        player.current = videojs(videoNode.current, videoJsOptions)

        return () => {
            player.current.dispose()
        }
    }, [videoJsOptions])

    const Video = useCallback(({ children, ...props }) => {
        return (
            <div data-vjs-player>
                <video ref={videoNode} className="video-js" {...props}>
                    {children}
                </video>
            </div>
        )
    }, [])

    return { Video, player: player.current }
}
