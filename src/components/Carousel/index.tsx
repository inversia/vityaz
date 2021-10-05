import React, { useRef, useCallback } from 'react'
import './index.scss'
import classname from 'classnames'
import { useStateRef, useDelay } from '~hooks'

export function Carousel({ children = [] as React.ReactNode[] }) {
    const [getCurrentItem, setCurrentItem] = useStateRef(0)

    const scrollerContainer = useRef<HTMLDivElement | null>(null)

    const onScroll = useCallback(
        (event: React.UIEvent) => {
            const el = event.target as Element
            const elementWidth = el.scrollWidth
            const numChildren = el.childElementCount
            const itemWidth = elementWidth / numChildren
            const itemPosition = Math.round(el.scrollLeft / itemWidth)

            setCurrentItem(itemPosition)
        },
        [setCurrentItem]
    )

    const scrollTo = useCallback((i: number) => {
        const { current: el } = scrollerContainer
        el?.scrollTo({
            left: i * (el.scrollWidth / el.childElementCount),
            behavior: 'smooth'
        })
    }, [])

    function scrollToNext() {
        scrollTo(getCurrentItem() === 43 ? 0 : getCurrentItem() + 1)
    }

    const { reschedule } = useDelay(scrollToNext, 5000, { auto: true })

    function dotClicked(i: number) {
        reschedule()
        scrollTo(i)
    }

    return (
        <div className="carousel">
            <div className="carousel-scroller" onScroll={onScroll} ref={scrollerContainer}>
                {children.map((x, i) => (
                    <div className="carousel-item" key={i}>
                        {x}
                    </div>
                ))}
            </div>
            {/* <div className="carousel-pagination-wrapper">
                <button className="left-button" onClick={() => dotClicked(getCurrentItem() - 1)} />
                <div className="carousel-pagination">
                    {children.map((_, i) => (
                        <div
                            className={classname('carousel-page-btn', {
                                active: i === getCurrentItem()
                            })}
                            key={i}
                            onClick={() => dotClicked(i)}
                        />
                    ))}
                </div>
                <button className="right-button" onClick={() => dotClicked(getCurrentItem() + 1)} />
            </div> */}
        </div>
    )
}
