import type { UiNodeTextAttributes } from '@ory/kratos-client-fetch'
import type { UiNode }               from '@ory/kratos-client-fetch'
import type { ReactElement }         from 'react'

import { UiNodeTypeEnum }            from '@ory/kratos-client-fetch'

import { useFlowNode }               from '../hooks/index.js'

export interface FlowUiTextNode extends Omit<UiNode, 'attributes'> {
  attributes: UiNodeTextAttributes
}

export interface FlowTextNodeProps {
  name: string
  children: (node: FlowUiTextNode) => ReactElement
}

export const FlowTextNode = ({ name, children }: FlowTextNodeProps): ReactElement | null => {
  const node = useFlowNode(name)

  if (node && node.type === UiNodeTypeEnum.Text && typeof children === 'function') {
    return children(node as FlowUiTextNode)
  }

  return null
}
