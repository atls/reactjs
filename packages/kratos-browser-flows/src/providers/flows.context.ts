import type { Flow }     from '../flows/flow.interfaces'

import { createContext } from 'react'

export const Context = createContext<Flow | null>(null)

export const { Provider, Consumer } = Context
