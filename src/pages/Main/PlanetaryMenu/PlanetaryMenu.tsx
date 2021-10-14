import React from 'react'
import './PlanetaryMenu.scss'
import { NoteGenerator } from './NoteGenerator'

export function PlanetaryMenu() {
    return (
        <div className="planetary-menu">
            <a href="/visual" className="art-planet">
                <span>Visual Art</span>
            </a>
            <a className="logo">
                <span>MakoViychuk</span>
            </a>
            <a href="/research" className="research-planet">
                <span>Research / AI</span>
            </a>

            <a href="/music" className="music-planet">
                <span>Music</span>
            </a>

            <NoteGenerator />
        </div>
    )
}
