import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import cls from 'classnames'

export function MenuLink({
    path = '',
    component = Link as typeof Link | string,
    children = null as React.ReactNode,
    onClick = (_e: React.MouseEvent) => {},
    outerClass = ''
}) {
    const currentPath = useLocation().pathname
    const className = path.replace(/\//g, '_')
    const active = currentPath.startsWith(path)

    return React.createElement(
        component,
        {
            className: cls(outerClass, { active, ['menu-item-' + className]: 1 }),
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
