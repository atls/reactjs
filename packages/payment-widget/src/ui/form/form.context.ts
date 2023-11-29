import { createContext } from 'react'

import { FormContext }   from '../../interfaces'

export const Context = createContext<FormContext | null>(null)

export const { Provider, Consumer } = Context
