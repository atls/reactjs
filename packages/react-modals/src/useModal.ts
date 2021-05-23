import { useContext, useEffect, useMemo, useState } from 'react'

import { Context }                                  from './Context'

export const useModal = (id: any) => {
  const store = useContext(Context)

  if (!store) {
    throw new Error('Missing <ModalsProvider>')
  }

  const [context, setContext] = useState(null)

  useEffect(() => {
    store.addListener(id, setContext)

    return () => {
      store.removeListener(id, setContext)
    }
  }, [id, store])

  const open = useMemo(() => store.open.bind(store, id), [id, store])
  const close = useMemo(() => store.close.bind(store, id), [id, store])
  return { visible: Boolean(context), context, open, close }
}
