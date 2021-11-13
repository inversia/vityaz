import React, { createContext, useContext, useState } from 'react'

const defaultFullSizeContext = {
    isPicFullSize: false,
    setIsPicFullSize: (_value: boolean) => {},
    currentPicArray: [],
    setCurrentPicArray: (_value: string[]) => {},
    currentIndex: 0,
    setCurrentIndex: (_value: number) => {},
    testNumber: 0,
    setTestNumber: (_value: number) => {}
}

type FullSizeContext = {
    isPicFullSize: boolean
    setIsPicFullSize: (b: boolean) => void
    currentPicArray: string[]
    setCurrentPicArray: (arr: string[]) => void
    currentIndex?: number
    setCurrentIndex: (i: number | 0) => void
    testNumber: number
    setTestNumber: (n: number) => void
}

// const fullSizeContext = createContext<FullSizeContext>(null as unknown as FullSizeContext)
const fullSizeContext = createContext<FullSizeContext>(defaultFullSizeContext)

export const useFullSizeContext = () => useContext(fullSizeContext)

export function ProvideFullSizeContext({ children }: { children: JSX.Element }) {
    const [isPicFullSize, setIsPicFullSize] = useState(false)
    const [currentPicArray, setCurrentPicArray] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [testNumber, setTestNumber] = useState(0)

    return (
        <fullSizeContext.Provider
            value={{
                isPicFullSize,
                setIsPicFullSize,
                currentPicArray,
                setCurrentPicArray,
                currentIndex,
                setCurrentIndex,
                testNumber,
                setTestNumber
            }}
        >
            {children}
        </fullSizeContext.Provider>
    )
}
