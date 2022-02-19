import { SelfServiceError } from '@ory/kratos-client'

import { ReactElement }     from 'react'
import { FC }               from 'react'

import { useFlow }          from '../providers'

interface SelfServiceErrorProps {
  code?: number
  status?: string
  reason?: string
  message?: string
}

export interface FlowErrorProps {
  children: (error: SelfServiceErrorProps) => ReactElement<any>
}

export const FlowError: FC<FlowErrorProps> = ({ children }) => {
  const flow = useFlow()

  const state = flow.getState() as SelfServiceError

  if (typeof children === 'function' && state?.error) {
    return children(state.error)
  }

  return null
}
