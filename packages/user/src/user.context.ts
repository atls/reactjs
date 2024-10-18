import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const Context = createContext<any | null | undefined>(undefined)

export const { Provider, Consumer } = Context
