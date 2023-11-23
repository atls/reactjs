import { createContext }   from 'react'

import { FieldsValidator } from '../../interfaces'

export const Context = createContext<FieldsValidator | null>(null)

export const { Provider, Consumer } = Context
