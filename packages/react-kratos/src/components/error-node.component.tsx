import type { FlowError }    from '@ory/kratos-client-fetch'
import type { ReactElement } from 'react'

import { useError }          from '../hooks/index.js'

export interface ErrorNodeProps {
  children: (node: FlowError) => ReactElement
}

export const ErrorNode = ({ children }: ErrorNodeProps): ReactElement | null => {
  const { error } = useError()

  if (error && typeof children === 'function') {
    return children(error)
  }

  return null
}
