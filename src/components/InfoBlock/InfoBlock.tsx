import React from 'react'
import cls from 'classnames'
import './InfoBlock.scss'

export function InfoBlock({
    text,
    image,
    textAtRight,
    isVertical
}: {
    text: string
    image?: string
    textAtRight?: boolean | undefined
    isVertical?: boolean | undefined
}) {
    return (
        <div
            className={cls('info-block-wrapper', {
                'text-right': textAtRight,
                vertical: isVertical
            })}
        >
            <div className="info-wrapper">
                <div className="info">{text}</div>
            </div>
            <div className="illustration" style={{ backgroundImage: `url(${image})` }}></div>
        </div>
    )
}
