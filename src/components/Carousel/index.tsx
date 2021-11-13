import React, { useRef, useCallback, useEffect } from 'react'
import cls from 'classnames'
import './index.scss'
import { useStateRef, useDelay } from '~hooks'

export function Carousel({
    children,
    itemsAmount,
    paginationOn,
    arrowsOn,
    currentIndex,
    scrollingSpeed
}: {
    children: React.ReactNode[]
    itemsAmount: number
    paginationOn: boolean
    arrowsOn: boolean
    currentIndex?: number
    scrollingSpeed?: number
}) {
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

    const scrollTo = useCallback((i: number, behavior?: 'smooth' | 'auto') => {
        const { current: el } = scrollerContainer
        el?.scrollTo({
            left: i * (el.scrollWidth / el.childElementCount),
            behavior: behavior || 'smooth'
        })
    }, [])

    useEffect(() => {
        scrollTo(currentIndex || 0, 'auto')
    }, [currentIndex, scrollTo])

    function scrollToNext() {
        scrollTo(getCurrentItem() === itemsAmount - 1 ? 0 : getCurrentItem() + 1)
    }

    const { reschedule } = useDelay(scrollToNext, scrollingSpeed || 5000, { auto: true })

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
            <div className="carousel-pagination-wrapper">
                {arrowsOn && (
                    <button
                        className="left-button"
                        onClick={() => dotClicked(getCurrentItem() - 1)}
                    />
                )}
                {paginationOn && (
                    <div className="carousel-pagination">
                        {children.map((_, i) => (
                            <div
                                className={cls('carousel-page-btn', {
                                    active: i === getCurrentItem()
                                })}
                                key={i}
                                onClick={() => dotClicked(i)}
                            />
                        ))}
                    </div>
                )}
                {arrowsOn && (
                    <button
                        className="right-button"
                        onClick={() => dotClicked(getCurrentItem() + 1)}
                    />
                )}
            </div>
        </div>
    )
}
