import React from 'react'
import cls from 'classnames'
import './InfoBlock.scss'

export function InfoBlock({
    text,
    image,
    textAtLeft,
    isVertical
}: {
    text: string
    image?: string
    textAtLeft?: boolean | undefined
    isVertical?: boolean | undefined
}) {
    return (
        <div
            className={cls('info-block-wrapper', {
                'text-left': textAtLeft,
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
