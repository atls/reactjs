import { UiText }       from '@ory/kratos-client'
import { ReactElement } from 'react'
import { FC }           from 'react'

import { useFlow }      from '../providers'

export interface FlowNodeMessagesProps {
  name: string
  children: (messages: Array<UiText>) => ReactElement<any>
}

export const FlowNodeMessages: FC<FlowNodeMessagesProps> = ({ name, children }) => {
  const flow = useFlow()

  const node = flow.getNode(name)

  if (typeof children === 'function' && node?.messages) {
    return children(node.messages)
  }

  return null
}
