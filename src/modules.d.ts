declare module '*.svg'
declare module '*.svgr'
declare module '*.jpg'
declare module '*.mp3' {
    const file: string
    export = file
}
declare module '*.mp4'
declare module '*.jpeg'
declare module '*.json'
declare module '*.(jpg|png|svg)'
declare module '*.png' {
    const file: string
    export = file
}
// declare module '*.svg' {
//     const file: string
//     export = file
// }

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]

interface String {
    startsWith(s: string): boolean
}

interface Array<T> {
    find(fn: (item: T, index: number) => boolean): T
}

// interface Set<T> {
//     add(value: T): Set<T>
//     clear(): void
//     delete(value: T): boolean
//     entries(): Array<[T, T]>
//     forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void
//     has(value: T): boolean
//     keys(): Array<T>
//     size: number
// }

// interface SetConstructor {
//     new <T>(): Set<T>
//     new <T>(iterable: Array<T>): Set<T>
//     prototype: Set<any>
// }

// declare let Set: SetConstructor

// declare module 'l10.json' {
//     const languagesByKey: { [key: string]: { [key: string]: string | string[] } }
//     const keysByLanguage: { [key: string]: { [key: string]: string | string[] } }
// }
