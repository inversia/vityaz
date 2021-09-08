import React from 'react'
import cls from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import './Menu.scss'
import { useAppContext } from '~App/Context'

export function Menu() {
    const { isResearchPage } = useAppContext()

    return (
        <>
            <div className={cls('menu-wrapper', { opaque: isResearchPage })}>
                <ul>
                    <MenuLink path="/about">About</MenuLink>
                    <MenuLink path="/contacts">Contacts</MenuLink>
                    <MenuLink path="/research">Research / AI</MenuLink>
                    <MenuLink path="/art">Visual Art</MenuLink>
                    <MenuLink path="/music">Music</MenuLink>
                    <MenuLink path="/main">Main</MenuLink>
                </ul>
            </div>
        </>
    )
}

function MenuLink({
    path = '',
    component = Link as typeof Link | string,
    children = '',
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
            },
            // @ts-ignore TODO
            'data-descr': children
        },
        children
    )
}
