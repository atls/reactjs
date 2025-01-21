import type { FlowError }    from '@ory/client'
import type { ReactElement } from 'react'

import { useError }          from '../hooks'

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
