import React, { createContext, useContext, useState } from 'react'

import { useWindowSize } from 'use-hooks'
import { useLocation } from 'react-router-dom'

type AppContext = {
    isMobile: boolean
    windowWidth: number
    numberWithSpaces: (n: number) => string
    isResearchPage: boolean
    hi: string
    setHi: (s: string) => void
}

const appContext = createContext<AppContext>(null as unknown as AppContext)

export const useAppContext = () => useContext(appContext)

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' P'
}

export function ProvideAppContext({ children = null }) {
    const windowSize = useWindowSize()
    const isMobile = windowSize.width < 665

    const [hi, setHi] = useState('')

    const { pathname } = useLocation()

    const isResearchPage = pathname === '/research'
    console.log('isResearchPage', isResearchPage)

    return (
        <appContext.Provider
            value={{
                isMobile,
                windowWidth: windowSize.width,
                numberWithSpaces,
                isResearchPage,
                hi,
                setHi
            }}
        >
            {children}
        </appContext.Provider>
    )
}
