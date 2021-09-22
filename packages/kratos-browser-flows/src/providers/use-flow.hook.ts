import { useContext } from 'react'
import { useEffect }  from 'react'
import { useState }   from 'react'

import { Context }    from './flows.context'
import { Flow }       from '../flows/flow.interfaces'

export const useFlow = (): Flow => {
  const flow = useContext(Context)

  if (!flow) {
    throw new Error('Missing <KratosFlowProvider>')
  }

  const [, setState] = useState(null)

  useEffect(() => {
    flow.load()

    const callback = (flowState) => {
      setState(flowState)
    }

    flow.on('load', callback)

    return () => {
      flow.off('load', callback)
    }
  }, [flow])

  return flow
}
