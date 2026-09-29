import type { UiNodeImageAttributes } from '@ory/kratos-client-fetch'
import type { UiNode }                from '@ory/kratos-client-fetch'
import type { ReactElement }          from 'react'

import { UiNodeTypeEnum }             from '@ory/kratos-client-fetch'

import { useFlowNode }                from '../hooks/index.js'

export interface FlowUiImageNode extends Omit<UiNode, 'attributes'> {
  attributes: UiNodeImageAttributes
}

export interface FlowImageNodeProps {
  name: string
  children: (node: FlowUiImageNode) => ReactElement
}

export const FlowImageNode = ({ name, children }: FlowImageNodeProps): ReactElement | null => {
  const node = useFlowNode(name)

  if (node && node.type === UiNodeTypeEnum.Img && typeof children === 'function') {
    return children(node as FlowUiImageNode)
  }

  return null
}
