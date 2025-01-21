import type { UiText }       from '@ory/client'
import type { ReactElement } from 'react'

import { useMemo }           from 'react'

import { useFlow }           from '../hooks'

export interface FlowMessagesProps {
  children: (messages: Array<UiText>) => ReactElement
}

export const FlowMessages = ({ children }: FlowMessagesProps): ReactElement | null => {
  const { flow } = useFlow()
  const messages = useMemo(() => flow?.ui?.messages || [], [flow])

  if (typeof children === 'function' && messages) {
    return children(messages)
  }

  return null
}
