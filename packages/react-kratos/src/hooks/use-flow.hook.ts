import type { ContextFlow } from '../providers'

import { useContext }       from 'react'

import { FlowContext }      from '../providers'

export const useFlow = (): ContextFlow => {
  const flow = useContext(FlowContext)

  if (!flow) {
    throw new Error('Missing <FlowProvider>')
  }

  return flow
}
