import React, { createContext, useContext } from 'react'
import { useWindowSize } from 'use-hooks'

type AppContext = {
    isMobile: boolean
    windowWidth: number
    numberWithSpaces: (n: number) => string
}

const appContext = createContext<AppContext>(null as unknown as AppContext)

export const useAppContext = () => useContext(appContext)

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' P'
}

export function AppContextProvider({ children = null }) {
    const windowSize = useWindowSize()
    const isMobile = windowSize.width < 665

    return (
        <appContext.Provider
            value={{
                isMobile,
                windowWidth: windowSize.width,
                numberWithSpaces
            }}
        >
            {children}
        </appContext.Provider>
    )
}
