import { useState, useRef } from 'react'

// Комбинирует ref и state для хранения состояния. Нужно для случаев,
// когда есть необходимость получать или менять текущее значение состояния из замыканий,
// и нельзя прокидывать зависимости, т.к. это будет приводить к нежелательной отмене эффекта
//
export function useStateRef<T>(defaultValue: T): [() => T, (newValue: T) => void] {
    const [value, setValue] = useState<T>(defaultValue)
    const ref = useRef(value)
    return [
        () => ref.current, // функция для получения текущего значения
        (newValue: T) => {
            ref.current = newValue // меняем значение в рефе
            setValue(newValue) // перерендериваем компонент
        }
    ]
}
