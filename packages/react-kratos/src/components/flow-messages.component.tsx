import type { UiText }       from '@ory/kratos-client-fetch'
import type { ReactElement } from 'react'

import { useMemo }           from 'react'

import { useFlow }           from '../hooks/index.js'

export interface FlowMessagesProps {
  children: (messages: Array<UiText>) => ReactElement
}

export const FlowMessages = ({ children }: FlowMessagesProps): ReactElement | null => {
  const { flow } = useFlow()
  const messages = useMemo(() => flow?.ui.messages || [], [flow])

  if (typeof children === 'function') {
    return children(messages)
  }

  return null
}
