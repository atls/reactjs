import { createContext } from 'react'

export const Context = createContext<null | undefined | any>(undefined)

export const { Provider, Consumer } = Context
