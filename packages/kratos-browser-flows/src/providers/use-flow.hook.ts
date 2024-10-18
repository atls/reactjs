import type { Flow }  from '../flows/flow.interfaces'

import { useContext } from 'react'
import { useEffect }  from 'react'
import { useState }   from 'react'

import { Context }    from './flows.context'

export const useFlow = (): Flow => {
  const flow = useContext(Context)

  if (!flow) {
    throw new Error('Missing <KratosFlowProvider>')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState(null)

  useEffect(() => {
    flow.load()

    // @ts-expect-error
    const callback = (flowState): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setState(flowState)
    }

    flow.on('load', callback)

    return () => {
      flow.off('load', callback)
    }
  }, [flow])

  return flow
}
