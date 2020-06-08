import { createContext } from 'react'

import { ModalsStore }   from './ModalsStore'

export const Context = createContext(new ModalsStore())
export const { Provider } = Context
export const { Consumer } = Context
