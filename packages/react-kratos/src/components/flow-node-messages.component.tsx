import type { UiText }       from '@ory/client'
import type { ReactElement } from 'react'

import { useFlowNode }       from '../hooks'

export interface FlowNodeMessagesProps {
  name: string
  children: (messages: Array<UiText>) => ReactElement
}

export const FlowNodeMessages = ({
  name,
  children,
}: FlowNodeMessagesProps): ReactElement | null => {
  const node = useFlowNode(name)

  if (typeof children === 'function' && node?.messages) {
    return children(node.messages)
  }

  return null
}
