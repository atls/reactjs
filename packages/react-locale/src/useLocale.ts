import React, { SetStateAction } from 'react'

import { Context }               from './Context'

export const useLocale = () => {
  const store = React.useContext(Context)

  if (!store) {
    throw new Error('Missing <LocaleProvider>')
  }

  const [current, setState] = React.useState(store.getCurrent())

  React.useEffect(() => {
    const onChange = (locale: SetStateAction<string>) => setState(locale)

    store.addChangeListener(onChange)

    return () => {
      store.removeChangeListener(onChange)
    }
  }, [store])

  const setLocale = React.useMemo(() => store.set.bind(store), [store])

  return [store.getCurrent(), store.getSupported(), setLocale]
}
