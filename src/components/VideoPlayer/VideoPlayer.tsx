import React from 'react'
import { useVideoJS } from '~hooks'
import './VideoPlayer.scss'
import { oil56 } from '~icons'

export function VideoPlayer({
    poster,
    url,
    name,
    type
}: {
    poster?: string
    url: string
    name?: string
    type?: string
}) {
    const { Video } = useVideoJS({
        poster: poster || (oil56 as string),
        sources: [{ src: url, type: type || 'video/mp4' }],
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        responsive: true,
        name: name || ''
    })

    return <Video></Video>
}
