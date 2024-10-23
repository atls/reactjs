import type { FormContext } from '../../interfaces'

import { createContext }    from 'react'

export const Context = createContext<FormContext | null>(null)

export const { Provider, Consumer } = Context
