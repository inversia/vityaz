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
        <VisibilitySensor scrollCheck={true} scrollThrottle={100} partialVisibility={true}>
            {({ isVisible }) => (
                <div
                    className={cls('info-block-wrapper', {
                        'text-right': textAtRight,
                        vertical: isVertical
                    })}
                >
                    <div className="info-wrapper">
                        <div className="info">{text}</div>
                    </div>
                    {!picturesArray && image && isVisible ? (
                        <div
                            className="illustration"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ) : (
                        isVisible && (
                            <Image
                                index={index || 0}
                                picturesArray={picturesArray || []}
                                className={'illustration'}
                            />
                        )
                    )}
                </div>
            )}
        </VisibilitySensor>
    )
}
