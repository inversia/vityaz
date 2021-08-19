import React from 'react'
import cls from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import './Menu.scss'

export function Menu() {
    return (
        <>
            <div className="menu-wrapper">
                <ul>
                    <MenuLink path="/about" data-descr="About">
                        About
                    </MenuLink>
                    <MenuLink path="/contacts" data-descr="Contacts">
                        Contacts
                    </MenuLink>
                    <MenuLink path="/research" data-descr="Research / AI">
                        Research / AI
                    </MenuLink>
                    <MenuLink path="/art" data-descr="Visual Art">
                        Visual Art
                    </MenuLink>
                    <MenuLink path="/music" data-descr="Music">
                        Music
                    </MenuLink>
                    <MenuLink path="/main" data-descr="Main">
                        Main
                    </MenuLink>
                </ul>
            </div>
        </>
    )
}

function MenuLink({
    path = '',
    component = Link as typeof Link | string,
    children = null as React.ReactChild | null,
    onClick = (_e: React.MouseEvent) => {}
}) {
    const currentPath = useLocation().pathname
    const className = path.replace(/\//g, '_')
    const active = currentPath.startsWith(path)

    return React.createElement(
        component,
        {
            className: cls({ active, ['menu-item-' + className]: 1 }),
            to: path,
            onClick: e => {
                onClick(e)
            }
        },
        children
    )
}
