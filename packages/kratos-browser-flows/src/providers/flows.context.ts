import { createContext } from 'react'

import { Flow }          from '../flows/flow.interfaces'

export const Context = createContext<Flow | null>(null)

export const { Provider, Consumer } = Context
