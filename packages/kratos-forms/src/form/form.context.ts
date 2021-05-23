import { createContext } from 'react'
import { FormStore }     from './form.store'

export const Context = createContext(FormStore.create())

export const { Provider, Consumer } = Context
