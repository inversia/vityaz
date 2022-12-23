import React from 'react'
import cls from 'classnames'
import { MenuLink } from '~components/MenuLink'
import './Menu.scss'
import { useAppContext } from '~App/Context'

export function Menu() {
    const { isTransparent } = useAppContext()

    return (
        <>
            <div className={cls('menu-wrapper', { transparent: isTransparent })}>
                <div className="menu-background"></div>
                <ul>
                    <MenuLink path="/about">About</MenuLink>
                    <MenuLink path="/contacts">Contacts</MenuLink>
                    <MenuLink path="/research">Research / AI</MenuLink>
                    <MenuLink path="/visual">Visual Art</MenuLink>
                    <MenuLink path="/music">Music</MenuLink>
                    <MenuLink path="/main">Main</MenuLink>
                </ul>
            </div>
        </>
    )
}
