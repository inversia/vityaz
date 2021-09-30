import { useRef, useEffect, useCallback } from 'react'

export function useDelay(callback: () => void, milliseconds: number, { auto = false } = {}) {
    const timeoutId = useRef<NodeJS.Timeout>()

    // заворачиваем в ref, чтобы изменения коллбэка не приводило к срабатыванию нашего эффекта, либо не замыкалось на устаревшие значения
    const callbackRef = useRef(callback)
    callbackRef.current = callback

    const reschedule = useCallback(
        (ms = milliseconds) => {
            if (timeoutId.current) clearTimeout(timeoutId.current)
            timeoutId.current = setTimeout(() => {
                if (auto) reschedule()
                callbackRef.current()
            }, ms)
        },
        [auto, milliseconds]
    )

    useEffect(() => {
        reschedule()
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { reschedule }
}
