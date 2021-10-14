import React, { useEffect, useState } from 'react'
import './NoteGenerator.scss'

export function NoteGenerator() {
    const [isOnNoteArea, setIsOnNoteArea] = useState(false)

    // const mouseDetecting: React.MouseEventHandler = e => {

    //     window.addEventListener('mousemove', {(e) => console.log(e.clientX)})
    // }

    const [position, setPosition] = useState<{ x: number; y: number }>()

    useEffect(() => {
        const setMousePosition: React.MouseEventHandler = e => {
            setPosition({ x: e.clientX, y: e.clientY })
            window.removeEventListener('mousemove', setMousePosition)
        }

        window.addEventListener('mousemove', setMousePosition)
        console.log('position', position)
    }, [position])

    // return <div className="note-gen-wrapper" onMouseMove={e => mouseDetecting(e)}></div>
    return <div className="note-gen-wrapper"></div>
}
