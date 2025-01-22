import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Context = createContext<any>(undefined)

export const { Provider, Consumer } = Context
