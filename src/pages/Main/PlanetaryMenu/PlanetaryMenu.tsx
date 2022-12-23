import React from 'react'
import './PlanetaryMenu.scss'
import { MenuLink } from '~components/MenuLink'
import { NotesBackground } from './NotesBackground'
import { NoteGenerator } from './NoteGenerator'
import { Motherboard } from './Motherboard'
// import { FluidBackground } from './FluidBackground'

export function PlanetaryMenu() {
    return (
        <div className="planetary-menu">
            {/* <a href="/visual" className="art-planet">
                <span>Visual Art</span>
            </a> */}
            <MenuLink path="/visual" outerClass="art-planet">
                <span>Visual Art</span>
            </MenuLink>
            <a className="logo">
                <span>MakoViychuk</span>
            </a>
            <MenuLink path="/research" outerClass="research-planet">
                <span>Research / AI</span>
            </MenuLink>
            <MenuLink path="/music" outerClass="music-planet">
                <span>Music</span>
            </MenuLink>

            {/* <FluidBackground /> */}
            <Motherboard />
            <NotesBackground />
            <NoteGenerator />
        </div>
    )
}
