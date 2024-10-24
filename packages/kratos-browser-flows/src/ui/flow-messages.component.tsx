import type { UiText }       from '@ory/kratos-client'
import type { ReactElement } from 'react'
import type { FC }           from 'react'

import { useFlow }           from '../providers'

export interface FlowMessagesProps {
  children: (messages: Array<UiText>) => ReactElement
}

export const FlowMessages: FC<FlowMessagesProps> = ({ children }) => {
  const flow = useFlow()

  const messages = flow.getMessages()

  if (typeof children === 'function' && messages) {
    return children(messages)
  }

  return null
}
