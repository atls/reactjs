import React           from 'react'

import { LocaleStore } from './LocaleStore'

export const Context = React.createContext(new LocaleStore('en', ['en']))
export const { Provider } = Context
export const { Consumer } = Context
