import React       from 'react'
import { useMemo } from 'react'

import { useFlow } from '../providers'

export const FlowForm = ({ children, ...props }) => {
  const flow = useFlow()

  // eslint-disable-next-line
  const ui = useMemo(() => flow.getState()?.ui, [flow.getState()])

  if (!ui) {
    return null
  }

  return (
    <form {...props} action={ui.action} method={ui.method}>
      {children}
    </form>
  )
}
