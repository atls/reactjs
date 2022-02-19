import { UiText }       from '@ory/kratos-client'

import { ReactElement } from 'react'
import { FC }           from 'react'

import { useFlow }      from '../providers'

export interface FlowMessagesProps {
  children: (messages: Array<UiText>) => ReactElement<any>
}

export const FlowMessages: FC<FlowMessagesProps> = ({ children }) => {
  const flow = useFlow()

  const messages = flow.getMessages()

  if (typeof children === 'function' && messages) {
    return children(messages)
  }

  return null
}
