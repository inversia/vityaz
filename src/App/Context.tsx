import React, { createContext, useContext } from 'react'

import { useWindowSize } from 'use-hooks'
import { useLocation } from 'react-router-dom'

type AppContext = {
    isMobile: boolean
    windowWidth: number
    numberWithSpaces: (n: number) => string
    isTransparent: boolean
}

const appContext = createContext<AppContext>(null as unknown as AppContext)

export const useAppContext = () => useContext(appContext)

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' P'
}

export function ProvideAppContext({ children }: { children: JSX.Element }) {
    const windowSize = useWindowSize()
    const isMobile = windowSize.width < 665

    const { pathname } = useLocation()
    const isTransparent = pathname === '/main'

    return (
        <appContext.Provider
            value={{
                isMobile,
                windowWidth: windowSize.width,
                numberWithSpaces,
                isTransparent
            }}
        >
            {children}
        </appContext.Provider>
    )
}
