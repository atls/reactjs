import { createContext } from 'react'

import { LocaleStore }   from './LocaleStore'

export const Context = createContext<any>(new LocaleStore('en', ['en']))
export const { Provider } = Context
export const { Consumer } = Context
