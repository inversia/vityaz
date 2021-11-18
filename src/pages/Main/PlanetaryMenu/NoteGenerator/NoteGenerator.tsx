import React, { useEffect, useRef, useMemo } from 'react'
import { throttle } from 'lodash'
import './NoteGenerator.scss'
import { rescale } from '~common'
import _notesImages from './icons/*.svg'

const notesImages = Object.values(_notesImages as { [key: string]: string })

export function NoteGenerator() {
    // const [isOnNoteArea, setIsOnNoteArea] = useState(false)

    const position = useRef({ x: 0, y: 0 })
    const notesArea = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const setMousePosition = (e: MouseEvent) =>
            (position.current = { x: e.clientX, y: e.clientY })

        window.addEventListener('mousemove', setMousePosition)

        return () => document.removeEventListener('mousemove', setMousePosition)
    }, [])

    const trottledCreateNotes = useMemo(
        () =>
            throttle(() => {
                const { left, top, width, height } = (
                    notesArea.current as HTMLElement
                )?.getBoundingClientRect()

                if (notesArea.current && position) {
                    const el = document.createElement('DIV')
                    el.classList.add('note')
                    notesArea.current.appendChild(el)

                    el.style.setProperty(
                        '--note-size',
                        `${Math.ceil(rescale(Math.random(), [0, 1], [1, 5]))}vw`
                    )
                    const noteImageIndex = Math.round(
                        rescale(Math.random(), [0, 1], [0, notesImages.length])
                    )
                    if (notesImages)
                        el.style.setProperty('--note-image', `url(${notesImages[noteImageIndex]})`)

                    el.style.setProperty(
                        '--note-opacity',
                        `${rescale(Math.random(), [0, 1], [0.3, 1])}`
                    )

                    const noteLeft = position.current.x - left
                    const noteTop = position.current.y - top
                    el.style.transform = `translate(${noteLeft}px, ${noteTop}px)`

                    setTimeout(() => {
                        el.remove()
                    }, 950)
                }
            }, 100),

        []
    )

    // console.log(notesImages[0])
    // console.log(Math.round(rescale(Math.random(), [0, 1], [0, notesImages.length])))

    return (
        <div className="note-gen-wrapper">
            <div
                className="notes-container"
                ref={notesArea}
                onMouseMove={trottledCreateNotes}
                style={
                    {
                        '--note-size': `${Math.ceil(rescale(Math.random(), [0, 1], [1, 10]))}px`
                    } as React.CSSProperties
                }
            ></div>
        </div>
    )
}
