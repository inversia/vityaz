import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import cls from 'classnames'
import './Planet.scss'

export function Planet({ img, isInk }: { img: string; isInk: boolean }) {
    return (
        <div className={cls('planet-wrapper')}>
            <div className="planet-blur" />
            {isInk ? (
                <VisibilitySensor scrollCheck={true} scrollThrottle={100} partialVisibility={true}>
                    {({ isVisible }) => (
                        <div
                            className={cls('ink-planet', { hidden: !isVisible })}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    )}
                </VisibilitySensor>
            ) : (
                <VisibilitySensor scrollCheck={true} scrollThrottle={100} partialVisibility={true}>
                    {({ isVisible }) => (
                        <div
                            className={cls('planet', { hidden: !isVisible })}
                            style={{ maskImage: `url(${img})`, WebkitMaskImage: `url(${img})` }}
                        />
                    )}
                </VisibilitySensor>
            )}
            <div className="inner-halo" />
        </div>
    )
}
