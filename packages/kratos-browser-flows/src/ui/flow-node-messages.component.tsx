import type { UiText }       from '@ory/kratos-client'
import type { ReactElement } from 'react'
import type { FC }           from 'react'

import { useFlow }           from '../providers'

export interface FlowNodeMessagesProps {
  name: string
  children: (messages: Array<UiText>) => ReactElement
}

export const FlowNodeMessages: FC<FlowNodeMessagesProps> = ({ name, children }) => {
  const flow = useFlow()

  const node = flow.getNode(name)

  if (typeof children === 'function' && node?.messages) {
    return children(node.messages)
  }

  return null
}
