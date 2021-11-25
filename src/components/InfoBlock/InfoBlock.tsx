import React from 'react'
import cls from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'
import { Image } from '~components'
import './InfoBlock.scss'
// import { useFullSizeContext } from '~components/FullSizeCarousel'

export function InfoBlock({
    text,
    image,
    textAtRight,
    isVertical,
    index,
    picturesArray
}: {
    text: string
    image?: string
    textAtRight?: boolean | undefined
    isVertical?: boolean | undefined
    index?: number
    picturesArray?: string[]
}) {
    return (
        <VisibilitySensor scrollCheck={true} scrollThrottle={300} partialVisibility={true}>
            {({ isVisible }) => (
                <div
                    className={cls('info-block-wrapper', {
                        'text-right': textAtRight,
                        vertical: isVertical,
                        visible: isVisible
                    })}
                >
                    <div className="info-wrapper">
                        <div className="info">{text}</div>
                    </div>
                    {!picturesArray && image ? (
                        <div
                            className="illustration"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ) : (
                        <Image
                            index={index || 0}
                            picturesArray={picturesArray || []}
                            className={'illustration'}
                        />
                    )}
                </div>
            )}
        </VisibilitySensor>
    )
}
