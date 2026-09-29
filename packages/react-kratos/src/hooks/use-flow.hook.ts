import type { ContextFlow } from '../providers/index.js'

import { useContext }       from 'react'

import { FlowContext }      from '../providers/index.js'

export const useFlow = (): ContextFlow => {
  const flow = useContext(FlowContext)

  return flow
}
