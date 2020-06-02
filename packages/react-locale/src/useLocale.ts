import { SetStateAction, useContext, useEffect, useMemo, useState } from 'react'

import { Context }                                                  from './Context'

export const useLocale = () => {
  const store = useContext(Context)

  if (!store) {
    throw new Error('Missing <LocaleProvider>')
  }

  const [, setState] = useState(store.getCurrent())

  useEffect(() => {
    const onChange = (locale: SetStateAction<string>) => setState(locale)

    store.addChangeListener(onChange)

    return () => {
      store.removeChangeListener(onChange)
    }
  }, [store])

  const setLocale = useMemo(() => store.set.bind(store), [store])

  return [store.getCurrent(), store.getSupported(), setLocale]
}
